import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const SRC = 'src'
const DEFAULT_EXPORT_ALLOWLIST = new Set(['src/App.tsx', 'src/i18n/index.ts'])

const failures = []

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(path)))
      continue
    }
    files.push(path)
  }

  return files
}

const addFailure = (path, line, message) => {
  failures.push(`${path}${line ? `:${line}` : ''} — ${message}`)
}

const checkLine = (path, lineNumber, line) => {
  if (line.includes("from '@/") || line.includes('from "@/')) {
    addFailure(path, lineNumber, 'do not use @/ imports; use relative paths')
  }

  if (/\bstyle=\{\{/.test(line)) {
    addFailure(
      path,
      lineNumber,
      'no inline style={{...}}; use styles.module.css',
    )
  }

  if (/\bas any\b|: any\b/.test(line)) {
    addFailure(path, lineNumber, 'no any; narrow the type')
  }

  if (/^\s*(export\s+)?interface\s/.test(line)) {
    addFailure(path, lineNumber, 'use type, never interface')
  }

  if (/^export default /.test(line) && !DEFAULT_EXPORT_ALLOWLIST.has(path)) {
    addFailure(
      path,
      lineNumber,
      'named exports only (App.tsx and src/i18n/index.ts are the exceptions)',
    )
  }

  const withoutBangs = line
    .replace(/!=/g, '')
    .replace(/!==/g, '')
    .replace(/!\s*(?:import\.meta|true|false|[A-Za-z_$])/g, '')

  if (/\w![\s.)\],;:]/.test(withoutBangs) || /\w!$/.test(withoutBangs.trim())) {
    addFailure(path, lineNumber, 'no non-null assertion (!); narrow or guard')
  }
}

const files = await walk(SRC)

for (const file of files) {
  const path = relative(process.cwd(), file)

  if (file.endsWith('style.module.css')) {
    addFailure(path, 0, 'rename to styles.module.css')
  }

  if (!['.ts', '.tsx'].includes(extname(file))) {
    continue
  }

  const content = await readFile(file, 'utf8')
  content.split('\n').forEach((line, index) => {
    checkLine(path, index + 1, line)
  })
}

if (failures.length > 0) {
  console.error('House-style check failed:\n')
  for (const failure of failures) {
    console.error(`  ${failure}`)
  }
  process.exit(1)
}

console.log('House-style check passed')
