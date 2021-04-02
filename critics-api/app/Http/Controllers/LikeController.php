<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Review;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function storelikeReview($id)
    {
        if (!Review::find($id)) {
            return response('Review not found', 404);
        }
        $existing_like = Like::withTrashed()->whereLikeableType('App\Models\Review')->whereLikeableId($id)->whereUserId(auth()->id())->first();

        if (is_null($existing_like)) {

            //Notifications, called only when the like is created.
            $userToNotify = Review::find($id)->user;
            if ($userToNotify->id != auth()->id()) {
                $noticationType = "like to review";
                $message = auth()->user()->username . " liked your review.";
                $userToNotify->notify(new UserNotification($noticationType, $message, $id));
            }
            $like = Like::create([
                'user_id'       => auth()->id(),
                'likeable_id'   => $id,
                'likeable_type' => 'App\Models\Review',
            ]);
            return response($like, 200);
        }

        if (is_null($existing_like->deleted_at)) {
            $existing_like->delete();
            return response('like is softly deleted', 200);
        }
        $existing_like->restore();
        return response('like is restored', 200);
    }
    public function storelikeComment($id)
    {
        if (!Comment::find($id)) {
            return response('Comment not found', 404);
        }  
        $existing_like = Like::withTrashed()->whereLikeableType('App\Models\Comment')->whereLikeableId($id)->whereUserId(auth()->id())->first();

        if (is_null($existing_like)) {

            //Notifications, called only when the like is created.
            $userToNotify = Comment::find($id)->user;
            if ($userToNotify->id != auth()->id()) {
                $noticationType = "like to comment";
                $message = auth()->user()->username . " liked your comment.";
                $userToNotify->notify(new UserNotification($noticationType, $message, $id));
            }
            $like = Like::create([
                'user_id'       => auth()->id(),
                'likeable_id'   => $id,
                'likeable_type' => 'App\Models\Comment',
            ]);
            return response($like, 200);
        }

        if (is_null($existing_like->deleted_at)) {
            $existing_like->delete();
            return response('like is softly deleted', 200);
        }
        $existing_like->restore();
        return response('like is restored', 200);
    }



    public function showCommentLikes($id)
    {
        if (!Comment::find($id)) {
            return response('Comment not found', 404);
        }
        $likes = Like::withTrashed()->whereLikeableType('App\Models\Comment')->whereLikeableId($id)->where('deleted_at', NULL)->get();
        if ($likes) {
            return response(['Likes' => $likes, 'Count' => $likes->count()], 200);
        }
        return response('there are no like in this comment', 404);
    }


    public function showReviewLikes($id)
    {
        if (!Review::find($id)) {
            return response('Review not found', 404);
        }
        $likes = Like::withTrashed()->whereLikeableType('App\Models\Review')->whereLikeableId($id)->where('deleted_at', NULL)->get();
        if ($likes) {
            return [['Likes' => $likes, 'Count' => $likes->count()]];
        }
        return response('there are no like in this review', 404);
    }
}
