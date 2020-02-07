<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <!-- Scripts -->
    <script type="">
      window._sharedData   = {!!
        json_encode([
          "app"         => [
            "name"        => config('app.name'),
            "routes"      => collect(\Route::getRoutes())
                                ->mapWithKeys(function ($route) { return [$route->getName() => $route->uri()]; }),
            "baseUrl"     => url('/'),
            "rules"       => array_keys(config('app.rules')),
            "csrf"        => csrf_token()
          ]
        ])
      !!};
      </script>
    <script src="{{ mix('js/app.js') }}" defer></script>
  </body>
</html>
