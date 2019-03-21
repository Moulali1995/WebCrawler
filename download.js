const http = require('https')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const downloadPage = function(url = 'http://nodeprogram.com') {
  console.log('dowloading', url)
  const fetchPage = (urlF, callback) => {
    http.get(urlF, (res) => {
      let buff = ''
      res.on('data', (chunk) => {
        buff += chunk
      })
      res.on('end', () => {
        callback(null, buff)
      })
    }
    ).on('error', (error) => {
      console.log('some error occurred: ${error.message}')
      callback(error)
    })
  }

  const foldername = uuidv1()
  fs.mkdirSync(foldername)
  fetchPage(url, (error, data) => {
    if (error) return console.log(error)
    fs.writeFileSync(path.join(__dirname, foldername, 'url.txt'), url)
    fs.writeFileSync(path.join(__dirname, foldername, 'data.html'), data)
    console.log('downloading done in ', foldername)
  })
}

downloadPage(process.argv[2])
