class Message {
  send() {
    console.log('send');
  }

  update(element, data) {
    let el = document.getElementById(element);
        
    let msg = document.createElement('div');
    let date = document.createElement('span');
    let user = document.createElement('span');
    let content = document.createElement('span');

    msg.className = 'msg';
    date.className = 'date';
    user.className = 'user';
    content.className = 'content';

    let ts = new Date(data.date);
    let m = ts.getMonth() + 1;
    let d = ts.getDate();
    let y = ts.getFullYear();
    ts = m + '/' + d + '/' + y;

    let textUser = document.createTextNode(data.user);
    let textDate = document.createTextNode(ts);
    let textContent = document.createTextNode(
      encryption.decrypt(data.message, data.user)
    );

    date.appendChild(textDate);
    user.appendChild(textUser);
    content.appendChild(textContent);

    msg.appendChild(user);
    msg.appendChild(date);
    msg.appendChild(content);
    el.appendChild(msg);

    el.scrollTop = el.scrollHeight;
  }
}
