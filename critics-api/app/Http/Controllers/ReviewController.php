<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = auth()->user()->timeline()->paginate(10);
        if ($result) {
            return response($result, 200);
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
        $rules = array(
            'film_id' => 'required|integer|numeric',
            'title' => 'required|max:200',
            'film_title' => 'required|max:500',
            'cover' => 'required',
            'opinion' => 'required|max:2000',
            'year' => 'required',
            'genres' => 'required',
            'rating' => 'required|integer|numeric|between:0,5'
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 403);
        } else {
            $review = new Review();
            $review->user_id = $request->user_id;
            $review->film_id = $request->film_id;
            $review->film_title = $request->film_title;
            $review->title = $request->title;
            $review->cover = $request->cover;
            $review->opinion = $request->opinion;
            $review->year = $request->year;
            $review->genres = $request->genres;
            $review->rating = $request->rating;
            $result = $review->save();
            if ($result) {
                return response($review, 200);
            } else {
                return response('Error saving review', 500);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = auth()->user()->review()->find($id);
        if ($result) {
            return response($result, 200);
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
                $rules = array(
                    'opinion' => 'max:2000',
                    'rating' => 'integer|numeric|between:0,5'
                );
                $validator = Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 403);
                } else {
                    $request->opinion && $review->opinion = $request->opinion;
                    $request->rating && $review->rating = $request->rating;
                    $result = $review->update();
                    if ($result) {
                        return response('Updated.', 200);
                    } else {
                        return response('Error updating.', 500);
                    }
                }
            } else {
                return response('Unauthorized', 401);
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
        $result = auth()->user()->review()->find($id)->delete();
        if ($result) {
            return response('Deleted', 200);
        } else {
            return response('Not found', 404);
        }
    }

    function search($query)
    {
        if (strlen($query) > 2) {
            $result = auth()->user()->review()->where('title', 'like', '%' . $query . '%')
                ->orWhere('opinion', 'like', '%' . $query . '%')->orWhere('film_title', 'like', '%' . $query . '%')->get();
            if ($result) {
                return response($result, 200);
            } else {
                return response('Search had returned no values.', 404);
            }
        } else {
            return response('Bad request. Insert a minimum of 3 characters.', 403);
        }
    }
}
