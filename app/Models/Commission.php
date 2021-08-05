<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commission extends Model
{
    public function scopeType($query,$type)
    {
        return $query->where('type', $type);
    }
    public function payment(){
        return $this->belongsTo(
            'App\Models\Payment',
            'order_id', #From
            'order_id', #To
        );
    }
}
