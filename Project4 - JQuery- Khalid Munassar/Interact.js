    /* Khalid Munassar
        CSC 395
        Project#3
    */

   /* ineteract.js
        the code below will interact with the user as they would click
        on the book to display its contents
    */

    /* array created to store:
    a title, a list of authors, a copyright date, 
    number of pages, and a front cover image 
    */



let books = [
            {

               
                title: "The Slight Edge",
                author: "Jeff Olson",
                copyright_date: 2005,
                pages: 240,
                cover: "https://covers.openlibrary.org/b/isbn/0967285550-L.jpg"
                
            },

            {
                title: "Mind Hacking",
                author: "Jennifer Ferguson",
                copyright_date: 2016,
                pages:360,
                cover: "https://covers.openlibrary.org/b/isbn/3903331392-L.jpg"
            },

            {
                title: "Never Split The Difference",
                author: "Chris Voss",
                copyright_date: 2016,
                pages: 541,
                cover: "https://covers.openlibrary.org/b/isbn/0062872303-L.jpg"
            },


            ]   
    /* this one would listen to the events and   supply the page with
        the infomation gathered from the HTML 
    */
        
    $(document).ready(TheBooksPageLoaded)
    console.log("The library of mind")
            
         /* window.addEventListener( "DOMContentLoaded", main);

          


/* Displays the information received from openlibrary.org */
function informationReceived() { // Done
    console.log( "response text: " + this.responseText);
    let informationParagraph = document.getElementById( "info");
    informationParagraph.innerHTML = "<pre>" + this.response + "</pre>";
    let informationObject = JSON.parse( this.responseText);
    let isbns = informationObject.docs[0].isbn;
    informationParagraph.innerHTML = isbns;
}
/* This fuction loads the needed function to load the library */
function TheBooksPageLoaded() {     // Done
    console.log("Calling Base Case");
    baseCase();

    console.log("");
    console.log("Calling Load Books");
    loadBooks();

    console.log("");
    console.log("Calling book name listener");
    bookNameListener();

    console.log("");
    console.log("callig add button listener");
    addButtonListener();
                
    console.log("");
    console.log("callig add button listener");

    console.log("");


            }
            

/**
 * baseCase functuon check if already there are books in the
 * localStorage, and put every book into the local storage with them
 * being stringfied.
 * */            
function baseCase(){    // Done
                
                console.log("BaseCase got call");
                

if ( localStorage.length ==0){
    console.log("It seems like the array is empty so we load it with data from hardcoded array");
    for ( i=0; i<books.length; i++){
         let someBook = books[i];
             console.log(" The book name I just grabbed "+ someBook.title);
             console.log("The stringified version: "+ JSON.stringify(someBook));
            localStorage.setItem(someBook.title, JSON.stringify(someBook));
     }      
}
        console.log(">>Exiting Base case");
}

/**
* creating a list inside the div I have in html of the books I have
* in the local storage and then adds it to the that div innerHTML
*/
             
function loadBooks(){ //Done
    console.log("Load books got call");
let bookList = "<ul>\n";
    for (k=0; k<localStorage.length; k++){
        let someBook = localStorage.getItem(localStorage.key(k));
        console.log("Here is the book "+ someBook);

        let BookObject = JSON.parse(someBook);
        bookList += "<li>"+ BookObject.title + "</li>\n";    
     }
        
     bookList += "</ul>\n";

        $("nav").html(bookList)
    /* var myNav = document.getElementsByTagName("nav");
    var oneNode = myNav[0];
    oneNode.innerHTML = bookList; */
} 


/**
  * Now here I create an event listener for each book in the Div
  * function adds eventListeners to 
 * each and every book of list items, and then calls onSelect function
 * which displays the information about the book that is clicked
 * on the screen
 * 
  */
              
function bookNameListener(){ // Done
    let listMembers = $("li"); //document.getElementsByTagName("li");
        for( i=0; i<listMembers.length; i++){
            nameNode = listMembers[i];
            console.log("here is the node for the book "+ listMembers[i].innerHTML);

            nameNode.addEventListener("click", onSelect);

     }   
}

