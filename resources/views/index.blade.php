<!DOCTYPE html>
<html lang="id">

<head>
    @if (env('APP_ENV') != 'local')
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J8VX4J3HQC"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-J8VX4J3HQC');
        </script>
    @endif
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- <title>Keina Beauty</title> --}}
    <meta name="theme-color" content="#2a3f2b" />
    <link rel="stylesheet" href="{{ asset(mix('/css/app.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('/css/appClient.css')) }}">
    <link rel="shortcut icon" href="/assets/green-white.png" type="image/x-icon" />
    {!! SEO::generate() !!}
</head>

<body>
    <div id="root">
    </div>
    <noscript>Please Enable JavaScript to view the page!</noscript>
    @if (env('APP_ENV') != 'local')
        <!-- Histats.com  START  (aync)-->
        <script type="text/javascript">
            var _Hasync = _Hasync || [];
            _Hasync.push(['Histats.start', '1,4588782,4,0,0,0,00010000']);
            _Hasync.push(['Histats.fasi', '1']);
            _Hasync.push(['Histats.track_hits', '']);
            (function() {
                var hs = document.createElement('script');
                hs.type = 'text/javascript';
                hs.async = true;
                hs.src = ('//s10.histats.com/js15_as.js');
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
            })();
        </script>
        <noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?4588782&101" alt=""
                    border="0"></a></noscript>
        <!-- Histats.com  END  -->
    @endif

    {{-- <script src="{{ mix('/js/app.js') }}"></script> --}}
    {{-- <script src="{{ asset('/js/app.js') }}?ver={{ filemtime(public_path('/js/app.js')) }}"></script> --}}
    <script src="{{ asset(mix('/js/app.js')) }}"></script>
    {{-- <script defer src="{{ asset('js/app.js') }}"></script> --}}
</body>

</html>
