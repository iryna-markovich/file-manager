import { up, cd, ls } from '../nwd/index.js'
import { cat, add, rn, cp, mv, rm } from '../fs/index.js'
import { os } from '../os/index.js'
import { hash } from '../hash/index.js'
import { compress, decompress } from '../zip/index.js'
import { exit } from '../exit/index.js'

export const commands = {
  up: { call: up, args: 0 },
  cd: { call: cd, args: 1 },
  ls: { call: ls, args: 0 },
  cat: { call: cat, args: 1 },
  add: { call: add, args: 1 },
  rn: { call: rn, args: 2 },
  cp: { call: cp, args: 2 },
  mv: { call: mv, args: 2 },
  rm: { call: rm, args: 1 },
  os: {
    call: os,
    args: 2,
    types: ['--EOL', '--cpus', '--homedir', '--username', '--architecture'],
  },
  hash: { call: hash, args: 1 },
  compress: { call: compress, args: 2 },
  decompress: { call: decompress, args: 2 },
  '.exit': { call: exit, args: 0 },
}
