const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const parameters = [
  { name: "👟ランニング", unit: "分" },
  { name: "📚読書", unit: "分" },
  { name: "📖英単語", unit: "単語" }
]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('Logs daily record'),
  async execute(interaction) {
    try {
      const modal = new ModalBuilder()
        .setCustomId("log")
        .setTitle("📜diary📜");

      parameters.forEach((parameter, index) => {
        let input = new TextInputBuilder()
          .setCustomId(`log_${index}`)
          .setLabel(`${parameter.name} (単位：${parameter.unit})`)
          .setStyle(TextInputStyle.Short);

        let actionRow = modal.addActionRow();
        actionRow.addComponents(input);
        modal.addActionRow(actionRow);
      })

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `ERR: ${error}`, ephemeral: true });
    }
  }
}
