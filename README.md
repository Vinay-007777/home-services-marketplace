# Home Services Marketplace

A full-stack web application for booking home services on-demand. This platform connects customers with service providers, handling the entire lifecycle from booking creation to job completion.

## 🚀 Live Demo
(https://home-services-marketplace.vercel.app/)

## 📸 Screenshots

### Customer Booking
Home Page
<img width="1694" height="843" alt="image" src="https://github.com/user-attachments/assets/9d2b06a6-6fea-4fd5-8478-60f1c33a21da" />


### Dashboard (Provider View)

<img width="1567" height="697" alt="image" src="https://github.com/user-attachments/assets/c319b0ab-d137-456c-8652-dede2678392a" />

### Admin Console
<img width="1479" height="849" alt="image" src="https://github.com/user-attachments/assets/52bf5565-db0b-4fee-96a1-1cf2115b42e5" />

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
