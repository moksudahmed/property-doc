<?php
namespace App\Helpers;

class ApiResponse
{
    public static function success($data = null, $message = null)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ]);
    }

    public static function error($message = null, $statusCode = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $statusCode);
    }
}
