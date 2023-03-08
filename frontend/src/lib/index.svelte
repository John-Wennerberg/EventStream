
<script>
	
	async function handleFileUpload(event) {
        event.preventDefault();
        const fileInput = event.target.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch('/index', {
            method: 'POST',
            body: formData
            });
            
            console.log(response);
        } catch (error) {
            console.error(error);
        }
	}
</script>



<h1>SKIT PÅ DIG </h1>
<form on:submit|preventDefault={handleFileUpload} enctype="multipart/form-data">
	<input type="file" name="eventImage">
	<button type="submit">Upload</button>
</form>