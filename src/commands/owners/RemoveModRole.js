const db = require('../../database');
const patron = require('patron.js');
const util = require('../../utility');

class RemoveModRole extends patron.Command {
  constructor() {
    super({
      name: 'removemodrole',
      aliases: ['removemod'],
      group: 'general',
      description: 'Remove a mod role.',
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Moderator',
          isRemainder: true
        })
      ]
    });
  }

  async run(context, args){
    const dbGuild = await db.guildRepo.getGuild(context.guild.id);

    if (!dbGuild.roles.mod.some((role) =>  role.id === args.role.id)) {
      return util.Messenger.replyError(context.channel, context.author, 'You may not remove a moderation role that has no been set.');
    }

    await db.guildRepo.upsertGuild(context.guild.id, new db.updates.Pull('roles.mod', { id: args.role.id }));

    return util.Messenger.reply(context.channel, context.author, 'You have successfully removed the mod role ' + args.role + '.');
  }
}

module.exports = new RemoveModRole();