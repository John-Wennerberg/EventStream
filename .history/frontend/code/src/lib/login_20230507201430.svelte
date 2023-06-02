	<script>
		import { Router, Link, Route, navigate } from 'svelte-routing';
		import { user } from '../user-store.js';
		import { tick } from 'svelte';
    import { accounts } from './data.js';

		let username = '';
		let password = '';
		let inccorectUsernameOrPassword = false

		const errors = []

		$: {
			if (errors.length > 0){
				console.log("Errors updated:", errors)
			}
		}


		async function login() {
			errors.length = 0;
			
			if (!username || username.trim() === '') {
				errors.push('Username cannot be empty.');
				return
			}
			if (!password || password.trim() === '') {
				errors.push('Password cannot be empty.');
				return
			}
			if(inccorectUsernameOrPassword === true){
				errors.push("Wrong Username or password")
				return
			}
			
			try {
				const response = await fetch('http://localhost:8080/tokens', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(
						password
					)}`,
				});
				const body = await response.json();
				switch (response.status) {
					case 200:
						const accessToken = body.access_token;
						$user = {
							isLoggedIn: true,
							accessToken,
							username: username
						};
						navigate("/");
						break;
					case 400:
						errors.push("Incorreect username or password");
						break;
					case 401:
						errors.push("Incorrect username or password");
						inccorectUsernameOrPassword = true;
						break;
					case 500:
						errors.push(body.error); /*"Internal Server Error");*/
						break;
				}
			} catch (error) {
				errors.push(error)
				await tick();
			}
		}
	</script>

	<style>
		.error-list {
			list-style: none;
			padding: 0;
			margin-top: 1em;
			color: red;
		}
	</style>

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
		{#if !$user.isLoggedIn}
		<div class="container" id="pad-top-10">
		<form on:submit|preventDefault={login}>
			<div class="row justify-content-md-center">
			<div class="col-lg-1" id="text-color">Username:</div>
			<div class="col-md-auto">
				<input type="text" placeholder="Username:" bind:value={username} />
			</div>
			</div>
			<div class="row justify-content-md-center">
			<div class="col-lg-1" id="text-color">Password:</div>
			<div class="col-md-auto">
				<input type="password" placeholder="Password:" bind:value={password} />
			</div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<input class="btn btn-primary" id="login-button" type="submit" value="Login" />
				</div>
			</div>
			{#if errors.length > 0}
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<ul class="error-list">
						{#each errors as error}
							<p>{error}</p>
						{/each}
					</ul>
				</div>
			</div>
			{/if}
		</form>
		</div>
		<div class="container" id="pad-top-2">
		<div class="row justify-content-md-center">
			<div class="col-md-auto" id="text-color">Don't have an account?</div>
		</div>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<Link to="/create-account">Sign up here</Link>
				</div>
			</div>
		</div>
		{:else}
		<div class="container" id="pad-top-10">
			<div class="row justify-content-md-center">
				<div class="col-md-auto">LOGGED IN</div>
			</div>
		</div>
		{/if}
	</div>


