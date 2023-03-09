@extends('layouts.app')

@section('stylesheet')
    <link rel="stylesheet" href="{{ asset('assets/maps/leaflet/leaflet.css') }}">
@endsection

@section('content')
    @include('layouts.navbar')
    <div id="mapzone">
        <div id="mapid">
            <!-- Map coordinate -->
            <div class="leaflet-control map-coordinate">
                <div class="coordinate"></div>
            </div>

        </div>
    </div>
@endsection

@section('scripts')

    <script src="{{ asset('assets/maps/leaflet/leaflet.js') }}"></script>
    <script>
        var base_path = '{{ url('/') }}/';
        // var greenIcon = new L.Icon({
        //     iconUrl: '{{ asset("assets/maps/leaflet/colorMarkers/img/marker-icon-2x-green.png") }}',
        //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        //     iconSize: [25, 41],
        //     iconAnchor: [12, 41],
        //     popupAnchor: [1, -34],
        //     shadowSize: [41, 41]
        // });

        // var redIcon = new L.Icon({
        //     iconUrl: '{{ asset("assets/maps/leaflet/colorMarkers/img/marker-icon-2x-red.png") }}',
        //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        //     iconSize: [25, 41],
        //     iconAnchor: [12, 41],
        //     popupAnchor: [1, -34],
        //     shadowSize: [41, 41]
        // });
    </script>
    <script src="{{ asset('assets/maps/map-base.js') }}"></script>
    <script src="{{ asset('assets/maps/web-GIS.js') }}"></script>

@endsection


