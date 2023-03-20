<script>
	import { Router, Link, Route } from 'svelte-routing';
	import { user } from '../user-store.js';

	let username = '';
	let password = '';

	const errors = []
	async function login() {
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
						username: username,
					};
				case 400:
					errors.push(await response.json())
				case 401:
					errors.push(await response.json())
				case 500:
					errors.push("Internal Server Error")
			}
		} catch (error) {
			errors.push(error)
		}
	}
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
	{#if errors.length > 0}
		{#each errors as error}
			<div class="container">
				<div class="row">
					<div class="col-sm">
						{error}
					</div>
				</div>
			</div>
		{/each}
	{:else if !$user.isLoggedIn}
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
			</form>
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
	{:else}
		<div class="container" id="pad-top-10">
			<div class="row justify-content-md-center">
				<div class="col-md-auto">LOGGED IN</div>
			</div>
		</div>
	{/if}
</div>
