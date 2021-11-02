<?php

namespace App\Http\Controllers\Ecommerce\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public $key = 'koderahasia';

    private function authServer($req_key)
    {
        return $this->key == $req_key ? true : false;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($this->authServer($request->key)) { // return $request->full;
            $products = Order::paginate(12);
            return response()
                ->json($products);
            // ->json(["data"=>$products]);
        }
        return response()->json(null);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $product = new Product;

        // $product->name = $request->name;
        // $product->price = $request->price;
        // $product->weight = $request->weight;
        // $product->short_description = $request->short_description;
        // $product->description = $request->description;
        // $product->slug = $this->slugify($request->name);

        // $uploadedFile = $request->file('image');
        // $path = $uploadedFile->store('public/products');
        // $product->thumbnail_img = Storage::url($path);

        // $product->save();

        $product = $this->sendData($request);
        return redirect('/admin/product');

        return response()->json($product);
        // return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $order = Order::find($id);
        $order['normal_price'] = 0;
        $order['discount_price'] = 0;
        $order['net_price'] = 0;
        foreach ($order->order_details as $key => $value) {
            $order['normal_price'] += $value->price * $value->qty;
            $order['net_price'] += $value->price * $value->qty;
        }
        // $order['imagesArr'] = $order->images->pluck('image_path');

        return response()
            ->json($order);
        if ($this->authServer($request->key)) {
        }
        return response()->json(null);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        // return $request->all();
        $product = $this->sendData($request, $id);
        return redirect('/admin/product');
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Order::destroy($id);
        return redirect('/admin/product');
        return response()->json(['message' => 'Data deleted successfully']);
    }

    private function slugify($text, string $divider = '-')
    {
        // replace non letter or digits by divider
        $text = preg_replace('~[^\pL\d]+~u', $divider, $text);

        // transliterate
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

        // remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);

        // trim
        $text = trim($text, $divider);

        // remove duplicate divider
        $text = preg_replace('~-+~', $divider, $text);

        // lowercase
        $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }

    private function sendData($request, $id = null)
    {
        $product = $id == null ? new Order : Order::find($id);

        $product->name = $request->name;
        $product->price = $request->price;
        $product->discount_price = $request->discount_price;
        $product->weight = $request->weight;
        $product->short_description = $request->short_description;
        $product->description = $request->description;
        $product->slug = $this->slugify($request->name);
        $product->thumbnail_img = $request->image;
        // if ($request->file('image')) {
        //     $uploadedFile = $request->file('image');
        //     $path = $uploadedFile->store('public/products');
        //     $product->thumbnail_img = Storage::url($path);
        // }
        $tempImg = explode(',', $request->imageGallery);
        $imageGallery = [];
        foreach ($tempImg as $key => $value) {
            $imageGallery[$key] = ['image_path' => $value];
        }

        $product->save();

        $product->images()->delete();
        $product->images()->createMany($imageGallery);

        return $product;
    }
}
