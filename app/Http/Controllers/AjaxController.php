<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use Cookie;

use App\Models\Admin;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartDetail;
use Auth;
// use App\Traits\helper;

class AjaxController extends Controller
{
    // use helper;

    public function dateFormat(Request $request)
    {
        $format = $request->format;
        $date = date_create();
        $date = date_format($date, $format);
        return Response::json($date);
    }
    public function coupon(Request $request)
    {
        $coupon_code = $request->coupon_code;
        $product = $request->product_id;
        $qty = $request->qty;
        $selected = $request->selected;
        //explode(',', $myString)
        //return response::json($product);

        $price['normal_price'] = 0;
        $price['discount_price'] = 0;
        $price['net_price'] = 0;

        $coupon_applied = Admin::where('sales_code', $coupon_code)->first();
        if ($coupon_applied != null) {
            $discount_amount;
            if ($coupon_applied->sales_level <= 2) {
                $discount_amount = 10;
            } else {
                $discount_amount = 5;
            }
            return $this->updateCartTotal($request, $discount_amount);
        } else {
            return $this->updateCartTotal($request, 0);
            $response['status'] = 'fail';
            $response['message'] = 'Coupon Not Found!';
            return Response::json($response);
        }
    }
    public function couponCheckout(Request $request)
    {
        $coupon_code = $request->coupon_code;
        $product =  explode(',', $request->product_id);
        $qty = $request->qty;
        $selected = $request->selected;

        return response::json($product);
        $price['normal_price'] = 0;
        $price['discount_price'] = 0;
        $price['net_price'] = 0;

        $coupon_applied = Admin::where('sales_code', $coupon_code)->first();
        if ($coupon_applied != null) {
            $discount_amount;
            if ($coupon_applied->sales_level <= 2) {
                $discount_amount = 10;
            } else {
                $discount_amount = 5;
            }
            return $this->updateCartTotal($request, $discount_amount);
        } else {
            return $this->updateCartTotal($request, 0);
            $response['status'] = 'fail';
            $response['message'] = 'Coupon Not Found!';
            return Response::json($response);
        }
    }
    public function addToCart(Request $request)
    {
        $this->validate($request, [
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer'
        ]);

        if (Auth::guard('user')->check() || Auth::viaRemember()) {
            $cart = Cart::where('user_id', Auth::guard('user')->user()->id)->first();
            if ($cart != null) {
                $cartDetail = CartDetail::where('cart_id', $cart->id)
                    ->where('product_id', $request->product_id)->first();
                $cartDetail = $cartDetail == null ? new CartDetail : CartDetail::find($cartDetail->id);
                $currentQty = $cartDetail == null ? 0 : $cartDetail->qty;
                $cartDetail->qty = $currentQty + $request->qty;
                $cartDetail->cart_id = $cart->id;
                $cartDetail->product_id = $request->product_id;
                $cartDetail->save();
            } else {
                $cart = new Cart;
                $cart->user_id = Auth::guard('user')->user()->id;
                $cart->save();
                $cartDetail = new CartDetail;
                $cartDetail->cart_id = $cart->id;
                $cartDetail->product_id = $request->product_id;
                $cartDetail->qty = $request->qty;
                $cartDetail->save();
            }
            $message = "Product Added!";
            return Response::json($message);
        } else {
            // $message['status']="login";
            // $message['url']=route('user.login', ['nextURL' => url()->previous()]);;
            // return Response::json($message);

            $cart = json_decode($request->cookie('cart'), true);
            if ($cart && array_key_exists($request->product_id, $cart)) {
                $cart[$request->product_id]['qty'] += $request->qty;
            } else {
                $product = Product::find($request->product_id);
                $cart[$request->product_id] = [
                    'qty' => $request->qty,
                    'product_id' => $product->id,
                ];
            }
            $cookie = cookie('cart', json_encode($cart), 60 * 24 * 5);
            $message = "Product Added to Cookie!";
            return Response::json(["data" => $message])->cookie($cookie);
        }
    }
    public function deleteCart(Request $request)
    {
        $this->validate($request, [
            'product_id' => 'required|exists:products,id',
        ]);


            // $message['status']="login";
            // $message['url']=route('user.login', ['nextURL' => url()->previous()]);;
            // return Response::json($message);

            $cart = json_decode($request->cookie('cart'), true);
            if ($cart && array_key_exists($request->product_id, $cart)) {
                // array_splice($cart, $request->product_id, 1);
                unset($cart[$request->product_id]);
            }
            $cookie = cookie('cart', json_encode($cart), 60 * 24 * 5);
            $message = "Product Added to Cookie!";
            return redirect('/api/cart')->cookie($cookie);
            return Response::json(["data" => $message])->cookie($cookie);
    }

