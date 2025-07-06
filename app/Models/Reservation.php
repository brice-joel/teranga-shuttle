<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'trajet_id',
        'user_id',
        'ride_id',
        'status',
        'start_date',
        'start_hour',
        'end_hour',
        'type',
        'luggage',
        'places',
        'price'
    ];

    public function trajet()
    {
        return $this->belongsTo(Trajet::class);
    }

    public function user()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function ride()
    {
        return $this->belongsTo(Ride::class);
    }
}
