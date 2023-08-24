<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['UserID', 'Content', 'Timestamp', 'Type'];

    // ... other properties and methods ...

    public function user()
    {
        return $this->belongsTo(User::class, 'UserID');
    }
}

?>