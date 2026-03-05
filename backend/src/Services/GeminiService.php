<?php

declare(strict_types=1);

namespace App\Services;

use RuntimeException;

final class GeminiService
{
    private string $apiKey;
    private string $endpoint;

    public function __construct()
    {
        $this->apiKey = $_ENV['GEMINI_API_KEY'] ?? $_SERVER['GEMINI_API_KEY'] ?? getenv('GEMINI_API_KEY') ?: '';
        $model = $_ENV['GEMINI_MODEL'] ?? $_SERVER['GEMINI_MODEL'] ?? getenv('GEMINI_MODEL') ?: 'gemini-2.5-flash';
        $this->endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

        if ($this->apiKey === '') {
            throw new RuntimeException('GEMINI_API_KEY is not configured');
        }
    }

    public function analyzeProject(array $questionnaire): array
    {
        $prompt = $this->buildPrompt($questionnaire);

        $payload = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt],
                    ],
                ],
            ],
            'generationConfig' => [
                'response_mime_type' => 'application/json',
            ],
        ];

        $ch = curl_init($this->endpoint . '?key=' . $this->apiKey);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

        if (($_ENV['APP_ENV'] ?? 'production') === 'development') {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        $errno = curl_errno($ch);
        curl_close($ch);

        if ($response === false) {
            throw new RuntimeException("CURL Error ({$errno}): {$error}");
        }

        if ($httpCode !== 200) {
            throw new RuntimeException("Failed to communicate with Gemini API (HTTP {$httpCode})");
        }

        $result = json_decode($response, true);
        if (!is_array($result)) {
            throw new RuntimeException('Invalid Gemini response payload');
        }

        $content = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if (!is_string($content) || $content === '') {
            throw new RuntimeException('Gemini returned empty content');
        }

        $parsed = $this->decodeJsonText($content);
        return $this->normalizeResult($parsed);
    }

    private function buildPrompt(array $data): string
    {
        $stakeholders = $data['stakeholders'] ?? [];
        $stakeholderLines = [];

        if (is_array($stakeholders)) {
            foreach ($stakeholders as $stakeholder) {
                if (!is_array($stakeholder)) {
                    continue;
                }

                $name = $this->stringify($stakeholder['name'] ?? '', '');
                $role = $this->stringify($stakeholder['role'] ?? '', '');
                if ($name === '' && $role === '') {
                    continue;
                }
                $stakeholderLines[] = "- {$name} ({$role})";
            }
        }

        $stakeholdersText = count($stakeholderLines) > 0
            ? implode("\n", $stakeholderLines)
            : '- No stakeholders specified';

        return <<<PROMPT
You are an expert project management consultant.
Analyze the project information and return ONLY valid JSON with this exact shape:
{
  "projectCharter": "string",
  "riskAssessment": "string",
  "timelineOverview": "string",
  "stakeholderAnalysis": "string"
}

Write each field as practical, detailed professional output suitable for project documentation.
Do not include markdown fences and do not include any keys outside the four required keys.

Project Information:
- Project Name: {$this->stringify($data['projectName'] ?? null)}
- Project Type: {$this->stringify($data['projectType'] ?? null)}
- Project Description: {$this->stringify($data['projectDescription'] ?? null)}
- Timeline: {$this->stringify($data['timeline'] ?? null)}
- Objectives: {$this->stringify($data['objectives'] ?? null)}
- Key Deliverables: {$this->stringify($data['deliverables'] ?? null)}
- Success Criteria: {$this->stringify($data['successCriteria'] ?? null)}
- Team Size: {$this->stringify($data['teamSize'] ?? null)}
- Budget Range: {$this->stringify($data['budget'] ?? null)}
- Resource Constraints: {$this->stringify($data['constraints'] ?? null)}
- Communication Requirements: {$this->stringify($data['communicationNeeds'] ?? null)}
- Potential Risks: {$this->stringify($data['potentialRisks'] ?? null)}
- Mitigation Strategies: {$this->stringify($data['mitigationStrategies'] ?? null)}
- Dependencies: {$this->stringify($data['dependencies'] ?? null)}

Stakeholders:
{$stakeholdersText}
PROMPT;
    }

    private function decodeJsonText(string $content): array
    {
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            return $decoded;
        }

        if (preg_match('/```(?:json)?\s*(\{.*\})\s*```/is', $content, $matches) === 1) {
            $decodedBlock = json_decode($matches[1], true);
            if (is_array($decodedBlock)) {
                return $decodedBlock;
            }
        }

        $start = strpos($content, '{');
        $end = strrpos($content, '}');
        if ($start !== false && $end !== false && $end > $start) {
            $json = substr($content, $start, $end - $start + 1);
            $decodedSlice = json_decode($json, true);
            if (is_array($decodedSlice)) {
                return $decodedSlice;
            }
        }

        throw new RuntimeException('Unable to parse Gemini JSON output');
    }

    private function normalizeResult(array $result): array
    {
        return [
            'projectCharter' => $this->stringify($result['projectCharter'] ?? null, 'No project charter returned.'),
            'riskAssessment' => $this->stringify($result['riskAssessment'] ?? null, 'No risk assessment returned.'),
            'timelineOverview' => $this->stringify($result['timelineOverview'] ?? null, 'No timeline overview returned.'),
            'stakeholderAnalysis' => $this->stringify($result['stakeholderAnalysis'] ?? null, 'No stakeholder analysis returned.'),
        ];
    }

    private function stringify(mixed $value, string $fallback = 'Not specified'): string
    {
        if (is_string($value)) {
            $trimmed = trim($value);
            return $trimmed === '' ? $fallback : $trimmed;
        }

        if ($value === null) {
            return $fallback;
        }

        if (is_scalar($value)) {
            $string = trim((string)$value);
            return $string === '' ? $fallback : $string;
        }

        return $fallback;
    }
}
