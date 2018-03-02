$(document).ready(function() {
  var newTrain
  var trainName
  var trainDest
  var trainFreq
  var trainArrival
  var nextArrival
  var minutesToTrain
  var trainList

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDMzQJYRc3YYs8XXXzcff-8DVu8XKUpvl8",
      authDomain: "trains-55.firebaseapp.com",
      databaseURL: "https://trains-55.firebaseio.com",
      projectId: "trains-55",
      storageBucket: "",
      messagingSenderId: "908445882136"
    };

    firebase.initializeApp(config);

  //access to database
  var database =  firebase.database()
  //acces to users
  var users = database.ref('/users')
  console.log('hello')

  $(".submit").on("click", function(){
    trainName = $("#trainName").val()
    trainDest = $("#trainDest").val()
    trainFreq = parseInt($("#trainFreq").val().trim())
    trainArrival = parseInt($("#trainArrival").val().trim())
    trainList = $("<div class='trainList'><p>"+trainName+"    "+trainDest+"    "+trainFreq)
    $("#currentTrainTimes").append(trainList)
    // console.log(trainDest)
    // console.log(trainName)
    //append train name to 

    users.push({
      name : trainName,
      destination : trainDest,
      frequency : trainFreq,
      arrival : trainArrival
    })
  })

  users.on('child_added', function(snap) {
    console.log(snap.val())
  })

  users.orderByChild('number',).limitToLast(1).on('child_added', function(snap) {
    console.log(snap.val())
  })
  //for current trains
  //add title
  //append list array for trains
  //list contains train name, destination, frequency, next arrival & minutes away
  
  //add form for new trains
  //train name/destination/frequency and first arrival
  //on click event for .submit button
  //append new train to current trains
  //clear input fields
  //add to array
  
})