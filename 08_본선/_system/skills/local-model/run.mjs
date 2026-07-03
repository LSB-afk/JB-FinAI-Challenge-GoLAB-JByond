#!/usr/bin/env node
// run.mjs — 로컬 모델(EXAONE 3.5 / Qwen2.5)로 프롬프트를 추론한다.
// 요청은 http://127.0.0.1:11434(Ollama 로컬 API)로만 나간다 — 외부 전송 없음, PII 안전.
//
// 사용:
//   node run.mjs "프롬프트" [--model exaone|qwen|qwen14b]
//   echo "프롬프트" | node run.mjs --model qwen
//
// 근거: 08_본선/03_제품/00_결정-준비/설계/로컬모델-컴퓨팅-TCO-모델링.md

const MODELS = {
  exaone: "exaone3.5:7.8b", // 데모 히어로 — 공개본 비상업 라이선스, 시연 전용
  qwen: "qwen2.5:7b", // 상업 배포 권고 1순위
  qwen14b: "qwen2.5:14b", // 품질 백업
};

async function readStdin() {
  if (process.stdin.isTTY) return "";
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8").trim();
}

function parseArgs(argv) {
  let modelKey = "exaone";
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--model") {
      modelKey = argv[++i];
    } else if (argv[i].startsWith("--model=")) {
      modelKey = argv[i].slice("--model=".length);
    } else {
      rest.push(argv[i]);
    }
  }
  return { modelKey, prompt: rest.join(" ").trim() };
}

async function main() {
  const { modelKey, prompt: argPrompt } = parseArgs(process.argv.slice(2));
  // 매핑에 없는 값은 Ollama 모델 태그로 그대로 전달(예: --model llama3.1:8b).
  const model = MODELS[modelKey] || modelKey;
  const prompt = argPrompt || (await readStdin());

  if (!prompt) {
    console.error('사용법: node run.mjs "프롬프트" [--model exaone|qwen|qwen14b]  (또는 stdin 파이프)');
    process.exit(1);
  }

  const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
  console.error(`[local-model] 로컬 추론 중 (${model} @ ${host}) — 외부 API 미호출`);

  let res;
  try {
    res = await fetch(`${host}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream: false }),
    });
  } catch {
    console.error(`[local-model] Ollama에 연결할 수 없습니다 (${host}).`);
    console.error(`  1) ollama가 떠 있는지 확인: ollama serve`);
    console.error(`  2) 또는 최초 설정: bash 08_본선/_system/skills/local-model/setup.sh`);
    process.exit(1);
  }

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 404 || /not found/i.test(body)) {
      console.error(`[local-model] 모델 "${model}"이 아직 없습니다. pull 필요:`);
      console.error(`  ollama pull ${model}`);
      console.error(`  또는: bash 08_본선/_system/skills/local-model/setup.sh`);
    } else {
      console.error(`[local-model] Ollama 오류(HTTP ${res.status}): ${body}`);
    }
    process.exit(1);
  }

  const data = await res.json();
  process.stdout.write(`${data.response ?? ""}\n`);
}

main();
