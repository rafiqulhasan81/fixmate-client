# FixMate

## Project Name
**FixMate – Home Repair Service Booking Platform**

## Purpose
FixMate is a web-based home repair service platform that connects customers with professional technicians. Customers can explore repair services, submit service requests, track bookings, and make payments. Technicians can manage their services and handle customer requests, while administrators manage users, services, and platform activities.

## Live URL
**Frontend:** [Add your deployed frontend URL here]

**Backend API:** [https://fixmate-server-lilac.vercel.app/]

## Admin Credentials
Use the following credentials to access the Admin Dashboard:

- **Email:** [samiya7@gmail.com]
- **Password:** [Samiya123]

> Note: Replace these placeholders with your actual demo admin credentials before submission. Do not publish personal or production credentials.

## Key Features

### Customer
- Browse available repair services.
- View service details and pricing.
- Book repair services.
- Track booking status.
- View booking history.
- Make payments through Stripe.
- Update profile information and profile photo.

### Technician
- Access a dedicated Technician Dashboard.
- Add, edit, and manage repair services.
- Upload service images using ImgBB.
- View customer service requests.
- Manage booking requests.
- Track completed jobs.
- Update profile information and profile photo.

### Admin
- Access the Admin Dashboard.
- View platform statistics and overview.
- Manage users and user roles.
- Manage service approval requests.
- Monitor bookings and transactions.
- Manage platform activities.

### Security and Authentication
- User authentication using Better Auth.
- Role-based access control for customers, technicians, and administrators.
- Protected dashboard routes and API endpoints.
- Secure environment variable configuration.
- MongoDB database integration.

### Payment and Image Upload
- Stripe Checkout integration for payments.
- Stripe Webhook integration for payment status updates.
- ImgBB API integration for profile photo and service image uploads.

## Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth

### Third-Party Services
- Stripe
- ImgBB API

## NPM Packages Used

### Frontend
- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `better-auth`

### Backend
- `express`
- `mongodb`
- `better-auth`
- `dotenv`
- `cors`
- `multer`

> Check both frontend and backend `package.json` files and add any additional packages actually used in your project.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Frontend Setup

```bash
cd fixmate-client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

### 3. Backend Setup

Open another terminal:

```bash
cd fixmate-server
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 4. Environment Variables

Create `.env.local` in the frontend and `.env` in the backend. Add the required configuration values.

Never commit secret keys or passwords to GitHub.

## Database

**Database:** MongoDB

**Database Name:** `fixmateDB`

Main collections:
- `users`
- `services`
- `bookings`
- `payments`

## Project Structure

```text
fixmate/
├── fixmate-client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
│
└── fixmate-server/
    ├── auth/
    ├── config/
    ├── index.js
    └── package.json
```

## Author

**Developer:** [Your Name]

**GitHub:** [Your GitHub Profile]

---

**FixMate – Making Home Repairs Easier!**