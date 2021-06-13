 //? defined elements
document.addEventListener('DOMContentLoaded',getTodo);
 var todoUl = document.querySelector(".todoUl");
 var todoDash = document.querySelector(".todoDash");
 var valid = document.getElementById("valid");
 var addInput = document.getElementById("addinput1")

 //? functions
 function addTodo(event){
   event.preventDefault();
   if(addInput.value == ''){
      valid.innerHTML="یک مورداضافه کنید";
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
   todoUl.appendChild(todoDiv);
   addInput.value="";
}

//? btn refrences
todoUl.addEventListener('click' , deleteCheck);
//delete function
function deleteFun(item) { 
   const parentItem = item.parentElement;
   parentItem.classList.add("goOut");
   removeLocal(parentItem);
   parentItem.remove();
 }

function deleteCheck(e){
   const item = e.target;

   //remove check
   if(item.classList[0] === "trashBtn"){
      deleteFun(item);
   }
   // completed check
   if(item.classList[0] === "complited"){
      const parent = item.parentElement;   
      parent.classList.toggle("complited-btn");
   }
}

//! local save
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

//! restore data
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
      todoUl.appendChild(todoDiv);
   });
}

//! remove localstorage
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

//! shos buttons
var cat = document.querySelector(".category");
const allTodo = document.getElementById("alltodo");
const finish = document.getElementById("completed");
const unfinish = document.getElementById("uncompleted");

cat.addEventListener('click',filters);

function filters(e){
   let todos = todoUl.childNodes;
   let target = e.target.value;
   e.preventDefault();
   todos.forEach(function (todo) { 
      switch(target){

         case "alltodo":
            if(todo.tagName == "DIV"){
 
               todo.style.display= "flex";
            }
            unfinish.classList.remove("active");
            finish.classList.remove("active");
            allTodo.classList.add("active");
         break;

         case "uncompleted":
            if(todo.tagName == "DIV"){
               if(!todo.classList.contains("complited-btn")){
                  todo.style.display = "flex";
               }else{
                  todo.style.display = "none";
               }
            }
            allTodo.classList.remove("active");
            finish.classList.remove("active");
            unfinish.classList.add("active");
         break;

         case "completed":
            if(todo.tagName == "DIV"){
               if(todo.classList.contains("complited-btn")){
                  todo.style.display = "flex";
               }else{
                  todo.style.display = "none";
               }
            }
            allTodo.classList.remove("active");
            unfinish.classList.remove("active");
            finish.classList.add("active");
         break; 
      }
    })
}

//! auto delete completed things
setTimeout(aoutoDel,3600000*24*7);
function aoutoDel() { 
   let todos = todoUl.childNodes;
   todos.forEach(function (todo) {
      if (todo.tagName == "DIV") {
         if (todo.classList.contains("complited-btn")) {
            removeLocal(todo);
            todo.remove();
         }
      }
   })
 }