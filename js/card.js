// function myFunction(){
// 	var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("name").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", 'https://reqres.in/api/products/3', true);
//   xhttp.send();

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("name").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", 'https://reqres.in/api/products/3', true);
//   xhttp.send();

// }

firebase.initializeApp({
  apiKey: 'AIzaSyAVlZBAEho-bBIgdrwT4UJMwdKpOPwYtS4',
  projectId: 'nur-gis'
});

const db = firebase.firestore();

var href = window.location.href;
console.log(href);
var id = window.location.search;
id = id.slice(4);
console.log(id);

var docRef = db.collection("places").doc(id);
docRef.get().then(function(doc) {
    if (doc.exists) {
    	getPlace(id);
        async function getPlace(id) {
		    
		 	document.getElementById("name").innerHTML = doc._document.proto.fields.name.stringValue;
			document.getElementById("info").innerHTML = doc._document.proto.fields.info.stringValue;
		 	document.getElementById("history1").innerHTML = doc._document.proto.fields.history.stringValue;
		 	document.getElementById("address").innerHTML = doc._document.proto.fields.address.stringValue;

		 	var big_img = doc._document.proto.fields.big_img.stringValue;
		 	var styleitem = `background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${big_img}')`
		 	header.setAttribute('style', styleitem);
}
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

function clickChildren(){
	window.open('categories.html?id=children', "_self")
}

function clickAdults(){
	window.open('categories.html?id=adults', "_self")
}

function clickElderly(){
	window.open('categories.html?id=elderly', "_self")
}
function clickNur(){
	window.open('index.html', "_self")
}
// const id = 'baiterek';
// async function getPlace(id) {

//     var b = await db.collection('places').doc(id).get();
//     console.log(b._document.proto.fields);
//     var c = b._document.proto.fields.id.stringValue;
//  	document.getElementById("name").innerHTML = c;

//     var k = b._document.proto.fields.info.stringValue;
//  	document.getElementById("info").innerHTML = k;

//  	var l = b._document.proto.fields.history.stringValue;
//  	document.getElementById("history1").innerHTML = l;

//  	var f = b._document.proto.fields.address.stringValue;
//  	document.getElementById("address").innerHTML = f;

//  	var big_img = b._document.proto.fields.big_img.stringValue;
//  	var styleitem = `background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${big_img}')`
//  	header.setAttribute('style', styleitem);
// }