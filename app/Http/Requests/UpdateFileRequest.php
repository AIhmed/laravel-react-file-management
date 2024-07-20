<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFileRequest extends FormRequest
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
            'file' => 'required|file|mimes:jpeg,png,svg,pdf,docx|max:25600',
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'folder_id' => 'The folder is required',
            'name.required' => 'Please enter the name of the file',
            'name.max' => 'Please enter a name under 255 characters',
            'file.required' => 'Please attach a file',
            'file.file' => 'Please attache a file',
            'file.mimes' => 'File must be jpeg, png, svg, pdf or docx',
            'file.max' => 'File size must not exceed 25600 mb',
        ];
    }
}
