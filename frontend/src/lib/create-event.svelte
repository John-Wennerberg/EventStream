<script>
	import { DateInput } from 'date-picker-svelte';
	let eventDate = new Date();
	let eventSalesDate = new Date();
</script>

<head />

<body>
	<form method="POST">
		<div>
			<input type="text" name="eventTitle" placeholder="Title:" value="" />
		</div>
		<div>
			<p>Event Date:</p>
			<DateInput bind:value={eventDate} />
			<p>Ticket sale:</p>
			<DateInput bind:value={eventSalesDate} />
		</div>
		<div>
			<input type="text" name="eventOrganizer" placeholder="Organizer:" value="" />
		</div>
		<div>
			<input type="number" min="0" name="eventTicketLimit" placeholder="Tickets for sale:" value="" />
		</div>
		<div>
			<input class="btn btn-primary" type="submit" value="create" />
		</div>
	</form>
</body>
