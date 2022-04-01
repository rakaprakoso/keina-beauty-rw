<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CouponCode;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function postJoinCampaign(Request $request){
        // return response()->json($request->all());
        $campaign = new Campaign();
        $campaign->name = $request->name;
        $campaign->email = $request->email;
        $campaign->phone_number = $request->phone_number;
        if ($request->newsLetter) {
            $campaign->type = 'newsletter';
        }else {
            $campaign->type = 'campaign';
        }
        $campaign->save();

        return response()->json('success');
    }
    public function checkCouponCode(Request $request){
        $CouponCode = CouponCode::where('code', $request->couponcode)->first();
        if (!$CouponCode) {
            $CouponCode['amount'] = 0;
        }

        if ($CouponCode->percent) {
            $CouponCode->type = 'percent';
            $CouponCode->amount = $CouponCode->percent;
        }

        return response()->json($CouponCode);
    }
    public function dummyData(Request $request){
        // session()->push('key', 'value');
        $value = $request->session()->get('key');
        return response()->json($value);
    }
    public function setSession(Request $request){
        session()->push('key', 'value');
        return "session Set";
    }
}
