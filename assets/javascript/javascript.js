$(document).ready(function() {
  var newTrain
  var tName
  var tDestination
  var tFrequency
  var tArrival
  var nextArrival
  var minutesToTrain
  var tList
  var tdeparture
  var now = moment().format('MMMM Do YYYY, LT');
  console.log(now)
  $("#time").html(now)

  
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
  //acces to trains
  var trains = database.ref('/trains')
  console.log('hello')

  $(".submitBTN").on("click", function(){
    tName = $("#tName").val().trim()
    console.log(tName)
    tDestination = $("#tDestination").val().trim()
    tFrequency = parseInt($("#tFrequency").val().trim())
    tArrival = parseInt($("#tArrival").val().trim())
    console.log(tDestination)
    console.log(tName)
    //append train name to 

    trains.push({
      name : tName,
      destination : tDestination,
      frequency : tFrequency,
      arrival : tArrival
    })
    event.preventDefault()
  })

  // trains.on('child_added', function(snap) {
  //   console.log(snap.val())
  // })
  
  trains.orderByChild('number',).limitToLast(6).on('child_added', function(snap) {
    console.log(snap.val())
    tList = $("<div class='card'><div class='card-body'><h3 class='card-title'>"+snap.val().name+"</h3><p class='card-text'>"+snap.val().destination+"</p><p class='card-text'>"+snap.val().frequency+"</p><p class='card-text'>"+snap.val().arrival+"</p><a href='https://www.amtrak.com/home.html' class='card-link'>Buy A Ticket</a></div></div>")

    $("#currentTrainTimes").append(tList)

    
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