@extends('emails.template')
@if ($type == 1)
    @section('title')
        {{$subject}}
    @endsection
    @section('recipient')
        {{$orderData->nameBuyer}}
    @endsection
    @section('message')
        Order anda sudah terkonfirmasi dengan
        Order ID :
        <strong>{{ $orderData->order_id }}</strong><br>
        Silahkan lakukan pembayaran untuk melanjutkan proses selanjutnya.
    @endsection
    @section('url')
        "{{ config('app.url') }}/order?order_id={{ $orderData->order_id}}"
    @endsection
    @section('cta')
        Lihat Order
    @endsection
@endif
