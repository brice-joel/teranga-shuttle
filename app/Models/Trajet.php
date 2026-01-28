<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reservation;


class Trajet extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'start',
        'destination',
        'duration',
        'price',
    ];

    /**
     * Get all of the reservations for the Trajet
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
