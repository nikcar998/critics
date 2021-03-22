<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = auth()->user()->timeline()->with('comment')->with('likes')->with('user')->paginate(10);
        return response($result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'film_id' => ['required', 'integer', 'numeric'],
            'title' => ['required', 'max:200'],
            'film_title' => ['required', 'max:500'],
            'cover' => ['required'],
            'opinion' => ['required', 'max:2000'],
            'year' => ['required'],
            // 'genres' => ['required'],
            'rating' => ['required', 'integer', 'numeric', 'between:0,5']
        ]);

        $review = new Review();
        $review->user_id = $request->user_id;
        $review->film_id = $request->film_id;
        $review->film_title = $request->film_title;
        $review->title = $request->title;
        $review->cover = $request->cover;
        $review->opinion = $request->opinion;
        $review->year = $request->year;
        // $review->genres = $request->genres;
        $review->rating = $request->rating;
        $result = $review->save();
        if ($result) {
            return response($review, 200);
        }
        return response('Error saving review', 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = auth()->user()->review()->with('comment.user', 'user')->with('comment.likes', 'likes')->with('comment.replies', 'comment')->with('likes')->find($id);
        if (!$result) {
            return response('Not found', 404);
        }
        return response($result, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response('Not found', 404);
        }
        if (!(auth()->user()->id == $review->user_id)) {
            return response('Unauthorized', 401);
        }
        $request->validate([
            'title' => ['required', 'max:200'],
            'opinion' => ['required', 'max:2000'],
            'rating' => ['required', 'integer', 'numeric', 'between:0,5']
        ]);
        $request->title && $review->title = $request->title;
        $request->opinion && $review->opinion = $request->opinion;
        $request->rating && $review->rating = $request->rating;
        $result = $review->update();
        if ($result) {
            return response($review, 200);
        }
        return response('Error updating.', 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = auth()->user()->review()->find($id);
        if (!$result) {
            return response('Not found', 404);
        }
        $result->delete();
        return response('Deleted', 200);
    }

    function search($query)
    {
        if (strlen($query) <= 2) {
            return response('Bad request. Insert a minimum of 3 characters.', 422);
        }

        $result = auth()->user()->review()->where('title', 'like', '%' . $query . '%')
            ->orWhere('opinion', 'like', '%' . $query . '%')->orWhere('film_title', 'like', '%' . $query . '%')->paginate(15);
        return response($result, 200);
    }
}