/*
 * Adds a click listener to the buttons on the page.
 * it also call edit, add, and del fucntion which will
 * modify the page.
 */
function addButtonListener(){
    $("#Editing").on("click", Editing);
    /* let mybook = document.getElementById("Editing");
        mybook.addEventListener("click", Editing); */
    $("#Adding").on("click", Adding);
   /*  let addingBook = document.getElementById("Adding");
        addingBook.addEventListener("click", Adding); */
    $("#Deleting").on("click", Deleting);
    /* let deleteBook = document.getElementById("Deleting");
        deleteBook.addEventListener("click", Deleting); */

}


/* 
* Editing function helps with the edit feature on the books
* It also makes sure that the user can only edit everything but the book name
* Once edit is over, the user will get the chance to save their modifications
*/     
function Editing(){
        console.log("Editing function called");
if ( $("#Adding").html()=="Save" ) {
        alert("Save first then proceed!")
                  
    }
else if ( $(this).html() == "Edit" ) {
         $("#Editing").html("Save");
         $("#authorName").attr("readonly", false);
         $("#Copyright").attr("readonly", false);
         $("#pages").attr("readonly", false);

        }
        //bookNameNode = document.getElementById("bookName");
        /* bookNameNode.SetAttribute("readonly", true); */
                //let bookName = bookNameNode.value;
        // editing the author name
        /* authorNode = document.getElementById("authorName");
        authorNode.removeAttribute("readonly");

        copyRightNode = document.getElementById("Copyright");
        copyRightNode.removeAttribute("readonly");

        pagesNode = document.getElementById("pages");
        pagesNode.removeAttribute("readonly");
        this.innerHTML = "Save"; */
    
else {
        // save any changes to localStorage
        
        console.log("entering save mode");
        $(this).html("Edit");
        let $bookName = $("#bookName");
        let $authorName = $("#authorName");
        let $copyright = $("#Copyright");
        let $pages = $("#pages");

        let bookName = $bookName.val();


        let target = JSON.parse(localStorage.getItem(bookName));
        target.author =  $authorName.val();
        target.copyright_date =  $copyright.val();
        target.pages =  $pages.val();

        localStorage.setItem(bookName, JSON.stringify(target));

        //This will leave edit mode and save the changes to the local storage
        $authorName.attr("readonly", true);
        $pages.attr("readonly", true);
        $copyright.attr("readonly", true);

       /*  bookNameNode = document.getElementById("bookName");
        bookNameNode.setAttribute("readonly", true);
 *//* 
        
        authorNode = document.getElementById("authorName");
        authorNode.setAttribute("readonly", true);

        copyRightNode = document.getElementById("Copyright");
        copyRightNode.setAttribute("readonly", true);

        pagesNode = document.getElementById("pages");
        pagesNode.setAttribute("readonly", true);
        this.innerHTML = "Edit";
 */
        // save the values to local storage 
       /*  var savingValues = {};
        savingValues.title = document.getElementById("bookName").value;
        savingValues.author = document.getElementById("authorName").value;
        savingValues.copyright_date = document.getElementById("Copyright").value;
        savingValues.pages = document.getElementById("pages").value; */
      
        //savingValues.image = document.getElementByTagName("img").value; 
        //localStorage.setItem( bookName, JSON.stringify(savingValues));
   }
}
         
/*
 * Taking values from user and then storing it in the local storage array created earlier
 * This will allow the user to dynamically get the books loaded to the pre-exiting list
 */

