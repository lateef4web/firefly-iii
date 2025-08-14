@extends('layout.v2')

@section('scripts')
    @vite(['src/pages/exchange-rates/rates.js'])
@endsection

@section('content')
    <div class="app-content">
        <div class="container-fluid" id="exchange_rates_rates"></div>
    </div>
@endsection
