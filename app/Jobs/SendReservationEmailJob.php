<?php

namespace App\Jobs;

use App\Mail\ReservationConfirmationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendReservationEmailJob implements ShouldQueue
{
    use Queueable;
    protected array $data;
    /**
     * Create a new job instance.
     */
    public function __construct(array $data)
    {

        $this->data = $data;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //

        Mail::to($this->data['user_email'])->send(new ReservationConfirmationMail($this->data));
    }
}
