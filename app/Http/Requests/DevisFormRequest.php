<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DevisFormRequest extends FormRequest
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
            'subject' => ['nullable'],
            'start' => 'required',
            'destination' => 'required',
            'places' => 'required',
            'luggages' => 'required',
            'start_date' => 'required',
            'start_hour' => 'required',
            'name' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required']
        ];
    }
    public function messages()
    {

        return [
            'start.required' => 'Le lieu de depart est obligatoire',
            'destination.required' => 'Le lieu de destination est obligatoire',
            'places.required' => 'Le nombre de places est obligatoire',
            'luggages.required' => 'Le nombre de bagages est obligatoire',
            'start_date.required' => 'La date de depart est obligatoire',
            'start_hour.required' => 'L\'heure de depart est obligatoire',
            'name.required' => "Le nom est obligatoire",
            'email.required' => "L'email est obligatoire",
            'email.email' => "Email incorrect",
            'phone.required' => ['Téléphone incorrect']
        ];
    }
}
