
<script>
	
	async function handleFileUpload(event) {
        event.preventDefault();
        
        const fileInput = event.target.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        const data = new FormData();
        //const formData = new FormData();
        //formData.append('file', file);
        
        
        data.append('file', file)
        try {
            const response = await fetch('http://localhost:8080/index', {
            method: 'POST',
            body: data
            });
            console.log(response);
            console.log("Inne i den hära")
        } catch (error) {
            console.error(error);
            console.log("massa errors")
        }
	}
</script>



<h1>SKIT PÅ DIG </h1>
<form on:submit|preventDefault={handleFileUpload} enctype="multipart/form-data">
	<input type="file" name="eventImage">
	<button type="submit">Upload</button>
</form>