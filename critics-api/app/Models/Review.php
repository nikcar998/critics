<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'film_id',
        'film_title',
        'title',
        'cover',
        'opinion',
        'year',
        //'genres',
        'rating'
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }
    function comment()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function likes()
    {
        return $this->morphToMany('App\Models\User', 'likeable')->whereDeletedAt(null);
    }

    public function getIsLikedAttribute()
    {
        $like = $this->likes()->whereUserId(auth()->id())->first();
        return (!is_null($like)) ? true : false;
    }

}
