<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/admin/{path?}', function () {
//     return view('index_admin');
// })->middleware(['auth'])->name('admin');
require __DIR__ . '/auth.php';
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::group([
    'prefix' => 'filemanager',
    // 'middleware' => ['auth:api']
], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});

Route::get('/admin/{path?}', [PageController::class, 'indexAdmin'])->where('path', '([A-z\d\-\/_.]+)?')
    // ->middleware(['auth:web'])
    // ->middleware('auth:api')
;


Route::middleware('cache.headers:public;max_age=2628000;etag')->group(function () {
    Route::get('/{path?}', [PageController::class, 'index'])->where('path', '([A-z\d\-\/_.]+)?');
    // Route::view('/{path?}', 'index')->where('path', '([A-z\d\-\/_.]+)?');
});



// Route::view('/{any}', 'index')->where('any', '.*');
// Route::get('/', [PageController::class, 'home']);
