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
			$("#following_list").append("<h1>" + list.followinglist[i].name + "</h1>")
			$("#following_list").append("<p>" + list.followinglist[i].catalog_number + "</p>")
			$("#following_list").append("<p>" + list.followinglist[i].staff + "</p>")
			$("#following_list").append("<p>" + list.followinglist[i].description + "</p>")
		}
	}

	// adds the full course object to the localStorage
	$(".add").click(function() {
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var catalog_number = $(this).attr('catalog_number');
		var staff = $(this).attr('staff');
		var description = $(this).attr('description');
		list.addObjectToList(
			{	id: id, 
				name: name,
				catalog_number: catalog_number,
				staff: staff, 
				description: description
			}
		);
	});
});