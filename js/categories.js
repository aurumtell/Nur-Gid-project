firebase.initializeApp({
  apiKey: 'AIzaSyAVlZBAEho-bBIgdrwT4UJMwdKpOPwYtS4',
  projectId: 'nur-gis'
});

const db = firebase.firestore();
var array = [];

var href = window.location.href;
console.log(href);
var id_category = window.location.search;
id_category = id_category.slice(4);
console.log(id_category);
var lastVisible = {};
var next = {};
var clickNext = false;
var n = 0;
//console.log('initial next', next);


function getDocumentsInQuery(query, renderer) { 
	//console.log('getDocumentsInQuery')
	console.log('getDocumentsInQuery qery', query);
	//console.log('getDocumentsInQuery query.onSnapshot', snapshot);
  query.onSnapshot(function(snapshot) {
  	console.log('snapshot.size', snapshot.size)
    if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

	snapshot.docChanges().map(function(item){
		var object = item.doc._document.proto.fields
		var object = item.doc._document.proto.fields
		var idb = item.doc._document.proto.name
		idb = idb.substr(54,20)
		object['idbase'] = idb
		array.push(object)
	})

	//console.log(array)
 	lastVisible = snapshot.docs[snapshot.docs.length-1];
	console.log("lastVisible", lastVisible);

    array.map(function(item){
    category = item.category.stringValue;
	url = item.big_img.stringValue;
	name = item.name.stringValue;
	id = item.idbase;
	//console.log(url)
	if (id_category == category){
		var cards = document.querySelector('.cards')
		var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
		cards.insertAdjacentHTML('beforeend',html)
	}
	if (id_category==''){
		var cards = document.querySelector('.cards')
		var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
		cards.insertAdjacentHTML('beforeend',html)
	}

	   

})


  });
};

async function pagPage() {
	console.log('pagPage');
	
	// var temp = await db.collection("places")
 //          .startAfter(lastVisible)
 //          .limit(16);
	// next = {...temp};
    //return next;
    console.log('pagPage clickNext', clickNext);
    if (!clickNext) {
    	clickNext = true;
    	//reload();
console.log('pagPage if clickNext', clickNext);
    	
    
		getArray();
		// var first = db.collection("places")
  //        .limit(8);

		// var test =  await first.get().then(function (documentSnapshots) {
  // // Get the last visible document
  // // var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  // console.log("last", lastVisible);

  // // Construct a new query starting at this document,
  // // get the next 25 cities.
  // var next = db.collection("places")
  //         .startAfter(lastVisible)
  //         .limit(8);
// });
		// console.log('pagPage test', test);

    }
    
};

// function reload(){
// 	location = location;
// }

function nextPage(query){
	array = []
	query.get()
    .then(function(querySnapshot) {
    	console.log('sd',querySnapshot._snapshot.docChanges)
        querySnapshot._snapshot.docChanges.map(function(item){
		var object = item.doc.proto.fields
		var idb = item.doc.proto.name
		idb = idb.substr(54,20)
		object['idbase'] = idb
		array.push(object)
	})
    lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    console.log('nextPage',array)
    $(".cards").replaceWith('<div class="row cards"></div>');
    array.map(function(item){
    category = item.category.stringValue;
	url = item.big_img.stringValue;
	name = item.name.stringValue;
	id = item.idbase;
	//console.log(url)
	if (id_category == category){
		
		var cards = document.querySelector('.cards')
		var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
		cards.insertAdjacentHTML('beforeend',html)
	}
	if (id_category==''){
		var cards = document.querySelector('.cards')
		var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
		cards.insertAdjacentHTML('beforeend',html)
	}

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function getArray(renderer) {
  var query = {};
  console.log("getArray  query", query);
  console.log('getArray clickNext', clickNext);
if (!clickNext) {
	console.log('getArray if')
   query = db
      .collection('places')
      .limit(8);
    console.log(query)
    this.getDocumentsInQuery(query, renderer);
  } else {
  	query = db.collection("places")
          .startAfter(lastVisible)
          .limit(8);
  	console.log('getArray else')
  	console.log('getArray lastVis', lastVisible)
  	clickNext = false;
  	nextPage(query);
  }
  console.log('getdoc guery')
  console.log(query)
 
};
 


function openCard(id){
	window.open(`card.html?id=${id}`, "_self");
}

function clickChildren(){
	window.open('categories.html?id=children', "_self")
}

function clickAdults(){
	window.open('categories.html?id=adults', "_self")
}

function clickElderly(){
	window.open('categories.html?id=elderly', "_self")
}
// for (let i=0; i<8; i++){
// 	var cards = document.querySelector('.cards')
// 	var div = document.createElement('div')
// 	div.className = 'col-9 col-sm-6 col-lg-3 mx-auto my-4 cards'
// 	div.innerHTML = 'test'
// 	cards.appendChild(div)
// 	div.appendChild(document.createElement('a'))
// }


// var first = db.collection("places")
//         .limit(16);

// return first.get().then(function (documentSnapshots) {
//   // Get the last visible document
//   var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//   console.log("last", lastVisible);

//   // Construct a new query starting at this document,
//   // get the next 25 cities.
//   var next = db.collection("places")
//           .startAfter(lastVisible)
//           .limit(16);
// });
