<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class RentalAgreement extends Model
{
    protected $fillable = ['TenantID', 'PropertyID', 'LeaseDuration', 'RentAmount', 'MoveInDate', 'Status'];
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