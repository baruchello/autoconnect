const { Client } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const chalk = require('chalk');

module.exports = class extends Client {
    constructor (options){
        super(options);

        this.commands = [];
        this.loadCommands();
        this.loadEvents();
    }

    registryCommands() {
        this.application.commands.set(this.commands);
    }

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path);

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`);

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`));
                const cmd = new (commandClass)(this);
                console.log(`${chalk.blue("Comando:")} ${chalk.magenta(cmd.name)} ${chalk.blue("descrição:")} ${chalk.magenta(cmd.description)} ${chalk.greenBright("✅")}\n`);

                this.commands.push(cmd);
            }
        }
    }

    loadEvents(path = 'src/events') {
        const categories = readdirSync(path);

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`);

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`));
                const evt = new (eventClass)(this);
                console.log(`${chalk.yellow("Evento:")} ${chalk.magenta(evt.description)} ${chalk.greenBright("✅")}\n`);

                this.on(evt.name, evt.run);
            }
        }
    }
}