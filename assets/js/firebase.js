// Initialize Firebase
var config = {
  apiKey: "AIzaSyAnYhahnSp6y-YWhWwyRp4XyqiQWvzR0_E",
  authDomain: "timesheet-cc996.firebaseapp.com",
  databaseURL: "https://timesheet-cc996.firebaseio.com",
  projectId: "timesheet-cc996",
  storageBucket: "",
  messagingSenderId: "757199431159"
};
firebase.initializeApp(config);
database = firebase.database(); //set primary database object
employeeRef = database.ref('Employees/'); //primary database reference for lists

//set action for when submit is clicked to push form information into firebase as a new record
$("#submit-btn").on("click",function(event){
  event.preventDefault();
  //set form inputs to local variables
  const employeeName = $("#employee-name").val().trim();
  const role = $("#role").val().trim();
  const startDate = $("#start-date").val().trim();
  const monthlyRate = $("#monthly-rate").val().trim();
  const dateAdded = moment();

  //creates single object with all the local variables above
  const postData = {
    employeeName,
    role,
    startDate,
    monthlyRate,
    dateAdded,
  };
  console.log(postData);

  employeeRef.push(postData) //creates row in database

});


//action that runs when an item is added to the list in firebase
employeeRef.on('child_added', function(snapshot){
  console.log(snapshot.val());
  const data = snapshot.val();
  const monthsWorked = (moment(data.startDate, 'MM/DD/YYYY').diff(moment(),'days'))/30*-1;
  const totalBilled = monthsWorked * data.monthlyRate;
  console.log(moment());
  console.log();

  //create new row using string literals
  const newRow = `
  <th>${data.employeeName}</th>
  <th>${data.role}</th>
  <th>${data.startDate}</th>
  <th>${monthsWorked}</th>
  <th>${data.monthlyRate}</th>
  <th>${totalBilled}</th>
  `;

  $("#employeeTable").append(newRow); //adds row to table on page

});