    public function cartToCheckout(Request $request)
    {
        // $this->validate($request, [
        //     'product_id' => 'required|exists:products,id',
        //     'qty' => 'required|integer'
        // ]);

        if (Auth::guard('user')->check() || Auth::viaRemember()) {
            $cart = Cart::where('user_id', Auth::guard('user')->user()->id)->first();
            if ($cart != null) {
                $cartDetail = CartDetail::where('cart_id', $cart->id)
                    ->where('product_id', $request->product_id)->first();
                $cartDetail = $cartDetail == null ? new CartDetail : CartDetail::find($cartDetail->id);
                $currentQty = $cartDetail == null ? 0 : $cartDetail->qty;
                $cartDetail->qty = $currentQty + $request->qty;
                $cartDetail->cart_id = $cart->id;
                $cartDetail->product_id = $request->product_id;
                $cartDetail->save();
            } else {
                $cart = new Cart;
                $cart->user_id = Auth::guard('user')->user()->id;
                $cart->save();
                $cartDetail = new CartDetail;
                $cartDetail->cart_id = $cart->id;
                $cartDetail->product_id = $request->product_id;
                $cartDetail->qty = $request->qty;
                $cartDetail->save();
            }
            $message = "Product Added!";
            return Response::json($message);
        } else {

            $cart = json_decode($request->cookie('cart'), true);
            // return Response::json($cart);
            // return Response::json($request->all());
            foreach ($request->product_id as $key => $value) {
                $cart[$value]['qty'] = $request->qty[$key];
                // if ($cart && array_key_exists($request->product_id, $cart)) {
                // }
                // else {
                //     $product = Product::find($request->product_id);
                //     $cart[$request->product_id] = [
                //         'qty' => $request->qty,
                //         'product_id' => $product->id,
                //     ];
                // }
            }
            // return Response::json()
            $cookie = cookie('cart', json_encode($cart), 60 * 24 * 5);
            // $message="Product Added to Cookie!";
            // return Response::json($cart)->cookie($cookie);
            return redirect('/checkout')->cookie($cookie);
        }
    }


    public function updateCart(Request $request)
    {
        return $this->updateCartTotal($request);
    }

