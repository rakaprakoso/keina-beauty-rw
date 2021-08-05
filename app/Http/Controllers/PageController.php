<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Artesaos\SEOTools\Facades\SEOTools;
class PageController extends Controller
{
    public function home(){
        return view('home');
    }
    public function index(){
        SEOTools::setTitle('Keina Beauty - Perfect Nutrition for Beautiful Skin');
        SEOTools::setDescription('Keina memiliki arti cahaya matahari, berkah dan menurut Bahasa Jepang, Keina identik dengan kesegaran alam dan kehijauan. Bermula dari pengertian sederhana, kami memiliki harapan tinggi bahwa nutrisi yang terkandung dalam produk skincare Keina Beauty dapat menjadi cahaya matahari bagi mereka yang ingin memiliki kulit sehat, cantik dan terawat.');
        SEOTools::opengraph()->setUrl('https://keinabeauty.com/');
        SEOTools::setCanonical('https://keinabeauty.com/shop');
        SEOTools::opengraph()->addProperty('type', 'Homepage');
        // SEOTools::twitter()->setSite('@LuizVinicius73');
        SEOTools::jsonLd()->addImage('https://keinabeauty.com/assets/green-white.png');

        return view('index');
    }
}
