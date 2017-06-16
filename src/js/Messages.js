class Messages {
  constructor(database, aes) {
    this.database = database;
    this.aes = aes;
  }

  send(message, from) {
    return this.database.ref('messages/').push({
      'date': Date(),
      'user': from,
      'message': message
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
    el.value += data.user + ': ' + data.message + "\n";
    el.scrollTop = el.scrollHeight;
  }
}
