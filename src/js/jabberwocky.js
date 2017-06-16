let auth = new Auth(firebase.auth());
let database = firebase.database();
let main = document.getElementById('main');
console.log(auth.user);
if(!auth.user) {
	let login = document.getElementById('login');
	let clone = document.importNode(login.content, true);
	main.appendChild(clone);
	let loginBtn = document.getElementById('login__btn');
	loginBtn.onclick = function() {
		let username = document.getElementById('username');
		let password = document.getElementById('password');
		console.log('username', username.value);
		let result = auth.signIn(username.value, password.value);
	};
} else {
	console.log('logged in');
}

//let result = auth.createUser('test@example.com', 'password');
//auth.signIn('test@example.com', 'password');
//console.log(result);



let messages = new Messages(database, new Aes);
//messages.send('hello');

// let send = document.getElementById('send');
// send.onclick = function() {
// 	let msgBox = document.getElementById('msg');
// 	messages.send(msgBox.value);
// 	msgBox.value = '';
// };
// messages.read('msgs');
