<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterFormRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'phone' => 'required|unique:users,phone|regex:/^\+?[0-9]+$/|min:7|max:15',
            'password' => 'required|string|min:8|confirmed',
            'g-recaptcha-response' => 'required|captcha'


        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom est requis.',
            'name.max' => 'Le nom ne doit pas avoir plus de 255 caractères.',

            'email.required' => 'L\'adresse e-mail est requise.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',

            'phone.required' => 'Le numéro de téléphone est requis.',
            'phone.regex' => 'Le numéro de téléphone doit contenir uniquement des chiffres.',
            'phone.min' => 'Le numéro de téléphone doit avoir au moins 7 chiffres.',
            'phone.max' => 'Le numéro de téléphone ne doit pas dépasser 15 chiffres.',

            'password.required' => 'Le mot de passe est requis.',
            'password.min' => 'Le mot de passe doit avoir au moins 8 caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',

        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'phone' => $this->phone_code . $this->phone,
        ]);
    }
}
