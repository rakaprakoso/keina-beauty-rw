<?php

namespace App\Http\Controllers\eCommerce;

use App\Models\Product;
use App\Models\Admin;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use App\Models\Commission;
use Illuminate\Http\Request;
// use App\Http\Controllers\GlobalDataController;
use Auth;
use Response;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Mail\OrderStatus;
use App\Models\CouponCode;
use Illuminate\Support\Facades\Mail;

// use App\Traits\helper;

class OrderController extends Controller
{
    // use helper;
    // private $isProduction = false;
    private $serverKeyStag = 'SB-Mid-server-aDUksiK8anqGB73nM5h6RkKL';
    private $serverKeyProd = 'Mid-server-2yXVsrXPgDOQwmqHlWsSOmDf';
    // Set sanitization on (default)
    private $isSanitized = true;
    // Set 3DS transaction for credit card to true
    private $is3ds = true;

    private function isProduction()
    {
        return config('app.env') == 'prod' ? true : false;
    }
    private function printShipping($destination, $weight, $shipping_method)
    {
        // $baseUrl = "https://api.rajaongkir.com/starter/city?id=".$id;

        // $curl = curl_init();

        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => $baseUrl,
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => "",
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 30,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => "GET",
        //     CURLOPT_HTTPHEADER => array(
        //         "key: d534c6602dfaa12be7ad3b514305eb0a"
        //     ),
        // ));

        $config['origin'] = 114; // Buleleng
        $config['weight'] = $weight; // Buleleng
        // $config['weight'] = 700; // Buleleng
        $config['courier'] = 'jne'; // Buleleng
        // $config['courier'] = 'jne'; // Buleleng
        $config['freeongkir'] = [1];


        $baseUrl = "https://api.rajaongkir.com/starter/cost";
        $completedUrl = null;
        $completedUrl = $baseUrl;

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $completedUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "origin=" . $config['origin'] . "&destination=" . $destination . "&weight=" . $config['weight'] . "&courier=" . $config['courier'],
            CURLOPT_HTTPHEADER => array(
                "content-type: application/x-www-form-urlencoded",
                "key: d534c6602dfaa12be7ad3b514305eb0a",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        // return $response;
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            // return $response;
            $rawData = json_decode(trim($response), true)['rajaongkir'];
            $data['address'] = $rawData['destination_details']['province'] . ' - ' . $rawData['destination_details']['type'] . ' ' . $rawData['destination_details']['city_name'];
            //  $rawData = json_decode(trim($response), true)['rajaongkir']['results'][0];
            //  return $rawData;
            if ($shipping_method == 'freeongkir' && in_array($rawData['destination_details']['province_id'], $config['freeongkir'])) {
                $data['cost'] = 0;
                return $data;
            } else {
                foreach ($rawData['results'][0]['costs'] as $key => $value) {
                    if ($value['service'] == $shipping_method) {
                        $data['cost'] = $value['cost'][0]['value'];
                        return $data;
                        break;
                    }
                }
            }
            return false;
            //$data['cost'] =
            // return json_encode($response);
            // return response::json($response);
        }
    }

    private function couponCalculate($code)
    {
        $CouponCode = CouponCode::where('code', $code)->first();
        if (!$CouponCode) {
            $CouponCode['amount'] = 0;
        }
        if (isset($CouponCode->percent)) {
            $CouponCode->type = 'percent';
            $CouponCode->amount = $CouponCode->percent;
        }
        return $CouponCode;
    }

