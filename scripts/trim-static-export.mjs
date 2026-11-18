import { existsSync, readdirSync, rmSync } from 'node:fs'
import { dirname, basename, join } from 'node:path'

// This copy uses document links. Each HTML page contains its own hydration data.
const output = 'out'
if (!existsSync(join(output, 'index.html'))) {
  throw new Error('Expected a static Next.js export before trimming navigation payloads.')
}

for (const path of readdirSync(output, { recursive: true })) {
  if (!path.endsWith('.txt')) continue
  const exportPath = join(output, path)
  const name = basename(path)
  if (name.startsWith('__next.') || name === 'index.txt' ||
      existsSync(join(dirname(exportPath), name.replace(/\.txt$/, '.html')))) {
    rmSync(exportPath)
  }
}
