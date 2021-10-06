var request = require('request');
let googleUrl = 'http://www.google.com';


let googleHomePage = (googleUrl) => {
  return new Promise((resolve, reject) => {
    request.get(googleUrl, function(error, response, data) {
      if(error){
        reject(error);   // error occured
      }
      // Print the response status code if a response was received
      console.log("Status-Code: ", response && response.statusCode);

      // Print the HTML for the Google homepage.
      console.log("body: ", data);
    });
  });
};


googleHomePage(googleUrl).then(
  fact => console.log(fact)
).catch(
  error => console.log(error)
);
