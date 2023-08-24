<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RentalAgreementController;
use App\Http\Controllers\MaintenanceRequestController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\FinancialTransactionController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ReportController;

// Public Routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

// Protected Routes (Requires authentication)
Route::middleware(['auth'])->group(function () {
    // User Management
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::put('/user/update', [UserController::class, 'update']);
    Route::delete('/user/delete', [UserController::class, 'delete']);

    // Property Management
    Route::get('/properties', [PropertyController::class, 'index']);
    Route::get('/properties/{id}', [PropertyController::class, 'show']);
    Route::post('/properties', [PropertyController::class, 'store']);
    Route::put('/properties/{id}', [PropertyController::class, 'update']);
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);

    // Rental Agreements
    Route::get('/rental-agreements', [RentalAgreementController::class, 'index']);
    Route::get('/rental-agreements/{id}', [RentalAgreementController::class, 'show']);
    Route::post('/rental-agreements', [RentalAgreementController::class, 'store']);
    Route::put('/rental-agreements/{id}', [RentalAgreementController::class, 'update']);
    Route::delete('/rental-agreements/{id}', [RentalAgreementController::class, 'destroy']);

    // Maintenance Requests
    Route::get('/maintenance-requests', [MaintenanceRequestController::class, 'index']);
    Route::get('/maintenance-requests/{id}', [MaintenanceRequestController::class, 'show']);
    Route::post('/maintenance-requests', [MaintenanceRequestController::class, 'store']);
    Route::put('/maintenance-requests/{id}', [MaintenanceRequestController::class, 'update']);
    Route::delete('/maintenance-requests/{id}', [MaintenanceRequestController::class, 'destroy']);

    // Repairs
    Route::get('/repairs', [RepairController::class, 'index']);
    Route::get('/repairs/{id}', [RepairController::class, 'show']);
    Route::post('/repairs', [RepairController::class, 'store']);
    Route::put('/repairs/{id}', [RepairController::class, 'update']);
    Route::delete('/repairs/{id}', [RepairController::class, 'destroy']);

    // Financial Transactions
    Route::get('/financial-transactions', [FinancialTransactionController::class, 'index']);
    Route::get('/financial-transactions/{id}', [FinancialTransactionController::class, 'show']);
    Route::post('/financial-transactions', [FinancialTransactionController::class, 'store']);
    Route::put('/financial-transactions/{id}', [FinancialTransactionController::class, 'update']);
    Route::delete('/financial-transactions/{id}', [FinancialTransactionController::class, 'destroy']);

    // Messaging
    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/{id}', [NotificationController::class, 'show']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::put('/notifications/{id}', [NotificationController::class, 'update']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Search
    Route::get('/search', [SearchController::class, 'search']);

    // Reports
    Route::get('/reports/vacancy', [ReportController::class, 'generateVacancyReport']);
    Route::get('/reports/financial', [ReportController::class, 'generateFinancialStatement']);
});

?>