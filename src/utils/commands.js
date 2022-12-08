import { up, cd, ls } from '../nwd/index.js'
import { cat, add, rn, cp, mv, rm } from '../fs/index.js'
import { os } from '../os/index.js'
import { hash } from '../hash/index.js'
import { compress, decompress } from '../zip/index.js'

export const commands = {
  up: up,
  cd: cd,
  ls: ls,
  cat: cat,
  add: add,
  rn: rn,
  cp: cp,
  mv: mv,
  rm: rm,
  os: os,
  hash: hash,
  compress: compress,
  decompress: decompress,
  //   '.exit': exit,
}
