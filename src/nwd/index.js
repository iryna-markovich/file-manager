import path from 'path'
import fs from 'fs'

export const up = (dir) => path.join(dir, '..')

export const cd = (dir, args) => {
  // path_to_directory = args[0]
  return dir
}

export const ls = async (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)

    const formattedFiles = files
      .map((file) => ({
        name: file.name,
        type: file.isDirectory() ? 'directory' : 'file',
      }))
      .sort() //fix sort

    console.table(formattedFiles)
  })

  return dir
}
