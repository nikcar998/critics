<?php

namespace App\Models;

trait Followable
{


    public function follows()
    {
        return $this->belongsToMany(User::class, 'follows', 'user_id', 'following_user_id');
    }

    public function IsFollowing($id)
    {
        return $this->follows()
            ->where('following_user_id', $id)->exists();
    }
    public function toggleFollow(User $user)
    {
        $this->follows()->toggle($user);
    }
}
