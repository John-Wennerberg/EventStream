<script>
	import { Router, Link, Route } from 'svelte-routing';
	import { paginate, DarkPaginationNav } from 'svelte-paginate';

	let currentPage = 1;
	let pageSize = 7;
	let events = [];

	function fetchEvents() {
    fetch('http://localhost:8080/events')
        .then(response => response.json())
        .then(event => {
            console.log(event)
        	event.forEach((d)=> {
				console.log(d.eventID)
		})
            //console.log(event.eventID[0],event.eventTitle[0], "denna röven")
			events = event

        })
        .catch(error => console.log("error"));
}
/*
	async function fetchEvents() {
		try {
			const response = await fetch('http://127.0.0.1:8080/events');
			if (response.ok) {
				events = await response.json();
				console.log("FETCHING WORKS")
			} else {
				console.error('Error fetching events data');
			}
		} catch (error) {
			console.error(error);
		}
	}
*/
	fetchEvents();
	$: paginatedItems = paginate({ items: events, pageSize, currentPage });

	let currentDate = new Date();
	let currentYear = currentDate.toLocaleString('default', { year: 'numeric' });
	let currentMonth = currentDate.toLocaleString('default', { month: '2-digit' });
	let currentDay = currentDate.toLocaleString('default', { day: '2-digit' });
	var formattedDate = currentYear + '-' + currentMonth + '-' + currentDay;

	var showCurrentEvents = true;

	function swapActiveButton(swapEventButtons, indexToActivate) {
		for (let i = 0; i < swapEventButtons.length; i++) {
			swapEventButtons[i].id = 'swap-button-inactive';
		}
		swapEventButtons[indexToActivate].id = 'swap-button-active';
		if (showCurrentEvents) {
			showCurrentEvents = false;
		} else {
			showCurrentEvents = true;
		}
	}

	document.addEventListener('DOMContentLoaded', function () {
		const swapEventButtons = document.querySelectorAll('button');

		swapEventButtons[0].addEventListener('click', function (event) {
			event.preventDefault();
			if (swapEventButtons[0].id == 'swap-button-inactive') {
				swapActiveButton(swapEventButtons, 0);
			}
		});
		swapEventButtons[1].addEventListener('click', function (event) {
			if (swapEventButtons[1].id == 'swap-button-inactive') {
				event.preventDefault;
				swapActiveButton(swapEventButtons, 1);
			}
		});
	});
</script>

<head />

<div>
	<div class="container">
		<div class="row">
			<div class="col-sm">
				<h1 id="text-color">Cool Event Page!</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="col-md-auto">
				<button id="swap-button-active">Active Events</button>
			</div>
			<div class="col-md-auto">
				<button id="swap-button-inactive">Passed Events</button>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row row-cols-3 justify-content-md-center">
			<!-- {#each paginatedItems as event} -->
			{#each paginatedItems as event}
				<!-- <Router> -->
					{#if event.eventDate > formattedDate && showCurrentEvents}
						<div class="container">
							<div class="row justify-content-md-center">
								<div class="col">
									<!-- <Link to="/event/{event.id}"> -->
										<Link to={`/event/${event.eventID}`}>
										<div class="row justify-content-md-center">
											<div class="row justify-content-md-center">
												{#if event.eventImage.length > 1}
													<img src="{'data:image/jpg;base64,'+ (event.eventImage)}"  alt=""/>
												{:else }
													<img src="event-image.jpg" alt="Event" />
												{/if}
											</div>
										</div>
										<div class="row justify-content-md-center" id="undo-link">
											{event.eventTitle}
										</div>
										<div class="row justify-content-md-center">
											<hr id="event-underline" />
										</div>
									</Link>
								</div>
							</div>
						</div>
					{:else if event.eventDate < formattedDate && !showCurrentEvents}
						<div class="container">
							<div class="row justify-content-md-center">
								<div class="col">
									<!-- <Link to="/event/{event.id}"> -->
									<Link to={`/event/${event.eventID}`}>
										<div class="row justify-content-md-center">
											<img src="event-image.jpg" alt="Event" />
										</div>
										<div class="row justify-content-md-center" id="undo-link">
											{event.eventTitle}
										</div>
										<div class="row justify-content-md-center">
											<hr id="event-underline" />
										</div>
									</Link>
								</div>
							</div>
						</div>
					{/if}
				<!-- </Router> -->

			{/each}
		</div>
	</div>
</div>


<footer id="footer">
	<DarkPaginationNav
		totalItems={events.length}
		{pageSize}
		{currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => (currentPage = e.detail.page)}
	/>
</footer>
