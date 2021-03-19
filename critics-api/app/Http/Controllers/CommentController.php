<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Review;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //la funzione farà ritornare i commenti di una determinata recensione
    public function index($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response('Review not found', 404);
        }
        $result = $review->comment()->where('parent_id', null)->with('replies')->paginate(10);
        return response($result, 200);
    }

    public function show($id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response('Comment not found', 404);
        }
        return response([$comment, $comment->replies], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'review_id'=>['required', 'exists:reviews,id'],
            'body' => ['required', 'min:4', 'max:1000'],
        ]);

        $comment = new Comment;
        if ($request->parent_id) {
            //Notification
            //if "parent_id" field exists in the request, the creator of the parent comment receives a notification
            $type = 'reply';
            $review = Review::find($request->review_id);
            $message = auth()->user()->username . " has replied to your comment at the review about " . $review->title;
            $userToNotify = Comment::find($request->parent_id)->user()->first();
            $userToNotify->notify(new UserNotification($type, $message, $request->parent_id));

            //Assigning parent_id value to the new comment
            $comment->parent_id = $request->parent_id;
        } else {
            //Notification
            //if "parent_id" field doesn't exists in the request, the creator of the review receives a notification
            $type = 'comment';
            $review = Review::find($request->review_id);
            $message = auth()->user()->username . " has commented your review about " . $review->title;
            $userToNotify = $review->user()->first();
            $userToNotify->notify(new UserNotification($type, $message, $request->review_id));
        }
        $comment->body = $request->body;
        $comment->user_id = auth()->user()->id;
        $comment->review_id = $request->review_id;
        $result = $comment->save();
        if (!$result) {
            return response('Error saving', 500);
        }
        $response = [
            'comment' => $comment,
        ];
        return response($response, 200);
    }

    public function edit(Request $request, $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response('Comment not found.', 404);
        }

        if (!(auth()->user()->id == $comment->user_id)) {
            return response('Unauthorized', 401);
        }

        $request->validate([
            'body' => ['required', 'min:4', 'max:1000'],
        ]);

        $comment->body = $request->body;
        $result = $comment->update();
        if (!$result) {
            return response('error during update', 500);
        }
        return response($comment, 200);
    }
}
