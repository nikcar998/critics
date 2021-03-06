<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth:sanctum'], function () {
    //All secure URL's
    Route::resource('films', FilmController::class);
    Route::resource('reviews', ReviewController::class);
    Route::post("logout", [UserController::class, 'logout']);
    Route::put("edit/{id}", [UserController::class, 'edit']);
});


Route::post("login", [UserController::class, 'login']);
Route::get("details/{id}", [UserController::class, 'details']);
Route::get("list", [UserController::class, 'list']);
Route::post("register", [UserController::class, 'register']);
