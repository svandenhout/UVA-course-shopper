Course Shopper
==============

app with which users can shop for University of Amsterdam courses

Design demands (ontwerp eissen)
-------------------------------

- user knows in what place on the site he is (breadcrumbs etc.)

- user knows clearly at what step of the process they are

- adding and removing courses is easy

- all the functionalities must be visible on the first screen

- prefer images over text

- design for little space

flow
----

- two buttons in the header, courses i'm shopping and courses i'm following.

- a list with the courses.
    
	lists course names clicking the course will result in a detail page and
    	the detail page will have a remove from list button

- an add course button at the bottom of the page (not the bottom of the list).
	
	the add course button will show the search bar

- a notification bar that gives hints about navigating the app (hints like mouse-over naming, 
breadcrumbs, a loading icon etc).

The search bar will be able to search for keywords in catalog numbers.
titles, descriptions, and/or instructors’ names.
The search results will only show the course name and a snippet of the text where the keyword
is found and of course an add course button to add the course to the current list
Clicking a search result will give a detail page with an add button.

data handling
-------------

the search and autocomplete will only read from catalog numbers,
titles, descriptions, and/or instructors’ names. 

A hybrid model will be used for retrieving the data. the server will parse courses.xml and 
make 2 sqlite file an sqlite file containing the main search data (id, catalog numbers, titles,
descriptions and instructors’ names) will be downloaded to the phone and used from the client 
side. to see the detail page a server side query on the full sqlite file will be done. So the 
client side will download a smaller file containing less columns and the server side will have 
the full courses file in sqlite.

To save the lists i will use html5 local storage.

languages & libraries used
--------------------------

- ruby
- javascript
- html/css

- rails framework
- jquery / jquery-mobile
