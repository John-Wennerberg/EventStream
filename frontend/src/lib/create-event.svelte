<script>
	import { DateInput } from 'date-picker-svelte';
	let eventDate = new Date();
	let eventSalesDate = new Date();
</script>

<head />

<body>
	<div class="container">
		<div class="row">
			<div class="col-sm">
				<h1 id="text-color">Create Event</h1>
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
			<div id="text-color" class="col col-lg-2">Title:</div>
			<div class="col col-lg-2">
				<input type="text" name="eventTitle" placeholder="Title:" value="" />
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div id="text-color" class="col col-lg-2">Event Date:</div>
			<div class="col col-lg-2">
				<DateInput bind:value={eventDate} />
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div id="text-color" class="col col-lg-2">Ticket Sales Date:</div>
			<div class="col col-lg-2">
				<DateInput bind:value={eventSalesDate} />
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div id="text-color" class="col col-lg-2">Tickets For Sale:</div>
			<div class="col col-lg-2">
				<input type="number" min="0" name="eventTicketLimit" placeholder="Tickets for sale:" value="" />
			</div>
		</div>
		<div class="row justify-content-md-center">
			<div class="col col-lg-2" />
			<div class="col col-lg-2">
				<form method="POST">
					<input class="btn btn-primary" type="submit" value="create" />
				</form>
			</div>
		</div>
	</div>
</body>
