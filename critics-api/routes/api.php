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

    //film auth routes
    Route::get("film/index", [FilmController::class, 'index']);
    Route::get("film/indexGenres", [FilmController::class, 'indexGenres']);
    Route::get("film/show/{id}", [FilmController::class, 'show']);
    Route::get("film/search/{query}", [FilmController::class, 'search']);

    //reviews auth route
    Route::get("reviews/search/{query}", [ReviewController::class, 'search']);
    Route::resource('reviews', ReviewController::class);

    //user auth route
    Route::post("logout", [UserController::class, 'logout']);
    Route::put("edit/{id}", [UserController::class, 'edit']);
    Route::post("edit/avatar/{id}", [UserController::class, 'updateAvatar']);
    Route::delete('user/delete/{id}', [UserController::class, 'destroy']);

    //comment auth route
    Route::post("comment/store", [CommentController::class, 'store']);
    Route::put("comment/edit/{id}", [CommentController::class, 'edit']);
});

//user not secure routes
Route::post("login", [UserController::class, 'login']);
Route::get("details/{id}", [UserController::class, 'details']);
Route::get("user/list", [UserController::class, 'list']);
Route::post("register", [UserController::class, 'register']);
Route::get("show/avatar", [UserController::class, 'showAvatar']);
Route::get("user/search/{query}", [UserController::class, 'search']);

//comments not secure routes
Route::get("comment/index/{id}", [CommentController::class, 'index']);
Route::get("comment/show/{id}", [CommentController::class, 'show']);

//route use to redirect unauthorized action
Route::get('/error', function (Request $request) {
    return response('Unauthenticated.', 401);
})->name('accessError');
