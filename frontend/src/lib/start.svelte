<script>
	import { events } from './data.js';
	import { paginate, DarkPaginationNav } from 'svelte-paginate';

	let currentPage = 1;
	let pageSize = 9;
	let items = events;

	$: paginatedItems = paginate({ items, pageSize, currentPage });

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
		if(showCurrentEvents){
			showCurrentEvents = false;
		} else {
			showCurrentEvents = true
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

<body>
	<div class="row row-cols-1">
		<div class="row row-cols-2"></div>
			<div class="col">
				<h1 class="headline headline-align-left">Cool Event Page!</h1>
			</div>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div class="col">
			<p class="headline body-align-left">Active Events</p>
		</div>
		<div class="center-aligned">
			<button id="swap-button-active">Active Events</button>
			<button id="swap-button-inactive">Passed Events</button>
		</div>
		<div>
			<div class="container text-center">
				<div class="row row-cols-3">
					{#each paginatedItems as event}
						{#if event.eventDate > formattedDate && showCurrentEvents}
							<div>
								<a class="undo-link" href="/event/{event.id}">
									<img src="event-image.jpg" alt="Event" width="150" height="150" />
									<br />
									{event.eventTitle}
									<hr class="event-underline" />
								</a>
							</div>
						{:else if event.eventDate < formattedDate && !showCurrentEvents}
							<div>
								<a class="undo-link" href="/event/{event.id}">
									<img src="event-image.jpg" alt="Event" width="150" height="150" />
									<br />
									{event.eventTitle}
								</a>
								<hr class="event-underline" />
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		<DarkPaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</div>
</body>
