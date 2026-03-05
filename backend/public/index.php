<?php

declare(strict_types=1);

$autoloader = null;
$searchPaths = [
    __DIR__ . '/../../../vendor/autoload.php',
    __DIR__ . '/../vendor/autoload.php',
    __DIR__ . '/../../vendor/autoload.php',
    __DIR__ . '/../../../../vendor/autoload.php',
    __DIR__ . '/../../../../../vendor/autoload.php',
];

foreach ($searchPaths as $path) {
    if (file_exists($path)) {
        $autoloader = $path;
        break;
    }
}

if ($autoloader === null) {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Autoloader not found. Please run 'composer install' in the repository root.";
    exit(1);
}

require_once $autoloader;

spl_autoload_register(function ($class): void {
    if (strpos($class, 'App\\') === 0) {
        $path = __DIR__ . '/../src/' . str_replace('\\', '/', substr($class, 4)) . '.php';
        if (file_exists($path)) {
            require_once $path;
        }
    }
}, true, true);

use App\Actions\AnalyzeProjectAction;
use App\Controllers\HealthController;
use App\Controllers\ProjectAnalysisController;
use App\Core\Router;
use App\Services\GeminiService;
use Dotenv\Dotenv;

try {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
} catch (Throwable $e) {
}

$allowedOrigin = $_ENV['CORS_ORIGIN'] ?? '*';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
    header('Access-Control-Max-Age: 86400');
    exit(0);
}

header('Access-Control-Allow-Origin: ' . $allowedOrigin);

$router = new Router();

$basePath = $_ENV['API_BASE_PATH'];
if ($basePath === '' && preg_match('/^(.*\/api)/', $_SERVER['REQUEST_URI'] ?? '', $matches)) {
    $basePath = $matches[1];
}
$router->setBasePath($basePath);

$analysisController = new ProjectAnalysisController(
    new AnalyzeProjectAction(new GeminiService())
);
$healthController = new HealthController();

$router->post('/project-analysis', static function ($request, $response) use ($analysisController): void {
    $analysisController->analyze($request, $response);
});

$router->get('/health', static function ($request, $response) use ($healthController): void {
    $healthController->check($request, $response);
});

try {
    $router->handle();
} catch (Throwable $e) {
    (new \App\Core\Response())->error('Internal Server Error: ' . $e->getMessage(), 500);
}
