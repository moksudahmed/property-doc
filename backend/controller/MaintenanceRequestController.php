<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaintenanceRequest;
use App\Models\User;

class MaintenanceRequestController extends Controller
{
    public function submitRequest(Request $request)
    {
        // Validate input data
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'description' => 'required|string',
        ]);

        // Get the authenticated user
        $user = auth()->user();

        // Create a new maintenance request
        $maintenanceRequest = new MaintenanceRequest([
            'property_id' => $validatedData['property_id'],
            'tenant_id' => $user->id,
            'description' => $validatedData['description'],
            'status' => 'Pending',
            'request_date' => now(),
        ]);

        $maintenanceRequest->save();

        return response()->json(['message' => 'Maintenance request submitted successfully']);
    }

    public function getRequestsForUser()
    {
        // Get maintenance requests for the authenticated user
        $user = auth()->user();
        $maintenanceRequests = MaintenanceRequest::where('tenant_id', $user->id)->get();

        return response()->json($maintenanceRequests);
    }

    public function scheduleRepair(Request $request, $requestId)
    {
        // Validate input data
        $validatedData = $request->validate([
            'scheduled_date' => 'required|date',
            'technician_id' => 'required|exists:users,id',
        ]);

        // Find the maintenance request
        $maintenanceRequest = MaintenanceRequest::findOrFail($requestId);

        // Authorize the action
        $this->authorize('update', $maintenanceRequest);

        // Update the maintenance request with repair details
        $maintenanceRequest->scheduled_date = $validatedData['scheduled_date'];
        $maintenanceRequest->technician_id = $validatedData['technician_id'];
        $maintenanceRequest->status = 'In Progress';

        $maintenanceRequest->save();

        return response()->json(['message' => 'Repair scheduled successfully']);
    }

    // Add other actions as needed (update status, view repair history, etc.)
}

?>