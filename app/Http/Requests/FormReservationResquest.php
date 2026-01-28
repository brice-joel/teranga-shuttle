<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormReservationResquest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //           
            'price' => ['required'],
            'places' => ['required'],
            'luggage' => ['required'],
            'start_date' => ['required',  'date', 'after_or_equal:today'],
            'start_hour' => ['required'],
            'type' => ['required'],
            'type_id' => ['required']

        ];
    }

    public function messages()
    {
        return [
            'price.required' => 'Le prix est requis.',
            'places.required' => 'Le nombre de places est requis.',
            'luggage.required' => 'Veuillez choisir si vous avez des bagages ou pas.',
            'start_date.required' => 'La date de départ est requise.',
            'start_date.after_or_equal' => 'La date de réservation doit etre ultérieure ou égale aujourd\'hui.',
            'start_hour.required' => 'L\'heure de départ est requise.',
        ];
    }
}
