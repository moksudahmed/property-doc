<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\RentalAgreement;
use App\Models\Property;

class RentalAgreementController extends Controller
{
    public function index()
    {
        // Get all rental agreements for the authenticated tenant
        $rentalAgreements = RentalAgreement::where('tenant_id', Auth::user()->id)->get();
        return response()->json($rentalAgreements);
    }

    public function show($id)
    {
        $rentalAgreement = RentalAgreement::findOrFail($id);

        // Check if the authenticated user is the tenant associated with the agreement
        if (Auth::user()->id !== $rentalAgreement->tenant_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($rentalAgreement);
    }

    public function update(Request $request, $id)
    {
        $rentalAgreement = RentalAgreement::findOrFail($id);

        // Check if the authenticated user is the tenant associated with the agreement
        if (Auth::user()->id !== $rentalAgreement->tenant_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate the incoming request data for updates
        $validator = Validator::make($request->all(), [
            'lease_duration' => 'required|integer',
            'rent_amount' => 'required|numeric',
            'move_in_date' => 'required|date',
            // Add more validation rules as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the rental agreement
        $rentalAgreement->update([
            'lease_duration' => $request->lease_duration,
            'rent_amount' => $request->rent_amount,
            'move_in_date' => $request->move_in_date,
        ]);

        return response()->json(['message' => 'Rental agreement updated successfully']);
    }

    public function destroy($id)
    {
        $rentalAgreement = RentalAgreement::findOrFail($id);

        // Check if the authenticated user is the tenant associated with the agreement
        if (Auth::user()->id !== $rentalAgreement->tenant_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the rental agreement
        $rentalAgreement->delete();

        return response()->json(['message' => 'Rental agreement deleted successfully']);
    }

    // ...
}

?>