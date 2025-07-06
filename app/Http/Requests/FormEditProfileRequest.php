<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormEditProfileRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            //'phone' => 'required|unique:users,phone',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est requis.',
            'name.max' => 'Le nom ne doit pas avoir plus de 255 caractères.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
            // 'phone.required' => 'Le numéro de téléphone est requis.',
            // 'phone.unique' => 'Ce numéro de téléphone est déjà utilisé.',

        ];
    }
}
