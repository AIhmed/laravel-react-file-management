<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'folder_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'path' => 'required|file|mimes:jpeg,png,svg,pdf,docx|max:25600',
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'folder_id' => 'The folder is required',
            'name.required' => 'Please enter the name of the file',
            'name.max' => 'Please enter a name under 255 characters',
            'path.required' => 'Please attach a file',
            'paht.mimes' => 'File must be jpeg, png, svg, pdf or docx',
            'path.max' => 'File size must not exceed 25600 mb',
        ];
    }
}
