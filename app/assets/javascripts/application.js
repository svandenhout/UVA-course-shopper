// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

/*
 *	the constructor makes an array when the localStorage list does not exist 
 *	yet and will retrieve the list when it is stored in localStorage 
 *	it has methods to add objects to the list: addObjectToList, add the list 
 *	to local storage: storeLocalStorage and to check for 
 *  doubles: checkCurrentId.
 */

function List() {
	this.followinglist = [];
	if(
			localStorage.following &&
			localStorage.following !== [] && 
			localStorage.following !== undefined
		) {
		this.followinglist = JSON.parse(localStorage.following);
		console.log(this.followinglist);
	}

	this.shoppinglist = [];
	if(
			localStorage.shopping &&
			localStorage.shopping !== [] && 
			localStorage.shopping !== undefined
		) {
		this.shoppinglist = JSON.parse(localStorage.shopping);
	}
}

// adds the clicked object to the list, it will add the full object everytime
List.prototype.addObjectToList = function(object) {
	if(this.checkCurrentId(object.id)) {
		this.followinglist.push(object);
		this.storeLocalStorage(this.followinglist);
	}
}

// stores the list into the browsers local storage system
List.prototype.storeLocalStorage = function(list) {
		localStorage.following = JSON.stringify(list);
}

// returns true if the id is not stored in the list yet
List.prototype.checkCurrentId = function(id) {
	var array = this.followinglist;
	for(var i = 0; i < array.length; i++) {
		if(array[i].id === id) {
			alert("you have already added this course to the list");
			return false;
		}
	}
	return true;
}