    private function updateCartTotal($request, $coupon = null)
    {
        $product = $request->product_id;
        $qty = $request->qty;
        $selected = $request->selected;

        $price['normal_price'] = 0;
        $price['discount_price'] = 0;
        $price['net_price'] = 0;
        $total_qty = 0;

        if (Auth::guard('user')->check() || Auth::viaRemember()) {

            #AUTH

            $cart = Cart::where('user_id', Auth::guard('user')->user()->id)->first();
            $cartDetail = CartDetail::where('cart_id', $cart->id)
                ->whereIn('product_id', $request->product_id)->get();

            foreach ($product as $key => $value) {
                $cartDetailRaw = CartDetail::where('cart_id', $cart->id)
                    ->where('product_id', $product[$key])->first();
                $cartDetailRaw = CartDetail::find($cartDetailRaw->id);
                $cartDetailRaw->qty = $request->qty[$key];
                $cartDetailRaw->selected = $selected[$key] == 'true' ? 1 : null;
                $cartDetailRaw->save();

                $price['product'][$key] = $this->markupPrice($cartDetailRaw->product->price) * $cartDetailRaw->qty;
                if ($selected[$key] == 'true') {
                    $price['normal_price'] += $price['product'][$key];
                    //$price['discount_price']+=$cartDetailRaw->product->price*$cartDetailRaw->qty;
                    $price['net_price'] += $this->markupPrice($cartDetailRaw->product->price) * $cartDetailRaw->qty;
                    $total_qty += $cartDetailRaw->qty;
                }
            }
            if ($coupon !== null && $coupon != 0) {
                $price['normal_price'] = $price['normal_price'];
                $price['discount_price'] = $total_qty * $this->shop_config['markup_price'];
                $price['net_price'] = $price['normal_price'] - $price['discount_price'];
            } elseif ($coupon == 0) {
                $price['status'] = 'fail';
                $price['message'] = 'Coupon Not Found!';
            }
            return Response::json($price);
        } else {

            #Session

            $product_id = [];
            $cartSession = json_decode(request()->cookie('cart'), true);
            foreach ($cartSession as $key => $value) {
                $product_id[$key] = $value['product_id'];
            }
            $cart = Product::whereIn('id', $product_id)->get();

            foreach ($product as $key => $value) {
                //Update data qty session
                $cartDetailRaw = Product::where('id', $value)->first();
                $cartSession[$value]['qty'] = $request->qty[$key];

                $price['product'][$key] = $this->markupPrice($cartDetailRaw->price) * $cartSession[$value]['qty'];
                if ($selected[$key] == 'true') {
                    $cartSession[$value]['selected'] = 1;
                    $price['normal_price'] += $price['product'][$key];
                    //$price['discount_price']+=$cartDetailRaw->product->price*$cartDetailRaw->qty;
                    $price['net_price'] += $this->markupPrice($cartDetailRaw->product->price) * $cartDetailRaw->qty;
                    $total_qty += $cartDetailRaw->qty;
                }

                /*$price['product'][$key]=$cartDetailRaw->price*$cartSession[$value]['qty'];
                if ($selected[$key]=='true') {

                    $price['normal_price']+=$price['product'][$key];
                    //$price['discount_price']+=$cartDetailRaw->price*$cartSession[$value]['qty'];
                    $price['net_price']+=$cartDetailRaw->price*$cartSession[$value]['qty'];
                }*/
            }
            if ($coupon !== null && $coupon != 0) {
                $price['normal_price'] = $price['normal_price'];
                $price['discount_price'] = $coupon / 100 * $price['normal_price'];
                $price['net_price'] = (100 - $coupon) / 100 * $price['net_price'];
            } elseif ($coupon == 0) {
                $price['status'] = 'fail';
                $price['message'] = 'Coupon Not Found!';
            }
            $cookie = cookie('cart', json_encode($cartSession), 60 * 24 * 5);
            return Response::json($price)->cookie($cookie);
        }
    }
    public function rajaongkir(Request $request)
    {
        $config['origin'] = 94; // Buleleng
        $config['weight'] = $request->weight; // Buleleng
        // $config['weight'] = 700; // Buleleng
        $config['courier'] = 'jne'; // Buleleng
        // $config['courier'] = 'jne'; // Buleleng


        $baseUrl = "https://api.rajaongkir.com/starter/";
        $completedUrl = null;
        if ($request->type=='cost') {
            // $parameter = $request->parameter ?
            // "?"
            // .'destination='.$request->parameter
            // .'&origin='.$config['origin']
            // .'&weight='.$config['weight']
            // .'&courier='.$config['courier']

            // : null;
            $completedUrl = $baseUrl.$request->type;
        }else{
            $parameter = $request->parameter ? "?".$request->parameter : null;
            $completedUrl = $baseUrl.$request->type.$parameter;
        }

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $completedUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $request->type=='cost' ? "POST" : "GET",
            CURLOPT_POSTFIELDS => "origin=".$config['origin']."&destination=".$request->destination."&weight=".$config['weight']."&courier=".$config['courier'],
            CURLOPT_HTTPHEADER => array(
                "content-type: application/x-www-form-urlencoded",
                "key: ".$request->key
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return $response;
            // return response::json($response);
        }

    }
}
