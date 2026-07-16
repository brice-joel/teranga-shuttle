<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\TripController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->middleware('admin')->controller(DashboardController::class)->name('admin.')->group(function () {
    Route::get('/', 'index')->name('index');

    Route::prefix('/booking')->controller(BookingController::class)->name('booking.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::patch('/update/{id}', 'update')->name('update');
    });
    Route::prefix('/trips')->controller(TripController::class)->name('trips.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/store', 'store')->name('store');
        Route::delete('/{id}/delete', 'destroy')->name('destroy');
        Route::put('/{id}/update', 'update')->name('update');
    });

    Route::prefix('/payment')->controller(PaymentController::class)->name('payment.')->group(function () {
        Route::get('/', 'index')->name('index');
    });
});

Route::prefix('/admin/auth')->controller(AuthController::class)->name('admin.auth.')->group(function () {
    Route::get('/login', 'login')->name('login');
    Route::post('/login', 'doLogin')->name('do-login');
    Route::post('/logout', 'logout')->name('logout')->middleware('admin');
});
