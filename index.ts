
const { Client, Intents } = require('discord.js');
const { channelId, guildId, token } = require('./config.json');
const fs = require('fs');
const axios = require('axios')
require('dotenv').config();
const Discord = require("discord.js");
const discordTTS = require('discord-tts');
const prism = require('prism-media');
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS]});
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, createAudioPlayer, EndBehaviorType} = require("@discordjs/voice");

const {getTranscript} = require('audio.js')

//const createListeningStream = require('./createListeningStream');
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if(commandName === 'blindtalk'){
		//create audio stream to record user speaking
        const connection = joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
       //console.log(interaction);
        //console.log(connection.receiver);
       // connection.destroy()
        const read = connection.receiver.subscribe(interaction.user.id, {end: {behavior: EndBehaviorType.AfterSilence}});
        if (read.readable)
        {
            console.log(read.read());
        }
        else{
            console.log("fault");
        }
        }
/*
multi line comment 

    */

     else if(commandName === 'texttospeech'){
        const audioResource = createAudioResource("/Users/joshuachoi/blind-talk/Kids Booing - Sound Effect (Children Booing Sound Effect).mp3")
        const player = createAudioPlayer()
        joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }).subscribe(player) //join VC and subscribe to the audio player
        player.play(audioResource) //make sure "audioResource" is a valid audio resource
        console.log('wosrsks')
    }

    // else if(commandName == 'stop'){
    //     client.leaveVoiceChannel(channelId);
    // }

	
});

client.login(process.env.TOKEN);