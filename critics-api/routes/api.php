<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
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

Route::group(['middleware' => 'auth:sanctum'], function () {

    //film auth routes
    Route::get("film/index/nowPlaying/{page}", [FilmController::class, 'indexNowPlaying']);
    Route::get("film/index/popular/{page}", [FilmController::class, 'indexPopular']);
    Route::get("film/index/topRated/{page}", [FilmController::class, 'indexTopRated']);
    Route::get("film/indexGenres", [FilmController::class, 'indexGenres']);
    Route::get("film/show/{id}", [FilmController::class, 'show']);
    Route::get("film/search/{query}", [FilmController::class, 'search']);

    //Notifications auth routes
    Route::get("notifications/index", [NotificationController::class, 'index']);
    Route::get("notifications/indexUnread", [NotificationController::class, 'indexUnread']);
    Route::post("notifications/read", [NotificationController::class, 'readNotifications']);

    //reviews auth route
    Route::get("reviews/search/{query}", [ReviewController::class, 'search']);
    Route::resource('reviews', ReviewController::class);

    //likes routes
    Route::post("reviews/likes/store/{id}", [LikeController::class, 'storelikeReview']);
    Route::post("comment/likes/store/{id}", [LikeController::class, 'storelikeComment']);
    Route::get("comment/likes/show/{id}", [LikeController::class, 'showCommentLikes']);
    Route::get("review/likes/show/{id}", [LikeController::class, 'showReviewLikes']);

    //user auth route
    Route::post("logout", [UserController::class, 'logout']);
    Route::put("edit", [UserController::class, 'edit']);
    Route::post("edit/avatar", [UserController::class, 'updateAvatar']);
    Route::delete('user/delete', [UserController::class, 'destroy']);
    Route::get("details/{id}", [UserController::class, 'details']);
    Route::get("user/list", [UserController::class, 'list']);
    Route::get("user/search/{query}", [UserController::class, 'search']);

    //follows routes
    Route::post("follow/toggle/{id}", [FollowController::class, 'store']);
    Route::get("follow/index", [FollowController::class, 'index']);
    Route::get("follow/index/followers", [FollowController::class, 'indexFollowers']);
    Route::get("follow/isFollowing/{id}", [FollowController::class, 'isFollowing']);

    //comment auth route
    Route::post("comment/store", [CommentController::class, 'store']);
    Route::put("comment/edit/{id}", [CommentController::class, 'edit']);
});



//user not secure routes
Route::post("login", [UserController::class, 'login']);
Route::post("register", [UserController::class, 'register']);
Route::get("show/avatar", [UserController::class, 'showAvatar']);


//comments not secure routes
Route::get("comment/index/{id}", [CommentController::class, 'index']);
Route::get("comment/show/{id}", [CommentController::class, 'show']);


//route use to redirect unauthorized action
Route::get('/error', function () {
    return response('Unauthenticated.', 401);
})->name('accessError');


//veirfy email routes. They will not be used until the client app is not finished.
Route::get('/email/verify', function () {
    return response('Go to your email and look for the verification token.', 401);
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return response('Email Verified.', 200);
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');
