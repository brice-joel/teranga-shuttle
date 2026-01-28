<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'vehicle_id',
        'places',
        'luggage',
        'start_date',
        'start_hour',
        'payment_status',
        'status',
        'comment',
    ];
    // une reservation appartient a un user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // une reservation est associé a un service
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
