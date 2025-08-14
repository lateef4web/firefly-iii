<!DOCTYPE html>
<html lang="en">
<head>
    <base href="{{ route('index') }}/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Firefly III v{{ config('firefly.version') }} - {{ __('authorization') }}</title>

    <!-- CSS things -->
    <!-- libraries -->
    <link href="v1/lib/bs/css/bootstrap.min.css?v={{ FF_VERSION }}" rel="stylesheet" type="text/css" nonce="{{ JS_NONCE }}">
    <link href="v1/lib/fa/css/font-awesome.min.css?v={{ FF_VERSION }}" rel="stylesheet" type="text/css" nonce="{{ JS_NONCE }}">

    <!-- the theme -->
    <link href="v1/lib/adminlte/css/AdminLTE.min.css?v={{ FF_VERSION }}" rel="stylesheet" type="text/css" nonce="{{ JS_NONCE }}">

    <!-- Firefly III customisations -->
    <link href="v1/css/firefly.css?v={{ FF_VERSION }}" rel="stylesheet" type="text/css" nonce="{{ JS_NONCE }}">

    <style>
        .passport-authorize .container {
            margin-top: 30px;
        }

        .passport-authorize .scopes {
            margin-top: 20px;
        }

        .passport-authorize .buttons {
            margin-top: 25px;
            text-align: center;
        }

        .passport-authorize .btn {
            width: 125px;
        }

        .passport-authorize .btn-approve {
            margin-right: 15px;
        }

        .passport-authorize form {
            display: inline;
        }
    </style>
</head>
<body class="passport-authorize">
<div class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    {{ trans('firefly.authorization_request', ['version' => config('firefly.version')]) }}
                </div>
                <div class="panel-body">
                    @if($client->user->id == $user->id)
                        <p>
                            {!! trans('firefly.authorization_request_intro', ['client' => e($client->name)]) !!}
                        </p>
                        <p>
                            {!! trans('firefly.authorization_request_site', ['url' => phphost($client->redirect)]) !!}
                        </p>
                    @endif

                    @if($client->user->id != $user->id)
                        <p class="text-danger">
                            {{ __('authorization_request_invalid') }}
                        </p>
                    @endif
                    <!-- Scope List -->
                    @if(count($scopes) > 0)
                        <div class="scopes">
                            <p><strong>{{ __('scopes_will_be_able') }}</strong></p>

                            <ul>
                                @foreach($scopes as $scope)
                                    <li>{{ $scope['description'] ?? $scope->description }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <div class="buttons">
                        <!-- Authorize Button -->
                        @if($client->user->id == $user->id)
                            <form method="post" action="{{ route('index') }}/oauth/authorize">
                                {{ csrf_field() }}

                                <input type="hidden" name="state" value="{{ $request->state }}">
                                <input type="hidden" name="client_id" value="{{ $client->id }}">
                                <button type="submit" class="btn btn-success btn-approve">{{ __('button_authorize') }}</button>
                            </form>
                        @endif

                        <!-- Cancel Button -->
                        <form method="post" action="{{ route('index') }}/oauth/authorize">
                            {{ csrf_field() }}
                            {{ method_field('DELETE') }}

                            <input type="hidden" name="state" value="{{ $request->state }}">
                            <input type="hidden" name="client_id" value="{{ $client->id }}">
                            <button class="btn btn-danger">{{ __('cancel') }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
