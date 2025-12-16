#!/usr/bin/env bash

set -euo pipefail

if ! command -v codex >/dev/null 2>&1; then
  echo "未检测到 codex CLI，请确认已安装并加入 PATH。" >&2
  exit 1
fi

if git diff --cached --quiet; then
  echo "没有检测到已暂存的改动，请先执行 git add。"
  exit 1
fi

tmp_output="$(mktemp)"
cleanup() {
  rm -f "$tmp_output"
}
trap cleanup EXIT

(
  printf '为下面的阶段性差异编写一个Conventional Commits git提交消息。只输出提交消息，不输出代码栏或注释。用简体中文输出。\n\n'
  printf 'Diff:\n```diff\n'
  git diff --cached
  printf '```\n'
) | codex exec -c 'mcp_servers={}' --output-last-message "$tmp_output" - >/dev/null

commit_message="$(node - "$tmp_output" <<'NODE'
const fs = require('fs');
const path = process.argv[2];
const content = fs.readFileSync(path, 'utf8').trim();
process.stdout.write(content);
NODE
)"

if [[ -z "$commit_message" ]]; then
  echo "Codex 未返回提交信息。" >&2
  exit 1
fi

echo "生成的提交信息："
echo "  $commit_message"


read -r -p "是否使用该提交信息? [Y/n] " reply
reply="${reply:-Y}"
if [[ "$reply" =~ ^[Yy]$ ]]; then
  git commit -m "$commit_message"
else
  read -r -p "请输入自定义提交信息: " manual_message
  git commit -m "$manual_message"
fi
