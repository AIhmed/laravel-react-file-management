<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FileController extends Controller
{
    public function index(Request $request, $folder)
    {
        $files = (new File())->newQuery();
        if ($request->has('name') && $request->input('name') != null) {
            $files->where('name', $request->input('name'));
        }
        $files = $files->where('folder_id', $folder);

        if (request()->query('sort')) {
            $attribute = request()->query('sort');
            $sort_order = 'ASC';
            if (strncmp($attribute, '-', 1) == 0) {
                $sort_order = 'DESC';
                $attribute = substr($attribute, 1);
            }
            $files->orderBy($attribute, $sort_order);
        } else {
            $files->latest();
        }
        $files = $files
            ->with('folder')
            ->paginate(10)
            ->onEachSide(2)
            ->appends(request()->query());

        return response()->json([
            'status' => 200,
            'files' => $files,
            'filter' => [
                'name' => $request->input('name'),
            ],
        ]);
    }

    public function create(Request $request, Folder $folder)
    {
        return Inertia::render('Document/File/Create', [
            'folder' => $folder
        ]);
    }

    public function store(StoreFileRequest $request)
    {
        $data = $request->validated();
        $file = File::create($data);
        $file->store($data['path']);

        $files = File::where('folder_id', $data['folder_id'])->get();
        return response()->json([
            'status' => 200,
            'files' => $files,
        ]);
    }

    public function edit(Request $request, $file)
    {
        $file = File::with('folder')
            ->find($file);
        return Inertia::render('Document/File/Edit', [
            'file' => $file,
        ]);
    }

    public function update(UpdateFileRequest $request, File $file)
    {
        $data = $request->validated();
        $user = Auth::user();
        $file->update($data);
        return redirect()
            ->route('file.edit', $file->id)
            ->with('message', __('Le file a été modifié avec succès'));
    }

    public function destroy(Request $request, File $file)
    {
        $folder = $file->folder_id;
        $message = $file->canBeDeleted();
        if (empty($message)) {
            $file->deleteDocuments();
            $file->delete();
            $files = File::where('folder_id', $folder);
            $files = $files
                ->with('folder')
                ->paginate(10)
                ->onEachSide(2)
                ->appends(request()->query());

            return response()->json([
                'status' => 200,
                'files' => $files,
            ]);
        } else {
            throw new Exception($message);
        }
    }

    public function fetch(Request $request, $folder)
    {
        $files = File::where('folder_id', $folder)->get();
        return response()->json([
            'status' => 200,
            'files' => $files,
        ]);
    }
}
