import { join, resolve } from 'path'
import fs from 'fs/promises'
import { constants } from 'fs'
import { onOperationError } from '../utils/errors.js'

export const up = (dir) => join(dir, '..')

export const cd = async (dir, args) => {
  const path = resolve(dir, args[0])

  try {
    await fs.access(path, constants.R_OK | constants.W_OK)

    return path
  } catch (e) {
    onOperationError()

    return dir
  }
}

const comparator = (a, b) => (a.type < b.type ? -1 : a.type > b.type ? 1 : 0)

export const ls = async (dir) => {
  const files = await fs.readdir(dir, { withFileTypes: true }).catch((e) => {
    onOperationError()
  })

  let formattedFiles

  if (files) {
    formattedFiles = files
      .map((file) => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
      }))
      .sort(comparator)
  }

  console.table(formattedFiles)

  return dir
}
