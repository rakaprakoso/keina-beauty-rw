<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Model;

class Admin extends Model
{
    protected $guarded = ['id'];
    protected $hidden = [
     'password', 'remember_token',
    ];
    public function getAuthPassword()
    {
     return $this->password;
    }
    public function role_name()
    {
        return $this->belongsTo(
            'App\Models\AdminRole',
            'role',
            'id',
        );
    }
    public function sales_level_name()
    {
        return $this->belongsTo(
            'App\Models\SalesLevel',
            'sales_level',
            'level',
        );
    }
    public function sales_parent_name()
    {
        return $this->belongsTo(
            'App\Models\Admin',
            'sales_parent',
            'id',
        );
    }
}
