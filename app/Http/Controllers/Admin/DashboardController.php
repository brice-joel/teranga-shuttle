<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $count_bookings = Booking::count();
        $count_users = User::where('role', 'user')->count();
        $total_revenue = Booking::where('status', 'paid')->sum('total_amount');
        $total_payments = Payment::sum('amount');
        return inertia('Admin/Index', [
            'count_bookings' => $count_bookings,
            'count_users' => $count_users,
            'total_revenue' => $total_revenue,
            'total_payment' => $total_payments,
        ]);
    }
}
