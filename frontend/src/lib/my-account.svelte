<script>
    import { accounts } from './data.js'

    const myUsername = "John"

</script>

<head>

</head>

<body>
  <div class="row row-cols-1">
		<div class="col" id="text-align-left">
			<h1 id="left-align">My Account</h1>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div class="col" id="text-align-left">
      {#each accounts as account}
        {#if account.username == myUsername}
          <p>Username: {account.username}</p>
          <p>Email: {account.email}</p>
        {/if}
      {/each}
		</div>
	</div>
</body>