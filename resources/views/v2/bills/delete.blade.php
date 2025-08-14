@extends('layout.v2')

@section('content')
    <div class="app-content">
        <div class="container-fluid">
            <x-messages></x-messages>
            <form method="POST" action="{{ route('subscriptions.destroy', $bill->id) }}" id="destroy">
                @csrf
                @method('DELETE')
                <div class="row mb-3">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 offset-xl-3">
                        <div class="card border-danger">
                            <div class="card-header bg-danger text-white">
                                <h3 class="card-title">{{ trans('form.delete_bill', ['name' => $bill->name]) }}</h3>
                            </div>
                            <div class="card-body">
                                <p class="text-danger">
                                    {{ trans('form.permDeleteWarning') }}
                                </p>
                                <p>{{ trans('form.bill_areYouSure', ['name' => $bill->name]) }}</p>
                                @if($bill->transactionjournals->count() > 0)
                                    <p>{{ trans_choice('form.bill_keep_transactions', $bill->transactionjournals->count(), ['count' => $bill->transactionjournals->count()]) }}</p>
                                @endif
                            </div>
                            <div class="card-footer">
                                <div class="btn-group float-end">
                                    <button type="submit" class="btn btn-danger">{{ trans('form.deletePermanently') }}</button>
                                    <a href="{{ URL::previous() }}" class="btn btn-default">{{ trans('form.cancel') }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
