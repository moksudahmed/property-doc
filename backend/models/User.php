<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['FirstName', 'LastName', 'Email', 'Password', 'Role'];
    // ... other properties and methods ...

    public function rentalAgreements()
    {
        return $this->hasMany(RentalAgreement::class, 'TenantID');
    }

    public function properties()
    {
        return $this->hasMany(Property::class, 'LandlordID');
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'SenderID');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'ReceiverID');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'UserID');
    }

    public function financialTransactions()
    {
        return $this->hasMany(FinancialTransaction::class, 'UserID');
    }
}

?>