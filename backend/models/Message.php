<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['SenderID', 'ReceiverID', 'Content', 'Timestamp', 'Status'];
    // ... other properties and methods ...

    public function sender()
    {
        return $this->belongsTo(User::class, 'SenderID');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'ReceiverID');
    }
}

?>