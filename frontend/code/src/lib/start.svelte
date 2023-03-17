<script>
	import { Router, Link, Route } from 'svelte-routing';
	import { events } from './data.js';
	import { paginate, DarkPaginationNav } from 'svelte-paginate';

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

		fetch('http://localhost:8080')
			.then((response) => response.json())
			.then((data) => {
				data.forEach((item) => {
					const htmlSegment =
						`<Router>
							<div class="container">
								<div class="row justify-content-md-center">
									<div class="col">
										<Link to="/event/${item.eventID}">
											<div class="row justify-content-md-center">
<<<<<<< HEAD:frontend/src/lib/start.svelte
												img src="{'data:image/png;base64,'+ (event.eventImage)}"  alt=""/>
=======
												<img src="event-image.jpg" alt="Event" />
>>>>>>> main:frontend/code/src/lib/start.svelte
											</div>
											<div class="row justify-content-md-center" id="undo-link">
												${item.eventTitle}
											</div>
											<div class="row justify-content-md-center">
												<hr id="event-underline" />
											</div>
										</Link>
									</div>
								</div>
							</div>
						</Router>`
<<<<<<< HEAD:frontend/src/lib/start.svelte

	if(item.eventDate > formattedDate && showCurrentEvents){
=======
					if(item.eventDate > formattedDate && showCurrentEvents){
>>>>>>> main:frontend/code/src/lib/start.svelte
						document.querySelector('#display-event').insertAdjacentHTML('beforeend', htmlSegment)
					} else if(item.eventDate < formattedDate && !showCurrentEvents){
						document.querySelector('#display-event').insertAdjacentHTML('beforeend', htmlSegment)
					}
				});
			});
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
		<div class="row row-cols-3 justify-content-md-center" id="display-event">
		</div>
	</div>
</div>

<<<<<<< HEAD:frontend/src/lib/start.svelte



<!-- <footer id="footer">
=======
<!--footer id="footer">
>>>>>>> main:frontend/code/src/lib/start.svelte
	<DarkPaginationNav
		totalItems={items.length}
		{pageSize}
		{currentPage}
		limit={1}
		showStepOptions={true}
		on:setPage={(e) => (currentPage = e.detail.page)}
	/>
<<<<<<< HEAD:frontend/src/lib/start.svelte
</footer> -->
=======
</footer-->
>>>>>>> main:frontend/code/src/lib/start.svelte
