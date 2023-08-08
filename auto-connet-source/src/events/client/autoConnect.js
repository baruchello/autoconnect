const Event = require('../../structures/Event');
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi(process.env.ipservidor);
const chalk = require('chalk');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Interaction } = require('discord.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready',
            description: 'Auto Connect'
        })
    }

    run = async (client) => {
        try {
            console.log(chalk.greenBright(`${this.client.user.username} ON`));

            this.client.registryCommands();
            client.user.setActivity("By: Frost Devs");
            client.user.setStatus("dnd");

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel(`FiveM`)
                        .setEmoji(process.env.emojiFivem)
                        .setStyle('LINK')
                        .setURL(process.env.fivemURL),
                )

            await this.client.channels.cache.get(process.env.canalAutoConnect).bulkDelete(100).catch(() => console.error)


            server.getPlayers().then(async (data) => {
                let result = [];
                let index = 1;
                for (let player of data) {
                    result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping`);
                }

                server.getMaxPlayers().then((res) => {

                    const embed = new MessageEmbed()
                        .setDescription(`Utilize os links para acessar nosso servidor.`)
                        .setThumbnail(process.env.thumbnail)
                        .setColor(process.env.COR)
                        .addFields(
                            {
                                name: "**Status:**",
                                value: '**```yaml\nOnline```**',
                                inline: true
                            },
                            {
                                name: "**Players:**",
                                value: "**```ini" + `\n[ ${data.length}/${res} ]` + "```**",
                                inline: true
                            },
                            {
                                name: "**Fivem**",
                                value: "**```fix\n" + process.env.ipserver + "```**"
                            },
                            {
                                name: "**TS**",
                                value: "**```fix\n" + process.env.ipts + "```**"
                            }
                        )

                    this.client.channels.cache.get(process.env.canalAutoConnect).send({ embeds: [embed], components: [row] }).then((msg) => {

                        setInterval(() => {
                            server.getPlayers().then(async (data) => {
                                let players = [];
                                let index = 1;
                                for (let player of data) {
                                    players.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping`);
                                }

                                const embed = new MessageEmbed()
                                    .setDescription(`Utilize os links para acessar nosso servidor.`)
                                    .setThumbnail(process.env.thumbnail)
                                    .setColor(process.env.COR)
                                    .addFields(
                                        {
                                            name: "**Status:**",
                                            value: '**```yaml\nOnline```**',
                                            inline: true
                                        },
                                        {
                                            name: "**Players:**",
                                            value: "**```ini" + `\n[ ${data.length}/${res} ]` + "```**",
                                            inline: true
                                        },
                                        {
                                            name: "**Fivem**",
                                            value: "**```fix\n" + process.env.ipserver + "```**"
                                        },
                                        {
                                            name: "**TS**",
                                            value: "**```fix\n" + process.env.ipts + "```**"
                                        }
                                    )

                                msg.edit({ embeds: [embed], components: [row] });

                            }).catch(err => {
                                const embedErro = new MessageEmbed()
                                    .setThumbnail(process.env.thumbnail)
                                    .setColor(process.env.COR)
                                    .addFields(
                                        {
                                            name: "**Status:**",
                                            value: '**```yaml\nOffline```**',
                                            inline: true
                                        },
                                        {
                                            name: "**Players:**",
                                            value: "**```ini" + `\n[ 0/0 ]` + "```**",
                                            inline: true
                                        },
                                        {
                                            name: "**Fivem**",
                                            value: "**```fix\n" + process.env.ipserver + "```**"
                                        },
                                        {
                                            name: "**TS**",
                                            value: "**```fix\n" + process.env.ipts + "```**"
                                        }
                                    )

                                return msg.edit({ embeds: [embedErro], components: [row] });
                            });
                        }, 60000)
                    })
                }).catch(err => {
                    return console.log("Oi2")
                });
            }).catch(err => {
                const embedErro = new MessageEmbed()
                    .setThumbnail(process.env.thumbnail)
                    .setColor(process.env.COR)
                    .addFields(
                        {
                            name: "**Status:**",
                            value: '**```yaml\nOffline```**',
                            inline: true
                        },
                        {
                            name: "**Players:**",
                            value: "**```ini" + `\n[ 0/0 ]` + "```**",
                            inline: true
                        },
                        {
                            name: "**Fivem**",
                            value: "**```fix\n" + process.env.ipserver + "```**"
                        },
                        {
                            name: "**TS**",
                            value: "**```fix\n" + process.env.ipts + "```**"
                        }
                    )

                return this.client.channels.cache.get(process.env.canalAutoConnect).send({ embeds: [embedErro], components: [row] }).then((msg) => {
                    setInterval(() => {
                        server.getMaxPlayers().then((res) => {
                            server.getPlayers().then(async (data) => {
                                let players = [];
                                let index = 1;
                                for (let player of data) {
                                    players.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping`);
                                }

                                const embed = new MessageEmbed()
                                    .setDescription(`Utilize os links para acessar nosso servidor.`)
                                    .setThumbnail(process.env.thumbnail)
                                    .setColor(process.env.COR)
                                    .addFields(
                                        {
                                            name: "**Status:**",
                                            value: '**```yaml\nOnline```**',
                                            inline: true
                                        },
                                        {
                                            name: "**Players:**",
                                            value: "**```ini" + `\n[ ${data.length}/${res} ]` + "```**",
                                            inline: true
                                        },
                                        {
                                            name: "**Fivem**",
                                            value: "**```fix\n" + process.env.ipserver + "```**"
                                        },
                                        {
                                            name: "**TS**",
                                            value: "**```fix\n" + process.env.ipts + "```**"
                                        }
                                    )

                                msg.edit({ embeds: [embed], components: [row] });

                            }).catch(err => {
                                const embedErro = new MessageEmbed()
                                    .setThumbnail(process.env.thumbnail)
                                    .setColor(process.env.COR)
                                    .addFields(
                                        {
                                            name: "**Status:**",
                                            value: '**```yaml\nOffline```**',
                                            inline: true
                                        },
                                        {
                                            name: "**Players:**",
                                            value: "**```ini" + `\n[ 0/0 ]` + "```**",
                                            inline: true
                                        },
                                        {
                                            name: "**Fivem**",
                                            value: "**```fix\n" + process.env.ipserver + "```**"
                                        },
                                        {
                                            name: "**TS**",
                                            value: "**```fix\n" + process.env.ipts + "```**"
                                        }
                                    )

                                return msg.edit({ embeds: [embedErro], components: [row] });
                            });
                        })
                            .catch(err => {
                                const embedErro = new MessageEmbed()
                                    .setThumbnail(process.env.thumbnail)
                                    .setColor(process.env.COR)
                                    .addFields(
                                        {
                                            name: "**Status:**",
                                            value: '**```yaml\nOffline```**',
                                            inline: true
                                        },
                                        {
                                            name: "**Players:**",
                                            value: "**```ini" + `\n[ 0/0 ]` + "```**",
                                            inline: true
                                        },
                                        {
                                            name: "**Fivem**",
                                            value: "**```fix\n" + process.env.ipserver + "```**"
                                        },
                                        {
                                            name: "**TS**",
                                            value: "**```fix\n" + process.env.ipts + "```**"
                                        }
                                    )

                                return msg.edit({ embeds: [embedErro], components: [row] });
                            });
                    }, 60000)
                })
            })
        } catch (error) {
            return console.error(chalk.red(`Erro ignorado no evento ${this.description} -`), error);
        }
    }
}