    // Open a database.
    // Create an object store in the database. 
    // Start a transaction and make a request to do some database operation, like adding or retrieving data.
    // Wait for the operation to complete by listening to the right kind of DOM event.
    // Do something with the results (which can be found on the request object).
    // Let us open our database
var request = window.indexedDB.open("MyTestDatabase", 3);
request.onerror = function(event) {
   console.log("Error")
  };
  request.onsuccess = function(event) {
    console.log("Success")
  };