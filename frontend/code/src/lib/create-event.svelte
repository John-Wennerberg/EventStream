<script>
	import { DateInput } from 'date-picker-svelte';
	import { user } from '../user-store';
	import { Router, Link, Route, navigate } from 'svelte-routing';



	let eventTitle = '';
	let eventDate = new Date();
	let eventSalesDate = new Date();
	let eventTicketLimit = 1;
	let eventDescription = '';
	let eventOrganizer = '';
	let eventForms = '';
	let showError = false;
	let showErrorTitle = false;
	let showErrorOrganizer = false;
	let showErrorDescription = false;
	let showSuccessMessage = false;

	async function getDefaultImage() {
		const response = await fetch('/event-image.jpg');
		const data = await response.blob();
		return new File([data], 'default-image.jpg')
	}

	async function handleFileUpload(event) {
		event.preventDefault();
		showSuccessMessage = false;
		validateFields();
		if(showError || showErrorTitle || showErrorOrganizer || showErrorDescription) {
		// If validation failed, return from the function and do not upload the file
			return;
		}
		const fileInput = event.target.querySelector('input[type="file"]');
		//const eventDate = event.target.querySelector('input[type = ]')
		const file = fileInput.files[0];

		const data = new FormData();
		data.append('eventTitle', eventTitle);
		data.append('eventDate', eventDate.toISOString().slice(0, 10));
		data.append('eventSalesDate', eventSalesDate.toISOString().slice(0, 10));
		data.append('eventTicketLimit', eventTicketLimit);
		data.append('eventDescription', eventDescription);
		data.append('eventOrganizer', eventOrganizer);

    if(file !== undefined ){
        data.append('eventImage', file);
    } else {
		const defaultImage = await getDefaultImage();
		data.append('eventImage', defaultImage);
    }

		data.append('eventForms', eventForms);
		try {
			const response = await fetch('http://localhost:8080/create-event' , {
				method: 'POST',
				body: data,
			});
			if(response.ok){
				showSuccessMessage = true;
				setTimeout(function() {
					navigate("/");
				}, 1000); 
			}
			else {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
		} catch (error) {
			console.error(error);
		}
	}





	function validateFields() {
		showError = false; 
	showErrorTitle = false;
	showErrorOrganizer = false;
	showErrorDescription = false;

	if (eventTicketLimit < 1) {
		showError = true;
	}
	if (eventTitle.length < 1) {
		showErrorTitle = true;
	}
	if (eventOrganizer.length < 1) {
		showErrorOrganizer = true;
	}
	if (eventDescription.length < 1) {
		showErrorDescription = true;
	}
}
</script>
<style>
	.IfNotLoggedIn{
		font-size: x-large;
		padding: 10rem;
		color: rgb(255, 68, 0);
		align-items: center;
		justify-content: center;
	}
	.SuccessMessage{
		font-size: x-large;
		padding: 10rem;
		color: rgb(12, 237, 0);
		align-items: center;
		justify-content: center;
	}
	.createEventContainer{
		display: hidden;
	}
</style>

<head />

{#if $user.isLoggedIn }
	{#if !showSuccessMessage}
		<div class="createEventContainer">
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
						<input type="text" name="eventTitle" placeholder="Title:" bind:value={eventTitle} />
						{#if showErrorTitle}
							<p style="color: red;">You have to enter a title</p>
						{/if}
					</div>
					
				</div>
				<div class="row justify-content-md-center">
					<div id="text-color" class="col col-lg-2">Organizer:</div>
					<div class="col col-lg-2">
						<input type="text" name="eventOrganizer" placeholder="Organizer:" bind:value={eventOrganizer}/>
						{#if showErrorOrganizer}
							<p style="color: red;">Organizer can not be empty</p>
						{/if}
					</div>
				</div>
			<div class="row justify-content-md-center">
				<div id="text-color" class="col col-lg-2">Description:</div>
				<div class="col col-lg-2">
						<textarea name="description" id="" placeholder="Description:" bind:value={eventDescription} cols="20" rows="10"></textarea>
						{#if showErrorDescription}
							<p style="color: red;">You need to enter a description</p>
						{/if}
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
						<input
							type="number"
							min="1"
							name="eventTicketLimit"
							placeholder="Tickets for sale:"
							bind:value={eventTicketLimit}
						/>
						{#if showError}
							<p style="color: red;">Tickets cant be empty</p>
						{/if}
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div id="text-color" class="col col-lg-2">Embed a Google form:</div>
					<div class="col col-lg-2">
						<input
							type="text"
							min="0"
							name="eventForms"
							placeholder="Google Forms"
							bind:value={eventForms}
						/>
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div id="text-color" class="col col-lg-2">Upload Image:</div>
					<div class="col col-lg-2">
						<form on:submit|preventDefault={handleFileUpload} enctype="multipart/form-data">
							<input type="file" name="eventImage" />
							<button type="submit">Upload</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/if}
{#if showSuccessMessage}
<div>
	<p class="SuccessMessage">Uppload Was Successful. Redirecting to startpage</p>
</div>
{/if}
{:else}
	<div>
		<p class="IfNotLoggedIn">You have to be logged in to be able to create events.</p>
	</div>
{/if}

