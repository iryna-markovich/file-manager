import fs from 'fs/promises'
import { createReadStream, createWriteStream, constants } from 'fs'
import path from 'path'

import { onOperationError } from '../utils/errors.js'

export const cat = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])

  try {
    await fs.access(pathToFile, constants.R_OK | constants.W_OK)

    const fileContent = await fs.readFile(pathToFile, 'utf-8')

    console.log(fileContent)
  } catch (e) {
    onOperationError()
  }

  return dir
}

export const add = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])

  try {
    await fs.access(pathToFile, constants.R_OK | constants.W_OK)
    await fs.writeFile(pathToFile, '', 'utf8')
  } catch (e) {
    onOperationError()
  }

  return dir
}

export const rn = async (dir, args) => {
  const oldPathToFile = path.resolve(dir, args[0])
  const newPathToFile = path.resolve(dir, args[1])

  try {
    await fs.access(oldPathToFile, constants.R_OK | constants.W_OK)
    await fs.rename(oldPathToFile, newPathToFile)
  } catch (e) {
    onOperationError()
  }

  return dir
}

const copyFile = async (dir, args, cb) => {
  const pathToFile = path.resolve(dir, args[0])
  const fileName = path.basename(pathToFile)
  const pathToDestination = path.resolve(dir, args[1])
  const pathToDestinationFile = path.resolve(dir, args[1], fileName)

  try {
    await fs.access(pathToFile, constants.R_OK | constants.W_OK)
    await fs.access(pathToDestination, constants.R_OK | constants.W_OK)

    const readStream = createReadStream(pathToFile)
    const writeStream = createWriteStream(pathToDestinationFile)

    readStream.pipe(writeStream).on('finish', cb)
  } catch (e) {
    onOperationError()
  }
}

export const cp = async (dir, args) => {
  await copyFile(dir, args, () => {})

  return dir
}

export const mv = async (dir, args) => {
  const onFinish = async () => {
    await fs.unlink(pathToFile)
  }

  await copyFile(dir, args, onFinish)

  return dir
}

export const rm = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])

  try {
    await fs.access(pathToFile, constants.R_OK | constants.W_OK)
    await fs.unlink(pathToFile)
  } catch (e) {
    onOperationError()
  }

  return dir
}
