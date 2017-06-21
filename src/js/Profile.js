class Profile {
  constructor(database) {
    this.database = database;
    this.nickname = 'pond hoe';
  }
  load() {
    var self = this;

    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/profiles/' + userId).once('value').then(function(snapshot) {
      let nickname = snapshot.val().nickname;
      self.nickname = nickname;
    });

    let profile = document.getElementById('profile');
    let container = document.getElementById('main');
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
}
