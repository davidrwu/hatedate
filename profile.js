//Ramona's Firebase
// var config = {
//       apiKey: "AIzaSyCoMO4JICSt88ZIMpok7Jvv7bhyVIMYErw",
//       authDomain: "datingproj-44fa5.firebaseapp.com",
//       databaseURL: "https://datingproj-44fa5.firebaseio.com",
//       projectId: "datingproj-44fa5",
//       storageBucket: "datingproj-44fa5.appspot.com",
//       messagingSenderId: "834628368468"
//       };
//       firebase.initializeApp(config);


var config = {
  apiKey: "AIzaSyCsk5WGqR1YlbaJiCnYbs1lgPgEQZAopr8",
  authDomain: "hate-date.firebaseapp.com",
  databaseURL: "https://hate-date.firebaseio.com",
  projectId: "hate-date",
  storageBucket: "hate-date.appspot.com",
  messagingSenderId: "509489897704"
};
firebase.initializeApp(config);


var database = firebase.database();
var storage = firebase.storage().ref();
var user = firebase.auth().currentUser;

var ref = database.ref('user');
ref.on('value',gotData,errData)

function gotData(data) {
  console.log(data.val())
  var scores = data.val();
  var keys = Object.keys(scores);
  console.log(keys);  

  console.log(scores[keys[0]].user)
}
function errData(err) {
  console.log('Error!')
  console.log(err);
}


// database.ref().on("child_added", function(childsnapshot) {

//   var user = childsnapshot.val().user;
//   var profileAge = childsnapshot.val().profileAge;
//   var profileEmail = childsnapshot.val().profileEmail;
//   var profileFirstName = childsnapshot.val().profileFirstName;
//   var profileLastName = childsnapshot.val().profileLastName;
//   var profileGender = childsnapshot.val().profileGender;
//   var profileCity = childsnapshot.val().profileCity;
//   var profileState = childsnapshot.val().profileState;
  
//   $("#age").html("Age: " + profileAge);
//   $("#location").html("Location: " + profileCity + ", " + profileState);
//   $("#gender").html("Gender: " + profileGender);
//   $("#name").html("Name: " + profileFirstName + " " + profileLastName)

//   if (firebase.auth().currentUser.uid !== user) {
//     $("#hate-content").append(
//     "<tr><td class='box'>" + profileFirstName + "</td>"
//     +"<td>" + profileLastName + "</td>"
//     +"<td class='box'>" + profileGender + "</td>"
//     +"<td>" + profileAge + "</td>"
//     +"<td class='box'>" + "<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'></button>" + "</td></tr>");

//       // profileFirstName +" "+ profileLastName +"<br>" + profileGender + ", " + profileAge)
//   }


// });

$("#add-profile").on("click", function() {
  var questionVal = false;
  var profileAge = $("#profile-age").val().trim().toUpperCase();
  var profileEmail = $("#profile-email").val().trim();
  var profileFirstName = $("#profile-first-name").val().trim().toUpperCase();
  var profileLastName = $("#profile-last-name").val().trim().toUpperCase();
  var profileGender = $("#profile-gender").val().trim().toUpperCase();
  var profileCity = $("#profile-city").val().trim().toUpperCase();
  var profileState = $("#profile-state").val().trim().toUpperCase();
  var user = firebase.auth().currentUser.uid;
  var pushedAnswers = [];

  var newProfile = {
    user: user,
    profileEmail: profileEmail,
    profileAge: profileAge,
    profileFirstName: profileFirstName,
    profileLastName: profileLastName,
    profileGender: profileGender,
    profileCity: profileCity,
    profileState: profileState,
    hates: pushedAnswers
  }

  database.ref().child('user').push(newProfile);
});


