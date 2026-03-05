<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

final class HealthController
{
    public function check(Request $request, Response $response): void
    {
        $response->success([
            'status' => 'ok',
            'service' => 'project-management-api',
            'timestamp' => gmdate(DATE_ATOM),
        ]);
    }
}
