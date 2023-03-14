<script>
	import { DateInput } from 'date-picker-svelte';


	let eventTitle = 'kbkb';
	let eventDate = new Date();
	let eventSalesDate = new Date();
	let eventTicketLimit = 0;
	let eventDescription = '';
	let eventOrganizer = 'HEJHEJ';

	async function handleFileUpload(event) {
		event.preventDefault();
				
		const fileInput = event.target.querySelector('input[type="file"]');
		const file = fileInput.files[0];
		
		const data = new FormData();
		data.append('eventTitle', eventTitle);
		data.append('eventDate', eventDate.toISOString().slice(0, 10));
		data.append('eventSalesDate', eventSalesDate.toISOString().slice(0, 10));
		data.append('eventTicketLimit', eventTicketLimit);
		data.append('eventDescription', eventDescription);
		data.append('eventOrganizer', eventOrganizer);
		data.append('eventImage', file)
		try {
			const response = await fetch('http://127.0.0.1:8080/create-event', {
			method: 'POST',
			body: data
			});
			console.log(response);
			console.log("Inne i den hära");
		} catch (error) {
			//console.error(error);
			console.log("massa errors");
		}
	}


</script>

<head />

<div>
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
			<div id="text-color" class="col col-lg-2">Upload Image:</div>
			<div class="col col-lg-2">
				<form on:submit|preventDefault={handleFileUpload} enctype="multipart/form-data">
					<input type="file" name="eventImage">
					<button type="submit">Upload</button>
				</form>
			</div>
		</div>
	</div>
</div>
