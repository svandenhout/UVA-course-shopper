$(document).ready(function() {
    
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

    this.recentlylist = []
    if(
        localStorage.recently &&
        localStorage.recently !== [] &&
        localStorage.recently !== undefined
       ) {
        this.recentlylist = JSON.parse(localStorage.recently);
    }
  }

  // adds the clicked object to the list, it will add the full object everytime
  List.prototype.addObjectToList = function(object) {
    if(object.type === "following") {
      if(this.checkDoubleId(object.id, this.followinglist)) {
        this.followinglist.push(object);
        this.storeFollowingLocal(this.followinglist);
      }
  	}

    if(object.type === "shopping") {
      if(this.checkDoubleId(object.id, this.shoppinglist)) {
        this.shoppinglist.push(object);
        this.storeShoppingLocal(this.shoppinglist);
      }
    }

    if(object.type === "recently") {
      if(this.checkDoubleId(object.id, this.recentlylist)) {
        this.recentlylist.push(object);
        this.storeRecentlyLocal(this.recentlylist);
      }
    }
  }

  // stores the list into the browsers local storage system
  List.prototype.storeFollowingLocal = function(list) {
  	localStorage.following = JSON.stringify(list);
  }

  List.prototype.storeShoppingLocal = function(list) {
  	localStorage.shopping = JSON.stringify(list);
  }

  List.prototype.storeRecentlyLocal = function(list) {
  	localStorage.recently = JSON.stringify(list);
  }

  // checks if the course selected to add is not in the list
  // returns true if the id is not stored in the list yet
  List.prototype.checkDoubleId = function(id, list) {
  var array = list;
    for(var i = 0; i < array.length; i++) {
      if(array[i].id === id) {
        alert("you have already added this course to the list");
        return false;
      }
    }
  	return true;
  }



 /*
  *	Om javascript goed op de interface te laten werken heb ik jquery calls
  *  gebruikt. De reden hiervoor is voornamelijk dat mijn list vanuit het
  *  html document nergens te vinden bleek (var list = new List() in body
  *  onload maar de list variabele was null......).
  */
  
  var list = new List();

  if($("#following_list").length !== 0) {
    for(var i = 0; i < list.followinglist.length; i++) {
      $("#following_list").append(list.followinglist[i].show)
      $("#following_list").append("<h1>" + list.followinglist[i].name + "</h1>")
      $("#following_list").append("<p>" + list.followinglist[i].catalog_number + "</p>")
      $("#following_list").append("<p>" + list.followinglist[i].staff + "</p>")
      $("#following_list").append("<p>" + list.followinglist[i].description + "</p>")
    }
  }

  if($("#shopping_list").length !== 0) {
    for(var i = 0; i < list.shoppinglist.length; i++) {
      $("#shopping_list").append(list.shoppinglist[i].show)
      $("#shopping_list").append("<h1>" + list.shoppinglist[i].name + "</h1>")
      $("#shopping_list").append("<p>" + list.shoppinglist[i].catalog_number + "</p>")
      $("#shopping_list").append("<p>" + list.shoppinglist[i].staff + "</p>")
      $("#shopping_list").append("<p>" + list.shoppinglist[i].description + "</p>")
    }
  }

  if($(".recently").length !== 0) {
  	console.log("hallo")
		for(var i = 0; i < list.recentlylist.length; i++) {
      $(".recently").append(list.recentlylist[i].show)
      $(".recently").append("<h1>" + list.recentlylist[i].name + "</h1>")
      $(".recently").append("<p>" + list.recentlylist[i].catalog_number + "</p>")
      $(".recently").append("<p>" + list.recentlylist[i].staff + "</p>")
      $(".recently").append("<p>" + list.recentlylist[i].description + "</p>")
    }

  }
  
  // checks for a detail page to add to the recently viewed list
  if($(".detail").length !== 0) {
		console.log(list);

  	var id = $(this).attr('id');
    
    var name = $(this).find(".name").html();
    var catalog_number = $(this).find(".catalog_number").html();
    var staff = $(this).find(".staff").html();
    var description = $(this).find(".description").html();

    list.addObjectToList({
    		id: id,
        type: "recently",
        name: name,
        catalog_number: catalog_number,
        description: description
    });
  }

  $(".add").click(function() {
  
    if($('.shopping').length !== 0) {
      var type = 'shopping';
    }

    if($('.following').length !== 0) {
      var type = 'following';
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
    });
  });

});