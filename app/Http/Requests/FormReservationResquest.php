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
            '_service_id' => ['required'],
            'places' => ['required'],
            'luggage' => ['required'],
            'start_date' => ['required',  'date', 'after_or_equal:today'],
            'start_hour' => ['required', 'unique:reservations,start_hour'],
            'comment' => ['nullable', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            '_service_id.required' => 'Le service est obligatoire',
            'places.required' => 'Le nombre de places est obligatoire',
            'luggage.required' => 'Le nombre de bagages est obligatoire',
            'start_date.required' => 'La date est obligatoire',
            'start_hour.required' => 'L\'heure est obligatoire',

        ];
    }
}
