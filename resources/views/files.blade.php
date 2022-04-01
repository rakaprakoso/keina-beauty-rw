<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Keina Beauty</title>
    <meta name="theme-color" content="#2a3f2b"/>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <div class="page-wrapper py-16">
        <div class="row">
            @foreach ($files as $file)
            <div class="col-lg-2">
                <div class="border my-4">
                    <img class="w-full h-auto" src={{'/storage//'.$file}} alt="">
                </div>            
            </div>
            @endforeach
        </div>
    </div>

    {{-- <script defer src="/js/app.js"></script> --}}
    {{-- <script defer src="{{ asset('js/app.js') }}"></script> --}}
</body>
</html>
