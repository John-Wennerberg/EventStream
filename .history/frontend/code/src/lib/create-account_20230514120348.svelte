<script>
    import { user } from "../user-store";


	let username = '';
	let password = '';
	let showMessage = false;

	function validationErrors(username, password) {
    if (username.length < 2) {
        return 'Username must be at least 2 characters long.';
    } else if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
}
	async function createAccount() {
		const account = {
			username,
			password,
		};   
		const errorMessage = validationErrors(username, password);
		const errorElement = document.querySelector("#Error") 
    if (errorMessage) {
		if(errorElement instanceof HTMLElement){
			errorElement.textContent = errorMessage;
			errorElement.style.color = "red";
		}
        return; // Stop the function execution if there are validation errors
    }
		try {
			const response = await fetch('http://localhost:8080/createAccount', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(account),
			});
			if(response.status === 200){
				const successCreation = document.createElement('div');
				successCreation.textContent = "Account was Successfully Created! Redirecting you to Login page";
				successCreation.style.color = "green";
				document.querySelector("#Test").appendChild(successCreation);
				document.querySelector("#form-container").classList.add('hide');

				setTimeout(()=> {
					showMessage = true;
					window.location.href = "/login";
				}, 4000);
			}else if(response.status === 409) {
				const errorMessage = "Username Alredy Exists"
				if(errorElement instanceof HTMLElement){
					errorElement.textContent = errorMessage;
					errorElement.style.color = 'red'
				}
			}else {
				const failedCreation = document.createElement('div');
				failedCreation.textContent = "Account could not be created";
				failedCreation.style.color = "red"
				document.querySelector("#Test").appendChild(failedCreation)
				console.log("Account creeation failed:", await response.text())
			}
		} catch (error) {
			console.log(error);
		}
		//document.querySelector('#Test').insertAdjacentHTML('beforeend', JSON.stringify(account));
	}
</script>
<style>
#successMessage {
	visibility: hidden;
	opacity: 0;
	transform: scale(0.5);
	transition: visibility 0s, opacity 0.5s linear, transform 0.5s;
	color: green;
	margin-top: 20px;
	font-size: 1.5em;
}
#successMessage.show {
	visibility: visible;
	opacity: 1;
	transform: scale(1);
}


</style>


<div>
	<div id="form-container">
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
	</div>
	<div id="successMessage" class:show={showMessage}>
		Account was Successfully Created! Redirecting you to Login page.
	</div>
	<div id="Error"></div>
	<div id="Test" />

</div>
