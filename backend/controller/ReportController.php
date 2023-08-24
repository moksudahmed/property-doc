<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\RentalAgreement;
use App\Models\FinancialTransaction;

class ReportController extends Controller
{
    public function generateVacancyReport(Request $request)
    {
        // Authorize the user based on their role
        $this->authorize('view-reports');

        // Validate user input
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Generate the vacancy report
        $properties = Property::whereDoesntHave('rentalAgreement', function ($query) use ($request) {
            $query->whereBetween('MoveInDate', [$request->start_date, $request->end_date])
                ->orWhereBetween('MoveOutDate', [$request->start_date, $request->end_date]);
        })->get();

        return response()->json($properties);
    }

    public function generateFinancialStatement(Request $request)
    {
        // Authorize the user based on their role
        $this->authorize('view-reports');

        // Validate user input
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Calculate total income and expenses within the date range
        $income = FinancialTransaction::where('Type', 'Income')
            ->whereBetween('TransactionDate', [$request->start_date, $request->end_date])
            ->sum('Amount');
        $expenses = FinancialTransaction::where('Type', 'Expense')
            ->whereBetween('TransactionDate', [$request->start_date, $request->end_date])
            ->sum('Amount');

        // Generate the financial statement
        $financialStatement = [
            'income' => $income,
            'expenses' => $expenses,
            'net_profit' => $income - $expenses,
        ];

        return response()->json($financialStatement);
    }
}

?>