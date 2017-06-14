import * as CryptoJS from 'crypto-js';

class Aes {
  encrypt(message, passphrase) {
    return CryptoJS.AES.encrypt(message, passphrase).toString();
  }

  decrypt(message, passphrase) {
    return CryptoJS.AES.decrypt(message, passphrase).toString(CryptoJS.enc.Utf8);
  }
}
