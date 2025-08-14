<div class="box">
    <div class="box-header with-border">
        <h3 class="box-title"><a href="{{ route('piggy-banks.index') }}" title="{{ __('piggyBanks') }}">{{ __('piggyBanks') }}</a></h3>
    </div>
    <div class="box-body">
        @foreach($info as $entry)
            <strong>{{ $entry['name'] }}</strong><br/>
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="{{ $entry['percentage'] }}" aria-valuemin="0" aria-valuemax="100"
                     style="width: {{ $entry['percentage'] }}%;">
                    @if($entry['percentage'] >= 20)
                        @if($convertToPrimary && 0 != $avg['pc_amount'])
                            {{ formatAmountBySymbol($entry['pc_amount'], $entry['primary_currency_symbol'], $entry['primary_currency_decimal_places'], false) }}
                            ({{ formatAmountBySymbol($entry['amount'], $entry['currency_symbol'], $entry['currency_decimal_places'], false) }})
                        @else
                            {{ formatAmountBySymbol($entry['amount'], $entry['currency_symbol'], $entry['currency_decimal_places'], false) }}
                        @endif
                    @endif
                </div>
                @if($entry['percentage'] < 20)
                    &nbsp;
                    @if($convertToPrimary && 0 != $avg['pc_amount'])
                        {{ formatAmountBySymbol($entry['pc_amount'], $entry['primary_currency_symbol'], $entry['primary_currency_decimal_places'], false) }}
                        ({{ formatAmountBySymbol($entry['amount'], $entry['currency_symbol'], $entry['currency_decimal_places'], false) }})
                    @else
                        {{ formatAmountBySymbol($entry['amount'], $entry['currency_symbol'], $entry['currency_decimal_places'], false) }}
                    @endif
                @endif
            </div>
        @endforeach
    </div>
    <div class="box-footer">
        <a href="{{ route('piggy-banks.index') }}" class="btn btn-default button-sm"><span class="fa fa-download"></span> {{ __('go_to_piggies') }}</a>
    </div>
</div>