var ref = firebase.database().ref('user');
ref.on("child_added", function(childsnapshot) {
  var user = childsnapshot.val().user;
  var profileAge = childsnapshot.val().profileAge;
  var profileEmail = childsnapshot.val().profileEmail;
  var profileFirstName = childsnapshot.val().profileFirstName;
  var profileLastName = childsnapshot.val().profileLastName;
  var profileGender = childsnapshot.val().profileGender;
  var profileCity = childsnapshot.val().profileCity;
  var profileState = childsnapshot.val().profileState;
  
  if ( firebase.auth().currentUser.uid === user ) {
    $("#age").html("Age: " + profileAge);
    $("#location").html("Location: " + profileCity + ", " + profileState);
    $("#gender").html("Gender: " + profileGender);
    $("#name").html("Name: " + profileFirstName + " " + profileLastName)
    console.log(user)
    console.log(profileFirstName);
    $("#profile-info").hide();
  }
});

var ref = firebase.database().ref('hates');
ref.on("child_added", function(childsnapshot) {
  var user = childsnapshot.val().user;
  var profileAge = childsnapshot.val().newAge;
  var profileEmail = childsnapshot.val().email;
  var profileFirstName = childsnapshot.val().newFirstName;
  var profileLastName = childsnapshot.val().newLastName;
  var profileGender = childsnapshot.val().newGender;
  var profileCity = childsnapshot.val().newCity;
  var profileState = childsnapshot.val().newState;
  var hates = childsnapshot.val().hates;
  console.log(hates)

  $(".userName").html(profileFirstName+" "+profileLastName)

 if (firebase.auth().currentUser.uid !== user) {
    $("#hate-content").append(
    "<tr><td>" + profileFirstName +" "+profileLastName + "</td>"
    +"<td>" + profileGender + "</td>"
    +"<td>" + profileAge + "</td>"
    +"<td>" + hates + "</td></tr>")
    // +"<td>" + "<button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal'>"+"Hates"+"</button>" + "</td></tr>");
    
    $("#modal-body").append(hates);
    
    }
 });



// var ref = firebase.database().ref('hates');
// ref.on("child_added", function(childsnapshot) {
//   var user = childsnapshot.val().user;
//   var hates = childsnapshot.val().hates;

//   if (firebase.auth().currentUser.uid !== user) {
//     for (var i = 0; i < keys.length; i++) {
//       var k = keys[i];

//       $(".modal-body").append(hates)
//     }
//     }
// });


var selectedFile;

$("#imgFile").on("change", function(event){
    selectedFile = event.target.files[0];
});

function uploadFile(){
  var filename = selectedFile.name;
  var storageRef = firebase.storage().ref("profile-images/" + filename);

  var metadata = {
    contentType: 'image/jpeg',
  };

  // Upload the file and metadata
  var uploadTask = storageRef.put(selectedFile, metadata);

uploadTask.on("state-changed", function(snapshot){

  }, function(error){

  }, function(){

    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log(downloadURL);
});
}

// var storage = firebase.storage();
// var storageRef = storage.ref();
// var tangRef = storageRef.child('profile-images');

//   // Once the sign in completed, we get the download URL of the image
//   tangRef.getDownloadURL().then(function(url)                             {
//     // Once we have the download URL, we set it to our img element
//     document.querySelector('img').src = url;

//   }).catch(function(error) {
//     // If anything goes wrong while getting the download URL, log the error
//     console.error(error);
//   });

$("#add-location").on("click", function(event) {

event.preventDefault();

// This line will grab the text from the input box
var restaurant = $("#location-input").val().trim();
// The movie from the textbox is then added to our array

var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+restaurant+
"&apikey=b79214ee05ebf45e51ded6595e897f8d";

var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id="+restaurant+"&apikey=b79214ee05ebf45e51ded6595e897f8d";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
  })
// We store all of the retrieved data inside of an object called "response"
.done(function(response) {

console.log(response);

console.log(response.restaurants[Math.floor((Math.random() * 20) + 1)].restaurant.name);

var restaurantResults = response.restaurants[Math.floor((Math.random() * 20) + 1)].restaurant.name;


$("#restaurantDisplay").html(restaurantResults);


});
});
