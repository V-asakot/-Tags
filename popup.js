
	
    let tags_div = document.getElementsByClassName('tags-input')[0];
	let hiddenInput = document.createElement('input'),
    mainInput = document.createElement('input'),
    tags = [];
    let imagesContainer = document.getElementsByClassName('images')[0];
    let tagsContext = "Main";
    popup_setup();

    function popup_setup() { 
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', tags_div.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');
    
    window.onload = cursor_focus;

    tags_div.appendChild(mainInput);
    tags_div.appendChild(hiddenInput);
    }

    function images_popup_setup(){
        let submiting_div = document.getElementsByClassName('submiting')[0];
        let name_input = document.createElement('input'),
        submiting_button = document.createElement('button');
        submiting_button.textContent =  "Add Image";

        name_input.classList.add('submiting_elem');
        submiting_button.classList.add('submiting_elem');

        submiting_button.onclick = function() {
            let tag = mainInput.value;
            if(tag.length>0){
            addTag(tag);
            mainInput.value = '';
            }
            let tagsList = [];
            tags.forEach(function (t) {
                tagsList.push(t.text);
            });
            var url = getURLVar();
            addImageItem(name_input.value,url,tagsList);
            setTimeout(function(){window.close();}, 3000);
        };

        
        submiting_div.appendChild(name_input);
        submiting_div.appendChild(submiting_button);
    }

    function getURLVar() {
        var query = String(document.location.href);
        var index = query.indexOf('?');
        if (index > -1){
            return query.substring(index+5);
        }
        return '';
      }

    mainInput.addEventListener('keydown', function (e) {
		let tag = mainInput.value;
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13 && tag.length > 1) {
			 addTag(tag);
             if(tagsContext=="Main"){
             clearItems();
             displayItems();
            }
            mainInput.value = '';
        }
       
      });
	
      mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
            if(tagsContext=="Main"){
                clearItems();
                displayItems();
            }
        }
      });

    function cursor_focus() {
        document.getElementsByClassName('main-input')[0].focus();
    };
    
    function set_popup_context(context){
      tagsContext = context;
    }

    

    function addTag (text) {
		
        let name = "#"+text,tag = {
            text: name,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
            if(tagsContext=="Main"){
                clearItems();
                displayItems();
            }
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        tags_div.insertBefore(tag.element, mainInput);

        refreshTags();
    }

    function removeTag (index) {
        let tag = tags[index];
        tags.splice(index, 1);
        tags_div.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags () {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag (tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }
