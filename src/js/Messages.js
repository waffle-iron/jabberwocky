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
    
    el.value += data.user + ': ' + this.aes.decrypt(data.message, data.user) + "\n";
    let msg = document.createElement("div");
    let date = document.createElement("span");
    let user = document.createElement("span");
    let content = document.createElement("span");

    msg.className = "msg";
    date.className = "date";
    user.className = "user";
    content.className = "content";

    let ts = new Date(data.date);
    let m = ts.getMonth() + 1;
    let d = ts.getDate();
    let y = ts.getFullYear();
    ts = m + "/" + d + "/" + y;

    let textUser = document.createTextNode(data.user)
    let textDate = document.createTextNode(ts)
    let textContent = document.createTextNode(data.message)

    date.appendChild(textDate)
    user.appendChild(textUser)
    content.appendChild(textContent)

    msg.appendChild(user);
    msg.appendChild(date);
    msg.appendChild(content);
    el.appendChild(msg);

    //el.value += data.date + "\n";
    //el.value += data.user + ': ' + data.message + "\n";
    el.scrollTop = el.scrollHeight;
  }
}
