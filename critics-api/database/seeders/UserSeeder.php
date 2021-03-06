<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mario Rossi',
            'email' => 'mario@rossi.com',
            'password' => Hash::make('password'),
            'username'=>'MarioRossi',
            'description'=>"Tipico profilo seeder fatto da un italiano."
        ]);
        DB::table('users')->insert([
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => Hash::make('password'),
            'username'=>'JohnDoe',
            'description'=>"Tipico profilo seeder."
        ]);
    }
}
