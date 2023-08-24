<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $fillable = ['TenantID', 'PropertyID', 'Description', 'RequestDate', 'Status'];
    // ... other properties and methods ...

    public function tenant()
    {
        return $this->belongsTo(User::class, 'TenantID');
    }

    public function property()
    {
        return $this->belongsTo(Property::class, 'PropertyID');
    }
}

?>