<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    // app/Models/Booking.php
    protected $fillable = [
        'user_id',
        'trip_id',
        'type',
        'status',
        'start_time',
        'end_time',
        'pickup_address',
        'dropoff_address',
        'distance_km',
        'adults_count',
        'children_count',
        'luggage_count',
        'total_amount',
        'notes',
        'stripe_session_id'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    // une reservation est associe a un et un seul  paiement
    // car la reservation est appele uniquement lorsque le paiement est un success
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Clôture automatiquement les réservations dont la date de fin est dépassée.
     */
    public static function closeExpiredBookings(): int
    {

        return self::where('end_time', '<', Carbon::now())
            ->where('status', '!=', 'finished')
            ->where('status', '!=', 'cancelled') // Optionnel: ne pas toucher aux annulées
            ->update(['status' => 'finished']);
    }
}
