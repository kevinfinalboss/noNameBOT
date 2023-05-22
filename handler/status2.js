const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../Config/config.json');

const channelId2 = '1110284270712401990';
const interval = 10000;

let message;

async function updateApplicationStatus(client) {
  const apiKey = config.apiKey;
  const appId2 = config.appId2;

  const channel = await client.channels.fetch(channelId2);

  if (!channel) {
    console.error(`Canal com ID '${channelId2}' não encontrado.`);
    return;
  }

  const updateMessage = async () => {
    try {
      const response = await axios.get(`https://api.squarecloud.app/v2/apps/${appId2}/status`, {
        headers: {
          Authorization: apiKey
        }
      });

      if (response.data.status === 'success') {
        const status = response.data.response;

        const uptime = status.uptime ? Math.floor(status.uptime / 1000) : 0;
        const minutes = Math.floor(uptime / 60);

        const embed = new EmbedBuilder()
          .setColor('#2f3136')
          .setTitle('Status da aplicação: DudinhaBOT')
          .setImage('https://cdn.dribbble.com/users/662779/screenshots/5122311/media/29ad313d90c405edb25c5fac6e40a899.gif')
          .addFields(
            { name: '💻 CPU', value: status.cpu ? status.cpu.toString() : 'N/A' },
            { name: '🧠 RAM', value: status.ram ? status.ram.toString() : 'N/A' },
            { name: '🔒 Status', value: status.status },
            { name: '💾 Armazenamento', value: status.storage },
            { name: '🌐 Rede', value: status.network ? status.network.total : 'N/A' },
            { name: '🔍 Requisições', value: status.requests ? status.requests.toString() : 'N/A' },
            { name: '⏰ Uptime', value: `${minutes} minutos` }
          )
          .setTimestamp()
          .setFooter({
            text: 'Desenvolvido por: kevinfinalboss',
            iconURL: 'https://avatars.githubusercontent.com/u/88814728?s=400&u=0bb6a0790758c0cc121c8aeafe2cd1237fa151f8&v=4'
          });

        if (!message) {
          const messages = await channel.messages.fetch();
          await channel.bulkDelete(messages);
          message = await channel.send({ embeds: [embed] });
        } else {
          await message.edit({ embeds: [embed] });
        }
      } else {
        console.error('Erro ao obter o status da aplicação:', response.data);
      }
    } catch (error) {
      console.error('Erro ao obter o status da aplicação:', error);
    }
  };

  await updateMessage();

  setInterval(updateMessage, interval);
}

module.exports = updateApplicationStatus;
