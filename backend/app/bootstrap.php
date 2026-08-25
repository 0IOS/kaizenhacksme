<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/vendor/autoload.php';

use App\Config\App;
use App\Config\Session;
use App\Middleware\ErrorHandler;
use App\Middleware\SecurityHeaders;

ErrorHandler::register();
App::init();
Session::init();
SecurityHeaders::send();
