<?php

namespace App\Mail\Admin;

use App\Models\Devis;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewDevisMail extends Mailable
{
    use Queueable, SerializesModels;

    public $devis;

    public function __construct(Devis $devis)
    {
        $this->devis = $devis;
    }

    public function build()
    {
        return $this->subject('⚠️ Nouveau Devis Reçu - Teranga Shuttle')
            ->view('emails.devis.new_devis');
    }
}
