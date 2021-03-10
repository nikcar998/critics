<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        // print_r($data);
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['These credentials do not match our records.']
            ], 404);
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
        $rules = array(
            'name' => 'required|min:4|max:150',
            'password' => [
                'required',
                'min:6',
                'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/'
            ],
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users,username'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 403);
        } else {
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
            } else {
                return response('Error saving', 500);
            }
        }
    }

    function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status_code' => 200,
            'message' => 'Token deleted successfully!'
        ]);
    }

    function details($id)
    {
        $result = User::find($id);
        if ($result) {
            return $result;
        } else {
            return response('Not Found', 404);
        }
    }


    function edit(Request $request, $id)
    {
        if (auth()->user()->id == $id) {
            $rules = array(
                'name' => 'min:4|max:150',
                'email' => ['email', \Illuminate\Validation\Rule::unique('users')->ignore($id)],
                'username' => [\Illuminate\Validation\Rule::unique('users')->ignore(auth()->user())],
                'description' => 'max:500'
            );

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 403);
            } else {
                $user = User::find($id);
                $request->name && $user->name = $request->name;
                $request->email && $user->email = $request->email;
                $request->username && $user->username = $request->username;
                $request->description && $user->description = $request->description;
                $result = $user->update();
                if ($result) {
                    $response = [
                        'user' => $user,
                    ];

                    return response($response, 201);
                } else {
                    return response('error during update', 500);;
                }
            }
        } else {
            return response('Unauthorized', 401);
        }
    }
    public function updateAvatar(Request $request, $id)
    {
        if (auth()->user()->id == $id) {
            $rules = array(
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            );

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 403);
            } else {
                $user = User::find($id);
                $user->avatar = request('avatar')->store('avatars');
                $user->save();
                return $user;
            }
        } else {
            return response('unauthorized', 401);
        }
    }

    public function showAvatar(Request $request)
    {
        if ($request->url) {
            if (!Storage::missing($request->url)) {
                $avatar = Storage::get($request->url);
                if ($avatar) {
                    $type = Storage::mimeType($request->url);
                    return response($avatar)->header('Content-type', $type);
                } else {
                    return response('Error - not being able to get image', 500);
                }
            } else {
                return response('Url not found', 404);
            }
        } else {
            return response('Missing url', 403);
        }
    }

    public function destroy($id)
    {
        if (auth()->user()->id == $id) {
            $result = User::find($id)->delete();
            if ($result) {
                return response('User deleted', 200);
            } else {
                return response('Error deleting', 500);
            }
        } else {
            return response('Unauthorized', 401);
        }
    }

    public function list()
    {
        return User::paginate(10);
    }

    public function search($query)
    {
        if (strlen($query) > 2) {
            $result = User::where('name', 'like', '%' . $query . '%')
                ->orWhere('email', 'like', '%' . $query . '%')->orWhere('username', 'like', '%' . $query . '%')->get();
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
