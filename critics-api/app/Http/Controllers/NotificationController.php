<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications;
        if (count($notifications)>0) {
            return response($notifications, 200);
        } else {
            return response('There are not any notification', 404);
        }
    }
    public function indexUnread()
    {
        $notifications = auth()->user()->unreadNotifications;
        if (count($notifications)>0) {
            return response($notifications, 200);
        } else {
            return response('There are not any unread notification', 404);
        }
    }

    public function readNotifications()
    {
        $notifications = auth()->user()->unreadNotifications;
        if (count($notifications)>0) {
            $notifications->markAsRead();
            return response($notifications, 200);
        } else {
            return response('There are not any unread notification', 404);
        }
    }
}
