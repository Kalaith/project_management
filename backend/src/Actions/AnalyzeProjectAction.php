<?php

declare(strict_types=1);

namespace App\Actions;

use App\Services\GeminiService;

final class AnalyzeProjectAction
{
    public function __construct(
        private readonly GeminiService $geminiService
    ) {}

    public function execute(array $questionnaire): array
    {
        return $this->geminiService->analyzeProject($questionnaire);
    }
}
