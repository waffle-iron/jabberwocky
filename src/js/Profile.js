class Profile {
  constructor(database) {
    this.database = database;
    this.nickname = 'pond hoe';
  }
  load() {
    var self = this;

    let profile = document.getElementById('profile');
    let container = document.getElementById('head_main');
    let clone = document.importNode(profile.content, true);
    container.appendChild(clone);
    let profile__save = document.getElementById('profile__save');
    profile__save.onclick = function() {
      let nicknameEl = document.getElementById('nickname');
      self.nickname = nicknameEl.value;
      return self.database.ref('profiles/' + firebase.auth().getUid() + '/').set({
        'date': Date(),
        'nickname': nicknameEl.value
      }).key;
    };
  }

  getNick() {

  }
}
