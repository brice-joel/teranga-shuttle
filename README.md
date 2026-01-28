# Teranga Shuttle

## Overview

**Teranga Shuttle** is a modern **vehicle rental and VTC (ride-hailing) web application** built for the city of **Dakar, Senegal**. The platform allows users to rent vehicles or book VTC rides online, pay securely, and manage their bookings through a clean and intuitive interface.

This version of Teranga Shuttle is built using a **full-stack Laravel + Inertia.js + React architecture**, providing a smooth SPA-like user experience while maintaining the reliability and structure of a server-side framework.

---

## Core Features

### User Features

- User registration & authentication
- User profile management
- Vehicle rental booking
- VTC ride booking
- Pickup & drop-off location selection
- Booking history & booking status tracking

### Vehicle & Fleet Management

- Vehicle listing with detailed information
- Vehicle categories (economy, standard, luxury, SUV, etc.)
- Real-time availability management

### Payments

- Secure online payments via **Stripe API**
- Payment confirmation & receipts
- Transaction history

### VTC Services

- Professional driver booking
- Scheduled and on-demand rides
- Ride confirmation & tracking

### Admin & Management

- Admin dashboard
- Vehicle & driver management
- Booking & ride management
- User management
- Payment monitoring

---

## Tech Stack

### Backend

- **Laravel** (PHP)
- MVC & service-based architecture

### Frontend

- **Inertia.js**
- **React.js**
- **Tailwind CSS**

### Payments

- **Stripe API**

### Database

- **MySQL** (or any Laravel-supported database)

### Tooling

- Vite
- Axios
- Composer
- npm / Yarn

---

## Screenshots

> Screenshots and UI previews will be added here.

```
📸 Homepage
📸 Vehicle listing
📸 Booking flow
📸 Stripe checkout
📸 User dashboard
📸 Admin panel
```

---

## Installation Guide

### Requirements

- PHP >= 8.1
- Composer
- Node.js & npm (or Yarn)
- MySQL (or compatible DB)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/teranga-shuttle.git
cd teranga-shuttle
```

---

### 2. Install backend dependencies

```bash
composer install
```

---

### 3. Install frontend dependencies

```bash
npm install
# or
yarn install
```

---

### 4. Environment configuration

Copy the environment file:

```bash
cp .env.example .env
```

Configure the following in `.env`:

- Database credentials
- Stripe API keys

Generate the application key:

```bash
php artisan key:generate
```

---

### 5. Run migrations

```bash
php artisan migrate
```

---

### 6. Seed the database (optional)

```bash
php artisan db:seed
```

---

### 7. Start the development servers

Backend (Laravel):

```bash
php artisan serve
```

Frontend (Vite / React):

```bash
npm run dev
# or
yarn dev
```

---

## Architecture Highlights

- SPA-like navigation using Inertia.js
- Clean separation between backend and frontend
- Reusable React components
- Secure payment flow

This project demonstrates **modern full-stack development** for transportation and mobility platforms.

---

## Future Enhancements

- Google Maps integration
- Real-time driver tracking
- Multi-city support
- Mobile application

---

## Contribution

Contributions are welcome!

- Fork the repository
- Create a feature branch
- Submit a pull request

---

## License

This project is intended for portfolio and demonstration purposes.

---

© 2026 – Teranga Shuttle
