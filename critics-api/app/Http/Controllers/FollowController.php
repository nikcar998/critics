<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    function store($id)
    {
        $user_id=auth()->user()->id;
        if ($user_id == $id) {
            return response('Bad request. You cannot follow yourself', 403);
        } else {
            $user = User::find($id);
            if ($user) {
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
                } else {
                    $type = 'follows';
                    $message = auth()->user()->username . " is not one of your follower anymore.";
                    $user->notify(new UserNotification($type, $message, $id));

                    return response("You don't follow the user anymore", 200);
                }
            } else {
                return response('User not found', 404);
            }
        }
    }
    function index()
    {
        return User::find(auth()->user()->id)->follows;
    }
}
