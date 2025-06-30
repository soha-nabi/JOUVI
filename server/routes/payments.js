const express = require('express');
const { body } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const Booking = require('../models/Booking');

const router = express.Router();

// @desc    Create payment intent for booking
// @route   POST /api/payments/create-intent
// @access  Private
router.post('/create-intent', [
  protect,
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').optional().isString(),
  body('bookingId').optional().isMongoId(),
  validate
], asyncHandler(async (req, res) => {
  const { amount, currency = 'usd', bookingId } = req.body;

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        userId: req.user.id,
        bookingId: bookingId || 'direct-payment'
      }
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    console.error('Stripe payment intent creation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Payment processing failed'
    });
  }
}));

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
router.post('/confirm', [
  protect,
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('bookingId').optional().isMongoId(),
  validate
], asyncHandler(async (req, res) => {
  const { paymentIntentId, bookingId } = req.body;

  try {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update booking if provided
      if (bookingId) {
        const booking = await Booking.findById(bookingId);
        if (booking) {
          booking.paymentInfo.stripePaymentIntentId = paymentIntentId;
          booking.paymentInfo.transactionId = paymentIntent.id;
          booking.status = 'confirmed';
          await booking.save();
        }
      }

      res.status(200).json({
        success: true,
        data: {
          paymentStatus: 'succeeded',
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment not completed'
      });
    }
  } catch (error) {
    console.error('Payment confirmation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Payment confirmation failed'
    });
  }
}));

// @desc    Process refund
// @route   POST /api/payments/refund
// @access  Private
router.post('/refund', [
  protect,
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('amount').optional().isNumeric(),
  body('reason').optional().isString(),
  validate
], asyncHandler(async (req, res) => {
  const { paymentIntentId, amount, reason } = req.body;

  try {
    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Partial refund if amount specified
      reason: reason || 'requested_by_customer'
    });

    res.status(200).json({
      success: true,
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status
      }
    });
  } catch (error) {
    console.error('Refund processing failed:', error);
    res.status(500).json({
      success: false,
      error: 'Refund processing failed'
    });
  }
}));

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
router.get('/history', protect, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Get payments from Stripe
    const payments = await stripe.paymentIntents.list({
      limit: parseInt(limit),
      starting_after: page > 1 ? `pi_${(page - 1) * limit}` : undefined
    });

    // Filter payments for current user
    const userPayments = payments.data.filter(payment => 
      payment.metadata.userId === req.user.id
    );

    res.status(200).json({
      success: true,
      data: userPayments.map(payment => ({
        id: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        created: new Date(payment.created * 1000),
        description: payment.description,
        metadata: payment.metadata
      }))
    });
  } catch (error) {
    console.error('Payment history retrieval failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve payment history'
    });
  }
}));

// @desc    Webhook endpoint for Stripe events
// @route   POST /api/payments/webhook
// @access  Public (but verified by Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update booking status if applicable
      if (paymentIntent.metadata.bookingId && paymentIntent.metadata.bookingId !== 'direct-payment') {
        const booking = await Booking.findById(paymentIntent.metadata.bookingId);
        if (booking) {
          booking.status = 'confirmed';
          booking.paymentInfo.stripePaymentIntentId = paymentIntent.id;
          await booking.save();
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Update booking status if applicable
      if (failedPayment.metadata.bookingId && failedPayment.metadata.bookingId !== 'direct-payment') {
        const booking = await Booking.findById(failedPayment.metadata.bookingId);
        if (booking) {
          booking.status = 'cancelled';
          await booking.save();
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}));

module.exports = router;