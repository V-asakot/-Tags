
let items = [];

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
      });
        
      let del= document.createElement("img");
      del.src = "images/close.png"; 
      del.classList.add('images_button');
      del.setAttribute("id", "delete");  
      
      let item_obj = {id:item.id, element:del};
      items.push(item_obj );   

      del.addEventListener('click',async function () {
        let id = items[items.indexOf(item_obj)].id;
        del.parentNode.parentNode.removeChild(del.parentNode);
        removeItem(id);
        cursor_focus();
      });

      let back = document.createElement("div");
      back.classList.add('images_button');
      back.setAttribute("id", "img_back");  

      image_div.appendChild(back);
		  image_div.appendChild(copy);
      image_div.appendChild(save);
      image_div.appendChild(del);
      
		  imagesContainer.appendChild(image_div);
      
      });

      console.log(items);
        
}

async function clearItems(){
  imagesContainer.innerHTML = '';
  items = [];
}