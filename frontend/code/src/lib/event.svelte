<script>
  


  export let id
  let isFetchingEvent = true
  let failedToFetchEvent = false
  var event = null

  function loadEvent() {
    console.log(id, "inne i events ")
    fetch('http://localhost:8080/events/'+id)
        .then(response => response.json())
        .then(events => {
          isFetchingEvent=false
          console.log(events, "denna röven")

          event = events
                //console.log(Buffer.from(events[1].eventImage, 'base64'))
        })
        .catch(error => console.log("error"));
        failedToFetchEvent=true
}
/*
  async function loadEvent(){
      try {
          const response = fetch("http://localhost:8080/events/"+id)
          switch((await response).status){
              case 200:
                  event = await (await response).json
                  break
          }

      }catch(error){
          failedToFetchEvent =true
      }
  }  
  */ 
  loadEvent()


</script>

<h1>Event</h1>
{#if isFetchingEvent}
  <p>Wait i'm fetching data...</p>
{:else if isFetchingEvent == false}
  {#each event as events}
  <div>
    <p>
    id : {events.eventID}
    </p> 
  </div>
  <div>
    <p>
      event name : {events.eventTitle}
    </p>
  </div>
  <div>
    <p>
      time : {events.eventDate}
    </p> 
  </div>
  <div>
    <p>
      Description : {events.eventDescription}
    </p>
  </div>
  {/each}

{:else}
  <p>No event with that id</p>
{/if}












<!-- <script>
  import { events } from './data.js'



  let eventDescription = ""
  /*events.forEach((item)=>{
    if(){
      eventDescription = item.eventDescription
    }
  })*/
</script>

<div>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 id="text-color">Event</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
        <hr id="header-underline" />
      </div>
		</div>
	</div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          {eventDescription}
        </div>
      </div>
    </div>
  </div>
</div> -->
