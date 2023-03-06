<script>
	import { DateInput } from 'date-picker-svelte';
	//import {multer} from "multer";
	//import {path} from 'path'
	let eventDate = new Date();
	let eventSalesDate = new Date();
	
	
	let files;
    let dataFile = null;
	var value = ""


    function upload() {
        const formData = new FormData();
        formData.append('damName', value);
        formData.append('dataFile', files[0]);
        const upload = fetch('http://localhost:5173/file', {
            method: 'POST',
            body: formData
        }).then((response) => response.json()).then((result) => {
            console.log('Success:', result);
        })
                .catch((error) => {
                    console.error('Error:', error);
                });
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
				<form action="" method="post" enctype="multipart/from-data">
					<input id="fileUpload" type="file" bind:files>
					{#if dataFile && files[0]}
						<p>
							{files[0].name}
						</p>
					{/if}
				</form>
				{#if value}
					<button on:click={upload}>Submit</button>
				{:else}
					<button on:click={upload} disabled>Submit</button>
				{/if}
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
</div>
