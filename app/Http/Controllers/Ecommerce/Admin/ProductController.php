<?php

namespace App\Http\Controllers\Ecommerce\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
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

            $products = Product::paginate(12);
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
        $responseMessage = '';
        try {
            $product = $this->sendData($request);
            // $coupon = new CouponCode;
            // $coupon->code = $request->code;
            // $coupon->percent = $request->percent;
            // $coupon->amount = $request->amount;
            // $coupon->coupon_type = $request->coupon_type;
            // $coupon->save();

            $responseMessage = 'Product Saved';
            return $this->responseSuccess($responseMessage, $product);
        } catch (\Throwable $th) {
            $responseMessage = 'Product Fail!';
            return $this->responseFail($responseMessage, null);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $product = Product::find($id);
        $product['imagesArr'] = $product->images->pluck('image_path');

        return response()
            ->json($product);
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
        $responseMessage = '';
        try {
            $product = $this->sendData($request, $id);

            $responseMessage = 'Product Saved';
            return $this->responseSuccess($responseMessage, $product);
        } catch (\Throwable $th) {
            $responseMessage = 'Product Fail!';
            return $this->responseFail($responseMessage, null);
        }
        // return redirect('/admin/product');
        // return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Product::destroy($id);
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
        $product = $id == null ? new Product : Product::find($id);

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
