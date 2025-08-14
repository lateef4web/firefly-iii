@extends('layout.v2')

@section('content')
    <div class="app-content">
        <div class="container-fluid">
            <x-messages></x-messages>
            <form method="POST" action="{{ route('subscriptions.update', $bill->id) }}" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <input type="hidden" name="id" value="{{ $bill->id }}" />
                <div class="row mb-3">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">{{ __('firefly.mandatoryFields') }}</h3>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="name" class="form-label">{{ __('validation.attributes.name') }}</label>
                                    <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $bill->name) }}">
                                </div>
                                <div class="mb-3">
                                    <label for="transaction_currency_id" class="form-label">{{ __('validation.attributes.currency') }}</label>
                                    <input type="text" id="transaction_currency_id" name="transaction_currency_id" class="form-control" value="{{ old('transaction_currency_id', $bill->transaction_currency_id) }}">
                                </div>
                                <div class="mb-3">
                                    <label for="amount_min" class="form-label">{{ __('firefly.amount_min') }}</label>
                                    <input type="number" step="any" id="amount_min" name="amount_min" class="form-control" value="{{ old('amount_min', $bill->amount_min) }}">
                                </div>
                                <div class="mb-3">
                                    <label for="amount_max" class="form-label">{{ __('firefly.amount_max') }}</label>
                                    <input type="number" step="any" id="amount_max" name="amount_max" class="form-control" value="{{ old('amount_max', $bill->amount_max) }}">
                                </div>
                                <div class="mb-3">
                                    <label for="date" class="form-label">{{ __('firefly.date') }}</label>
                                    <input type="date" id="date" name="date" class="form-control" value="{{ old('date', $bill->date->format('Y-m-d')) }}">
                                </div>
                                <div class="mb-3">
                                    <label for="repeat_freq" class="form-label">{{ __('firefly.repeat_freq') }}</label>
                                    <select id="repeat_freq" name="repeat_freq" class="form-select">
                                        @foreach($periods as $period)
                                            <option value="{{ $period }}" @selected(old('repeat_freq', $bill->repeat_freq)===$period)>{{ trans('firefly.repeat_freq_' . $period) }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="skip" class="form-label">{{ __('firefly.skip') }}</label>
                                    <input type="number" id="skip" name="skip" class="form-control" value="{{ old('skip', $bill->skip) }}">
                                    <small class="form-text text-muted">{{ __('firefly.skip_help_text') }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">{{ __('firefly.optionalFields') }}</h3>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="bill_end_date" class="form-label">{{ __('firefly.bill_end_date') }}</label>
                                    <input type="date" id="bill_end_date" name="bill_end_date" class="form-control">
                                    <small class="form-text text-muted">{{ trans('firefly.bill_end_date_help') }}</small>
                                </div>
                                <div class="mb-3">
                                    <label for="extension_date" class="form-label">{{ __('firefly.extension_date') }}</label>
                                    <input type="date" id="extension_date" name="extension_date" class="form-control">
                                    <small class="form-text text-muted">{{ trans('firefly.bill_extension_date_help') }}</small>
                                </div>
                                <div class="mb-3">
                                    <label for="notes" class="form-label">{{ __('firefly.notes') }}</label>
                                    <textarea id="notes" name="notes" class="form-control" rows="3">{{ old('notes', '') }}</textarea>
                                    <small class="form-text text-muted">{{ trans('firefly.field_supports_markdown') }}</small>
                                </div>
                                <div class="mb-3">
                                    <label for="attachments" class="form-label">{{ __('firefly.attachments') }}</label>
                                    <input type="file" id="attachments" name="attachments[]" class="form-control" multiple>
                                    <small class="form-text text-muted">{{ trans('firefly.upload_max_file_size', ['size' => $uploadSize ?? '']) }}</small>
                                </div>
                                <div class="mb-3">
                                    <label for="object_group" class="form-label">{{ __('firefly.object_group') }}</label>
                                    <input type="text" id="object_group" name="object_group" class="form-control">
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" id="active" name="active" @checked(old('active', $bill->active))>
                                    <label class="form-check-label" for="active">{{ __('firefly.active') }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">{{ __('firefly.options') }}</h3>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col text-end">
                                        <button type="submit" class="btn btn-success">{{ __('firefly.update_bill') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
