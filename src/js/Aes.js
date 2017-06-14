import * as CryptoJS from 'crypto-js';

class Aes {
  /**
   * encrypt a message
   * @param  {string} message    message to encrypt
   * @param  {string} passphrase passphrase to use
   * @return {string}            encrypted message
   */
  encrypt(message, passphrase) {
    return CryptoJS.AES.encrypt(message, passphrase).toString();
  }

  /**
   * decrypt a message
   * @param  {string} message    encrypted message
   * @param  {string} passphrase passphrase used to encrypt the message
   * @return {string}            decrypted message
   */
  decrypt(message, passphrase) {
    return CryptoJS.AES.decrypt(message, passphrase).toString(CryptoJS.enc.Utf8);
  }
}