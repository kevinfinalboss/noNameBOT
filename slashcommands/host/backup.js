const config = require('../../Config/config.json');

const { MessageEmbed, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'backup',
  description: 'Realiza um backup da aplicação',
  run: async (client, interaction) => {
    await interaction.deferReply();

    const apiKey = config.apiKey;
    const appId = config.appId;

    try {
      const response = await axios.get(`https://api.squarecloud.app/v2/apps/${appId}/backup`, {
        headers: {
          Authorization: `${apiKey}`
        }
      });

      if (response.data.status === 'success') {
        const downloadUrl = response.data.response.downloadURL;

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel('Download Backup')
              .setStyle(ButtonStyle.Link)
              .setURL(downloadUrl)
          );

        const embed = new EmbedBuilder()
          .setTitle('Backup da aplicação')
          .setDescription('O backup foi criado com sucesso.')
          .addFields({ name: 'URL do Backup', value: downloadUrl })
          .setColor('#2f3136');

        interaction.editReply({ embeds: [embed], components: [row] });
      } else {
        console.error('Erro ao realizar o backup:', response.data);
        interaction.editReply('Ocorreu um erro ao realizar o backup da aplicação.');
      }
    } catch (error) {
      console.error('Erro ao realizar o backup:', error);
      interaction.editReply('Ocorreu um erro ao realizar o backup da aplicação.');
    }
  },
};
