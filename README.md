# QR-based Ticket Booking System

This project is a QR-based ticket booking system built with Next.js 14, MongoDB, Stripe, and NextAuth v5. It provides a secure platform for online ticket booking with integrated payment processing and user authentication. The system includes real-time QR code validation and turnstile (door) access control using a Raspberry PI-4B.

## Features

- **Secure Ticket Booking**: Users can book tickets online securely.
- **Payment Processing**: Integrated with Stripe for seamless payment transactions.
- **User Authentication**: Secure authentication and authorization using NextAuth v5.
- **QR Code Validation**: Real-time validation of QR codes for ticket verification.
- **Access Control**: Turnstile (door) access control implemented with Raspberry PI-4B.

## Tech Stack

- **Next.js 14**: Frontend framework for building the web application.
- **MongoDB**: Database for storing user and ticket information.
- **Stripe**: Payment processing platform.
- **NextAuth v5**: Authentication library for secure user login and management.
- **Raspberry PI-4B**: Hardware for turnstile access control.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm or yarn
- MongoDB
- Raspberry PI-4B (for access control)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/qr-ticket-booking-system.git
    cd qr-ticket-booking-system
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add your environment variables:

    ```env
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
    STRIPE_SECRET_KEY=your-stripe-secret-key
    MONGODB_URI=your-mongodb-uri
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
