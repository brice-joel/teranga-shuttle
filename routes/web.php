<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use App\Models\Booking;
use App\Models\PricingRule;
use App\Models\Trip;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('/payment')->controller(PaymentController::class)->middleware(['auth', 'user'])->name('payment.')->group(function () {
    Route::post('/checkout', 'checkout')->name('checkout');
    // Route::post('/webhook/stripe', 'handleWebhook')->name('webhook');
    Route::get('success', 'success')->name('success');
    Route::get('cancel', 'cancel')->name('cancel');
});

// Pages Publiques
Route::prefix('/')->controller(PageController::class)->middleware('user')->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about', 'about')->name('about');
    Route::get('/services', 'services')->name('services');
    Route::get('/trajets', 'trips')->name('trips');
    Route::get('/evenements', 'events')->name('events');
    Route::get('/contact', 'contact')->name('contact');
    Route::post('/contact/form', 'contactForm')->name('contact.form');
});


Route::prefix('/devis')->controller(DevisController::class)->middleware('user')->name('devis.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/store', 'store')->name('store');
});

Route::prefix('/reservation')->middleware(['user'])->controller(BookingController::class)->group(function () {
    // Redirections depuis le BookingEngine
    Route::get('/details-trajet', 'showTripDetails')->name('booking.trip.details');
    Route::get('/details-evenement',  'showEventDetails')->name('booking.event.details');
    Route::post('/store', 'store')->middleware(['auth', 'verified'])->name('booking.store');
    Route::get('/confirmation/{booking}', 'showConfirmation')->middleware(['auth', 'verified'])->name('booking.confirmation');
    Route::get('/mes-reservations',  'index')->middleware(['auth', 'verified'])->name('booking.index');
    Route::patch('/update/{id}', 'update')->middleware(['auth', 'verified'])->name('booking.update');
});

// Espace Client (Protégé)
Route::middleware(['auth', 'verified', 'user'])->group(function () {

    Route::resource('bookings', BookingController::class);
    Route::post('/bookings/{booking}/pay', [BookingController::class, 'pay'])->name('bookings.pay');
});

Route::middleware(['auth', 'verified', 'user'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
