<?php

namespace App\Models;

trait Followable
{


    public function follows()
    {
        return $this->belongsToMany(User::class, 'follows', 'user_id', 'following_user_id');
    }

    public function IsFollowing(User $user)
    {
        return $this->follows()
            ->where('following_user_id', $user->id)
            ->exists();
    }
    public function toggleFollow(User $user)
    {
        $this->follows()->toggle($user);
    }
}
