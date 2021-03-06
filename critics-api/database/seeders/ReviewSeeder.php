<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('reviews')->insert([
            'user_id' => 1,
            'film_id' => 155,
            'title' => "The Dark Knight",
            'cover' => 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            'opinion'=>'Great film. Great Cast',
            'year'=>"2008-07-16",
            'genres'=>"Drama, Action, Crime, Thriller",
            'rating'=>5
        ]);
    }
}
