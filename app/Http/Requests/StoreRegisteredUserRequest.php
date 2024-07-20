<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
class StoreRegisteredUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter a name',
            'username.required' => 'Please enter a username',
            'username.unique' => 'username is already taken. Please try another one',
            'email.required' => 'Please enter an email address',
            'password.required' => 'Please enter a password',
            'email.email' => 'Please enter a valid email address',
            'password.confirmed' => 'confirmation password does not match',
            'email.unique' => 'email address already taken. Please enter a another one',
        ];

    }
}
