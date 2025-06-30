import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Calendar, 
  Clock, 
  DollarSign, 
  CreditCard, 
  Shield,
  CheckCircle,
  Star,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { MentorProfile, SessionType, TimeSlot, BookingRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: MentorProfile;
}

export function BookingModal({ isOpen, onClose, mentor }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    goals: '',
    experience: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleSessionSelect = (session: SessionType) => {
    setSelectedSession(session);
    setCurrentStep(2);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedSession || !selectedSlot) return;

    setIsProcessing(true);

    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
      setCurrentStep(4);
    }, 2000);
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedSession(null);
    setSelectedSlot(null);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      goals: '',
      experience: '',
      paymentMethod: 'card'
    });
    setBookingComplete(false);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const renderStep1 = () => (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Session Type</h3>
      <div className="space-y-3">
        {mentor.sessionTypes.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSessionSelect(session)}
            className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-400 transition-colors relative"
          >
            {session.popular && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Popular
              </Badge>
            )}
            
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{session.name}</h4>
              <div className="text-right">
                <div className="font-bold text-purple-600">${session.price}</div>
                <div className="text-sm text-gray-500">{session.duration} min</div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{session.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Select Time Slot</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
          ← Back
        </Button>
      </div>

      {selectedSession && (
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-gray-800">{selectedSession.name}</h4>
              <p className="text-sm text-gray-600">{selectedSession.duration} minutes</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-purple-600">${selectedSession.price}</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {mentor.availableSlots.filter(slot => slot.available).map((slot) => (
          <motion.div
            key={slot.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSlotSelect(slot)}
            className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-800">{slot.date}</div>
                  <div className="text-sm text-gray-600">{slot.time} ({slot.timezone})</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Available</Badge>
            </div>
          </motion.div>
        ))}
      </div>

      {mentor.availableSlots.filter(slot => slot.available).length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No available slots at the moment</p>
          <p className="text-sm text-gray-500">Please check back later or contact the mentor directly</p>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
          ← Back
        </Button>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Booking Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Session:</span>
            <span className="font-medium">{selectedSession?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{selectedSession?.duration} minutes</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span>{selectedSlot?.date} at {selectedSlot?.time}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span className="text-purple-600">${selectedSession?.price}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-gray-800">Contact Information</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
              placeholder="Enter your full name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            value={bookingData.phone}
            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
            placeholder="Enter your phone number"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="goals">What are your goals for this session? *</Label>
          <Textarea
            id="goals"
            value={bookingData.goals}
            onChange={(e) => setBookingData({...bookingData, goals: e.target.value})}
            placeholder="Describe what you hope to achieve in this mentoring session..."
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="experience">Your current experience level</Label>
          <Textarea
            id="experience"
            value={bookingData.experience}
            onChange={(e) => setBookingData({...bookingData, experience: e.target.value})}
            placeholder="Brief description of your background and experience..."
            className="mt-1"
            rows={2}
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Payment Method</h4>
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setBookingData({...bookingData, paymentMethod: 'card'})}
            className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              bookingData.paymentMethod === 'card' 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Credit Card</span>
            </div>
          </motion.div>
          
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setBookingData({...bookingData, paymentMethod: 'paypal'})}
            className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
              bookingData.paymentMethod === 'paypal' 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
              <span className="font-medium">PayPal</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">Secure Payment</span>
        </div>
        <p className="text-sm text-green-700">
          Your payment information is encrypted and secure. You can cancel up to 24 hours before the session for a full refund.
        </p>
      </div>

      {/* Book Button */}
      <Button
        onClick={handleBookingSubmit}
        disabled={!bookingData.name || !bookingData.email || !bookingData.goals || isProcessing}
        className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
      >
        {isProcessing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
          />
        ) : (
          <DollarSign className="w-5 h-5 mr-2" />
        )}
        {isProcessing ? 'Processing...' : `Book Session - $${selectedSession?.price}`}
      </Button>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-8 h-8 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
        <h4 className="font-semibold text-gray-800 mb-4">Session Details</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-purple-600" />
            <span>Mentor: <strong>{mentor.name}</strong></span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span>Date: <strong>{selectedSlot?.date} at {selectedSlot?.time}</strong></span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-purple-600" />
            <span>Duration: <strong>{selectedSession?.duration} minutes</strong></span>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <span>Amount Paid: <strong>${selectedSession?.price}</strong></span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Confirmation email sent to {bookingData.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Calendar invite will be sent 24 hours before the session</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>Video call link will be provided via email</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleClose}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          Done
        </Button>
        
        <Button
          variant="outline"
          onClick={() => window.open(`mailto:${mentor.name.toLowerCase().replace(' ', '.')}@jouvi.com`, '_blank')}
          className="w-full"
        >
          <Mail className="w-4 h-4 mr-2" />
          Contact Mentor
        </Button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-white border-0 shadow-2xl">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{mentor.name}</h2>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{mentor.rating} ({mentor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" onClick={handleClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Progress Indicator */}
                {currentStep < 4 && (
                  <div className="flex items-center justify-center space-x-2 mb-8">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-8 h-1 mx-2 ${
                            currentStep > step ? 'bg-purple-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}