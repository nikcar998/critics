<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(8);
        return response($notifications, 200);
    }
    public function indexUnread()
    {
        $notifications = auth()->user()->unreadNotifications->count() ;
        return response($notifications, 200);
    }

    public function readNotifications()
    {
        $notifications = auth()->user()->unreadNotifications;
        if (!(count($notifications) > 0)) {
            return response('There are not any unread notifications', 404);
        }
        $notifications->markAsRead();
        return response($notifications, 200);
    }
}
