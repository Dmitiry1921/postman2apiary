module.exports = class Shred {
    constructor() {
        this.emptyGroup = false
    }

    getType(type) {
        switch (type) {
            case 'text':
                return 'string'
                break
            default:
                return type
                break
        }
    }

    path(array) {
        return `/${array.join('/')}`
    }

    auth(type, key) {
        return `${this.next()}  + Headers

        Authorization: ${type} ${key}${this.next() + this.next()}`
    }

    next() {
        return "\n"
    }

    tab() {
        return "    "
    }

    group(name) {
        return `${this.next()}# Group ${name}${this.next()}`
    }

    title(name, method, path) {
        return `${this.next()}### ${name} [${method}  ${path}]`
    }

    attributes(array) {
        let less = `${this.next()}+ Attributes (object)`
        if (array === "string") {
            try {
                array = JSON.parse(array)
            } catch (err) {
                console.log(err)
            }
        }

        let b = false
        for (let i in array) {
            if (array[i].key) {
                if (!array[i].description) {
                    console.log('\x1b[33m%s\x1b[0m', `Добавить описание ${array[i].key}: ${array[i].value}`)
                }
                b = true
                less += this.next() + this.tab() + `+ ${array[i].key}: ${array[i].value} (string) ${array[i].description ? '- ' + array[i].description : 'TODO: Добавить описание'}`
            }
        }

        less += this.next()

        return !b ? '' : less
    }

    response(item) {

        let less = ``

        if (item.response) {
            if (item.response.length === 0) {
                console.log('\x1b[33m%s\x1b[0m', `Создайте Examples для  [${item.request ? item.request.method : 'TODO'}] ${item.name}`)
            }
            for (let i in item.response) {
                let res = item.response[i]
                if (!res.body) {
                    continue
                }
                let body = res.body.replace(/\n/g, this.next()+this.tab()+this.tab())
                less += `${this.next()}+ Response ${res.code} (application/json)${this.next()}${res.name}${this.next() + this.tab()}+ Body${this.next()}${this.tab() + this.tab()}${body}${this.next()}`
            }
        }

        return less + this.next()
    }

    item(item, auth) {

        let less = ``
        if (item.request) {
            if (!this.emptyGroup) {
                this.emptyGroup = true
            }
            less += this.title(item.name, item.request.method, this.path(item.request.url.path))
        } else {
            less += this.group(item.name)
            if (item.item) {
                item.item.map(i => {
                    less += this.item(i, auth)
                })
            }
        }

        let bAuth = false
        if (item.auth) {
            if (item.auth.type === "noauth") {
                bAuth = true
            }
        }

        if (!bAuth) {
            less += auth
        }

        if (item.request) {
            if (item.request.method === "GET") {
                if (item.request.url) {
                    less += this.attributes(item.request.url.query)
                }
            } else {
                less += this.attributes(item.request.body[item.request.body.mode])
            }

        }

        less += this.response(item)


        return less

    }
}