let db = new Localbase('db');

async function loadItems(_tags){
    let toShow = [];
    let _items = await db.collection('items').get().then(
    items => {
      items.forEach(function(item, i, items) {
       let item_tags = item.tags;
       let f  = false;

       item_tags.forEach(function(item_tag, j, tem_tags) {
         _tags.forEach(function(tag, l, tags) {
             if(tag.text==item_tag){f=true;}
         });
       });
       if(f==true) {toShow.push(item);}
      });
    }
    );
    return toShow;
}

async function addImageItem(name,url,tags){
  let size;
  db.collection('items').get().then(items => {
    size = items.length;
    let id = items[size-1].id + 1;
    db.collection('items').add({
      id: id,
      name: name,
      type: 'img',
      url: url,
      tags: tags
     });  
  })
   
}

async function removeItem(id){
  db.collection('items').doc({ id: id }).delete();
}



/*
addImageItem('chrome_1','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.svg.png',['#chrome','#google']);
addImageItem('chrome_2','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.svg.png',['#chrome','#google']);
*/
