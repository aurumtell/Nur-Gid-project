// $(document).ready(function()){
// 	$('.navbar-toggler').click(function(){
// 		$('navbar-toggler').toggleClass('change')
// 	})

// 	$(window).scroll(function(){
// 		let position = $(this).scrollTop();
// 		if (position >= 718){
// 			$('.navbar').addClass('navbar-background');
// 			$('.navbar').addClass('fixed-top');
// 		} else{
// 			$('.navbar').removeClass('navbar-background');
// 			$('.navbar').removeClass('fixed-top');
// 		}
// 	})

// }

firebase.initializeApp({
  apiKey: 'AIzaSyAVlZBAEho-bBIgdrwT4UJMwdKpOPwYtS4',
  projectId: 'nur-gis'
});

const db = firebase.firestore();
const array = [];

function getDocumentsInQuery(query, renderer) {
  query.onSnapshot(function(snapshot) {
    if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

	snapshot.docChanges().map(function(item){
		var object = item.doc._document.proto.fields
		var object = item.doc._document.proto.fields
		var idb = item.doc._document.proto.name
		idb = idb.substr(54,20)
		object['idbase'] = idb
		array.push(object)
	})
	console.log(array)
 	var n = 0;
 	var n1 = 0;
 	var n2 = 0;
    array.map(function(item){

		category = item.category.stringValue;
		name = item.name.stringValue;
		url = item.big_img.stringValue;
		id = item.idbase;
		if (category == 'children'){
			if (n<3){
			n += 1
			var cards = document.querySelector('.cardschild')
			var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto1 my-3"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div></div>`
			cards.insertAdjacentHTML('beforeend',html)
		}
	}

		if (category == 'adults'){
			if (n1<3){
			n1 += 1
			var cards = document.querySelector('.cardsadults')
			var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto1 my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
			cards.insertAdjacentHTML('beforeend',html)
		}
	}

		if (category == 'elderly'){
			if (n2<3){
			n2 += 1
			var cards = document.querySelector('.cardselderly')
			var html = `<div class="col-9 col-sm-6 col-lg-3 mx-auto1 my-4"><div onclick="openCard('${id}')"><div class="card"><img src="${url}" alt="" class="card-img-top"><div class="card-body"><div class="card-title"><h1 class="text-capitalize card-link">${name}</h1></div></div><div class="card-footer team-icons d-flex justify-content-between"><a href="#"><i class="fab fa-facebook fa-1x"></i></a><a href="#"><i class="fab fa-instagram fa-1x"></i></a><a href="#"><i class="fab fa-twitter fa-1x"></i></a></div></div></a></div>`
			cards.insertAdjacentHTML('beforeend',html)
		}
		}

		
	
	})
})


  };


function getArray(renderer) {
  var query = db
      .collection('places')
      .limit(16);

  this.getDocumentsInQuery(query, renderer);
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