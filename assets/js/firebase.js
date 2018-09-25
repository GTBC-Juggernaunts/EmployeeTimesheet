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
database = firebase.database();
employeeRef = firebase.database('Employees/');

$("#submit-btn").on("click",function(event){
  event.preventDefault();
  //set local variables to input values for validation
  const employeeName = $("#employee-name").val().trim();
  const role = $("#role").val().trim();
  const startDate = $("#start-date").val().trim();
  const monthlyRate = $("#monthly-rate").val().trim();

  const postData = {
    employeeName,
    role,
    startDate,
    monthlyRate,
  };

  employeeRef.push(postData)

};

employeeRef.on('child_added', function(snapshot){
  console.log(snapshot.val());
  const monthsWorked = 2; //need to use moment.j
  const totalBilled = 20000;
  const newRow = `
  <th>${employeeName}</th>
  <th>${role}</th>
  <th>${startDate}</th>
  <th>${monthsWorked}</th>
  <th>${monthlyRate}</th>
  <th>${totalBilled}</th>
  `;
  $("#employeeTable").append(newRow)

});