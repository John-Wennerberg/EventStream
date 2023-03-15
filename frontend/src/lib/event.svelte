<script>
  


  export let id
  let isFetchingEvent = true
  let failedToFetchEvent = false
  var event = null

  function loadEvent() {
    console.log(id)
    fetch('http://localhost:8080/events'+id)
        .then(response => response.json())
        .then(event => {
          isFetchingEvent=false
            console.log(event)
                console.log(event, "denna röven")
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
{:else if event}
  <div>id : {event.findIndex[0]}</div>
  <div>event name : {event.findIndex[1]}</div>
  <div>time : {event.findIndex[2]}</div>
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
