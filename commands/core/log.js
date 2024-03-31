const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const modalTitle = "📜diary";
const parameters = [
  { id: "running", name: "👟ランニング", unit: "分" },
  { id: "reading", name: "📚読書", unit: "分" },
  { id: "eng-words", name: "📖英単語", unit: "単語" }
]

module.exports = {
  parameters,   // refactor: separate file
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('Logs daily record'),
  async execute(interaction) {
    try {
      const modal = new ModalBuilder()
        .setCustomId("log")
        .setTitle(modalTitle);

      // todo: validate
      parameters.forEach((parameter) => {
        let input = new TextInputBuilder()
          .setCustomId(`log_${parameter.id}`)
          .setLabel(`${parameter.name} (単位：${parameter.unit})`)
          .setStyle(TextInputStyle.Short);

        let actionRow = new ActionRowBuilder();
        actionRow.addComponents(input);
        modal.addComponents(actionRow);
      })

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `ERR: ${error}`, ephemeral: true });
    }
  }
}
