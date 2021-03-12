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

 //!     todo list

 //? defined elements
document.addEventListener('DOMContentLoaded',getTodo);
 var todoUl = document.querySelectorAll(".todoUl");
 var todoDash = document.querySelector(".todoDash");
 var valid = document.getElementById("valid");
 //? functions
 
 
 function addTodo(event){
   event.preventDefault();
   if(addInput.value == ''){
      valid.innerHTML="یک مورد اضافه کنید";
      return;
   }
   valid.innerHTML="";
   //create div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todoDiv");
   //create li
   const liTodo = document.createElement("li");
   liTodo.classList.add("todoItem");
   liTodo.innerText= addInput.value;
   todoDiv.appendChild(liTodo);
   //add local save
   localSave(addInput.value);
   // complited button 
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
   //todoUl.appendChild(todoDiv);
   for(let i = 0 ; i < todoUl.length; i++){
      todoUl[i].appendChild(todoDiv.cloneNode(true));
   }
   addInput.value="";
}

//? btn refrences

for(var i = 0 ; i < todoUl.length; i++){
   
   todoUl[i].addEventListener('click' , deleteCheck);
}



function deleteCheck(e){
   const item = e.target;

   if(item.classList[0] === "trashBtn"){
      const parentItem = item.parentElement;
      parentItem.classList.add("goOut");
      removeLocal(parentItem);
      parentItem.remove();
   }


   if(item.classList[0] === "complited"){
      const parent = item.parentElement;
      parent.classList.toggle("complited-btn");
   }
}

function localSave(todo){
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }else{
      todos= JSON.parse(localStorage.getItem("todos"));
   }
    
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo(){
    let todos;

   if (localStorage.getItem("todos") === null) {
      todos = [];
   }else{
      todos= JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach(function(todo){

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todoDiv");
      //create li
      const liTodo = document.createElement("li");
      liTodo.classList.add("todoItem");
      liTodo.innerText= todo;
      todoDiv.appendChild(liTodo);
      // complited button 
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
      for(let i = 0 ; i < todoUl.length; i++){
         todoUl[i].appendChild(todoDiv.cloneNode(true));
      }

   });
}
function removeLocal(todo){
   let todos;

   if (localStorage.getItem("todos") === null) {
      todos = [];
   }else{
      todos= JSON.parse(localStorage.getItem("todos"));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}