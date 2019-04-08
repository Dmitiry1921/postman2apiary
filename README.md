<a name="postman2apiary"></a>

## Install 
```npm
npm i postman2apiary
```

## Using
```javascript
const postman2apiary = require('postman2apiary');

try {
    postman2apiary(YourAPIKey, collectionID, APIBaseURL, './apiary.apib');
}catch (err) {
    console.log({err, message:"Ошибка при попытке создать кокументацию"});
}

```

## postman2apiary(PostmanAPIkey, collectionID, apiURL, outputPath)
Функция создающая докумнтацию из POSTMAN Collection

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| PostmanAPIkey | <code>String</code> |  | API KEY Postman |
| collectionID | <code>String</code> |  | Название коллекции которую собходимо экспортировать можно узнать при экспорте коллекции постмен |
| apiURL | <code>String</code> |  | базовый url вашего API |
| outputPath | <code>String</code> | <code>./apiary.apib</code> | путь в котором следует сохранить конечный файл |