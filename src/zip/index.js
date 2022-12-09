import { createBrotliCompress, createBrotliDecompress } from 'zlib'
import { createReadStream, createWriteStream, constants } from 'fs'
import fs from 'fs/promises'
import path from 'path'

import { onOperationError } from '../utils/errors.js'

export const compress = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])
  const pathToDestination = path.resolve(dir, args[1])

  const zippedFileNameWithExt = path.basename(pathToFile)

  const pathToDestinationFile = path.resolve(
    dir,
    args[1],
    `${zippedFileNameWithExt}.br`
  )

  try {
    await fs.access(pathToFile, constants.R_OK | constants.W_OK)
    await fs.access(pathToDestination, constants.R_OK | constants.W_OK)

    const inStream = createReadStream(pathToFile)
    const outStream = createWriteStream(pathToDestinationFile)
    const zip = createBrotliCompress()

    inStream.pipe(zip).pipe(outStream)
  } catch (e) {
    onOperationError()
  }

  return dir
}

export const decompress = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])
  const pathToDestination = path.resolve(dir, args[1])

  const extension = path.extname(pathToFile)
  const zippedFileName = path.basename(pathToFile, extension)

  const pathToDestinationFile = path.resolve(dir, args[1], zippedFileName)

  if (extension === '.br') {
    try {
      await fs.access(pathToFile, constants.R_OK | constants.W_OK)
      await fs.access(pathToDestination, constants.R_OK | constants.W_OK)

      const inStream = createReadStream(pathToFile)
      const outStream = createWriteStream(pathToDestinationFile)
      const unzip = createBrotliDecompress()

      inStream.pipe(unzip).pipe(outStream)
    } catch (e) {
      onOperationError()
    }
  } else onOperationError()

  return dir
}
