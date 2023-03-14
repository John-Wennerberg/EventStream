<script>
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
</div>
