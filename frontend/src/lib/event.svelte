







<script>
  import { events } from "./data";


  export let id
  let isFetchingEvent = true
  let failedToFetchEvent = false
  let event = null

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
  loadEvent()


</script>

<h1>Event</h1>
{#if isFetchingEvent}
  <p>Wait i'm fetching data...</p>
{:else if events}
  <div>id : {events.findIndex[0]}</div>
  <div>event name : {events.findIndex[1]}</div>
  <div>time : {events.findIndex[2]}</div>
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
