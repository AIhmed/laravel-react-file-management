<?php

use App\Http\Controllers\Document\FileController;
use App\Http\Controllers\Document\FolderController;
use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Document',
    'prefix' => 'documents',
    'middleware' => ['auth'],
], function () {
    Route::get('/folders',
        [FolderController::class, 'index'])
        ->name('folder.index');
    Route::get('/folders/c',
        [FolderController::class, 'create'])
        ->name('folder.create');
    Route::post('/folders/s',
        [FolderController::class, 'store'])
        ->name('folder.store');
    Route::get('/folders/{folder}/e',
        [FolderController::class, 'edit'])
        ->name('folder.edit');
    Route::put('/folders/{folder}',
        [FolderController::class, 'update'])
        ->name('folder.update');
    Route::delete('/folders/{folder}',
        [FolderController::class, 'destroy'])
        ->name('folder.destroy');
    Route::get('/folders/fetch',
        [FolderController::class, 'fetch'])
        ->name('folder.fetch');

    Route::get('/files',
        [FileController::class, 'index'])
        ->name('file.index');
    Route::get('/files/c',
        [FileController::class, 'create'])
        ->name('file.create');
    Route::post('/files/s',
        [FileController::class, 'store'])
        ->name('file.store');
    Route::get('/files/{file}/e',
        [FileController::class, 'edit'])
        ->name('file.edit');
    Route::put('/files/{file}',
        [FileController::class, 'update'])
        ->name('file.update');
    Route::delete('/files/{file}',
        [FileController::class, 'destroy'])
        ->name('file.destroy');
    Route::get('folders/{folder}/files/fetch',
        [FileController::class, 'fetch'])
        ->name('file.fetch');
    Route::get('/files/{file}/download',
        [FileController::class, 'download'])
        ->name('file.download');
});
