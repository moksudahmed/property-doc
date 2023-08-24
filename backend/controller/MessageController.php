<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function create(Request $request)
    {
        // Validate input data
        $validatedData = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        // Create a new message
        $message = new Message($validatedData);
        $message->save();

        return response()->json(['message' => 'Message created successfully']);
    }

    public function index()
    {
        // Get all messages
        $messages = Message::all();

        return response()->json($messages);
    }

    public function show($id)
    {
        // Find the message
        $message = Message::findOrFail($id);

        // Authorize the action
        $this->authorize('view', $message);

        return response()->json($message);
    }

    public function update(Request $request, $id)
    {
        // Find the message
        $message = Message::findOrFail($id);

        // Authorize the action
        $this->authorize('update', $message);

        // Validate input data
        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);

        // Update the message
        $message->update($validatedData);

        return response()->json(['message' => 'Message updated successfully']);
    }

    public function destroy($id)
    {
        // Find the message
        $message = Message::findOrFail($id);

        // Authorize the action
        $this->authorize('delete', $message);

        // Delete the message
        $message->delete();

        return response()->json(['message' => 'Message deleted successfully']);
    }
}
