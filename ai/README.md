# CLL Project Pilot

Concept prototype for the CLL COE AI Challenge 2026. All supplied demo data is fictional. Document reviews run through the user's existing ChatGPT Plus account with a structured copy-and-import workflow. The form gap check and project gates are deterministic.

Run `pnpm install`, then `pnpm dev`. Build with `pnpm build`. If dependency build scripts require approval, follow your environment's dependency policy. Node 22.13 or later is required by the starter.

Verify types with `pnpm exec tsc --noEmit` and workflow logic with `node lib/workflow.test.mjs`.

The starting workspace is named **Project**. Each project persists independently in this browser under `cll-pilot-projects-v1`. The project selector switches between saved records, **New project** creates another nine-step workflow and **Remove project** deletes the selected record after confirmation. Removing the last record creates a fresh default Project. Reset affects only the active project. Export saves only the active project's record. Role switching is for demonstration and does not authenticate a person. Production must enforce permissions, evidence versions and every transition on the server.

The nine tailored activities follow the participant's revised sequence. Detailed documents, speaker notes, AI evaluation prompts and a demo runbook are in the sibling `cll-challenge/output` folder.

## ChatGPT Plus document review (v4)

Each activity accepts 1–3 PDF, DOCX, XLSX, CSV, TXT or MD files. Files must be non-empty, at most 5 MB each and 8 MB combined. The site reads each file only to validate its format and calculate a SHA-256 version reference. It does not upload document contents or store originals.

The engineer copies an activity-specific review prompt, opens ChatGPT, uploads the same documents and runs the review using an existing ChatGPT Plus account. The engineer then pastes ChatGPT's JSON response into the prototype. The prototype validates the structure, requires exactly one finding for each requirement and confirms that all evidence references use selected filenames.

This version has no OpenAI API endpoint and requires no API key or API credits. ChatGPT handles the uploaded documents under the user's ChatGPT account and settings. The user must select the files in ChatGPT; the prototype cannot transfer them automatically.

The AI must return a finding for each R1–R3 requirement with Supported, Needs changes or Cannot verify. Supported findings require quotes and source locations. Filename references and schema are validated; quote authenticity and technical correctness still require human inspection. Overall status is derived from findings. The AI cannot approve gates. For uploaded evidence, submission requires a current report and an engineer response if the AI flags an issue. Replacing files or changing expected values clears the old review and checklist.

A synthetic gap-filled Project Handover is in `public/demo-files/Project-Handover-with-gaps.txt`. Verify helpers using `node lib/document-review.test.mjs`. These tests validate the review prompt, JSON import and workflow rules; they do not claim AI accuracy.

Before using real project evidence, follow CLL's approved information-handling policy and the data controls configured for the user's ChatGPT account. The demo is designed for fictional or approved documents.
