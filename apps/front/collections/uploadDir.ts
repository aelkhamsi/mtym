import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Base directory where Payload writes uploaded files.
//
// In production set UPLOAD_DIR to a persistent absolute path OUTSIDE the repo
// (e.g. /var/lib/mtym/uploads). nginx serves these files directly from disk, so
// they survive redeploys and don't depend on the Node process's working
// directory. When UPLOAD_DIR is unset (local dev) we fall back to the in-repo
// public folder, resolved relative to this file so it never depends on cwd.
const baseDir =
  process.env.UPLOAD_DIR || path.resolve(dirname, '../public/images/payload')

export const uploadDir = (subfolder: string): string =>
  path.join(baseDir, subfolder)
