<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->insert([
            'user_id'=> 1,
            'review_id'=>1,
            'body'=>'Bella critica mario.'
        ]);
        DB::table('comments')->insert([
            'user_id'=> 2,
            'review_id'=>1,
            'parent_id'=>1,
            'body'=>'Non è vero faceva schifo.'
        ]);
    }
}
