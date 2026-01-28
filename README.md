# Teranga Shuttle

## Overview

**Teranga Shuttle** is a modern **vehicle rental and VTC (ride-hailing) application** designed for users in **Dakar, Senegal**. The platform allows customers to rent vehicles or book professional VTC services easily, securely, and efficiently.

The application focuses on **simplicity, performance, and reliability**, offering a clean user experience for customers and a structured management system for administrators.

Teranga Shuttle is built with **Laravel Blade and Tailwind CSS**, making it fast, maintainable, and well-suited for production environments.

---

## Core Features

### Customer Features

- User registration & authentication
- User profile management
- Vehicle rental booking
- VTC ride booking
- Pickup & drop-off location selection
- Booking history & status tracking

### Vehicle & Fleet Management

- Vehicle listing with details (type, price, availability)
- Vehicle categories (economy, luxury, SUV, etc.)
- Availability management

### Payments

- Secure online payments via **Stripe API**
- Booking payment confirmation
- Transaction history

### VTC Services

- Professional driver booking
- Trip scheduling
- Ride confirmation

### Admin Features

- Admin dashboard
- Vehicle & driver management
- Booking management
- User management
- Payment & transaction monitoring

---

## Tech Stack

### Backend

- **Laravel** (PHP)
- MVC architecture

### Frontend

- **Laravel Blade**
- **Tailwind CSS**

### Payments

- **Stripe API**

### Database

- **MySQL** (or any Laravel-supported database)

### Tooling

- Composer
- npm

---

## Screenshots

> Application screenshots will be added here.

```
📸 Homepage
📸 Vehicle listing
📸 Booking flow
📸 Payment checkout
📸 Admin dashboard
```

---

## Installation Guide

### Requirements

- PHP >= 8.1
- Composer
- Node.js & npm
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

To run a specific seeder:

```bash
php artisan db:seed --class=SeederName
```

---

### 7. Start the development server

```bash
php artisan serve
```

---

## Project Highlights

- Clean and responsive UI
- Simple and efficient booking flow
- Secure online payments
- Localized for Dakar market

This project demonstrates **real-world application development** for transportation and mobility services.

---

## Future Enhancements

- Real-time driver tracking
- Google Maps integration
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
