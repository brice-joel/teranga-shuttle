<?php

namespace App\Jobs;

use App\Mail\Admin\NewDevisMail;
use App\Mail\ClientDevisMail;
use App\Mail\DevisMail;
use App\Models\Devis;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendClientDevisJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $devis;

    public function __construct(Devis $devis)
    {
        $this->devis = $devis;
    }

    public function handle()
    {
        Mail::to($this->devis->user_email)->send(new DevisMail($this->devis));
        Mail::to('infos@terangashuttle.com')->send(new NewDevisMail($this->devis));
    }
}
