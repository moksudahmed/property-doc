<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\FinancialTransaction;
use App\Models\User;

class FinancialTransactionController extends Controller
{
    public function index()
    {
        // Get all financial transactions for the authenticated user
        $transactions = FinancialTransaction::where('user_id', Auth::user()->id)->get();
        return response()->json($transactions);
    }

    public function show($id)
    {
        $transaction = FinancialTransaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if (Auth::user()->id !== $transaction->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($transaction);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data for creating a new transaction
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:Income,Expense',
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            // Add more validation rules as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new financial transaction
        $transaction = FinancialTransaction::create([
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'amount' => $request->amount,
            'transaction_date' => $request->transaction_date,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Financial transaction created successfully', 'data' => $transaction]);
    }

    public function update(Request $request, $id)
    {
        $transaction = FinancialTransaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if (Auth::user()->id !== $transaction->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate the incoming request data for updates
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:Income,Expense',
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            // Add more validation rules as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the financial transaction
        $transaction->update([
            'type' => $request->type,
            'amount' => $request->amount,
            'transaction_date' => $request->transaction_date,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Financial transaction updated successfully']);
    }

    public function destroy($id)
    {
        $transaction = FinancialTransaction::findOrFail($id);

        // Check if the authenticated user is the owner of the transaction
        if (Auth::user()->id !== $transaction->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the financial transaction
        $transaction->delete();

        return response()->json(['message' => 'Financial transaction deleted successfully']);
    }

    // ...
}
?>