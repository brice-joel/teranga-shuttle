<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;
    // app/Models/Trip.php
    protected $fillable = ['departure_city', 'arrival_city', 'fixed_price', 'estimated_duration_minutes', 'is_active'];
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
