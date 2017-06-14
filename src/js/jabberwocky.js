let aes = new Aes;

let msg = aes.encrypt('hello'/*message*/, 'hello'/*passphrase*/);
console.log(msg);
console.log(aes.decrypt(msg, 'hello'));
