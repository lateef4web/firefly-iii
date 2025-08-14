{!! trans('email.closing') !!}

{!! trans('email.signature') !!}

@if($ipAddress !== '')
    {!! trans('email.footer_ps', ['ipAddress' => $ipAddress]) !!}
@endif
