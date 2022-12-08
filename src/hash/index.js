import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

import { onOperationError } from '../utils/errors.js'

export const hash = async (dir, args) => {
  const pathToFile = path.resolve(dir, args[0])

  const doesFileExist = await fs.stat(pathToFile).catch((e) => {
    onOperationError()
  })

  let file

  if (doesFileExist) {
    file = await fs.readFile(pathToFile, 'utf-8').catch((e) => {
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
