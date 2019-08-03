const fs = require('fs')

function readJsonFrom(path) {
  const data = require(path)
  return JSON.parse(JSON.stringify(data))
}

function writeJsonTo(path, data) {
  try {
    if (fs.existsSync(path)) {
      fs.writeFile(path, JSON.stringify(data, '', '\t'), err => {
        throw err
      })
    } else {
      throw new Error(`文件${path}不存在`)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  readJsonFrom,
  writeJsonTo,
}
