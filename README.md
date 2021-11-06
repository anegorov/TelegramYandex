https://www.youtube.com/watch?v=qV_iTlufmdE

npm i dotenv

https://www.npmjs.com/package/telegraf

https://github.com/telegraf/telegraf/tree/develop/docs/examples

Пример продвинутого чатбота на ЯКлауд
https://github.com/yandex-cloud/examples/tree/master/serverless/functions/chatops/nodejs
Примеры Markup (Клавиатуры)
https://github.com/telegraf/telegraf/blob/v4/docs/examples/keyboard-bot.js

## Core functions

1. Tools
   - New
   - Edit
   - Delete
   - Search
2. Locations
   - New
   - Edit
   - Delete
   - Search

## CLI ya
В Yandex.Cloud удобно реализовано создание функций с помощью CLI. Вам не надо архивировать код и загружать его в объектное хранилище, достаточно лишь сложить все файлы в директорию и указать на нее при создании версии функции в ключе --source-path. Так же вы можете не передавать все node_modules, а загрузить только package.json и выбрать --runtime nodejs12 или --runtime nodejs14. Все зависимости будут подтянуты в момент создания версии функции.

## ObjectStorage
os-an-telegram-bot