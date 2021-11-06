const AWS = require('aws-sdk');
require('dotenv').config();

class YandexCloud {

  aws = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net', 
    accessKeyId: process.env.YA_STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.YA_STORAGE_SECRET_KEY,
    region: 'ru-central1',
    httpOptions: {
      timeout: 10000,
      connectTimeout: 10000
    },
  });

  listBuckets = async() => {
      this.aws.listBuckets(function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
      });
  }

  upload = async ({file,path,fileName}) =>  {
    try {
      const params = {
        Bucket: 'os-an-telegram-bot',
        Key: `${path}/${fileName}`, // путь и название файла в облаке (path без слэша впереди)
        Body: file, // сам файл
        ContentType: 'text/plain', // тип файла
      }
      const result = await new Promise(function(resolve, reject) {
        this.aws.upload(params, function(err, data) {
          if (err) return reject(err);
          return resolve(data);
        });
      });
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}

const YaCloud = new YandexCloud();

// YaCloud.upload({
//   file: 'README.md',
//   path: '',
//   fileName: 'README.md',
// })

YaCloud.listBuckets()