<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    function store($id)
    {
        $user_id = auth()->user()->id;
        if ($user_id == $id) {
            return response('Bad request. You cannot follow yourself', 422);
        }
        $user = User::find($id);
        if (!$user) {
            return response('User not found', 404);
        }
        auth()
            ->user()
            ->toggleFollow($user);
        //Notification
        $userToNotify = auth()->user()->follows()->find($id);
        if ($userToNotify) {
            $type = 'follows';
            $message = auth()->user()->username . " is now one of your follower.";
            $userToNotify->notify(new UserNotification($type, $message, $id));


            return response('You started following the user', 200);
        }
        $type = 'follows';
        $message = auth()->user()->username . " is not one of your follower anymore.";
        $user->notify(new UserNotification($type, $message, $id));

        return response("You don't follow the user anymore", 200);
    }
    function index()
    {
        return auth()->user()->follows;
    }

    function indexFollowers()
    {
        return Follow::where('following_user_id', auth()->id())->with('user')->get();
    }

    public function isFollowing($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response('User not found', 404);
        }
        return response(['isFollowing' => auth()->user()->isFollowing($id)], 200);
    }
}
