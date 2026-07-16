<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //
    public function index()
    {
        $payments = Payment::with('booking.user')->orderBy('created_at', 'desc')->get();
        // dd($payments);
        return inertia('Admin/Payments/Index', compact('payments'));
    }
}
