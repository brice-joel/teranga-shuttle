<?php

namespace App\Http\Controllers;

use App\Jobs\SendReservationEmailJob;
use Error;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\throwException;

class TestController extends Controller
{
    //
    public function testMail()
    {
        //charger les donnees pour le mail de confirmation
        $reservationData = [
            'user_email' => 'client@test.com',
            'user_name' => 'client',
            'user_phone' => '237698839292',
            'booking_id' => 1,
            'booking_pickup_address' => 'dakar',
            'booking_dropoff_address' => 'saly',
            'booking_type' => 'course_fixed',
            'booking_start_time' =>  '23/02/2002', // transformer le timestamp en format lisible
            'booking_end_time' => '22/34/5432', // transformer le timestamp en format lisible en francais
            'nombre_personnes' => 12,
            'nombre_bagages' => 0,
            'booking_duration' => 240,
            'total_amount' => 20000.00,

        ];




        dd($reservationData);


        // Expédition du Job dans la file d'attente
        SendReservationEmailJob::dispatch($reservationData); //envoyer le mail
        try {
            SendReservationEmailJob::dispatch($reservationData);
        } catch (Exception $e) {
            return throwException($e);
        }
    }
}