    public function checkout(Request $request)
    {

        // return $request->shipping_method;
        if (!$this->printShipping($request->city_id, $request->weight, $request->shipping_method)) {
            return "Shipping Method Error";
        }
        // return $request->all();
        // return $this->printShipping($request->city_id, 500, $request->shipping_method);

        //$customer = Customer::where('email', $request->email)->first();
        //return $request;


        // if (!Auth::guard('user')->check()) {
        //     //MAKA REDIRECT DAN TAMPILKAN INSTRUKSI UNTUK LOGIN
        //     return redirect()->back()->with(['error' => 'Silahkan Login Terlebih Dahulu']);
        // }

        $data['price']['normal_price'] = 0;
        $data['price']['discount_price'] = 0;
        $data['price']['coupon'] = 0;
        $data['price']['net_price'] = 0;
        $data['total_qty'] = 0;
        $data['weight'] = 0;
        $items = [];
        /*$data['cart'] = Cart::where('user_id',Auth::guard('user')->user()->id)->first();
        $data['cart'] = $data['cart']!=null ? $data['cart']->cart_detail : null;
        if ($data['cart']!=null) {
            foreach ($data['cart'] as $key => $value) {
                if ($value->selected==1) {
                    $data['price']['normal_price']+=$value->product->price*$value->qty;
                    //$data['price']['discount_price']+=$value->product->price*$value->qty;
                    $data['price']['net_price']+=$value->product->price*$value->qty;
                }
            }
        }
        return $data['cart'];*/
        $discount_amount = 0;
        $coupon_applied = Admin::where('sales_code', $request->coupon_code)->first();
        if ($coupon_applied !== null) {
            $discount_amount;
            if ($coupon_applied->sales_level <= 2) {
                $discount_amount = 10;
            } else {
                $discount_amount = 5;
            }
            //return $this->updateCartTotal($request,$discount_amount);
        }


        //SIMPAN DATA ORDER
        $order = new Order;
        // $order->user_id=Auth::guard('user')->user()->id;
        $order->order_id = 'KB-' . time();
        $order->order_date = Carbon::now()->toDateTimeString();
        $order->sales_id = $coupon_applied !== null ? $coupon_applied->id : null;

        //Keina Beauty
        $order->nameBuyer = $request->name;
        $order->phoneBuyer = $request->phone_number;
        $order->emailBuyer = $request->email;
        $order->addressBuyer = $request->address;
        $order->shippingMethod = $request->shipping_method;

        $order->save();

        //LOOPING DATA DI CARTS
        foreach ($request->product_id as $key => $product_id) {
            //AMBIL DATA PRODUK BERDASARKAN PRODUCT_ID
            $product = Product::find($product_id);
            //SIMPAN DETAIL ORDER
            $orderDetail = new OrderDetail;
            $orderDetail->order_id = $order->id;
            $orderDetail->product_id = $product->id;
            // $orderDetail->price=$this->markupPrice($product->price);
            $orderDetail->price = $product->discount_price ? $product->discount_price : $product->price;
            $orderDetail->qty = $request->qty[$key];
            $orderDetail->save();
            //$orderDetail->sales_code=$request->sales_code;

            $data['total_qty'] += $request->qty[$key];
            // $data['price']['normal_price']+=$this->markupPrice($product->price)*$request->qty[$key];
            $data['price']['normal_price'] += $product->price * $request->qty[$key];
            $data['price']['discount_price'] += empty($product->discount_price) ? 0 : ($product->price - $product->discount_price) * $orderDetail->qty;
            // $data['total_qty']*$this->shop_config['markup_price'];
            // $data['price']['net_price']= $data['price']['normal_price']-$data['price']['discount_price'];
            $data['weight'] += $product->weight * $request->qty[$key];

            $itemBarang = array(
                'id'                => $product_id,
                'price'         => $orderDetail->price,
                'quantity'  => $orderDetail->qty,
                'name'          => $product->name
            );
            array_push($items, $itemBarang);
        }
        $data['price']['net_price'] += $data['price']['normal_price'] - $data['price']['discount_price'];

        $shippingData = $this->printShipping($request->city_id, $data['weight'], $request->shipping_method);
        // return $shippingData;
        $order->shippingAddressBuyer = $shippingData['address'];
        $order->shipping_cost = $shippingData['cost'];
        $itemShippingCost = array(
            'id'                => 'shipcost',
            'price'         => $order->shipping_cost,
            'quantity'  => 1,
            'name'          => 'Shipping Cost'
        );
        array_push($items, $itemShippingCost);

        if ($request->couponcode) {
            $data['price']['coupon'] = $this->couponCalculate($request->couponcode);
            if ($data['price']['coupon']['amount'] > 0) {
                $order->couponcode = $request->couponcode;
                if ($data['price']['coupon']['type'] == 'percent') {
                    $order->couponamount = ($data['price']['coupon']['amount'] / 100) *  $data['price']['net_price'];
                } else {
                    $order->couponamount = $data['price']['coupon']['amount'];
                }
                $data['price']['net_price'] -= $data['price']['coupon']['amount'];
                $itemDiscount = array(
                    'id'                => 'disc',
                    'price'         => -$order->couponamount,
                    'quantity'  => 1,
                    'name'          => 'Discount Code : ' . $request->couponcode,
                );
                array_push($items, $itemDiscount);
            }
        }

        $order->save();

        //Commission
        // $data['parent']=[$coupon_applied->id];
        // //$data['account_id']=3;
        // $data['account_data'] = $coupon_applied;
        // $data['temp_parent_id'] = $data['account_data']->sales_parent;
        // $data['total_commission']= ($data['account_data']->sales_level_name->commission/100)*$data['price']['net_price'];
        // $data['parent_id']=[];
        // while ($data['temp_parent_id'] !== null) {
        //     $data['parent'] = Admin::where('id',$data['temp_parent_id'])->first();
        //     $data['parent_id'] = array_merge($data['parent_id'],array($data['parent']));
        //     $data['temp_parent_id'] =  $data['parent']->sales_parent;
        // }
        // if ($data['parent_id']!==null && $data['account_data']->sales_level==3) {
        //     $affiliate_commission_amount = ($data['account_data']->sales_level_name->affiliate_commission/100)*$data['total_commission'];
        //     $self_commission_amount = $data['total_commission']-$affiliate_commission_amount;
        // }else{
        //     $self_commission_amount = $data['total_commission'];
        // }
        // $self_commission = New Commission;
        // $self_commission->sales_id = $coupon_applied->id;
        // $self_commission->order_id = $order->order_id;
        // $self_commission->amount = $self_commission_amount;
        // $self_commission->type = 'self';
        // $self_commission->save();
        // if ($data['parent_id']!==null && $data['account_data']->sales_level==3) {
        //     foreach ($data['parent_id'] as $key => $value) {
        //         $affiliate_commission = New Commission;
        //         $affiliate_commission->sales_id = $value['id'];
        //         $affiliate_commission->order_id = $order->order_id;
        //         $affiliate_commission->amount = $affiliate_commission_amount/count($data['parent_id']);
        //         $affiliate_commission->type = 'affiliate';
        //         $affiliate_commission->save();
        //     }
        // }


        //return $data['parent_id'];

        //HAPUS CART DB
        // $cart= Cart::where('user_id',Auth::guard('user')->user()->id)->first();
        // CartDetail::where('cart_id',$cart->id)
        // ->whereIn('product_id',$request->product_id)->delete();


        \Midtrans\Config::$isProduction = $this->isProduction();
        \Midtrans\Config::$serverKey = $this->isProduction() ? $this->serverKeyProd : $this->serverKeyStag;
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        \Midtrans\Config::$is3ds = $this->is3ds;
        $shipping_address = array(
            'first_name'    => $request->name,
            'address'       => $order->addressBuyer . " - " . $order->shippingAddressBuyer,
        );
        $params = array(
            'transaction_details' => array(
                'order_id' =>  $order->order_id,
                'gross_amount' => $data['price']['net_price'] + $shippingData['cost'],
            ),
            'item_details'           => $items,
            'customer_details' => array(
                // 'first_name' => Auth::guard('user')->user()->name,
                // 'email' => Auth::guard('user')->user()->email,
                'first_name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone_number,
                'shipping_address' => $shipping_address,
            ),
        );

        try {
            // Get Snap Payment Page URL
            $midtrans_order = \Midtrans\Snap::createTransaction($params);

            $payment = new Payment;
            $payment->order_id = $order->order_id;
            $payment->midtrans_order_id = $midtrans_order->token;
            $payment->midtrans_transaction_id = $order->order_id;
            $payment->total_price = $data['price']['net_price'];
            $payment->shipping_price = $shippingData['cost'];

            $payment->save();

            $cookie = \Cookie::forget('cart');

            // Mail::to($request->email)->send(new OrderStatus($order, 1));

            return redirect($midtrans_order->redirect_url)->withCookie($cookie);
            // Redirect to Snap Payment Page
            header('Location: ' . $paymentUrl);
        } catch (Exception $e) {
            return Response::json($e->getMessage());
        }
        //$snapToken = \Midtrans\Snap::getSnapToken($params);

        return $snapToken;
    }
    public function index(Request $request)
    {
        if ($request->status_code == '200') {
            $ID = Order::where('order_id', $request->order_id)->first()->user_id;
        } else {
            $ID = Auth::guard('user')->user()->id;
        }
        $orders = Order::where('user_id', $ID)->orderBy('created_at', 'desc')->get();
        return view('page.eCommerce.order')->with('orders', $orders);
        return $orders;
    }
    public function notification(Request $request)
    {
        \Midtrans\Config::$isProduction = $this->isProduction();
        \Midtrans\Config::$serverKey = $this->isProduction() ? $this->serverKeyProd : $this->serverKeyStag;
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        \Midtrans\Config::$is3ds = $this->is3ds;

        $orderId = $request->order;
        $status = \Midtrans\Transaction::status($orderId);
        return Response::json($status);
        var_dump($status);
    }
    public function status(Request $request)
    {
        \Midtrans\Config::$isProduction = $this->isProduction();
        \Midtrans\Config::$serverKey = $this->isProduction() ? $this->serverKeyProd : $this->serverKeyStag;
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        \Midtrans\Config::$is3ds = $this->is3ds;

        $orderId = $request->order_id;
        $data['order'] = Order::where('order_id', $orderId)
            ->with('order_details.product')->first();

        if ($data['order'] !== null) {
            $data['normal_price'] = 0;
            $data['discount_price'] = 0;
            $data['net_price'] = 0;
            foreach ($data['order']->order_details as $key => $value) {
                $data['normal_price'] += $value->price * $value->qty;
                $data['net_price'] += $value->price * $value->qty;
            }
            if ($data['order']->sales_id !== null) {
                $data['net_price'] = $data['order']->payment->total_price;
                $data['discount_price'] = $data['normal_price'] - $data['net_price'];
            }

            // $data['link'] = "https://app." . $this->isProduction() ? "" : "sandbox" . ".midtrans.com/snap/v2/vtweb/" . $data['order']->payment->midtrans_order_id;
            $data['typelink'] = $this->isProduction() ? "" : "sandbox";
            // $data['rawlink'] = "https://app.".$data['typelink'].".midtrans.com/snap/v2/vtweb/".$data['order']->payment->midtrans_order_id;
            $data['link'] = "https://app." . $data['typelink'] . ".midtrans.com/snap/v2/vtweb/" . $data['order']->payment->midtrans_order_id;
            try {
                $data['status'] = \Midtrans\Transaction::status($orderId);
            } catch (\Exception $e) {
                // $data['link'] = "https://app." . $this->isProduction() ? "" : "sandbox" . ".midtrans.com/snap/v2/vtweb/" . $data['order']->payment->midtrans_order_id;
                $data['status'] = null;
                //return redirect($link);
                //return Response::json($e->getMessage());
            }

            return response()->json($data);
        } else {
            return response()->json(['status' => 'order not found'], 404);
        }

        return view('page.eCommerce.order_detail')
            ->with($data);
        //$order;
        //return Response::json($status);
        //var_dump($status);
    }

