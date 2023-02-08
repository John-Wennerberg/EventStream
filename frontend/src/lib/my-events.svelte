<script>
	import { events } from './data.js';
	import { Router, Link, Route } from 'svelte-routing';
	import Event from './event.svelte';

  const myAccount = "John"
	let currentDate = new Date();
	let currentYear = currentDate.toLocaleString('default', { year: 'numeric' });
	let currentMonth = currentDate.toLocaleString('default', { month: '2-digit' });
	let currentDay = currentDate.toLocaleString('default', { day: '2-digit' });
	var formattedDate = currentYear + '-' + currentMonth + '-' + currentDay;

  var showCurrentEvents = true

	function swapEventButtonValue(swapEventButton, headline) {
		if (swapEventButton.innerText == 'Passed Events') {
			swapEventButton.innerText = 'Active Events'
      headline.innerText = 'My Passed Events'
      showCurrentEvents = false
		} else if( swapEventButton.innerText == 'Active Events'){
      swapEventButton.innerText = 'Passed Events'
      headline.innerText = 'My Current Events'
      showCurrentEvents = true
    }
	}

	document.addEventListener('DOMContentLoaded', function () {
		const headline = document.querySelector('h1');
		const swapEventButton = document.querySelector('button');

		swapEventButton.addEventListener('click', function (event) {
			event.preventDefault();

			swapEventButtonValue(swapEventButton, headline);
		});
	});
</script>

<head />

<body>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 id="text-color">My Events</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr id="header-underline">
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				{#each events as event}
					{#if showCurrentEvents}
						{#if event.eventDate > formattedDate && event.eventOrganizer == myAccount}
							<Router>
								<Link to="/event">{event.eventTitle}</Link>
							</Router>
						{/if}
					{:else if !showCurrentEvents}
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="row row-cols-1">
		<div class="col" id="text-align-left">
			<h1 id="left-align">My Active Events</h1>
		</div>
		<div class="col">
			<button>Passed Events</button>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div>
			<div class="container text-center">
				<div class="row row-cols-3">
					{#each events as event}
            {#if showCurrentEvents}
						  {#if event.eventDate > formattedDate && event.eventOrganizer == myAccount}
							  <a href="/event/{event.id}">{event.eventTitle}</a>
						  {/if}
            {:else if !showCurrentEvents}
              {#if event.eventDate < formattedDate && event.eventOrganizer == myAccount}
                <a href="event/{event.id}">{event.eventTitle}</a>
              {/if}
            {/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</body>
