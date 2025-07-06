<?php

namespace App\Services;

use App\Models\Reservation;

class ReservationsService
{
    public static function getCountReservations(array $where = [])
    {
        return Reservation::where($where)->count();
    }
}
