<?php

namespace App\Http\Controllers\Ecommerce;

use App\Models\Product;
use App\Models\Category;
use App\Models\Cart;
use App\Models\CartDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Response;
// use App\Traits\helper;

class CartController extends Controller
{
    // use helper;

    // public function __construct()
    // {
    //     parent::__construct();
    // }

    // public function home(){
    //     $products = Category::where('id',4)->limit(6)->first()->products;
    //     $latest_products = Product::orderBy('created_at', 'DESC')->limit(8)->get();
    //     $categories = Category::type('product_category')->get();
    //     //return $this->product_category;
    //     return view('page.home')
    //     ->with('products', $products)
    //     ->with('latest_products', $latest_products)
    //     ->with('categories', $categories);
    // }
    // public function shop(Request $request){
    //     if ($request->category) {
    //         $slug = $request->category;
    //         $products = Product::with('categories')
    //                     ->whereHas('categories', function($query) use($slug) {
    //                         $query->where('slug', $slug);
    //                     })->paginate(12);
    //     }else{
    //         $products = Product::paginate(12);
    //     }
    //     return view('page.eCommerce.shop')
    //     ->with('products', $products);
    // }
    // public function product($slug){
    //     $product = Product::where('slug',$slug)->first();
    //     $related_products = Product::inRandomOrder()->limit(4)->get();
    //     return view('page.eCommerce.product')
    //     ->with('related_products', $related_products)
    //     ->with('product', $product);
    // }
    public function cart(Request $request){
        $data = $this->listCart();
        return response()->json($data, 200);

        return view('page.eCommerce.cart')
        ->with('cart', $data['cart'])
        ->with('price', $data['price'])
        ->with('cartSession', $data['cartSession']);
    }

    public function toCheckout(Request $request){
        // return response()->json($request);

        return redirect("/checkout")->with($request->all());
    }



    // public function payment($slug){
    //     $products = Product::where('slug',$slug)->get();
    //     return view('page.eCommerce.payment')
    //     ->with('products', $products);
    // }
    // public function checkout(){
    //     $data = $this->listCart('selected');
    //     return view('page.eCommerce.checkout')
    //     ->with('cart', $data['cart'])
    //     ->with('price', $data['price'])
    //     ->with('cartSession', $data['cartSession']);
    // }
    private function listCart($selected=null){
        $data['cartSession']=null;
        $data['price']['normal_price']=0;
        $data['price']['discount_price']=0;
        $data['price']['net_price']=0;
        $data['weight']=0;
        $data['qtyTotal']=0;

        if (Auth::guard('user')->check() || Auth::viaRemember()) {
            $data['cart'] = Cart::where('user_id',Auth::guard('user')->user()->id)->first();
            if ($selected!==null) {
                $data['cart'] = CartDetail::where('cart_id',$data['cart']->id)
                ->where('selected',1)->get();
            }else{
                $data['cart'] = $data['cart']!=null ? $data['cart']->cart_detail : null;
            }
            if ($data['cart']!==null) {
                foreach ($data['cart'] as $key => $value) {
                    if ($value->selected==1) {
                        // $data['price']['normal_price']+=$this->markupPrice($value->product->price)*$value->qty;
                        $data['price']['normal_price']+=$value->product->price*$value->qty;
                        //$data['price']['discount_price']+=$value->product->price*$value->qty;
                        // $data['price']['net_price']+=$this->markupPrice($value->product->price)*$value->qty;
                        $data['price']['net_price']+=$value->product->price*$value->qty;
                    }
                }
            }

        }elseif(\Cookie::get('cart') !== null){
            $product_id=[];
            $data['cartSession'] = json_decode(request()->cookie('cart'), true);
            if (count($data['cartSession'])>0) {
                // array_splice($cart, 62, 1);

                // return ($data['cartSession'][62]);
                // return $data['cartSession'];
                foreach ($data['cartSession'] as $key => $value) {
                    $product_id[$key]=$value['product_id'];
                }
                $data['cart'] = Product::whereIn('id',$product_id)->get();

                foreach ($data['cart'] as $key => $value) {
                    $data['price']['normal_price']+=$value->price*$data['cartSession'][$value->id]['qty'];
                    //$data['price']['discount_price']+=$value->price*$data['cartSession'][$value->id]['qty'];
                    $data['price']['net_price']+=$value->price*$data['cartSession'][$value->id]['qty'];
                    $data['weight']+=$value->weight*$data['cartSession'][$value->id]['qty'];
                    $data['qtyTotal']+=$data['cartSession'][$value->id]['qty'];
                }
                $data['cartSession'] = $data['cartSession'];
            }else{
                $data['cart']=null;
            }
        }else{
            $data['cart']=null;
        }

        return $data;
    }

}
