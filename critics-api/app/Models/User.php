<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Review;

class User extends Authenticatable // implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;
    use Followable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'username',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function review()
    {
        return $this->hasMany(Review::class);
    }

    function comment()
    {
        return $this->hasMany(Comment::class);
    }

    public function timeline()
    {
        $follows = $this->follows()->pluck('id');
        return Review::whereIn('user_id', $follows)
            ->orWhere('user_id', $this->id)
            ->latest();
    }

    public function likedReviews()
    {
        return $this->morphedByMany('App\Models\Review', 'likeable')->whereDeletedAt(null);
    }

    public function likedComments()
    {
        return $this->morphedByMany('App\Models\Comment', 'likeable')->whereDeletedAt(null);
    }
}
