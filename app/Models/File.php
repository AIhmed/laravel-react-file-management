<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';

    protected $fillable = [
        'folder_id',
        'name',
        'path',
        'description',
    ];

    public function folder()
    {
        return $this->belongsTo(Folder::class, 'folder_id');
    }

    public function store(UploadedFile $uploadedFile)
    {
        $folder = "uploads/Folder/{$this->folder_id}/File/";
        $fileName = $uploadedFile->getClientOriginalName();

        Storage::disk('public')
            ->putFileAs($folder, $uploadedFile, $fileName);
        $this->update(['path' => $folder . $fileName]);
    }
}
