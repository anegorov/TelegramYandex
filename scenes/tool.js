const {Scenes, Markup, session} = require('telegraf');
let Tool = require('../model/Tool')

const create = new Scenes.WizardScene(
    'create-tool',
    async (ctx) => {
      await ctx.reply('Как называется инструмент?');
      return ctx.wizard.next()
    },
    async (ctx) => {
      ctx.session.toolName = ctx.message.text;
      await ctx.reply('Цена инструмента?')
      return ctx.wizard.next()
    },
    async (ctx) => {
      ctx.session.toolprice = ctx.message.text;
      await ctx.reply('Где находится инструмент?')
      return ctx.wizard.next()
    },
    async (ctx) => {
      ctx.session.toolLocation = ctx.message.text;
      console.log(ctx);      
      await ctx.reply(`Tool is created: Passed`)
      return await ctx.scene.leave()
    }
)

const find = new Scenes.WizardScene(
  'find-tool',
  async (ctx) => {
    await ctx.reply(`Tool is found: Passed`)
    return await ctx.scene.leave()
  }
)

const findById = new Scenes.WizardScene(
  'find-tool-id',
  async (ctx) => {
    await ctx.reply('Какой ID у инструмента?')
    return ctx.wizard.next()
  },
  async (ctx) => {
    let rId = ctx.session.id = ctx.message.text;
    await ctx.reply('Какой ID у инструмента?')
    return await ctx.scene.leave()
  }
)

module.exports.create = create;
module.exports.find = find;
module.exports.findById = findById;