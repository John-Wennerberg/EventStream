<script>
	import { events } from './data.js';

	let currentDate = new Date();
	let currentYear = currentDate.toLocaleString('default', { year: 'numeric' });
	let currentMonth = currentDate.toLocaleString('default', { month: '2-digit' });
	let currentDay = currentDate.toLocaleString('default', { day: '2-digit' });
	var formattedDate = currentYear + '-' + currentMonth + '-' + currentDay;
</script>

<head />

<body>
	<div class="row row-cols-1">
		<div class="row row-cols-2">
			<div class="col" id="text-align-left">
				<h1 id="left-align">Passed events</h1>
			</div>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div>
			<div class="container text-center">
				<div class="row row-cols-3">
					{#each events as event}
						{#if event.eventDate < formattedDate}
							<a href="/event/{event.id}">{event.eventTitle}</a>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</body>
