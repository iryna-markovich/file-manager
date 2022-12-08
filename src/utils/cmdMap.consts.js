export const cmdMap = {
  '.exit': { args: 0 },
  up: { args: 0 },
  cd: { args: 1 },
  ls: { args: 0 },
  cat: { args: 1 },
  add: { args: 1 },
  rn: { args: 2 },
  cp: { args: 2 },
  mv: { args: 2 },
  rm: { args: 1 },
  os: {
    args: 2,
    types: ['--EOL', '--cpus', '--homedir', '--username', '--architecture'],
  },
  hash: { args: 1 },
  compress: { args: 2 },
  decompress: { args: 2 },
}
