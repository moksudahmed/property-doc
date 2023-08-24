<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    protected $fillable = ['UserID', 'Type', 'Amount', 'TransactionDate', 'Description'];

    // ... other properties and methods ...
    

    public function user()
    {
        return $this->belongsTo(User::class, 'UserID');
    }
}


?>