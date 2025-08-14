@include('emails.header-text')
{!! strip_tags(trans('email.error_intro', ['version' => $version, 'errorMessage' => $errorMessage])) !!}

{!! trans('email.error_type', ['class' => $class]) !!}

{!! trans('email.error_timestamp', ['time' => $time]) !!}

{!! strip_tags(trans('email.error_location', ['file' => $file, 'line' => $line, 'code' => $code])) !!}

@if($loggedIn)
{!! strip_tags(trans('email.error_user', ['id' => $user->id, 'email' => $user->email])) !!}
@else
{!! trans('email.error_no_user') !!}
@endif

{{ trans('email.error_ip', ['ip' => $ip]) }}
{{ $method }} {{ trans('email.error_url', ['url' => $url]) }}
{{ trans('email.error_user_agent', ['userAgent' => $userAgent]) }}

{!! strip_tags(trans('email.error_stacktrace')) !!}

{!! trans('email.error_github_text') !!}

{!! trans('email.error_stacktrace_below') !!}

{{ $stackTrace }}

{{ trans('email.error_headers') }}

@foreach($headers as $key => $header)
@if(($key != 'cookie') && $header[0] != '' && $key != 'x-xsrf-token')
- {{ $key }}: {{ $header[0] }}
@endif
@endforeach

@if($post !== '')
{{ trans('email.error_post') }}

{{ $post }}
@endif

@include('emails.footer-text')
