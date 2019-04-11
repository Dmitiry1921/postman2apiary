const postman2apiary = require('../index');

const postman = {
    apiKey: "6ae93406f06e47a7bf563334ac848be7",
    collectionID: "477d488f-42b7-4958-a993-43efb2419c7c",
    host: 'https://qr-id.info'
};

try {
    postman2apiary(postman.apiKey, postman.collectionID, postman.host, './apiary.apib');
}catch (err) {
    console.log({err, message:"Ошибка при попытке создать кокументацию"});
}