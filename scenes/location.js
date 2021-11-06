const {Scenes, Markup, session} = require('telegraf');

const create = new Scenes.WizardScene(
    'create-location',
    async (ctx) => {
      await ctx.reply('Enter location name')
      return ctx.wizard.next()
    },
    async (ctx) => {
      await ctx.reply('Enter manager')
      return ctx.wizard.next()
    },
    async (ctx) => {
      await ctx.reply('Location is created')
      return await ctx.scene.leave()
    }
)

const find = new Scenes.WizardScene(
  'find-location',
  async (ctx) => {
    await ctx.reply('Enter location name')
    return ctx.wizard.next()
  },
  async (ctx) => {
    await ctx.reply('Find location')
    return await ctx.scene.leave()
  }
)

module.exports.create = create;
module.exports.find = find;