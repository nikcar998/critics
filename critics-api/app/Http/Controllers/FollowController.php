<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    function store($id)
    {
        if (auth()->user()->id == $id) {
            return response('Bad request. You cannot follow yourself', 400);
        } else {
            $user = User::find($id);
            if ($user) {
                auth()
                    ->user()
                    ->toggleFollow($user);

                return response('Success', 200);
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