    public function postNotification()
    {
    }

    public function notificationAPI(Request $request)
    {
        $payment = Payment::where('order_id', $request->order_id)->first();
        $payment->status = $request->transaction_status;
        $payment->save();
        return $payment;

        //return "Halo";
        // Set your Merchant Server Key
        \Midtrans\Config::$isProduction = $this->isProduction();
        \Midtrans\Config::$serverKey = $this->isProduction() ? $this->serverKeyProd : $this->serverKeyStag;
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        \Midtrans\Config::$is3ds = $this->is3ds;

        $orderId = $request->order;
        $status = \Midtrans\Transaction::status($orderId);
        return Response::json($status);
        var_dump($status);
    }
    public function postNotificationAPI(Request $request)
    {
        $payment = Payment::where('order_id', $request->order_id)
            ->update(['status' => $request->transaction_status]);
        return $payment;
        // Set your Merchant Server Key
        \Midtrans\Config::$isProduction = $this->isProduction();
        \Midtrans\Config::$serverKey = $this->isProduction() ? $this->serverKeyProd : $this->serverKeyStag;
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        \Midtrans\Config::$is3ds = $this->is3ds;

        $orderId = $request->order;
        $status = \Midtrans\Transaction::status($orderId);
        return Response::json($status);
        var_dump($status);
    }

    public function finish()
    {
        echo "Order Finish";
    }
}
