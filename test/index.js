const postman2apiary = require('../index');

const postman = {
    apiKey: "6ae93406f06e47a7bf563334ac848be7",
    collectionID: "202196ec-1804-42fe-9b8b-3ecb6825c951",
    host: "http://logystic-rest.jelastic.regruhosting.ru",
};

try {
    postman2apiary(postman.apiKey, postman.collectionID, postman.host, './apiary.apib');
}catch (err) {
    console.log({err, message:"Ошибка при попытке создать кокументацию"});
}