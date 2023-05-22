const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'logs',
  description: 'Coleta as últimas logs da sua aplicação',
  run: async (client, interaction) => {
    await interaction.deferReply();

    const apiKey = '906552238619639878-98f1234568a2154a5a450d97ce4540a033edac2ab9171b8e5ce5c3639c67817a';
    const appId = 'ce873f14ba804fb2920e5a07bf868872';
    
    try {
      const response = await axios.get(`https://api.squarecloud.app/v2/apps/${appId}/logs`, {
        headers: {
          Authorization: `${apiKey}`
        }
      });

      if (response.data.status === 'success') {
        const logs = response.data.response.logs;

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel('Abrir logs')
              .setStyle(ButtonStyle.Link)
              .setURL('https://api.squarecloud.app/v2/apps/' + appId + '/logs')
          );

        const embed = new EmbedBuilder()
          .setTitle('Logs da aplicação')
          .setDescription('As últimas logs da sua aplicação são:')
          .addFields({ name: 'Logs', value: `\`\`\`${logs}\`\`\`` })
          .setColor('#2f3136');

        interaction.editReply({ embeds: [embed], components: [row] });
      } else {
        console.error('Erro ao obter as logs:', response.data);
        interaction.editReply('Ocorreu um erro ao obter as logs da aplicação.');
      }
    } catch (error) {
      console.error('Erro ao obter as logs:', error);
      interaction.editReply('Ocorreu um erro ao obter as logs da aplicação.');
    }
  },
};
