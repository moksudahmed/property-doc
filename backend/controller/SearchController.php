<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;

class SearchController extends Controller
{
    public function searchProperties(Request $request)
    {
        // Validate user input
        $request->validate([
            'location' => 'required|string',
            'minPrice' => 'nullable|numeric',
            'maxPrice' => 'nullable|numeric|gt:minPrice',
            'propertyType' => 'nullable|string',
        ]);

        // Build the query for property search
        $query = Property::query();

        // Apply filters
        if ($request->has('location')) {
            $query->where('Location', 'LIKE', '%' . $request->location . '%');
        }
        if ($request->has('minPrice')) {
            $query->where('Price', '>=', $request->minPrice);
        }
        if ($request->has('maxPrice')) {
            $query->where('Price', '<=', $request->maxPrice);
        }
        if ($request->has('propertyType')) {
            $query->where('Type', $request->propertyType);
        }

        // Get the filtered properties
        $properties = $query->get();

        return response()->json($properties);
    }
}


?>