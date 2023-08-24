<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = ['Title', 'Description', 'Type', 'Location', 'Price', 'LandlordID', 'AgentID'];
    // ... other properties and methods ...

    public function rentalAgreements()
    {
        return $this->hasMany(RentalAgreement::class, 'PropertyID');
    }

    public function repairs()
    {
        return $this->hasMany(Repair::class, 'PropertyID');
    }

    public function landlord()
    {
        return $this->belongsTo(User::class, 'LandlordID');
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'AgentID');
    }
}

?>