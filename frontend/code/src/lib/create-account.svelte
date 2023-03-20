<script>
	let username = '';
	let password = '';

	async function createAccount() {
		const account = {
			username,
			password,
		};
		try {
			const response = await fetch('http://localhost:8080/createAccount', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(account),
			});
		} catch (error) {
			console.log(error);
		}
		document.querySelector('#Test').insertAdjacentHTML('beforeend', JSON.stringify(account));
	}
</script>

<div>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 id="text-color">Create Account</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<form on:submit|preventDefault={createAccount}>
		<div class="container" id="pad-top-10">
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
			<div class="row justify-content-md-center" id="pad-top-1">
				<div class="col-md-auto">
					<input class="btn btn-primary" id="login-button" type="submit" value="Sign Up" />
				</div>
			</div>
		</div>
	</form>
	<div id="Test" />
</div>
