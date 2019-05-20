"strict mode";

var curUserTranslate = "";	// global var to store curUser translation

function submitWord() {
	let wd = document.getElementById("word").value;
	console.log(wd);
	translate(wd);	
}

function translate(word) {
	let url = "translate?english=" + word;
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function() {
		let response = xhr.responseText;
		let obj = JSON.parse(response);
		curUserTranslate = obj.Korean;
		console.log("cur translate is: ", curUserTranslate);
		display(obj);
	}

	xhr.onerror = function() {
		alert('There was an error making a request.');
	}
	
	xhr.send();	
}

function display(obj) {
	console.log("word is: ", obj);
	let output = document.getElementById("outputGoesHere");
	output.textContent = obj.Korean;
}

function save() {
	let word = document.getElementById("word").value;
	let url = "store?english="+word+"&korean="+curUserTranslate;
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function() {
		let response = xhr.responseText;
		console.log(response);
	}

	xhr.onerror = function() {
		alert('There was an error making a request.');
	}
	
	xhr.send();	
}
