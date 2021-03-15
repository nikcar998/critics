<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FilmController extends Controller
{
    public function index()
    {
        $apiKey = env('MOVIES_DATABASE_API_KEY');
        $response = Http::get("https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1");
        return response($response->json(), 200);
    }


    public function show($id)
    {
        $apiKey = env('MOVIES_DATABASE_API_KEY');
        $response = Http::get("https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US");
        return response($response->json(), 200);
    }

    public function indexGenres()
    {
        $apiKey = env('MOVIES_DATABASE_API_KEY');
        $response = Http::get("https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US");
        return response($response->json(), 200);
    }

    public function search($query)
    {
        $apiKey = env('MOVIES_DATABASE_API_KEY');
        $response = Http::get("https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false");
        return response($response->json(), 200);
    }
}
