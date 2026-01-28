<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model

{
    //
    use HasFactory;

    protected  $fillable = ['user_id', 'start', 'destination', 'start_hour', 'start_date', 'places', 'luggages', 'places', 'subject'];
    // un devis est detenue par un et un seul utilisateur 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
