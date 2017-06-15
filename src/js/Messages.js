class Messages {
  constructor(database, aes) {
    this.database = database;
    this.aes = aes;
  }

  send(message) {
    return this.database.ref('messages/').push({
      'date': Date(),
      'message': message
    }).key;
  }

  read() {}
}
