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
        $result = $this->handleLike('App\Models\Review', $id);
        return response($result, 200);
    }
    public function storelikeComment($id)
    {
        if (!Comment::find($id)) {
            return response('Comment not found', 404);
        }
        $result = $this->handleLike('App\Models\Comment', $id);
        return response($result, 200);
    }

    public function handleLike($type, $id)
    {
        $existing_like = Like::withTrashed()->whereLikeableType($type)->whereLikeableId($id)->whereUserId(auth()->id())->first();

        if (is_null($existing_like)) {

            //Notifications, called only when the like is created.
            switch ($type) {
                case 'App\Models\Comment':
                    $userToNotify = Comment::find($id)->user;
                    if ($userToNotify->id != auth()->id()) {
                        $noticationType = "like to comment";
                        $message = auth()->user()->username . " liked your comment.";
                        $userToNotify->notify(new UserNotification($noticationType, $message, $id));
                    }
                    break;

                case 'App\Models\Review':
                    $userToNotify = Review::find($id)->user;
                    if ($userToNotify->id != auth()->id()) {
                        $noticationType = "like to review";
                        $message = auth()->user()->username . " liked your review.";
                        $userToNotify->notify(new UserNotification($noticationType, $message, $id));
                    }
                    break;
            }


            $like = Like::create([
                'user_id'       => auth()->id(),
                'likeable_id'   => $id,
                'likeable_type' => $type,
            ]);
            return $like;
        }

        if (is_null($existing_like->deleted_at)) {
            $existing_like->delete();
            return 'like is softly deleted';
        }
        $existing_like->restore();
        return 'like is restored';
    }


    public function showCommentLikes($id)
    {
        if (!Comment::find($id)) {
            return response('Comment not found', 404);
        }
        $result = $this->showLike('App\Models\Comment', $id);
        if (is_null($result)) {
            return response('there are no like in this comment', 404);
        }

        return response($result, 200);
    }


    public function showReviewLikes($id)
    {
        if (!Review::find($id)) {
            return response('Review not found', 404);
        }
        $result = $this->showLike('App\Models\Review', $id);
        if (is_null($result)) {
            return response('there are no like in this review', 404);
        }
        return response($result, 200);
    }


    public function showLike($type, $id)
    {
        $likes = Like::withTrashed()->whereLikeableType($type)->whereLikeableId($id)->where('deleted_at', NULL)->get();
        if ($likes) {
            return [['Likes' => $likes, 'Count' => $likes->count()]];
        }
        return null;
    }
}
