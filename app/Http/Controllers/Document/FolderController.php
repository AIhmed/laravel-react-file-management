<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class FolderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $folders = (new Folder())->newQuery();
        if ($request->has('name') && $request->input('name') != null) {
            $folders->where('name', $request->input('name'));
        }
        $folders = $folders->where('user_id', $user->id);

        $folders = $folders->get();

        return Inertia::render('Document/Folder/Index', [
            'folders' => $folders,
            'pageDescription' => 'Liste of folders',
            'pageTitle' => 'Liste of folders',
            'folders' => $folders,
            'filter' => [
                'name' => $request->input('name'),
            ],
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Document/Folder/Create', [
            'pageDescription' => 'Create a folder',
            'pageTitle' => 'Create a folder',
            'pageData' => null,
        ]);
    }

    public function store(StoreFolderRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        Folder::create($data);

        return redirect()
            ->route('folder.index')
            ->with('message', [
                'type' => 'sucess',
                'message' => 'A folder has been created successfully'
            ]);
    }

    public function edit(Request $request, $folder)
    {
        $folder = Folder::with('files')->findOrFail($folder);
        return Inertia::render('Document/Folder/Edit', [
            'folder' => $folder,
            'pageDescription' => 'Edit a folder',
            'pageTitle' => 'Edit a folder',
        ]);
    }

    public function update(UpdateFolderRequest $request, Folder $folder)
    {
        $data = $request->validated();
        $folder->update($data);

        return redirect()
            ->route('folder.index')
            ->with('message', __('The folder has been updated successfully'));
    }

    public function destroy(Request $request, Folder $folder)
    {
        $message = $folder->canBeDeleted();
        if (empty($message)) {
            $folder->delete();
            $user = Auth::user();
            $folders = Folder::where('user_id', $user->id)->get();
            return response()->json([
                'status' => 200,
                'folders' => $folders,
            ]);
        } else {
            throw new Exception($message);
        }
    }

    public function fetch(Request $request)
    {
        $user = Auth::user();
        $folders = Folder::where('user_id', $user->id)
            ->paginate(10)
            ->onEachSide(2)
            ->appends(request()->query());

        return response()->json([
            'status' => 200,
            'folders' => $folders,
        ]);
    }
}
