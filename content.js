
async function displayItems(){
	        let toShow = await loadItems(tags);
		toShow.forEach(function(item, i, toShow) {
		   let image_div = document.createElement("div");
		   image_div.classList.add('image_div');
		 
                   let photo = document.createElement("img");
		   photo.src = item.url;
		   photo.classList.add('img');
                   image_div.appendChild(photo);
		   
		   let copy = document.createElement("img");
		   copy.src = "images/copy-two-paper-sheets-interface-symbol.png";
                   copy.classList.add('images_button');
                   copy.setAttribute("id", "copy");

		   copy.addEventListener('click',async function () {
                     await navigator.clipboard.writeText(item.url);  
                     cursor_focus();
                   });
		   
                   let save = document.createElement("img");
		   save.src = "images/download.png";
                   save.classList.add('images_button');
                   save.setAttribute("id", "save");
           
		   save.addEventListener('click',async function () {
                     var link = document.createElement('a');
                     link.setAttribute('href',item.url);
                     link.setAttribute('download','download');
                     link.click();
                     cursor_focus();
                   });
           
		   image_div.appendChild(copy);
                   image_div.appendChild(save);
           
		   imagesContainer.appendChild(image_div);
                });
        
}

async function clearItems(){
  imagesContainer.innerHTML = '';
}