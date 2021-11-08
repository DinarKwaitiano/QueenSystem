//Configurando o Client D.JS
const { Client } = require('discord.js');
const client = new Discord.Client({
  disableMentions: 'everyone',
  disableMentioned: 'here'
});
const config = require('./config.json')
//Fazendo o bot receber o ping da host
const appexpress = express();
appexpress.get('/', (request, response) => {
	console.log('Ping recebido da host.')
	response.sendStatus(200);
});
appexpress.listen(process.env.PORT); 

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
    let embed = new Discord.MessageEmbed()
    .setTitle('<a:4601_blobdance:906777891596025888> | Ops, Estou tendo problemas com a execuçao do comando..')
    .setDescription(`<a:4601_blobdance:906777891596025888> | ${message.author.username} sem qurer ser chata mas o comando que você digitou não existe, para mais informações utilize o comando __**q!help**__\ncomando: **${command}** `)
    .setColor('WHITE')
    message.reply(embed)
  }
});


client.login(process.env.TOKEN); 
