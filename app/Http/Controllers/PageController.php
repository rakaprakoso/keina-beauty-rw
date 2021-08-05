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
        SEOTools::setTitle('Home - Keina Beauty');
        SEOTools::setDescription('Home - Keina Beauty');
        SEOTools::opengraph()->setUrl('http://stag-keina.deprakoso.site');
        SEOTools::setCanonical('https://stag-keina.deprakoso.site/shop');
        SEOTools::opengraph()->addProperty('type', 'Homepage');
        // SEOTools::twitter()->setSite('@LuizVinicius73');
        SEOTools::jsonLd()->addImage('https://stag-keina.deprakoso.site/images/Logo%20Big.png?c56d7cfbdef0da94c0076c6a6aceca06');

        return view('index');
    }
}
