<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    //la funzione farà ritornare i commenti di una determinata recensione
    function index($id)
    {
        $review = Review::find($id);
        if ($review) {
            $result = $review->comment()->paginate(20);
            if ($result) {
                return $result;
            } else {
                return response('Comments not found', 404);
            }
        } else {
            return response('Review not found', 404);
        }
    }

    function show($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            return [$comment, $comment->replies];
        } else {
            return response('Comments not found', 404);
        }
    }

    function store(Request $request)
    {
        $rules = array(
            'body' => 'required|min:4|max:1000',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            $comment = new Comment;
            if ($request->parent_id) {
                $comment->parent_id = $request->parent_id;
            }
            $comment->body = $request->body;
            $comment->user_id = auth()->user()->id;
            $comment->review_id = $request->review_id;
            $result = $comment->save();
            if ($result) {
                $response = [
                    'comment' => $comment,
                ];
                return response($response, 200);
            } else {
                return response('error during saving', 500);
            }
        }
    }

    function edit(Request $request, $id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            if (auth()->user()->id == $comment->user_id) {
                $rules = array(
                    'body' => 'required|min:4|max:1000',
                );

                $validator = Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 400);
                } else {
                    $comment->body = $request->body;
                    $result = $comment->update();
                    if ($result) {
                        return response($comment, 200);
                    } else {
                        return response('error during update', 500);
                    }
                }
            } else {
                return response('Unauthorized', 401);
            }
        } else {
            return response('Comment not found.', 404);
        }
    }
}
