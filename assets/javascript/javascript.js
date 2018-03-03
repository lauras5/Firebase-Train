$(document).ready(function() {
  var newTrain
  var tName
  var tDestination
  var tFrequency
  var tArrival //first time
  var nextArrival //next time tArrival + Frequency that hasnt passed yet
  var minutesToTrain//diff in minutes between now and nextArrival
  var tList
  //don't need date, there for aesthetics
  var date = moment().format('MMMM Do YYYY');
  $("#day").html(date)
  //adding time to page
  var now = moment().format('LT')
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
    tDestination = $("#tDestination").val().trim()
    tFrequency = parseInt($("#tFrequency").val().trim())
    tArrival = $("#tArrival").val().trim()
    console.log(tArrival)
    var firstTimeConverted = moment(tArrival,"hh:mm").subtract(1, "years")
    console.log(firstTimeConverted)
    console.log(now)
        nextArrival = '05:30' //every 15 minutes starting with tArrival,

    console.log(tFrequency)
    minutesToTrain = moment(now).to(nextArrival)
    console.log(minutesToTrain)
    // console.log(tDestination)
    // console.log(tName)
    //append train name to 
    
    trains.push({
      name : tName,
      destination : tDestination,
      frequency : tFrequency,
      arrival : tArrival,
    })
    event.preventDefault()
  })
  
    trains.orderByChild('number',).limitToLast(12).on('child_added', function(snap) {
      console.log(snap.val())
      var t = snap.val()
      
      //can split up but there is no need
      tList = $("<div class='card'><div class='card-body'><h3 class='card-title' id='card-name'>"+t.name+"</h3><p class='card-text' id='card-destination'>"+t.destination+"</p><p class='card-text' id='card-frequency'>"+t.frequency+"</p><p class='card-text' id='card-next-arrival'>"+t.Arrival+"</p><p class='card-text' id='card-minutes'>"+minutesToTrain+"</p><a href='https://www.amtrak.com/home.html' class='card-link'>Buy A Ticket</a></div></div>")
      $("#currentTrainTimes").append(tList)  
    })
    //   console.log(snap.val())
    
    $('#timeBtn').on("click", function() {
      now = moment().format('LT')
      $("#time").html(now)
      console.log(now)
      //update train info
    })
    //for current trains
  //add title
  //append list array for trains
  //list contains train name, destination, frequency, next arrival & minutes away
  
  //train name/destination/frequency and first arrival
  //on click event for .submit button
  //append new train to current trains
  //clear input fields
  //add to array
  
  // start time = tArrival
  // for tArrival add tfrequency 
  // if this this time > now
  // write next time
  // calc difference in minutes until next time
})