<?php

use App\Models\Booking;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


// Vérifie et termine les trajets passés toutes les heures
Schedule::call(function () {
    Booking::closeExpiredBookings();
})->everyMinute();
