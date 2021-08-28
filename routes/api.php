<?php

use App\Http\Controllers\Admin\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Ecommerce\ProductController;
use App\Http\Controllers\Ecommerce\CartController;
use App\Http\Controllers\AjaxController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\Ecommerce\OrderController;

use App\Http\Controllers\Ecommerce\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Ecommerce\Admin\ImageController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::group([
    'as' => 'admin.',
    'prefix'=>'admin',
    // 'middleware' => 'auth',
], function () {
    Route::resource('product', AdminProductController::class);
    Route::resource('image', ImageController::class);
    Route::resource('campaign', CampaignController::class);
});


Route::group([
    'as' => 'ajax.',
    'prefix'=>'ajax',
], function () {
    // Route::post('/dateFormat', 'AjaxController@dateFormat')->name('dateFormat');
    // Route::post('/coupon', 'AjaxController@coupon')->name('coupon');
    Route::post('/cart',[AjaxController::class,'addToCart'])->name('addToCart');
    Route::post('/updateCart', [AjaxController::class,'updateCart'])->name('updateCart');
});

Route::get('/cart',[CartController::class,'cart'])->name('listCart');
Route::get('/deleteCart',[AjaxController::class,'deleteCart'])->name('deleteCart');
Route::post('/toCheckout',[AjaxController::class,'cartToCheckout']);

Route::post('/rajaongkir',[AjaxController::class,'rajaongkir']);

Route::post('/createOrder',[OrderController::class,'checkout']);

Route::post('/joincampaign',[APIController::class,'postJoinCampaign']);

Route::resource('/product', ProductController::class);

Route::get('/payment/notification',[OrderController::class,'NotificationAPI'])->name('NotificationAPI');
Route::post('/payment/notification',[OrderController::class,'postNotificationAPI'])->name('postNotificationAPI');
Route::get('/orderStatus',[OrderController::class,'status'])->name('status');
