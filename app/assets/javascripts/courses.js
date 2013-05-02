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
        }else {
        	alert("you have already added this course to the list");
        }
  	}

    if(object.type === "shopping") {
      if(this.checkDoubleId(object.id, this.shoppinglist)) {
        this.shoppinglist.push(object);
        this.storeShoppingLocal(this.shoppinglist);
      }else {
				alert("you have already added this course to the list");
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
        return false;
      }
    }
  	return true;
  }

	// returns the TextBlocks with courses to directly append to an element
	buildTextBlocks = function(list) {
  	var textBlock = "";
  	for(var i = 0; i < list.length; i++) {
			textBlock = textBlock +
    	"<div class='text-block'>" +
      "<div class='text'>" + 
      "<div class='name'><h1>" + list[i].name + "</h1></div>" +
      "<div class='catalog-number'><p>" + list[i].catalog_number + "</p></div>"+
      "<div class='staff'><p>" + list[i].staff + "</p></div>" +
      "<div class='description'><p>" + list[i].description + "</p></div>" +
      "</div>" +
      "<div class='buttons'>" + list[i].buttons +
      "</div>" +
      "</div>"
    }
    // console.log(textBlock);
    return textBlock;
  }



 /*
  *	Om javascript goed op de interface te laten werken heb ik jquery calls
  *  gebruikt. De reden hiervoor is voornamelijk dat mijn list vanuit het
  *  html document nergens te vinden bleek (var list = new List() in body
  *  onload maar de list variabele was null......).
  */
  
  var list = new List();

  if($("#following-list").length !== 0) {
		$("#following-list").append(buildTextBlocks(list.followinglist));
  }

  if($("#shopping-list").length !== 0) {
  	console.log(buildTextBlocks(list.shoppinglist))
    $("#shopping-list").append(buildTextBlocks(list.shoppinglist));
  }

  if($(".recently").length !== 0) {
    $(".recently").append(buildTextBlocks(list.recentlylist));
  }
  
  // checks for a detail page to add to the recently viewed list
  if($(".detail").length !== 0) {
  	var id = $(this).attr('id');

  	var buttons = $(this).find(".buttons").html();
    
    var name = $(this).find(".name").find("h1").html();
    var catalog_number = $(this).find(".catalog-number").html();
    var staff = $(this).find(".staff").html();
    var description = $(this).find(".description").html();

    list.addObjectToList({
    		id: id,
        type: "recently",
        buttons: buttons,
        name: name,
        staff: staff,
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

    var id = $(this).attr("id");
    var textid = "#text-" + id;

    var buttons = $(this).parent().html();
  
    var name = $(textid).find(".name").find("h1").html();
    var catalog_number = $(textid).find(".catalog-number").html();
    var staff = $(textid).find(".staff").html();
    var description = $(textid).find(".description").html();
    
    list.addObjectToList({
      type: type,
      id: id,
      buttons:buttons,
      name: name,
      catalog_number: catalog_number,
      staff: staff, 
      description: description
    });
  });

});