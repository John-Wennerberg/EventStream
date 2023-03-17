<script>
	import { accounts } from './data.js';
	import { user } from '../user-store.js'

</script>

<head />

<div>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 id="text-color">My Account</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<div class="container" id="pad-top-10">
		<div class="row justify-content-md-center" id="text-color">
			<div class="col-lg-1">Username:</div>
			<div class="col-lg-2">
				{$user.username}
<<<<<<< HEAD:frontend/src/lib/my-account.svelte
			</div>
		</div>
	</div>
</div>


<!-- 

<div>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 id="text-color">My Account</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<div class="container" id="pad-top-10">
		<div class="row justify-content-md-center" id="text-color">
			<div class="col-lg-1">Username:</div>
			<div class="col-lg-2">
				{#each accounts as account}
					{#if account.username == myUsername}
						{account.username}
					{/if}
				{/each}
			</div>
		</div>
		<div class="row justify-content-md-center" id="text-color">
			<div class="col-lg-1">Email:</div>
			<div class="col-lg-2">
				{#each accounts as account}
					{#if account.username == myUsername}
						{account.email}
					{/if}
				{/each}
=======
>>>>>>> main:frontend/code/src/lib/my-account.svelte
			</div>
		</div>
	</div>
</div> -->
