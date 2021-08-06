<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    // public function getPriceMoneyAttribute()
    // {
    //     return $this->price;
    // }
    // public function getPricettribute($value)
    // {
    //     return $value + 1000;
    // }
    // public function getPriceAttribute($price)
    // {
    //     return $this->attributes['price'] = sprintf('Rp. %s', number_format($price, 0, null, '.'));
    // }
    public function getMoneyAttribute()
    {
        return sprintf('Rp. %s', number_format(floatval($this->price), 0, null, '.'));
    }
    protected $appends = ['money'];
}
