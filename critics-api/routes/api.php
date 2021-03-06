<?php

use App\Http\Controllers\CommentController;
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

    //film auth route
    Route::resource('films', FilmController::class);

    //reviews auth route
    Route::resource('reviews', ReviewController::class);

    //user auth route
    Route::post("logout", [UserController::class, 'logout']);
    Route::put("edit/{id}", [UserController::class, 'edit']);

    //comment auth route
    Route::post("comment/store", [CommentController::class, 'store']);
    Route::put("comment/edit/{id}", [CommentController::class, 'edit']);
});

//user not secure routes
Route::post("login", [UserController::class, 'login']);
Route::get("details/{id}", [UserController::class, 'details']);
Route::get("list", [UserController::class, 'list']);
Route::post("register", [UserController::class, 'register']);

//comments not secure routes
Route::get("comment/index/{id}", [CommentController::class, 'index']);
Route::get("comment/show/{id}", [CommentController::class, 'show']);

//route use to redirect unauthorized action
Route::get('/error', function (Request $request) {
    return response('Unauthenticated.', 401);
})->name('accessError');
