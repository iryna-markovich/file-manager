import { showFarewell } from '../utils/messages.js'

export const exit = (dir, args, userName) => {
  showFarewell(userName)

  process.exit(0)
}
