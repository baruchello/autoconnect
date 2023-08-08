class Event {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
    }
}

module.exports = Event