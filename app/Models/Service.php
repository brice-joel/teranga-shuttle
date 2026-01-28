<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //     un service peut etre associé a 0 ou plusieurs reservations 
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
