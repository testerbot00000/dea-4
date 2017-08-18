const patron = require('patron.js');

class Hierarchy extends patron.ArgumentPrecondition {
  async run(command, msg, argument, value) {
    if (value.position < msg.guild.me.highestRole.position) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, msg.client.user.username + ' must be higher in hierarchy than ' + value + '.');
  }
}

module.exports = new Hierarchy();
