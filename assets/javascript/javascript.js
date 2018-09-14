$(document).ready(function () {
  var tName
  var tDestination
  var tFrequency
  var tArrival //first time
  var minutesToTrain//diff in minutes between now and nextArrival
  var diffTime
  var tRemainder
  var nextTrain

  //don't need date, there for aesthetics
  const date = moment().format('MMMM Do YYYY');
  $("#day").html(date)
  //adding time to page
  // set interval
  const now = moment().format('LT')
  $("#time").html(now)


  // Initialize Firebase
  const config = {
    apiKey: myKey,
    authDomain: "trains-55.firebaseapp.com",
    databaseURL: "https://trains-55.firebaseio.com",
    projectId: "trains-55",
    storageBucket: "trains-55.appspot.com",
    messagingSenderId: "908445882136"
  };

  firebase.initializeApp(config);

  //access to database
  const database = firebase.database()

  //access to trains
  const trains = database.ref('/trains')

  function getTime() {
    firstTimeConverted = moment(tArrival, "hh:mmA").subtract(1, "day")
    diffTime = moment().diff(moment(firstTimeConverted), 'minutes')
    tRemainder = diffTime % tFrequency
    minutesToTrain = tFrequency - tRemainder
    nextTrain = moment().add(minutesToTrain, 'minutes').format('hh:mmA')
  }

  $("#submitBTN").on("click", function () {
    event.preventDefault()

    // initiate variables
    tName = $("#tName").val().trim()
    tDestination = $("#tDestination").val().trim()
    tFrequency = parseInt($("#tFrequency").val().trim())
    tArrival = $("#tArrival").val().trim()

    getTime();

    trains.push({
      name: tName,
      destination: tDestination,
      frequency: tFrequency,
      arrival: tArrival,
    })

  })

  trains.orderByChild('number').limitToLast(10).on('child_added', function (snap) {
    const t = snap.val()
    tArrival = t.arrival
    tFrequency = t.frequency
    tName = t.name
    tDestination = t.destination

    getTime();

    const tList = $(`
    <div class='card'>
    <div class='card-body'>
    <h3 class='card-title' id='card-name'> ${tName} </h3>
    <p class='card-text' id='card-destination'>Destination:</p> 
    <p id='spec'> ${tDestination} </p> 
    <p class='card-text' id='card-frequency'>Frequency:</p> 
    <p id='spec'>Every ${tFrequency} min.</p> 
    <p class='card-text' id='card-next-arrival'>Next Arrival:</p> 
    <p id='spec'> ${nextTrain} </p> 
    <p class='card-text' id='card-minutes'>Next train arrives in:</p> 
    <p id='spec'> ${minutesToTrain} min.</p> 
    <a href='https://www.amtrak.com/home.html' class='card-link' target='_blank'>Buy A Ticket</a>
    </div>
    </div>`)
    
    //append each card
    $("#currentTrainTimes").append(tList)
  })
})