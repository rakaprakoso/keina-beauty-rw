<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Keina Beauty</title>
    <meta name="theme-color" content="#2a3f2b"/>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('/css/appAdmin.css') }}">
</head>
<body>
    <div id="root">
    </div>

    {{-- <script src="{{ mix('/js/admin/app.js') }}"></script> --}}
    <script src="{{ asset('/js/admin/app.js') }}?ver={{ filemtime(public_path('/js/admin/app.js')) }}"></script>
    {{-- <script defer src="/js/admin/app.js"></script> --}}
    {{-- <script defer src="{{ asset('js/app.js') }}"></script> --}}
</body>
</html>
