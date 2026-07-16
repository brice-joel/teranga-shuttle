<?php

namespace App\Jobs;

use App\Mail\Admin\NewDevisMail;
use App\Models\Devis;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendAdminNewDevisJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $devis;

    public function __construct(Devis $devis)
    {
        $this->devis = $devis;
    }

    public function handle()
    {
        Mail::to('infos@terangashuttle.com')->send(new NewDevisMail($this->devis));
    }
}
