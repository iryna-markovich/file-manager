import os from 'os'
import readline from 'readline'
import { getUserName, validateInput } from './utils/index.js'
import { showCurrentLocation, showGreeting } from './utils/messages.js'
import { exit } from './exit/index.js'
import { onInputError } from './utils/errors.js'
import { commands } from './utils/commands.js'

let currentDirectory = os.homedir()

const args = process.argv.slice(2)
const userName = getUserName(args)

const run = () => {
  showGreeting(userName)
  showCurrentLocation(currentDirectory)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.on('line', async (input) => {
    const [name, ...rest] = input.split(' ')
    const isValid = validateInput(name, rest)

    if (isValid) {
      currentDirectory = await commands[name].call(currentDirectory, rest, userName)
    } else onInputError()

    showCurrentLocation(currentDirectory)
  })

  rl.on('SIGINT', () => {
    exit(currentDirectory, args, userName)
  })
}

run()
