<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $with =['order_details','payment'];
    protected $appends = ['totalPrice'];

    public function getTotalPriceAttribute()
    {
        return $this->order_details->sum(function($t){
            return $t->qty * $t->price;
        });
    }
    public function payment(){
        return $this->belongsTo(
            'App\Models\Payment',
            'order_id', #From
            'order_id', #To
        );
    }
    public function sales(){
        return $this->belongsTo(
            'App\Models\Admin',
            'sales_id', #From
            'id', #To
        );
    }
    public function order_details(){
        return $this->hasMany(
            'App\Models\OrderDetail',
            'order_id', #To
            'id', #From
        );
    }
}
