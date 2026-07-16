<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'booking_id',
        'stripe_session_id',
        'status',
        'amount',
    ];
    // un paiement est associe a une et une seule reservation
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
