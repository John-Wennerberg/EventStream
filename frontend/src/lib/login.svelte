<script>
	import { accounts } from './data.js';

	var isLoggedIn = false;
	document.addEventListener('DOMContentLoaded', function () {
		const accountInformation = document.querySelectorAll('input');
		const button = document.querySelector('button');

		button.addEventListener('click', function (event) {
      debugger
			event.preventDefault();
			accounts.forEach(function(account){
        if(account.username == accountInformation[0].innerText){
          if(account.password == accountInformation[1].innerText){
            isLoggedIn = true;
          } else{
            //TODO
          }
        }
      })
		});
	});
</script>

<body>
	<div class="row row-cols-1">
		<div class="row row-cols-2">
			<div class="col">
				<h1 class="headline headline-align-left">Cool Event Page</h1>
			</div>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div class="row row-cols-2">
			<form class="center-aligned">
				<div>
					<input class="margin-top" type="text" placeholder="Username:" name="username" />
				</div>
				<div>
					<input class="margin-top" type="password" placeholder="Password:" name="password" />
				</div>
				<div>
					<button class="button-std login-button margin-top" type="submit">Login</button>
				</div>
			</form>
		</div>
		<div>
			{#if isLoggedIn}
				<p class="headline">Your are logged in</p>
			{:else}
				<p class="headline">You are not logged in</p>
			{/if}
		</div>
	</div>
</body>
