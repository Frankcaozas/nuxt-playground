import type { FileSystemTree } from '@webcontainer/api'
import { WebContainer } from '@webcontainer/api'

let webcontainerInstance: WebContainer

export async function useWebContaienr() {
  if (!webcontainerInstance)
    webcontainerInstance = await WebContainer.boot()
  return webcontainerInstance
}

export function globFilesToWebContainerFs(
  prefix: string,
  rawFiles: Record<string, string>,
) {
  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, content]) => {
      return [path.replace(prefix, ''), {
        file: {
          contents: content,
        },
      }]
    }),
  )

  const tree: FileSystemTree = {}

  for (const [path, file] of Object.entries(files)) {
    if (!path.includes('/')) { tree[path] = file }
    else {
      const parts = path.split('/')
      const filename = parts.pop()!
      let current = tree
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = {
            directory: {},
          }
        }
        const node = current[dir]
        if (!('directory' in node))
          throw new Error('Unexpected directory but found file')
        current = node.directory
      }
      current[filename] = file
    }
  }
  return tree
}
