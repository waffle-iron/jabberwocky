class Messages {
  constructor(database, aes) {
    this.database = database;
    this.aes = aes;
  }

  send(message, from) {
    var self = this;
    return this.database.ref('messages/').push({
      'date': Date(),
      'user': from,
      'message': self.aes.encrypt(message, from)
    }).key;
  }

  read(element) {
    let self = this;
    let msgsRef = firebase.database().ref('messages/');
    msgsRef.on('child_added', function(data) {
      self.update(element, data.val());
    });
  }

  update(element, data) {
    let el = document.getElementById(element);
    el.value += data.date + "\n";
    el.value += data.user + ': ' + this.aes.decrypt(data.message, data.user) + "\n";
    el.scrollTop = el.scrollHeight;
  }
}
