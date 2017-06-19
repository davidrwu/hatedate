/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * FirebaseUI initialization to be used in a Single Page application context.
 */
var config = {
  apiKey: "AIzaSyCsk5WGqR1YlbaJiCnYbs1lgPgEQZAopr8",
  authDomain: "hate-date.firebaseapp.com",
  databaseURL: "https://hate-date.firebaseio.com",
  projectId: "hate-date",
  storageBucket: "hate-date.appspot.com",
  messagingSenderId: "509489897704"
};
firebase.initializeApp(config);
/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
  return {
    'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function(user, credential, redirectUrl) {
        window.location.assign("profile.html")  
      }
    },
    // Opens IDP Providers sign-in flow in a popup.
    'signInFlow': 'popup',
    'signInOptions': [
      // TODO(developer): Remove the providers you don't need for your app.
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in Sign Up page.
        requireDisplayName: true
      },
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        
      }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com'
  };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  document.getElementById('phone').textContent = user.phoneNumber;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }

  // window.location.assign("profile.html")  
};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());

};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();


});

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
  firebase.auth().currentUser.delete().catch(function(error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too old. She needs to sign in again.
      firebase.auth().signOut().then(function() {
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      });
    }
  });
};

/**
 * Initializes the app.
 */
var initApp = function() {
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  document.getElementById('delete-account').addEventListener(
      'click', function() {
        deleteAccount();
      });

};

window.addEventListener('load', initApp);



$("#add-weather").on("click", function(event) {

event.preventDefault();

// This line will grab the text from the input box
var userLocation = $("#location-input").val().trim();
// The movie from the textbox is then added to our array
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q="+userLocation+"&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
  })
// We store all of the retrieved data inside of an object called "response"
.done(function(response) {

console.log(queryURL);

console.log(response);

var weatherResult = response.weather[0].description
var locationResult = response.name;
var weatherDisplay = $("<img>")
weatherDisplay.addClass('weatherDiv')

if(weatherResult === "clear sky") {
  weatherDisplay.attr('src',"images/clear.png")
  $("#weatherDisplay").html("<span class='weatherHeader'>" + locationResult +" weather has "+weatherResult+"<div>")
  $("#weatherDisplay").append(weatherDisplay);
  $("#weatherDisplay").append("<div class='weatherCon'> Perfect day to go out. <br> Don't forget sunscreen. </div></span>");
} else if (weatherResult === "broken clouds") {
  weatherDisplay.attr('src',"images/light-clouds.png")
  $("#weatherDisplay").html("<span class='weatherHeader'>" + locationResult +" weather has "+weatherResult+"<div>")
  $("#weatherDisplay").append(weatherDisplay);
  $("#weatherDisplay").append("<div class='weatherCon'> Bring a light jacket </div></span>");
} else if (weatherResult === "mist") {
  weatherDisplay.attr('src',"images/light-rain.png")
  $("#weatherDisplay").html("<span class='weatherHeader'>" + locationResult +" weather has "+weatherResult+"<div>")
  $("#weatherDisplay").append(weatherDisplay);
  $("#weatherDisplay").append("<div class='weatherCon'> This is still a datable weather </div></span>");
} else if (weatherResult === "moderate rain") {
  weatherDisplay.attr('src',"images/heavy-rain.png")
  $("#weatherDisplay").html("<span class='weatherHeader'>" + locationResult +" weather has "+weatherResult+"<div>")
  $("#weatherDisplay").append(weatherDisplay);
  $("#weatherDisplay").append("<div class='weatherCon'> Find an indoor activity to do </div></span>");
}



// $("#weatherDisplay").html()

});
});
