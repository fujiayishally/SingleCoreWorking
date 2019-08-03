const { readJsonFrom } = require('./helper.js')

function singlecore_quicklist(req) {
  let result = null
  switch (req.method) {
    case 'GET':
      result = readJsonFrom('./data.json').list
      break
    default:
      result = {
        status: 404,
      }
  }
  return result
}

module.exports = singlecore_quicklist
