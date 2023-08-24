<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PropertyController;
use App\Http\Controllers\API\RentalAgreementController;
use App\Http\Controllers\API\MaintenanceRequestController;
use App\Http\Controllers\API\RepairController;
use App\Http\Controllers\API\FinancialTransactionController;
use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\SearchController;
use App\Http\Controllers\API\ReportController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes (require authentication)
Route::middleware('auth:api')->group(function () {
    // Authenticated user profile
    Route::get('/profile', [AuthController::class, 'profile']);
    
    // Properties
    Route::resource('properties', PropertyController::class);
    
    // Rental Agreements
    Route::resource('rental-agreements', RentalAgreementController::class);
    
    // Maintenance Requests
    Route::resource('maintenance-requests', MaintenanceRequestController::class);
    
    // Repairs
    Route::resource('repairs', RepairController::class);
    
    // Financial Transactions
    Route::resource('financial-transactions', FinancialTransactionController::class);
    
    // Messages
    Route::resource('messages', MessageController::class);
    
    // Notifications
    Route::resource('notifications', NotificationController::class);
    
    // Dashboard data
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Search
    Route::post('/search', [SearchController::class, 'search']);
    
    // Reports
    Route::get('/reports', [ReportController::class, 'index']);
    Route::get('/reports/{id}', [ReportController::class, 'show']);
});
