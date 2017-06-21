class Encryption {
  /**
   * encrypt a message
   * @param  {string} message    message to encrypt
   * @param  {string} passphrase passphrase to use
   * @return {string}            encrypted message
   */
  static encrypt(message, passphrase) {
    return CryptoJS.AES.encrypt(message, passphrase).toString();
  }

  /**
   * decrypt a message
   * @param  {string} message    encrypted message
   * @param  {string} passphrase passphrase used to encrypt the message
   * @return {string}            decrypted message
   */
  static decrypt(message, passphrase) {
    return CryptoJS.AES.decrypt(message, passphrase).toString(CryptoJS.enc.Utf8);
  }
}
