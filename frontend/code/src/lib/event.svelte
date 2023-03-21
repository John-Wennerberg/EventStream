<script>
	import { user } from '../user-store.js';
	export let id;
	let isFetchingEvent = true;
	var event = null;
	var comments = [];
	const errors = [];

	async function loadEvent() {
		console.log(id, 'inne i events ');
		await fetch('http://localhost:8080/events/' + id)
			.then((response) => response.json())
			.then((events) => {
				isFetchingEvent = false;

				//Assigning event events[0] because GET/events should always return only one object.
				event = events[0];

				if (events.length > 1) {
					errors.push('To many objects retrieved');
				}
			})
			.catch((error) => {
				console.log(error);
				errors.push(error);
			});
	}

	function loadComments() {
		fetch('http://localhost:8080/events/' + id + '/comments')
			.then((response) => response.json())
			.then((data) => {
				comments = data;
			})
			.catch((error) => {
				console.log(error);
				errors.push(error, 'Caught in fetch comments');
			});
	}

	let commentAuthor = '';
	let commentBody = '';

	async function createComment() {
		const comment = {
			commentAuthor,
			commentBody,
		};
		try {
			const response = await fetch('http://localhost:8080/events/' + id + '/create-comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(comment),
			});
		} catch (error) {
			errors.push(error);
		}
	}

	loadEvent();
	loadComments();
</script>

<div>
	{#if errors.length}
		<div class="container">
			<div class="row">
				<div class="col">
					<h1 id="text-color">ERRORS</h1>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<hr id="header-underline" />
				</div>
			</div>
		</div>
		{#each errors as error}
			<div class="container">
				<div class="row">
					<div class="col">
						<div>
							{error}
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:else if isFetchingEvent}
		<div class="container">
			<div class="row">
				<div class="col">
					<h1 id="text-color">Data still loading...</h1>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<hr id="header-underline" />
				</div>
			</div>
		</div>
	{:else}
		<div class="container">
			<div class="row">
				<div class="col">
					<h1 id="text-color">{event.eventTitle}</h1>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<hr id="header-underline" />
				</div>
			</div>
		</div>
		<div class="container" id="text-color">
			<div class="row">
				<div class="col">
					<div>
						{event.eventTitle} by {event.eventOrganizer}:
					</div>
					<div>
						{event.eventDescription}
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col" id="pad-top-2">
					<div>Time of event:</div>
					<div>
						{event.eventDate}
					</div>
					<div>
						{event.eventTime}
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col" id="pad-top-10">
					<h3 id="text-color">Comments</h3>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<hr id="header-underline" />
				</div>
			</div>
		</div>
		{#if comments.length}
			{#each comments as item}
				<div class="container">
					<div class="row">
						<div class="col " id="comment-text">
							<div id="pad-top-1">
								{item.commentAuthor}:
							</div>
							<div>
								{item.commentBody}
							</div>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<div class="container">
				<div class="row">
					<div class="col" id="comment-text">
						<div>This event has not received any comments</div>
					</div>
				</div>
			</div>	
		{/if}
		<form on:submit|preventDefault={createComment}>
			<div class="row justify-content-md-center">
				<div class="col-md-auto" id="comment-text">Leave a comment:</div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<input type="text" placeholder="Author:" bind:value={commentAuthor} />
				</div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<input type="text" placeholder="Comment:" bind:value={commentBody} />
				</div>
			</div>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<input class="btn btn-primary" id="login-button" type="submit" value="Create" />
				</div>
			</div>
		</form>
	{/if}
</div>
