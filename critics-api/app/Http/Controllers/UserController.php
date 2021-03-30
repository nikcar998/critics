<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    function login(Request $request)
    {
        $request->validate([
            //the validation for the password field will be implemented in production
            //to do not slow down testing
            // 'password' => [
            //     'required',
            //     'min:6',
            //     'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/'
            // ],
            'email' => ['required', 'email'],
        ]);
        $user = User::where('email', $request->email)->first();
        // print_r($data);
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], 401);
        }

        $token = $user->createToken(env("VAR_TOKEN_KEY"))->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:4', 'max:150'],
            'password' => [
                'required',
                'min:8',
                'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/'
            ],
            'email' => ['required', 'email', 'unique:users'],
            'username' => ['required', 'unique:users,username']
        ]);
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $result = $user->save();
        if ($result) {
            $token = $user->createToken(env("VAR_TOKEN_KEY"))->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token
            ];
            event(new Registered($user));
            return response($response, 201);
        }
        return response('Error saving', 500);
    }

    function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response(['message' => 'Token deleted successfully!'], 200);
    }

    function details($id)
    {
        $result = User::find($id);
        if (!$result) {
            return response('Not Found', 404);
        }
        return response($result, 200);
    }


    function edit(Request $request)
    {
        $request->validate([
            'name' => ['min:4', 'max:150'],
            'username' => [\Illuminate\Validation\Rule::unique('users')->ignore(auth()->user())],
            'description' => ['max:500']
        ]);
        $result = auth()->user()->update($request->only([
            'name',
            'username',
            'description'
        ]));
        if ($result) {
            $response = [
                'user' => auth()->user(),
            ];

            return response($response, 201);
        }
        return response('error during update', 500);;
    }


    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048']
        ]);

        $user = auth()->user();
        $user->avatar = request('avatar')->store('avatars');
        $result = $user->update();
        if ($result) {
            return response($user, 200);
        }
        return response('Error updating avatar', 500);
    }

    public function showAvatar(Request $request)
    {
        $request->validate([
            'url' => ['required']
        ]);
        if (Storage::missing($request->url)) {
            return response('Url not found', 404);
        }
        $avatar = Storage::get($request->url);
        if (!$avatar) {
            return response('Error - not being able to get image', 500);
        }
        $type = Storage::mimeType($request->url);
        return response($avatar)->header('Content-type', $type);
    }

    public function destroy()
    {
        $result = auth()->user()->delete();
        if ($result) {
            return response('User deleted', 200);
        }
        return response('Error deleting', 500);
    }

    public function list()
    {
        return User::paginate(10);
    }

    public function search($query)
    {
        if (strlen($query) <= 2) {
            return response('Bad request. Insert a minimum of 3 characters.', 422);
        }
        $result = User::where('name', 'like', '%' . $query . '%')
            ->orWhere('email', 'like', '%' . $query . '%')->orWhere('username', 'like', '%' . $query . '%')->first();
        if (!$result) {
            return response('Search had returned no values.', 404);
        }
        return response($result, 200);
    }

    public function loggedUser(){
        return auth()->user();
    }
}
