<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';

    protected $fillable = [
        'user_id',
        'name',
        'description',
    ];

    public function user()
    {
        $this->belongsTo(User::class, 'user_id');
    }

    public function files()
    {
        return $this->hasMany(File::class, 'folder_id');
    }

    public function canBeDeleted()
    {
        $message = [];

        if ($this->files->count() > 0) {
            $message[] = $this->files->count() . ' file(s)';
        }

        if (empty($message)) {
            return $message;
        } else {
            return 'Cannot delete folder. The folder has many files';
        }
    }
}
