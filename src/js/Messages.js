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
    el.value += data.message + "\n";
    el.scrollTop = el.scrollHeight;
  }
}
