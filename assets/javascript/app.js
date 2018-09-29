  var index = 0;

  var config = {
    apiKey: "AIzaSyAAtCOAhCFpZmJtASwhoFTn6ClS_VyxxfI",
    authDomain: "train-project-52bd5.firebaseapp.com",
    databaseURL: "https://train-project-52bd5.firebaseio.com",
    projectId: "train-project-52bd5",
    storageBucket: "train-project-52bd5.appspot.com",
    messagingSenderId: "350579624580"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    
    var newTrain = {
      name: name,
      destination: destination,
      first: first,
      frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain);

    alert("Your train is on its way!")

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    console.log("First time: " + firstTimeConverted);
    
    var currentTime = moment();
    var currentTimeCalc = moment(currentTime).format("hh:mm");
    console.log("Current Time: " + currentTimeCalc);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("Minutes until train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);
    console.log(tMinutesTillTrain);
    console.log(arrivalTime);

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(arrivalTime),
      $("<td>").text(tMinutesTillTrain)
    );

    $("#train-table > tbody").append(newRow);

  });

