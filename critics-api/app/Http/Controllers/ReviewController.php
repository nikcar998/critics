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
        $result = auth()->user()->userReviews()->paginate(10);
        if ($result) {
            return $result;
        } else {
            return response('Not found', 404);
        }
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
        $review = new Review();
        $review->user_id = $request->user_id;
        $review->film_id = $request->film_id;
        $review->title = $request->title;
        $review->cover = $request->cover;
        $review->opinion = $request->opinion;
        $review->year = $request->year;
        $review->genres = $request->genres;
        $review->rating = $request->rating;
        $result = $review->save();
        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = auth()->user()->userReviews()->find($id);
        if ($result) {
            return $result;
        } else {
            return response('Not found', 404);
        }
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
        if ($review) {
            if (auth()->user()->id == $review->user_id) {
                $review->user_id = $request->user_id;
                $review->film_id = $request->film_id;
                $review->title = $request->title;
                $review->cover = $request->cover;
                $review->opinion = $request->opinion;
                $review->year = $request->year;
                $review->genres = $request->genres;
                $review->rating = $request->rating;
                $result = $review->update();
                return $result;
            } else {
                return response('Unauthorized', 404);
            }
        } else {
            return response('Not found', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //$result= userReviews()->find($id);
        $result = Review::find($id)->delete();
        if ($result) {
            return $result;
        } else {
            return response('Not found', 404);
        }
    }
}
