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
//= require_tree 

$(document).ready(function() {

	/*
	 *	Om javascript goed op de interface te laten werken heb ik jquery calls
	 *  gebruikt. De reden hiervoor is voornamelijk dat mijn list vanuit het
	 *  html document nergens te vinden bleek (var list = new List() in body
	 *  onload maar de list variabele was null......).
	 */

	var list = new List();
	
	if($("#following_list")) {
		for(var i = 0; i < list.followinglist.length; i++) {
			$("#following_list").append(list.followinglist[i].show)
			$("#following_list").append("<h1>" + list.followinglist[i].name + "</h1>")
			$("#following_list").append("<p>" + list.followinglist[i].catalog_number + "</p>")
			$("#following_list").append("<p>" + list.followinglist[i].staff + "</p>")
			$("#following_list").append("<p>" + list.followinglist[i].description + "</p>")
		}
	}
	
	if($("#shopping_list")) {
		for(var i = 0; i < list.shoppinglist.length; i++) {
			$("#shopping_list").append(list.shoppinglist[i].show)
			$("#shopping_list").append("<h1>" + list.followinglist[i].name + "</h1>")
			$("#shopping_list").append("<p>" + list.followinglist[i].catalog_number + "</p>")
			$("#shopping_list").append("<p>" + list.followinglist[i].staff + "</p>")
			$("#shopping_list").append("<p>" + list.followinglist[i].description + "</p>")
		}
	}

	// adds the full course object to the localStorage
	$(".add").click(function() {
			
		if($('.shopping').length !== 0) {
			var type = 'shopping';
			console.log(type)
		}
		
		if($('.following').length !== 0) {
			var type = 'following';
			console.log(type)
		}
		
		// content passed through attributes
		var id = $(this).attr('id');
		
		// content passed through content
		var name = $(this).parent().find(".name").html();
		var catalog_number = $(this).parent().find(".catalog_number").html();
		var staff = $(this).parent().find(".staff").html();
		var description = $(this).parent().find(".description").html();
		list.addObjectToList({
				type: type,
				id: id, 
				name: name,
				catalog_number: catalog_number,
				staff: staff, 
				description: description
			}
		);
	});
	
	/*
	 *	the constructor makes an array when the localStorage list does not exist 
	 *	yet and will retrieve the list when it is stored in localStorage 
	 *	it has methods to add objects to the list: addObjectToList, add the list 
	 *	to local storage: storeFollowingLocal and to check for 
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
		if(object.type === "following") {
			if(this.checkFollowingId(object.id)) {
				this.followinglist.push(object);
				this.storeFollowingLocal(this.followinglist);
			}
		}
		
		if(object.type === "shopping") {
			if(this.checkShoppingId(object.id)) {
				this.shoppinglist.push(object);
				this.storeShoppingLocal(this.shoppinglist);
			}
		}
	
	}

	// stores the list into the browsers local storage system
	List.prototype.storeFollowingLocal = function(list) {
		localStorage.following = JSON.stringify(list);
	}

	List.prototype.storeShoppingLocal = function(list) {
		localStorage.shopping = JSON.stringify(list)
	}

	// checks if the course selected to add is not in the list
	// returns true if the id is not stored in the list yet
	List.prototype.checkFollowingId = function(id) {
		var array = this.followinglist;
		for(var i = 0; i < array.length; i++) {
			if(array[i].id === id) {
				alert("you have already added this course to the list");
				return false;
			}
		}
		return true;
	}

	List.prototype.checkShoppingId = function(id) {
		var array = this.shoppinglist;
		for(var i = 0; i < array.length; i++) {
			if(array[i].id === id) {
				alert("you have already added this course to the list");
				return false;
			}
		}
		return true;
	}
});