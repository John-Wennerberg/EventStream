<script>
	import { accounts } from './data.js';
	import { Router, Link, Route } from 'svelte-routing';
    import { prevent_default } from 'svelte/internal';




	let username = ""
	let password = ""
	let error = ""


	var isLoggedIn = false;
	document.addEventListener('DOMContentLoaded', function () {
		
		const accountInformation = document.querySelectorAll('input');
		const button = document.querySelector('button');


		button.addEventListener('click', function (event) {
			
			event.preventDefault();
			error = ""
			console.log(accounts)
			let found=false
			accounts.forEach(function (account) { 
				console.log(account)
					if (account.username == accountInformation[0].value && account.password == accountInformation[1].value && found == false) {
						isLoggedIn = true;
						found = true;
						console.log("login success")

					} 
			});
			if (found==false) {
				console.log(accountInformation[0].value)
				console.log("EROROOROROROROOROROR")
				error = "Wrong username or password"
			}


		});
	});
</script>

<div>
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
					<button class="btn btn-primary" id="login-button" type="submit" value="Login" >Login </button>
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
			<div>
				{#if error}
					<div class="row justify-content-md-center">
						<div class="col-md-auto" style="color: red;">{error}</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
