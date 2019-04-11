const https = require('https')
const fs = require('fs')
const shred = new (require('./src/shred'))()

/**
 * Функция создающая докумнтацию из POSTMAN Collection
 * @param PostmanAPIkey {String} - API KEY Postman
 * @param collectionID {String} - Название коллекции которую собходимо экспортировать можно узнать при экспорте коллекции постмен
 * @param apiURL {String} - базовый url вашего API
 * @param outputPath {String} - путь в котором следует сохранить конечный файл
 */
const postman2apiary = (PostmanAPIkey, collectionID, apiURL, outputPath = "./apiary.apib") => {
    try {
        let str = `FORMAT: 1A`
        let sp = shred.next()
        try {

            if (!PostmanAPIkey) {
                console.log('\x1b[31m%s\x1b[0m', `Укажите  [PostmanAPIkey]`)
                return
            }

            let options = {
                'method': 'GET',
                'hostname': 'api.getpostman.com',
                'path': '/collections/' + collectionID,
                'headers': {
                    'X-Api-Key': PostmanAPIkey
                }
            }

            let req = https.request(options, function (res) {
                let chunks = []

                res.on("data", function (chunk) {
                    chunks.push(chunk)
                })
                res.on("end", function (chunk) {
                    let body = Buffer.concat(chunks)
                    try {
                        let json = JSON.parse(body).collection

                        let auth = ``
                        if (json.auth) {
                            auth = shred.auth(json.auth.type, json.auth[json.auth.type][0].key)
                        }

                        str += sp + `HOST: ${apiURL ? apiURL : 'https://example.info'}`
                        str += sp + `# ${json.info.name}`

                        json.item.map(item => {
                            try {
                                str += shred.item(item, auth)    
                            }catch (err) {
                                console.log(err);
                            }
                            
                        })

                        fs.writeFile(outputPath, str, (err) => {
                            if (err) {
                                return console.log(err)
                            }

                            console.log("[DOC] Documentation is done!")
                        })

                    } catch (err) {
                        console.log(err)
                    }
                })

                res.on("error", function (error) {
                    console.error(error)
                })
            })

            let postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--"

            req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')

            req.write(postData)

            req.end()
            
            console.log('[DOC] Generating documentation... pls wait');

        } catch (err) {
            console.log({err, message: "Не удалось получить данные из файла:" + file})
        }

    } catch (err) {
        console.error(err)
    }
}

module.exports = postman2apiary