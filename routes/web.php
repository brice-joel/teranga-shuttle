<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\MyController as AdminMyController;
use App\Http\Controllers\Admin\ReservationManagementController;
use App\Http\Controllers\Admin\TrajetManagementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AuthManagementController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TrajetController;
use Inertia\Inertia;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/tarifs', 'tarifs')->name('tarifs');
    Route::get('/contact', 'contact')->name('contact');
    Route::post('/contact', 'doFormContact');

    Route::get('/service', 'service')->name('service');
    Route::get('/terms',  'terms')->name('terms-and-conditions');
});

Route::controller(ServiceController::class)->name('services.')->group(function () {
    Route::get('/services/trajets', 'trajets')->name('trajets');
    Route::get('/services/locations', 'locations')->name('locations');
});

Route::prefix('devis')->controller(DevisController::class)->name('devis.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/store', 'store')->name('store');
});



/*** ROUTE AUTH */
Route::controller(AuthController::class)->name('auth.')->group(function () {
    Route::get('/auth/register',  'register')->name('register')->middleware('logout_if_authenticated');
    Route::post('/auth/register', 'doRegister')->name('do_register');
    Route::get('/auth/login',  'login')->name('login')->middleware('logout_if_authenticated');
    Route::post('/auth/login',  'doLogin')->name('do_login');
    Route::delete('/auth/logout', 'logout')->name('logout');
});


/*** ROUTE SERVICE */
Route::controller(ServiceController::class)->name('service.')->group(function () {
    Route::get('/service/{service}', 'show')->name('show');
});

/*** ROUTE RESERVATION */
Route::prefix('/reservation')->middleware('auth')->controller(ReservationController::class)->name('reservation.')->group(function () {

    Route::get('-{service}/form', 'form')->name('form');
    Route::post('/store', 'store')->name('store')->middleware('auth');

    Route::get('/{reservation}', 'index')->name('index');
    // Route::get('/reservation/{reservation}', 'show')->name('show'); //{reservation}/{service}
    Route::put('/{reservation}/cancel', 'cancel')->name('cancel');
    Route::get('/send/mail', 'send')->name('send');
});

/*** ROUTE TRAJET */
Route::controller(TrajetController::class)->name('trajet.')->group(function () {
    Route::get('/trajet', 'index')->name('index');
    //Route::get('/trajet/{trajet}', 'show')->name('show');
    Route::post('/trajet/check', 'check')->name('check');
    Route::get('/trajet-suggest/{trajet}', 'suggest')->name('suggest');
});


/*** ROUTE RIDE */
Route::controller(RideController::class)->middleware('auth')->name('ride.')->group(function () {
    Route::get('/ride', 'index')->name('index');
    Route::post('/ride', 'search')->name('search');
});

/*** ROUTE ACCOUNT */
Route::controller(AccountController::class)->middleware('auth')->name('account.')->group(function () {
    Route::get('/account',  'account')->name('index');
    Route::get('account/reservation', 'reservation')->name('reservation');
    Route::get('account/edit', 'edit')->name('edit');
    Route::put('account/update', 'update')->name('update');
});

/** ROUTE PAYMENT */
Route::controller(PaymentController::class)->middleware('auth')->name('payment.')->group(function () {
    //Route::get('/payment', 'index')->name('index');
    // Route::post('/payment/store', 'store')->name('store');        
    Route::post('payment/create-checkout-session',  'createCheckoutSession')->name('create-checkout-session'); // create checkout session for pay with api

    Route::get('payment/checkout-success/{id_reservation}', 'success')->name('checkout-success'); //if success paiement
    Route::get('payment/checkout-cancel{id_reservation}', 'cancel')->name('checkout-cancel'); //if cancel paiement
});

Route::controller(MailController::class)->name('mail.')->group(function () {
    Route::get('/mail', 'store')->name('store');
    Route::get('/mail/index', 'index')->name('index');
    Route::get('/mail/confirm_reservation/{reservation}', 'ConfirmReservation')->name('confirm_reservation');
    Route::post('/mail/form_contact', 'FormContact')->name('form_contact');
});


/**** ROUTE ADMIN */
Route::prefix('admin')->name('admin.')->group(function () {
    Route::controller(AdminMyController::class)->middleware('auth_admin')->group(function () { //
        Route::get('/dashboard', 'dashboard')->name('dashboard');
        Route::get('/users', 'users')->name('users');
        Route::get('/reservations', 'reservations')->name('reservations');
    });

    Route::prefix('/reservation')->middleware('auth_admin')->controller(ReservationManagementController::class)->name('reservation.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::delete('/{reservation}', 'destroy')->name('destroy');
        Route::put('/{reservation}', 'confirm')->name('confirm');
    });

    Route::prefix('/trajet')->middleware('auth_admin')->controller(TrajetManagementController::class)->name('trajet.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/{trajet}/edit', 'edit')->name('edit');
        Route::post('/store', 'store')->name('store');
        Route::put('/{trajet}/update', 'update')->name('update');
        Route::delete('/{trajet}/delete', 'delete')->name('delete');
    });

    Route::prefix('/auth')->controller(AuthManagementController::class)->name('auth.')->group(function () {
        Route::get('/login',  'login')->name('login'); //->middleware('logout_if_authenticated');
        Route::post('/login',  'doLogin')->name('do_login');
        Route::delete('/logout', 'logout')->name('logout');
    });
});


Route::prefix('/forgot-password')->controller(ForgotPasswordController::class)->group(function () {
    Route::get('/form', 'showLinkRequestForm')->name('password.request')->middleware('guest'); // afficher le formulaire d'email
    Route::post('/send-email',  'sendResetLinkEmail')->name('password.email'); // envoyer le lien de reset
    Route::get('/reset-password/{token}',  'showResetForm')->name('password.reset');
    // Route pour mettre à jour le mot de passe
    Route::post('/reset-password', 'reset')->name('password.update');
});



Route::fallback(function () {
    return Inertia::render('Error')->toResponse(request())->setStatusCode(404);
});
