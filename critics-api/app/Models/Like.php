<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $table = 'likeables';

    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type',
    ];
      /**
     * Get all of the comments that are assigned this like.
     */
    public function comments()
    {
        return $this->morphedByMany('App\Comment', 'likeable');
    }

    /**
     * Get all of the reviews that are assigned this like.
     */
    public function reviews()
    {
        return $this->morphedByMany('App\Review', 'likeable');
    }
}
