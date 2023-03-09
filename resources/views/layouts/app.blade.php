<!doctype html>
<html lang="fr">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="DJATIO Stephane, GIS developper and GIS analyst">
    <meta name="generator" content="Hugo 0.84.0">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Elections Gabon</title>
        @include('layouts.header')
        @yield('stylesheet')
    </head>
    <body>
        @yield('content')
        @include('layouts.footer')
        @yield('scripts')
    </body>
</html>
