//getting some important elements
var input = document.getElementById("input-fld");
var addButton = document.getElementById("add-btn");
var listContainer = document.getElementById("list-container");
var totalTasksContainer = document.getElementById("total-tasks");
var completedTasksContainer = document.getElementById("completed-tasks");

var itemId = 1; //initializing itemId to be alloted to each list item
var totalTasks = 0; //initializing total tasks variable
var completedTasks = 0; //initializing completed tasks variable

//add event listener to add button
addButton.addEventListener("click", handleInput);

//function handles input and call addNode() with input value
function handleInput() {
  var inputVal = input.value;
  if (inputVal != "") {
    addNode(inputVal);
  }
  return;
}

//adding new list item using DOM manipulation
function addNode(val) {
  //creating main div
  let listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.setAttribute("id", itemId);
  listItem.setAttribute("is-completed", "false");
  itemId++;

  //creating checkbox
  let checkbox = document.createElement("input");
  checkbox.className = "checkbox";
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", markAsFinished); //adding event listener on checkbox
  listItem.appendChild(checkbox);

  //creating description element
  let desc = document.createElement("p");
  desc.className = "item-desc";
  desc.innerHTML = val;
  listItem.appendChild(desc);

  //creating delete button
  let deleteButton = document.createElement("img");
  deleteButton.className = "del-btn";
  deleteButton.setAttribute(
    "src",
    "https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
  );
  deleteButton.addEventListener("click", removeNode); //adding event listener to delete button
  listItem.appendChild(deleteButton);

  //appending listItem to listContainer
  listContainer.prepend(listItem);

  //updating total tasks
  totalTasks++;

  //updating value of total tasks in DOM
  totalTasksContainer.innerHTML = `Total Tasks: ${totalTasks}`;
  input.value = ""; //clean up the value of input field adding the item
}

//remove listItem node from DOM
function removeNode(e) {
  let id = e.target.parentElement.id; //fetching id of the listItem to be deleted
  let nodeToBeDeleted = document.getElementById(id); //fetching the node to be deleted

  //fetching information whether the current node is completed or not
  let isCompletedNode = nodeToBeDeleted.getAttribute("is-completed");

  //update completedTasks value if node to be deleted is completed
  if (isCompletedNode === "true") {
    completedTasks--;
    completedTasksContainer.innerHTML = `Completed Tasks: ${completedTasks}`;
  }

  //removing the node
  listContainer.removeChild(nodeToBeDeleted);

  //updating total tasks
  totalTasks--;
  //updating DOM with total tasks
  totalTasksContainer.innerHTML = `Total Tasks: ${totalTasks}`;
}

//mark the node as finished
function markAsFinished(e) {
  let id = e.target.parentElement.id;
  let finishedNode = document.getElementById(id);
  finishedNode.setAttribute("is-completed", "true");
  let checkbox = finishedNode.getElementsByClassName("checkbox"); //fetching checkbox elem inside finished node
  checkbox[0].removeEventListener("click", markAsFinished); //removing event listener for memory loss issues
  finishedNode.removeChild(checkbox[0]); //removing checkbox elem

  //creating new elem to display the current node is finished node
  let finishedItem = document.createElement("img");
  finishedItem.setAttribute(
    "src",
    "https://cdn-icons-png.flaticon.com/512/190/190411.png"
  );
  finishedItem.className = "checkbox";
  finishedNode.prepend(finishedItem);
  finishedNode.style.backgroundColor = "lightgrey"; //changing the background color of finished node to grey

  //updating completed tasks
  completedTasks++;

  //updating the value of completed tasks in DOM
  completedTasksContainer.innerHTML = `Completed Tasks: ${completedTasks}`;
}
