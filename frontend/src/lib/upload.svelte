
<script>

    import {handleFileUpload} from '../uploadedimages/upload'
    
</script>

<div>
	<div class="container">
		<div class="row">
			<div class="col-sm">
				<h1 id="text-color">Upload image</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<hr id="header-underline" />
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row justify-content-md-center">
			<div id="text-color" class="col col-lg-2">Upload Image:</div>
			<div class="col col-lg-2">
			    <form on:submit = {handleFileUpload} enctype="multipart/form-data">
                    <input type="file" name="image">
                    <input type="submit" >
                </form>

			</div>
		</div>

	</div>
</div>

