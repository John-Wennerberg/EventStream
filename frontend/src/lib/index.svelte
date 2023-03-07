
<script>

    //import {handleFileUpload} from '../uploadedimages/upload'
    
</script>
<!-- 
			    <form on:submit = {handleFileUpload} enctype="multipart/form-data">
                    <input type="file" name="image">
                    <input type="submit" >
                </form> -->
    <div>
        <form method="POST" action="/index" enctype="multipart/form-data">
            <input type="file" name="eventImage">
            <input type="submit">
        </form>
    </div>