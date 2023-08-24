<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Property;

class PropertyController extends Controller
{
    // ...

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'type' => 'required',
            'location' => 'required|json',
            'price' => 'required|numeric',
            // Add more validation rules as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the property
        $property = new Property([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'location' => $request->location,
            'price' => $request->price,
            'landlord_id' => Auth::user()->id,
        ]);
        $property->save();

        return response()->json(['message' => 'Property created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        // Check if the authenticated user is authorized to update the property
        if (Auth::user()->id !== $property->landlord_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required',
            'type' => 'required',
            'location' => 'required|json',
            'price' => 'required|numeric',
            // Add more validation rules as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the property
        $property->update([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'location' => $request->location,
            'price' => $request->price,
        ]);

        return response()->json(['message' => 'Property updated successfully'], 200);
    }

    public function destroy($id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        // Check if the authenticated user is authorized to delete the property
        if (Auth::user()->id !== $property->landlord_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the property
        $property->delete();

        return response()->json(['message' => 'Property deleted successfully'], 200);
    }

    // ...
}

?>