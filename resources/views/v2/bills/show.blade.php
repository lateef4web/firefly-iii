@extends('layout.v2')

@section('content')
    <div class="app-content">
        <div class="container-fluid">
            <x-messages></x-messages>
            <div class="row">
                <div class="col-xl-6 col-md-12 col-sm-12">
                    <div class="card" id="billInfo">
                        <div class="card-header">
                            <h3 class="card-title">{{ $bill->name }}</h3>
                            <div class="card-tools">
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('subscriptions.edit', $bill->id) }}" class="btn btn-default"><em class="fa fa-pencil"></em></a>
                                    <a href="{{ route('subscriptions.delete', $bill->id) }}" class="btn btn-danger"><em class="fa fa-trash-o"></em></a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-striped">
                                <tr>
                                    <td colspan="2">
                                        {{ trans('firefly.match_between_amounts', [
                                            'low' => formatAmountByCurrency($bill->currency,$bill->amount_min),
                                            'high' => formatAmountByCurrency($bill->currency,$bill->amount_max)
                                        ]) }}
                                        {{ __('firefly.repeats') }}
                                        {{ trans('firefly.repeat_freq_' . $bill->repeat_freq) }}.
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{ __('firefly.bill_is_active') }}</td>
                                    <td>
                                        @if($bill->active)
                                            <span class="fa fa-check fa-fw" title="{{ __('firefly.active') }}"></span> {{ __('firefly.yes') }}
                                        @else
                                            <span class="fa fa-times fa-fw" title="{{ __('firefly.inactive') }}"></span> {{ __('firefly.no') }}
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{ __('firefly.next_expected_match') }}</td>
                                    <td>
                                        @if(isset($bill->pay_dates[0]))
                                            {{ formatDate($bill->pay_dates[0], $monthAndDayFormat) }}
                                        @else
                                            {{ __('firefly.unknown') }}
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="card-footer">
                            <div class="btn-group">
                                <a class="btn btn-default" href="{{ route('subscriptions.edit', [$bill->id]) }}">{{ __('firefly.edit') }}</a>
                                <a class="btn btn-danger" href="{{ route('subscriptions.delete', [$bill->id]) }}">{{ __('firefly.delete') }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
