<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model

{
    //
    use HasFactory;

    protected  $fillable = ['name', 'email', 'phone', 'start', 'destination', 'start_hour', 'start_date', 'places', 'luggages', 'places', 'subject'];
}
