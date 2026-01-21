# Home Services Marketplace

A full-stack web application for booking home services on-demand. This platform connects customers with service providers, handling the entire lifecycle from booking creation to job completion.

## 🚀 Live Demo
[Insert Your Vercel Link Here]

## 📸 Screenshots

### Customer Booking
![Home Page](./screenshots/home.png)

### Dashboard (Provider View)
![Dashboard](./screenshots/dashboard.png)

### Admin Console
![Admin Panel](./screenshots/admin.png)

---

## ✨ Features

- **Booking Lifecycle**: Complete flow from Pending -> Assigned -> In-Progress -> Completed.
- **Role-Based Views**:
  - **Customer**: Simple booking form.
  - **Provider**: Dashboard to view, start, and complete jobs.
  - **Admin**: Operations console for manual assignment and status overrides.
- **Real-Time Updates**: Status changes reflect immediately across the app.
- **Reliability**: Graceful handling of cancellations and provider rejections.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

---

## 💻 Run Locally

Clone the project and follow these steps to run it on your local machine.

### 1. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
```

Seed the database with test providers:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the React app:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## 📌 API Endpoints

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/assign` - Assign a provider
