<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        // Get all notifications for the authenticated user
        $user = Auth::user();
        $notifications = $user->notifications;

        return response()->json($notifications);
    }

    public function show($id)
    {
        // Find the notification
        $notification = Notification::findOrFail($id);

        // Authorize the action
        $this->authorize('view', $notification);

        return response()->json($notification);
    }

    public function markAsRead($id)
    {
        // Find the notification
        $notification = Notification::findOrFail($id);

        // Authorize the action
        $this->authorize('update', $notification);

        // Mark the notification as read
        $notification->update(['status' => 'Read']);

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead()
    {
        // Get all notifications for the authenticated user
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();

        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function destroy($id)
    {
        // Find the notification
        $notification = Notification::findOrFail($id);

        // Authorize the action
        $this->authorize('delete', $notification);

        // Delete the notification
        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully']);
    }
}


?>