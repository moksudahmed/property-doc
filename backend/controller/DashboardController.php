<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Property;
use App\Models\Notification;
use App\Models\FinancialTransaction;

class DashboardController extends Controller
{
    public function overview()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Authorize the action
        $this->authorize('viewAny', $user);

        // Fetch relevant data for the dashboard
        $propertyCount = Property::where('LandlordID', $user->id)->count();
        $notificationCount = Notification::where('UserID', $user->id)->count();
        $transactionCount = FinancialTransaction::where('UserID', $user->id)->count();

        // Construct the dashboard overview
        $overview = [
            'propertyCount' => $propertyCount,
            'notificationCount' => $notificationCount,
            'transactionCount' => $transactionCount,
        ];

        return response()->json($overview);
    }
}
