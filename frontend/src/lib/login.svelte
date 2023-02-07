<script>
	import { accounts } from './data.js';
	import { Router, Link, Route } from 'svelte-routing';
	import CreateAccount from './create-account.svelte';



	let username = ""
	let password = ""


	var isLoggedIn = false;
	document.addEventListener('DOMContentLoaded', function () {
		const accountInformation = document.querySelectorAll('input');
		const button = document.querySelector('button');


		button.addEventListener('click', function (event) {
			debugger;
			event.preventDefault();
			accounts.forEach(function (account) {
				if (account.username == accountInformation[0].innerText) {
					if (account.password == accountInformation[1].innerText) {
						isLoggedIn = true;
					} else {
						//TODO
					}
				}
			});
		});
	});
</script>

<body>
	<div class="container">
		<div class="row">
			<div class="col-sm">
				<h1 id="text-color">Login</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<div class="container" id="pad-top-10">
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				<input type="text" placeholder="Username:" name="username" value={username} />
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				<input type="password" placeholder="Password:" name="password" value={password}/>
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				<form method="GET">
					<input class="btn btn-primary" id="login-button" type="submit" value="Login" />
				</form>
			</div>
		</div>
	</div>
	<div class="container" id="pad-top-2">
		<div class="row justify-content-md-center">
			<div class="col-md-auto" id="text-color">Don't have an account?</div>
		</div>
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				<Router>
					<Link to="/create-account">Sign up here</Link>
				</Router>
			</div>
		</div>
	</div>
	<main>
		<Route path="/create-account" component={CreateAccount} />
	</main>
</body>
