import { commands } from './commands.js'

export const validateInput = (cmdName, args) => {
  const cmd = commands[cmdName]

  let isArgsQtyValid
  let isTypeValid

  if (cmd) isArgsQtyValid = args.length === cmd.args
  if (cmdName === 'os') isTypeValid = cmd.types.includes(args[0])

  return !!cmd && isArgsQtyValid && (cmdName === 'os' ? isTypeValid : true)
}

export const getUserName = (args) =>
  args[0].split('=').reverse()[0] || 'Unknown'
