<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RepairController extends Controller
{
    public function create(Request $request)
    {
        // Validate input data
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'description' => 'required|string',
            'scheduled_date' => 'required|date',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Create a new repair entry
        $repair = new Repair([
            'property_id' => $validatedData['property_id'],
            'technician_id' => $user->id,
            'description' => $validatedData['description'],
            'scheduled_date' => $validatedData['scheduled_date'],
            'status' => 'Scheduled',
        ]);

        $repair->save();

        return response()->json(['message' => 'Repair scheduled successfully']);
    }

    public function index()
    {
        // Get all repairs
        $repairs = Repair::all();

        return response()->json($repairs);
    }

    public function show($id)
    {
        // Find the repair entry
        $repair = Repair::findOrFail($id);

        return response()->json($repair);
    }

    public function update(Request $request, $id)
    {
        // Find the repair entry
        $repair = Repair::findOrFail($id);

        // Authorize the action
        $this->authorize('update', $repair);

        // Validate input data
        $validatedData = $request->validate([
            'status' => 'required|in:Scheduled,In Progress,Completed',
        ]);

        // Update the repair status
        $repair->status = $validatedData['status'];
        $repair->save();

        return response()->json(['message' => 'Repair status updated successfully']);
    }

    public function destroy($id)
    {
        // Find the repair entry
        $repair = Repair::findOrFail($id);

        // Authorize the action
        $this->authorize('delete', $repair);

        // Delete the repair
        $repair->delete();

        return response()->json(['message' => 'Repair deleted successfully']);
    }
}

?>