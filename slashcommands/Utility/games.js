const Discord = require('discord.js');
const { Snake, Minesweeper, MatchPairs, TicTacToe, FindEmoji, TwoZeroFourEight, Connect4, Flood, GuessThePokemon, Hangman, Slots, FastType, Emojify, Wordle, Trivia } = require('discord-gamecord');


module.exports = {
  name: 'game',
  description: 'jogos divertidos',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'roll',
      description: 'Gire um dado com 6 lados',
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'lados',
          description: 'escolha uma numeração entre 1 e 6',
          type: Discord.ApplicationCommandOptionType.Integer,
          required: true,

        },
      ],
    },
    {
      name: 'coinflip',
      description: 'Jogar cara ou coroa',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
     {
      name: 'snake',
      description: 'Jogo da cobrinha',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'mina',
      description: 'Jogo da mina',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'memoria',
      description: 'Jogo da memória',
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'emojis',
          description: 'Memory Game.',
          type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "comida",
              value: "100",

            },
            {
              name: "bandeira",
              value: "10",

            },
            {
              name: "animals",
              value: "11",

            },
            {
              name: "sport",
              value: "12",

            },
            {
              name: "cars",
              value: "13",

            },
          ],

        },
      ],
    },
    {
      name: 'ppt',
      description: 'Jogo de Pedra, Papel e Tesoura',
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [

        {

          name: 'jogada',

          description: 'Escolha sua jogada: pedra, papel ou tesoura.',

          type: Discord.ApplicationCommandOptionType.String,

          required: true,

          choices: [

            {

              name: 'Pedra',

              value: 'pedra'

            },

            {

              name: 'Papel',

              value: 'papel'

            },

            {

              name: 'Tesoura',

              value: 'tesoura'

            },

          ],
        },
      ],
    },
    {
      name: 'find-emoji',
      description: 'Escolha um Emoji',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: '2048',
      description: 'some os números até o máximo que conseguir',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'conect4',
      description: 'chame alguma amizade sua, para jogar',
      type:
        Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'oponente',
          description: 'Escolha um oponente',
          type:
            Discord.ApplicationCommandOptionType.User,
          required: true,
        }
      ]
    },
    {
      name: 'flood',
      description: 'jogo da enchente',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'pokemon',
      description: 'Adivinhe o nome do Pokémon',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'hangman',
      description: 'Joguinho da forca',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'slots',
      description: 'jogo de slots, boa sorte',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'ttt',
      description: 'Jogo da Velha',
      type:
        Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'jogador',
          description: 'Convide um jogador',
          type: Discord.ApplicationCommandOptionType.User,
          required: true,
        }
      ]
    },
    {
      name: 'fast-type',
      description: 'Escreva a frase rápido',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'emojify',
      description: 'transforma uma palavra em emoji',
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'palavra',
          description: 'Escreva uma palavra',
          type: Discord.ApplicationCommandOptionType.String,
          required: true,
        }
      ]
    },
    {
      name: 'wordle',
      description: ' Adivinhe a palavra que tenha 5 letras',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'trivia',
      description: 'Acerte uma pergunta',
      type: Discord.ApplicationCommandOptionType.Subcommand,
    }
  ],


  async run(client, interaction, args) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'roll':
        const lados = interaction.options.getInteger("lados");
        if (lados < 1 || lados > 6) {
          const errorEmbed = new Discord.EmbedBuilder()
            .setColor('#ff0000')
            .setDescription("A numeração do dado que você escolher deve estar entre 1 e 6.");
          return interaction.reply({
            embeds: [errorEmbed],
            ephemeral: true
          });
        }

        const result = Math.floor(Math.random() * Math.min(lados)) + 1;

        const successEmbed = new Discord.EmbedBuilder()
          .setColor('#8C9FFF')
          .setDescription(
            `🎲 | Você rolou um dado com a numeração ${lados} e conseguiu ${result}!`
          );
        return interaction.reply({
          embeds: [successEmbed],
          ephemeral: false,
        });
        break;
      case 'coinflip':
        const results = Math.floor(Math.random() * 2);

        // Define o resultado como "cara" ou "coroa"
        let outcome = results === 0 ? '<:coroa:1088631447646130197> • Cara!' : '<:cara:1088631487101935676> • Coroa!';
        let embed = new Discord.EmbedBuilder()
          .setTitle('Cara ou Coroa?')
          .setDescription(outcome)
          .setColor('#8C9FFF')
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
        break;
      case 'snake':
        new Snake({
          message: interaction,
          embed: {
            title: 'Jogo da Cobrinha',
            color: '#8C9FFF',
            OverTitle: "Fim de Jogo!",
          },
          snake: { head: '🟢', body: '🟩', tail: '🟢' },
          emojis: {
            board: '⬛',
            food: '🍎',
            up: '⬆️',
            right: '➡️',
            down: '⬇️',
            left: '⬅️',
          },
        }).startGame()
        break;
      case 'mina':
        const Game = new Minesweeper({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Mina de bombas',
            color: "#8C9FFF",
            description: 'Clique em algum botão para jogar.'
          },
          emojis: { flag: '🚩', mine: '💣' },
          mines: 5,
          timeoutTime: 60000,
          winMessage: 'Parabéns! Você Ganhou, conseguiu cavar todas as partes sem explodir.',
          loseMessage: 'Você Perdeu, após você cavando, acabou caindo na bomba.',
          playerOnlyMessage: 'Apenas {player} pode usar estes botões'
        });

        Game.startGame();
        Game.on('gameOver', result => {
          console.log(result);
        });
        break;
      case 'memoria':
        let emojis = interaction.options.getString('emojis');

        if (emojis === '100') {
          const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '``comida Memory``',
              color: '#8C9FFF',
              description: 'Clique nos botões abaixo para encontrar os pares!',
            },
            timeoutTime: 6000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
          });

          Game.startGame();

        } else if (emojis === '10') {

          const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '``bandeira Memory``',
              color: '#8C9FFF',
              description: 'Clique nos botões abaixo para encontrar os pares!',
            },
            timeoutTime: 6000,
            emojis: ['🇧🇷', '🇧🇫', '🇨🇴', '🇨🇳', '🇫🇮', '🇦🇲', '🇦🇽', '🇦🇨', '🇬🇬', '🇬🇸', '🇯🇪', '🇯🇵', '🇮🇱'],
          });

          Game.startGame();

        } else if (emojis === '11') {

          const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '``animals Memory``',
              color: '#8C9FFF',
              description: 'Clique nos botões abaixo para encontrar os pares!',
            },
            timeoutTime: 6000,
            emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
          });

          Game.startGame();

        } else if (emojis === '12') {

          const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '``sport Memory``',
              color: '#8C9FFF',
              description: 'Clique nos botões abaixo para encontrar os pares!',
            },
            timeoutTime: 6000,
            emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎱', '🥏', '🏓', '🏸', '🏒', '⛳'],
          });

          Game.startGame();

        } else if (emojis === '13') {

          const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '``cars Memory``',
              color: '#8C9FFF',
              description: 'Clique nos botões abaixo para encontrar os pares!',
            },
            timeoutTime: 6000,
            emojis: ['🚔', '🚗', '🚙', '🛺', '🚌', '🚕', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚛'],
          });

          Game.startGame();
        };
        break;
      case 'ppt':
        const jogada = interaction.options.getString('jogada');

        const escolhas = ['pedra', 'papel', 'tesoura'];



        if (!escolhas.includes(jogada)) {
          WhizDigy2 = new Discord.EmbedBuilder()
            .setTitle('Erro!')
            .setDescription('Escolha inválida. Por favor, escolha pedra,papel ou tesoura.')
            .setColor('#ff0000');
          return interaction.reply({ embeds: [WhizDigy2], ephmeral: true });

        }



        const escolhaBot = escolhas[Math.floor(Math.random() * escolhas.length)];



        let resultado;



        if (jogada === escolhaBot) {

          resultado = 'Empate!';

        } else if (

          (jogada === 'pedra' && escolhaBot === 'tesoura') ||

          (jogada === 'papel' && escolhaBot === 'pedra') ||

          (jogada === 'tesoura' && escolhaBot === 'papel')

        ) {

          resultado = 'Você venceu!';

        } else {

          resultado = 'Eu venci!';

        }



        const embeds1 = new Discord.EmbedBuilder()

          .setColor('#8C9FFF')

          .setTimestamp()

          .setTitle('Pedra Papel Tesoura')

          .addFields(

            { name: 'Sua Jogada', value: `${jogada}` },

            { name: 'Minha Jogada', value: `${escolhaBot}` },

            { name: 'Resultado', value: `${resultado}` }

          );



        return interaction.reply({ embeds: [embeds1] });
        break;
      case 'find-emoji':
        const Games = new FindEmoji({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Encontrar Emoji',
            color: '#8C9FFF',
            description: 'Lembre-se dos emojis do quadro abaixo.',
            findDescription: 'Encontra o emoji {emoji} antes que o tempo acabe.'
          },
          timeoutTime: 60000,
          hideEmojiTime: 5000,
          buttonStyle: 'Primary',
          emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
          winMessage: 'Você ganhou! Você selecionou o emoji correto. {emoji}',
          loseMessage: 'Você perdeu! Você selecionou o emoji errado. {emoji}',
          timeoutMessage: 'Você perdeu! Acabou seu tempo. o emoji era {emoji}',
          playerOnlyMessage: 'Apenas {player} pode usar estes botões.'
        });

        Games.startGame();
        break;
      case '2048':
        const TZFE = new TwoZeroFourEight({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: '2048',
            color: '#8C9FFF'
          },
          emojis: {
            up: '⬆️',
            down: '⬇️',
            left: '⬅️',
            right: '➡️',
          },
          timeoutTime: 60000,
          buttonStyle: 'Primary',
          playerOnlyMessage: 'Apenas {player} pode usar esses botões.'
        });

        TZFE.startGame();
        break;
      case 'conect4':
        const opponent = interaction.options.getUser('oponente');

        const Ct4 = new Connect4({
          message: interaction,
          isSlashGame: true,
          opponent: opponent,
          embed: {
            title: 'Jogo Connect4',
            statusTitle: 'Status',
            color: '#8C9FFF'
          },
          emojis: {
            board: '⚪',
            player1: '🔴',
            player2: '🟡'
          },
          mentionUser: true,
          timeoutTime: 60000,
          buttonStyle: 'Primary',
          turnMessage: '{emoji} | Sua vez de jogar **{player}**.',
          winMessage: '{emoji} | **{player}** ganhou o jogo Connect4.',
          tieMessage: 'O Jogo empatou! Ninguém ganhou o jogo!',
          timeoutMessage: 'O jogo ficou inacabado! Ninguém ganhou o jogo!',
          playerOnlyMessage: 'Apenas {player} e {opponent} podem usar estes botões.'
        });

        Ct4.startGame();
        break;
      case 'flood':
        const Fld = new Flood({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Flood',
            color: '#8C9FFF',
          },
          difficulty: 8,
          timeoutTime: 60000,
          buttonStyle: 'Primary',
          emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
          winMessage: 'Você ganhou! Você fez **{turns}** turnos.',
          loseMessage: 'Você perdeu! Você fez **{turns}** turnos.',
          playerOnlyMessage: 'Apenas {player} pode usar esses botões.'
        });

        Fld.startGame();
        break;
      case 'pokemon':
        const GTP = new GuessThePokemon({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Quem é esse Pokémon?',
            color: '#8C9FFF'
          },
          timeoutTime: 60000,
          winMessage: 'Você adivinhou! O Pokémon ara __**{pokemon}**__.',
          loseMessage: 'Mais sorte da próxima vez! O pokémon era __**{pokemon}**__.',
          errMessage: 'Não foi possível buscar os dados do pokémon! Por favor, tente novamente.',
          playerOnlyMessage: 'Apenas __{player}__ pode usar esses botões.'
        });

        GTP.startGame();
        break;
      case 'hangman':
        const words = ['WhizDiggy', 'Whiz', 'Discord', 'Ferinha'];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const Hang = new Hangman({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Hangman',
            color: '#8C9FFF'
          },
          hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
          customWord: randomWord,
          timeoutTime: 60000,
          theme: 'discord',
          winMessage: 'Você ganhou! A palavra era **{word}**.',
          loseMessage: 'Você perdeu! A palavra era **{word}**.',
          playerOnlyMessage: 'Apenas {player} pode usar estes botões.'
        });

        Hang.startGame();
        break;
      case 'slots':
        const Slot = new Slots({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Slot Machine',
            color: '#8C9FFF'
          },
          slots: ['🍇', '🍊', '🍋', '🍌']
        });

        Slot.startGame();
        break;
      case 'ttt':
        const player = interaction.options.getUser('jogador')
        const TTT = new TicTacToe({
          message: interaction,
          isSlashGame: true,
          opponent: player,
          embed: {
            title: 'Tic Tac Toe',
            color: '#8C9FFF',
            statusTitle: 'Status',
            overTitle: 'Game Over'
          },
          emojis: {
            xButton: '<:xx:1094356647662587995>',
            oButton: '<:oo:1094356804177236028>',
            blankButton: '➖'
          },
          mentionUser: true,
          timeoutTime: 60000,
          xButtonStyle: 'Danger',
          oButtonStyle: 'Primary',
          turnMessage: '{emoji} | Sua vez de jogar **{player}**.',
          winMessage: '{emoji} | **{player}** ganhou o jogo TicTacToe.',
          tieMessage: 'O Jogo empatou! Ninguém ganhou!',
          timeoutMessage: 'O jogo ficou inacabado! Ninguém ganhou!',
          playerOnlyMessage: 'Apenas {player} e {opponent} podem usar estes botões.'
        });

        TTT.startGame();
        break;
      case 'fast-type':
        const FT = new FastType({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Fast Type',
            color: '#8C9FFF',
            description: 'Você tem {time} segundos para digitar a frase abaixo.'
          },
          timeoutTime: 60000,
          sentence: 'Algumas frases muito legais para digitar rapidamente.',
          winMessage: 'Você ganhou! Você terminou a corrida de tipo em {time} segundos com wpm de {wpm}.',
          loseMessage: 'Você perdeu! Você não digitou a frase correta a tempo.',
        });

        FT.startGame();
        break;
      case 'emojify':
        const text = interaction.options.getString('palavra');
        const result_ = await Emojify(text);
        interaction.reply(result_);
        break;
      case 'wordle':
        const Wor = new Wordle({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Wordle',
            color: '#8C9FFF',
          },
          customWord: null,
          timeoutTime: 60000,
          winMessage: 'Você ganhou! A palavra era **{word}**.',
          loseMessage: 'Você perdeu! a palavra era **{word}**.',
          playerOnlyMessage: 'Apenas {player} pode usar esses botões.'
        });

        Wor.startGame();
        break;
      case 'trivia':
        const Tr = new Trivia({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Trivia',
            color: '#8C9FFF',
            description: 'Você tem 60 segundos para adivinhar a resposta.'
          },
          timeoutTime: 60000,
          buttonStyle: 'Primary',
          trueButtonStyle: 'Success',
          falseButtonStyle: 'Danger',
          mode: 'multiple', 
          difficulty: 'medium', 
          winMessage: 'Você ganhou! A resposta correta era {answer}.',
          loseMessage: 'Você perdeu! A palavra correta era {answer}.',
          errMessage: 'Não foi possível buscar os dados da pergunta! Por favor, tente novamente.',
          playerOnlyMessage: 'Apenas {player} pode usar estes botões.'
        });

        Tr.startGame();
        break;
      default:
        WhizDigy = new Discord.EmbedBuilder()
          .setTitle('Erro!')
          .setDescription('Houve um erro inesperado, por favor, tente novamente.')
          .setColor('#ff0000');
        interaction.reply({ embeds: [WhizDigy], ephemeral: true })
    }
  },
};