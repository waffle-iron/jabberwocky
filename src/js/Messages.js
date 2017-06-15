class Messages {
  constructor(database, aes) {
    this.database = database;
    this.aes = aes;
  }

  send(message) {
    this.database.ref('messages/').push({
      'message': message
    }).key;
  }
  
  read() {}
}
