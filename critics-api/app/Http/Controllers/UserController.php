<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            return response()->json($validator->errors(), 400);
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

                return response($response, 201);
            } else {
                return response('error during saving', 500);
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
        $result = User::where('id', $id)->get();
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
                'name' => 'required|min:4|max:150',
                'password' => [
                    'required',
                    'min:6',
                    'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/'
                ],
                'email' => ['required', 'email', \Illuminate\Validation\Rule::unique('users')->ignore($id)],
                'username' => ['required', \Illuminate\Validation\Rule::unique('users')->ignore(auth()->user())],
            );

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            } else {
                $user = User::find($id);
                $user->name = $request->name;
                $user->email = $request->email;
                $user->username = $request->username;
                $user->password = Hash::make($request->password);
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
}
