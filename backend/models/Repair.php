<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    protected $fillable = ['PropertyID', 'TechnicianID', 'Description', 'ScheduledDate', 'CompletionDate', 'Status'];
    // ... other properties and methods ...

    public function property()
    {
        return $this->belongsTo(Property::class, 'PropertyID');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'TechnicianID');
    }
}

?>