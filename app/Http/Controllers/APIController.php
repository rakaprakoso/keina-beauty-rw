<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function postJoinCampaign(Request $request){
        $campaign = new Campaign();
        $campaign->name = $request->name;
        $campaign->email = $request->email;
        $campaign->phone_number = $request->phone_number;
        $campaign->save();

        return response()->json('success');
    }
}