<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Actions\AnalyzeProjectAction;
use App\Core\Request;
use App\Core\Response;
use InvalidArgumentException;
use Throwable;

final class ProjectAnalysisController
{
    public function __construct(
        private readonly AnalyzeProjectAction $analyzeProjectAction
    ) {}

    public function analyze(Request $request, Response $response): void
    {
        try {
            $questionnaire = $request->get('questionnaire');

            if (!is_array($questionnaire)) {
                throw new InvalidArgumentException('questionnaire must be an object');
            }

            $result = $this->analyzeProjectAction->execute($questionnaire);
            $response->success($result);
        } catch (Throwable $e) {
            $response->error($e->getMessage(), 400);
        }
    }
}
