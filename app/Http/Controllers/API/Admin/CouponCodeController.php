<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\CouponCode;
use Illuminate\Http\Request;

class CouponCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $couponCode = CouponCode::paginate(12);
        return $this->responseSuccess("Coupon Code Get Sucessfully", $couponCode);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $responseMessage = '';
        try {
            $coupon = $this->submitData($request);
            // $coupon = new CouponCode;
            // $coupon->code = $request->code;
            // $coupon->percent = $request->percent;
            // $coupon->amount = $request->amount;
            // $coupon->coupon_type = $request->coupon_type;
            // $coupon->save();

            $responseMessage = 'Coupon Saved';
            return $this->responseSuccess($responseMessage, $coupon);
        } catch (\Throwable $th) {
            $responseMessage = 'Coupon Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $responseMessage = '';
        try {
            $coupon = CouponCode::find($id);
            $responseMessage = 'Coupon Get';
            return $this->responseSuccess($responseMessage, $coupon);
            // return response()->json($id);
        } catch (\Throwable $th) {
            $responseMessage = 'Coupon Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $responseMessage = '';
        try {
            $coupon = $this->submitData($request,$id);

            $responseMessage = 'Coupon Updated';
            return $this->responseSuccess($responseMessage, $coupon);
        } catch (\Throwable $th) {
            $responseMessage = 'Coupon Update Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function submitData($request, $id = null)
    {
        $coupon = $id ? CouponCode::find($id) : new CouponCode;
        $coupon->code = $request->code;
        $coupon->percent = $request->percent;
        $coupon->amount = $request->amount;
        $coupon->coupon_type = $request->coupon_type;
        $coupon->save();

        return $coupon;
    }
}
