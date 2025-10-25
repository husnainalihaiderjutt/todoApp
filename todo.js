const inputItem = document.getElementById('todo-input');
const addItem = document.getElementById('add-task-button');
const listItem = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(element => {
   renderTask(element)   
});

addItem.addEventListener('click',()=>
{
   const taskText = inputItem.value.trim();
   if(taskText === "") return;
   const newTask = {
    id:Date.now(),
    inputText : taskText,
    completed:false
   } 
   tasks.push(newTask);
   renderTask(newTask);
   savetask()
   inputItem.value=""; 
   console.log(tasks)
})

function renderTask(task)
{
  const li =  document.createElement('li');
  li.setAttribute('data-id',task.id);
  if(task.completed) 
  {
   li.classList.add('completed')
  }
  li.innerHTML= `<span>${task.inputText}</span>
  <button>Delete</button>`;
  li.addEventListener('click',(e)=>
{
   if(e.target.tagName==="BUTTON") return;
   task.completed = !task.completed;      
   li.classList.toggle('completed');
   savetask()
})
 li.querySelector('button').addEventListener('click',(e)=>{
   e.stopPropagation();
   tasks = tasks.filter(t=>t.id!== task.id)
     li.remove();
     savetask();
  })

  listItem.appendChild(li);
}


function savetask()
{
   localStorage.setItem("tasks",JSON.stringify(tasks))
}