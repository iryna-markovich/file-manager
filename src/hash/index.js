import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import util from 'util'
import { onOperationError } from '../utils/errors.js'

const promisify = (cb) => util.promisify(cb)

export const hash = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])

  const doesFileExist = await promisify(fs.stat)(pathToFile).catch((e) => {
    onOperationError()
  })

  let file

  if (doesFileExist) {
    file = await promisify(fs.readFile)(pathToFile, 'utf-8').catch((e) => {
      onOperationError()
    })
  }

  if (file) {
    const hmac = crypto.createHmac('sha256', file)
    const hashValue = hmac.digest('hex')

    console.log(hashValue)
  }

  return dir
}
