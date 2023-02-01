<script>
	import { events } from './data.js';

	let currentDate = new Date();
	let currentYear = currentDate.toLocaleString("default", {year: "numeric"})
	let currentMonth = currentDate.toLocaleString("default", {month: "2-digit"})
	let currentDay = currentDate.toLocaleString("default", {day: "2-digit"})
	var formattedDate = currentYear + "-" + currentMonth + "-" + currentDay
</script>

<head>

</head>

<body>
	<div class="row row-cols-1">
		<div class="row row-cols-2">
			<div class="col" id="text-align-left">
				<h1 id="left-align">Cool Event Page!</h1>
			</div>
			<div class="col">
				<div class="dropdown float-end">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Dropdown Menu
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="/">Action</a>
						<a class="dropdown-item" href="/">Action 2</a>
						<a class="dropdown-item" href="/">Action 3</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col">
			<hr class="header-underline" />
		</div>
		<div>
			<div class="container text-center">
				<div class="row row-cols-3">
					{#each events as event}
						{#if event.eventDate  > formattedDate}
							<a href="/event/{event.id}">{event.eventTitle}</a>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</body>