let currentBook;
function Adding() {
    console.log("Adding function called")
    let buttonText = this.innerHTML;
    if( buttonText == "Add") {
        this.innerHTML = "Save";
        // Make all fields editable, set values to some default value
        /* var bookNameField = document.getElementById("bookName");
        bookNameField.removeAttribute("readonly"); */
        $("#bookName").removeAttr("readonly").val("");
/*         bookNameField.value = "Enter Book name here" */
    /* bookNameField.value =""; */
        /* var authorField = document.getElementById("authorName");
        authorField.removeAttribute("readonly");
         authorField.value = ""; */
         $("#authorName").removeAttr("readonly").val("");

        /* var copyRightField = document.getElementById("Copyright");
        copyRightField.removeAttribute("readonly"); */
/*         copyRightField.value = "Enter the copyright date here"
 */     $("#Copyright").removeAttr("readonly").val("");
        /* copyRightField.value ="";
        var pagesField = document.getElementById("pages");
        pagesField.removeAttribute("readonly"); */
        /*  pagesField.value = "Enter the pages date here" */
        $("#pages").removeAttr("readonly").val("");
            //pagesField.value ="";
        $("#image").removeAttr("readonly").val("");    
 }

     else {
         /* This part of the code will create objects for the new books the user is adding */
         this.innerHTML = "Add"
         var savingValues = {};
         savingValues.title = $("#bookName").val();
         savingValues.author = $("#authorName").val();
         savingValues.copyright_date = $("#Copyright").val();
         savingValues.pages = $("#pages").val();
         savingValues.cover = "";
        
        localStorage.setItem(savingValues.title, JSON.stringify(savingValues));    
        
        
        currentBook = $("title").val();
        let titleString = $("tilte").val();
        $.ajax({URL: "http://openlibrary.org/search.json?title=" + titleString, success: informationReceived})
        loadBooks();
        bookNameListener();
     }
} 



/* 
 * This an attempts to grab the image obtained from the API and to store it in the img tag as the user passing books
 * This serves as an point of contact for the books because none of the images are stores in the hard drive. All gotten from the API
 * When the right ISBN in found, we go ahead and store that image in local storage
 */
function informationReceived(dataObject) {
    let isbns = dataObject.docs[0].isbn[0];
    let imageString = "https://covers.openlibrary.org/b/isbn/"+isbns+"-L.jpg";
    let theNewBook = JSON.parse(localStorage.getItem(currentBook));
        theNewBook.cover = imageString;
    let objectStringified = JSON.stringify(theNewBook);
    localStorage.setItem(currentBook, objectStringified);
}


/*  adding a delete button */
function Deleting() {
    console.log("Deleting method called");
        // remove the current value of the text in the book name
    let itemDelete = $("#bookName").val();
    localStorage.removeItem(itemDelete);

    // rebuilt the display
    loadBooks();
    bookNameListener();

    // Selecting nothing as a default
    selectNothing();
    }


/* selects nothing and then returns value that is original to the list */
function selectNothing(){
        document.getElementById("bookName").value = "none";
        document.getElementById("authorName").value = "none";
        document.getElementById("Copyright").value = "0";
        document.getElementById("pages").value = "0";
        
    }

/**
*  this function then fills the information gather when clicking the buttons
* from the array stored in the local storage
* 
*/
function onSelect() {
    let editButton = document.getElementById("Editing");
    if( editButton.innerHTML == "Save") {
        // Still in edit mode
        alert("Can't proceed. Save, then you can move on");
        return;
    }
    /* making sure the books are found in the local storage */
    var bookName = this.innerHTML;
    console.log("This is " + this);
    console.log("Found the name " + bookName);
    var booksToSelect = localStorage.getItem(bookName);
    if( booksToSelect == null) {
        
        return;
    }
    targetBook = JSON.parse(booksToSelect);
    console.log("Here is the object: "+ targetBook);
    
    // Book found
    $("#bookName").val(targetBook.title);
    /* var nameNode = document.getElementById("bookName");
    console.log("Here is the name node: " + nameNode);
    nameNode.value = targetBook.title; */

    // Author found
    $("#authorName").val(targetBook.author);
    /* var AuthorNode = document.getElementById("authorName");
    AuthorNode.value = targetBook.author; */
    
    // copyright found
    $("#Copyright").val(targetBook.copyright_date);
   /* var bookCopy = document.getElementById("Copyright");
   bookCopy.value = targetBook.copyright_date; */
        
        // pages found
    $("#pages").val(targetBook.pages);    
    /* var pagesNode = document.getElementById("pages");
    pagesNode.value = targetBook.pages; */

            // an image found
    $("#image").attr("src",targetBook.cover);
    /* var coverNode = document.getElementById("image");
    coverNode.src = targetBook.cover */
    
}

