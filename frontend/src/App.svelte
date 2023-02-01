<script>
	import { Router, Link, Route } from 'svelte-routing';
	import CreateAccount from './lib/create-account.svelte';
	import CreateEvent from './lib/create-event.svelte';
	import Login from './lib/login.svelte';
	import MyAccount from './lib/my-account.svelte';
	import MyEvents from './lib/my-events.svelte';
	import PassedEvents from './lib/passed-events.svelte';
	import Start from './lib/start.svelte';

	const isLoggedIn = true;
</script>

<head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
		crossorigin="anonymous"
	/>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
		crossorigin="anonymous"
	></script>
	<link href="layout.css" rel="stylesheet" />
</head>

<body>
	<Router>
		<nav class="navbar-nav">
			<Link to="/">Home</Link>
			<Link to="/passed-events">Passed Events</Link>
			{#if isLoggedIn}
				<Link to="/create-event">Create Event</Link>
				<Link to="/my-events">My Events</Link>
				<Link to="/my-account">My Account</Link>
			{:else}
				<Link to="/create-account">Create Account</Link>
			{/if}
		</nav>
		<main>
			<Route path="/" component={Start} />
			<Route path="/passed-events" component={PassedEvents} />
			<Route path="/create-event" component={CreateEvent} />
			<Route path="/my-events" component={MyEvents} />
			<Route path="/my-account" component={MyAccount} />
			<Route path="/create-accpunt" component={CreateAccount} />
		</main>
	</Router>
</body>
