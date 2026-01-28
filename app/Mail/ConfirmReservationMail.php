<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmReservationMail extends Mailable
{
    use Queueable, SerializesModels;
    private $data_reservation;
    /**
     * Create a new message instance.
     */
    public function __construct($data_reservation)
    {
        //
        $this->data_reservation = $data_reservation;
    }

    public function build()
    {
        return $this->view('emails.confirm_reservation')
            ->subject('Confirmation de réservation')
            ->with('data_reservation', $this->data_reservation);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de la réservation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.confirm_reservation',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
