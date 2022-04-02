<?php

use App\Http\Controllers\Admin\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Ecommerce\ProductController;
use App\Http\Controllers\Ecommerce\CartController;
use App\Http\Controllers\AjaxController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\Ecommerce\OrderController;

use App\Http\Controllers\Ecommerce\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Ecommerce\Admin\OrderController as AdminOrderController;
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
    'prefix' => 'users',
    // 'middleware' => 'CORS'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register.user');
    Route::post('/login', [AuthController::class, 'login'])->name('login.user');
    Route::post('/view-profile', [AuthController::class, 'viewProfile'])->name('profile.user');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout.user');
});

// Route::group(['middleware' => ['auth:sanctum']], function () {
Route::get('/profile', function (Request $request) {
    $responseMessage = "user profile";
    $data = auth()->user();
    return response()->json([
        "success" => true,
        "message" => $responseMessage,
        "data" => $data
    ], 200);

    // return response()
    //     ->json([
    //         'success' => true,
    //         'user_data' => auth()->user(),
    //     ]);
});

// API route for logout user
Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);
// });

Route::group(['middleware' => ['CORS']], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::get('/v1-post', [PostController::class, 'index']);
Route::get('/v1-post/{post}', [PostController::class, 'show']);


Route::apiResource('/passport/products', AdminProductController::class)
    ->middleware('auth:api');

Route::group([
    'as' => 'admin.',
    'prefix' => 'admin',
    'middleware' => 'auth:api',
], function () {
    Route::resource('product', AdminProductController::class);
    Route::resource('orders', AdminOrderController::class);
    Route::resource('image', ImageController::class);
    Route::resource('campaign', CampaignController::class);
    Route::resource('post', PostController::class);
});


Route::group([
    'as' => 'ajax.',
    'prefix' => 'ajax',
], function () {
    // Route::post('/dateFormat', 'AjaxController@dateFormat')->name('dateFormat');
    // Route::post('/coupon', 'AjaxController@coupon')->name('coupon');
    Route::post('/cart', [AjaxController::class, 'addToCart'])->name('addToCart');
    Route::post('/updateCart', [AjaxController::class, 'updateCart'])->name('updateCart');
});

Route::get('/cart', [CartController::class, 'cart'])->name('listCart');
Route::get('/deleteCart', [AjaxController::class, 'deleteCart'])->name('deleteCart');
Route::post('/toCheckout', [AjaxController::class, 'cartToCheckout']);
Route::post('/checkcouponcode', [APIController::class, 'checkCouponCode']);

Route::post('/rajaongkir', [AjaxController::class, 'rajaongkir']);

Route::post('/createOrder', [OrderController::class, 'checkout']);

Route::post('/joincampaign', [APIController::class, 'postJoinCampaign']);

Route::resource('/product', ProductController::class);

Route::get('/payment/notification', [OrderController::class, 'NotificationAPI'])->name('NotificationAPI');
Route::post('/payment/notification', [OrderController::class, 'postNotificationAPI'])->name('postNotificationAPI');
Route::get('/orderStatus', [OrderController::class, 'status'])->name('status');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return "halo";
    return $request->user();
});
// Route::group(['middleware' => ['web']], function () {
//     Route::get('/dummydata',[APIController::class,'dummyData'])->name('dummyData');
//     Route::get('/setDiscountCode',[APIController::class,'setSession'])->name('setSession');
// });
