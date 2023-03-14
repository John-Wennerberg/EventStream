<script>
    let eventData = {};

    async function fetchData(){
        const response = await fetch("http://localhost:8080/events")
        eventData = await response.json();
    }

    $:{
        fetchData();
    }

    function getEventImageSrc(eventImage){
        const binaryData = atob(eventImage);
        const blob = new Blob([new Uint8Array(binaryData.length).map((_, i)=> binaryData.charCodeAt(i))], {type: 'image/png'});
        return URL.createObjectURL(blob)
    }
</script>


{#if eventData}
    <h1>{eventData.eventTitle}</h1>
    <p>{eventData.eventDate}</p>
    <img src="{getEventImageSrc(eventData.eventImage)}" alt="{eventData.eventTitle}" />
    <p>{eventData.eventDescription}</p>
{/if}