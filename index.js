const {Telegraf, Composer, Scenes, Markup, session} = require('telegraf');
const toolScenes = require('./scenes/tool');
const locationScenes = require('./scenes/location');

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token)

const stage = new Scenes.Stage([toolScenes.create, toolScenes.find, toolScenes.findById, locationScenes.create, locationScenes.find], {
  ttl: 10,
});

bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
  ctx.myContextProp = ''
  ctx.scene.session.mySceneSessionProp = 0
  return next()
})

bot.catch((err, ctx) => {
    console.error(`Bot Error on ${ctx.updateType}`, err);
});

bot.command('find', async (ctx) =>
  await ctx.reply('Что хочешь найти?', Markup
    .keyboard([
      ['🔍 Location', '🔍 Tool'],
      ['🔍 Location by ID', '🔍 Tool by ID'] 
    ])
    .oneTime()
    .resize()
  )
);

bot.command('create', (ctx) =>
  ctx.reply('Что хочешь создать?', Markup
    .keyboard([
      ['☸ Location', '☸ Tool'] 
    ])
    .oneTime()
    .resize()
  )
);

bot.hears('☸ Location', ctx => ctx.scene.enter('create-location'))
bot.hears('☸ Tool', ctx => ctx.scene.enter('create-tool'))
bot.hears('🔍 Location', ctx => ctx.scene.enter('find-location'))
bot.hears('🔍 Tool', ctx => ctx.scene.enter('find-tool'))
bot.hears('🔍 Tool by ID', ctx => ctx.scene.enter('find-tool-id'))

bot.on('text', async (ctx) => {
  await ctx.reply('Try /find or /create')
});

module.exports.handler = async function (event, context) {
    const message = JSON.parse(event.body);
    await bot.handleUpdate(message);
    return {
        statusCode: 200,
        body: '',
    };
};
