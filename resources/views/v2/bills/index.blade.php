@extends('layout.v2')

@section('content')
    <div class="app-content">
        <div class="container-fluid">
            <x-messages></x-messages>
            <div class="row mb-3">
                <div class="col text-end">
                    <a href="{{ route('subscriptions.create') }}" class="btn btn-success">
                        <em class="fa-solid fa-plus fa-fw"></em> {{ __('firefly.create_new_bill') }}
                    </a>
                </div>
            </div>
            @if($total === 0)
                <div class="alert alert-info">{{ __('firefly.no_bills_for_repeating') }}</div>
            @else
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{ $title }}</h3>
                    </div>
                    <div class="card-body p-0">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>{{ trans('list.name') }}</th>
                                    <th class="text-end">{{ trans('list.matchingAmount') }}</th>
                                    <th class="text-end">{{ trans('list.next_expected_match') }}</th>
                                    <th>{{ trans('list.actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($bills as $bill)
                                    <tr>
                                        <td>
                                            @if(!$bill->active)
                                                <em class="fa fa-ban"></em>
                                            @endif
                                            <a href="{{ route('subscriptions.show', $bill->id) }}">{{ $bill->name }}</a>
                                        </td>
                                        <td class="text-end">
                                            {{ formatAmountBySymbol(($bill->amount_min + $bill->amount_max)/2, $bill->currency_symbol, $bill->currency_decimal_places) }}
                                        </td>
                                        <td class="text-end">
                                            @if(isset($bill->pay_dates[0]))
                                                {{ formatDate($bill->pay_dates[0], $monthAndDayFormat) }}
                                            @else
                                                {{ __('firefly.unknown') }}
                                            @endif
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <a href="{{ route('subscriptions.edit', $bill->id) }}" class="btn btn-default"><em class="fa fa-pencil"></em></a>
                                                <a href="{{ route('subscriptions.delete', $bill->id) }}" class="btn btn-danger"><em class="fa fa-trash-o"></em></a>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer">
                        <a class="btn btn-success" href="{{ route('subscriptions.create') }}">
                            <em class="fa-solid fa-plus fa-fw"></em> {{ __('firefly.create_new_bill') }}
                        </a>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection
