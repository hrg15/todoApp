//form validation
var addInput = document.getElementById("addinput1")
addInput.setCustomValidity("یک مورد اضافه کنید")

// toggle nav

var closeBtn = document.getElementById("navBtn2");
var main = document.getElementById("todolist");
var nav = document.getElementById("nav");

function navbarOpen(){
     nav.style.width = "400px"; 
    main.style.marginRight = "200px";
    closeBtn.style.right = "355px";
 }
function navbarClose(){
     nav.style.width = "0"; 
    main.style.marginRight = "0";
    closeBtn.style.right = "-100px";
 }

 // todo list

 //? defined elements

 var todoUl = document.querySelector(".todoUl");
 
 //? functions
 
 
 function addTodo(event){
   event.preventDefault();
   //create div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todoDiv");
   //create li
   const liTodo = document.createElement("li");
   liTodo.classList.add("todoItem");
   liTodo.innerText= addInput.value;
   todoDiv.appendChild(liTodo);
   //create button 
   const complitedbtn = document.createElement("button");
   complitedbtn.classList.add("complited");
   complitedbtn.innerHTML='<i class="fa fa-check"></i>'
   todoDiv.appendChild(complitedbtn);
   // trash button 
   const trshBtn = document.createElement("button");
   trshBtn.classList.add("trashBtn");
   trshBtn.innerHTML='<i class="fa fa-trash"></i>'
   todoDiv.appendChild(trshBtn);
   //append div to ul
   todoUl.appendChild(todoDiv);
   addInput.value="";
}