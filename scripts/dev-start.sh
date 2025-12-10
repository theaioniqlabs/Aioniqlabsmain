#!/usr/bin/env bash
set -euo pipefail
echo "Dev start: ensure pnpm store and node_modules are present"
if [ ! -d "./node_modules" ]; then
  echo "node_modules missing — running pnpm install (this may take a moment)"
  pnpm install --frozen-lockfile || pnpm install
else
  echo "node_modules present — skipping install"
fi

# Optional: run type-check but do not stop on failure
if command -v pnpm >/dev/null 2>&1; then
  pnpm run type-check --if-present || true
fi

echo "Starting Next dev server on port 3000"
pnpm dev

