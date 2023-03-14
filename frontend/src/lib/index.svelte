
<script>

// fetch('http://localhost:8080/events')
//     .then(res => res.blob())
//     .then(blob =>{
//         const file = new File([blob], 'image' , {type  : blob.type})
//         console.log("RÖÖÖÖÖÖÖÖÖV")
//         readFile(blob)
//         console.log(file)
// })

// function readFile(input){
//     const fr = new FileReader();

//     // fr.readAsDataURL(input)
//     fr.readAsText(input)


//     fr.addEventListener('load', ()=> {
//         const res = fr.result;
//         console.log(res)
//     })
// }


    let events = [];
    let temp = null;

function fetchEvents() {
    fetch('http://localhost:8080/events')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // data.forEach((d)=> {
            //     temp = d
            //     new Blob(d.eventImage.data).text().then((res) => {
            //         temp.eventImage = 'data:image/png;base64, ' + res
            //         events.push(temp)
            //         console.log(temp.eventImage)
            //     })
            // })
                events = data;
            console.log(events[0].eventImage); 
            console.log(typeof events[0].eventImage);
        })
        .catch(error => console.log("error"));
}
// function getImg() {
//     return Base64.encodeBase64String(events);
// }


fetchEvents();





</script>



{events[0]}
{#each events as event}

    <div>
        {#if event.eventImage}
        <!-- <img src="{URL.createObjectURL(new Blob(event.eventImage.data))}"  alt=""/> -->
        <!-- <img src="{'data:image/png;base64, '+ new Blob(event.eventImage.data).text()}"  alt=""/> -->
        <!-- <img src="{'data:image/jpg;base64, '+ (event.eventImage.data)}"  alt=""/> -->
        <img src="{'data:image/png;base64, '+ (event.eventImage)}"  alt=""/>
        <!-- <img src="{event.eventImage}"  alt=""/> -->
        <!-- <img src="data:image/png;base64, {(event.eventImage.data)}" alt=""> -->
        <!-- <img src="data:image/png;base64, getImg()" alt=""/> -->
        <!-- {events[event].eventImage} -->
        {:else if event.eventImage}
            <div>
                <p>
                    skiten funkar inte bre
                </p>
            </div>
        {/if}

    </div>
    <div>
        <h1>
        {event.eventTitle}
        </h1>
    </div>
    <div>
        <h2>
        {event.eventDate}
        </h2>
    </div>
    <div>
        {event.eventOrganizer}
    </div>
{/each}










<!-- <h1>SKIT PÅ DIG </h1>
<form on:submit|preventDefault={handleFileUpload} enctype="multipart/form-data">
	<input type="file" name="eventImage">
	<button type="submit">Upload</button>
</form> -->








        <!-- <img src="data:image/png;base64, {event.eventImage.toString('base64')}" alt=""/> -->
