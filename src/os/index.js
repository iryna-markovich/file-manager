import { EOL, cpus, homedir, userInfo, arch } from 'os'

const osMap = {
  '--EOL': () => console.log(JSON.stringify(EOL)),
  '--cpus': () =>
    cpus().forEach(({ model, speed }) =>
      console.log(`${model} ${speed / 100}GHz`)
    ),
  '--architecture': () => console.log(arch()),
  '--username': () => console.log(userInfo().username),
  '--homedir': () => console.log(homedir()),
}

export const os = (dir, args) => {
  osMap[args[0]]()

  return dir
}
