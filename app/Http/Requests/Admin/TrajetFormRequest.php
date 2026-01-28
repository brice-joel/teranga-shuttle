<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TrajetFormRequest extends FormRequest
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
            'start' => ['required'],
            'destination' => ['required'],
            'price' => ['required'],
            'duration' => ['required']
        ];
    }
    public function messages()
    {
        return [
            'start.required' => 'Le départ est requis',
            'end.required' => 'La destination est requise',
            'price.required' => 'Le prix  est requis',
            'duration.required' => 'La durée moyenne est requise',
        ];
    }
}
