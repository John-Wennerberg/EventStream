

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
