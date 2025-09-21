# Jouvi - Gamified Career Roadmap Generator

Jouvi is an innovative platform designed to empower individuals in their career journeys. It provides personalized, gamified career roadmaps, expert mentorship, and advanced tools for career exploration and planning.
## 🔗 Deployment
The application is live and accessible at:  
👉 https://jolly-bublanina-7de884.netlify.app/

## Features

*   **Personalized Career Roadmaps:** Generate tailored learning paths based on interests and skills.
*   **Gamified Progress Tracking:** Earn XP, level up, and track your progress through career milestones.
*   **Personality Quiz:** Discover ideal career paths through an interactive quiz.
*   **Expert Mentor Network:** Connect with industry professionals for personalized guidance and booking sessions.
*   **Masters Program Advisory:** Get recommendations for international higher education based on academic profile and goals.
*   **Career Path Analyzer:** Analyze your skills and interests to find suitable career roles and identify skill gaps.
*   **User Authentication:** Secure user registration, login, and profile management.
*   **Email Notifications:** Automated emails for account verification, password resets, and booking confirmations.
*   **Stripe Integration:** Secure payment processing for mentor sessions.

## Technologies Used

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Framer Motion:** A production-ready motion library for React.
*   **Lucide React:** A collection of open-source icons.
*   **ElevenLabs API:** For text-to-speech functionality.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A NoSQL document database.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JSON Web Tokens (JWT):** For secure user authentication.
*   **Bcryptjs:** For password hashing.
*   **Nodemailer:** For sending emails.
*   **Stripe:** For payment processing.
*   **Socket.io:** For real-time, bidirectional communication (though currently not heavily utilized in the provided code).
*   **Helmet, Cors, Compression, Morgan, Rate Limit, Mongo Sanitize, XSS Clean, HPP:** Security and performance middleware.

### Cloud & AI

Google Cloud Generative AI – Personalized career recommendations & skill mapping

Google Cloud Storage / Firestore – Data handling & scalability

Google Cloud Deployment (Cloud Run / App Engine) – For hosting backend services

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (LTS version recommended)
*   **npm** or **Yarn** (npm comes with Node.js)
*   **MongoDB:** A running instance of MongoDB (local or cloud-hosted).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd jouvi-career-roadmap
    ```

2.  **Install Frontend Dependencies:**
    ```bashbash
    npm install
    # or yarn install
    ```

3.  **Install Backend Dependencies:**
    ```bashbash
    cd server
    npm install
    # or yarn install
    cd ..
    ```

## Configuration

Both the frontend and backend require environment variables for proper functioning. Create `.env` files in the root directory (for frontend) and in the `server/` directory (for backend).

### Frontend `.env` (in the root directory)

Create a file named `.env` in the root of your project and add the following:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VITE_ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
