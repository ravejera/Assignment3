
let todos = []
window.addEventListener('load', () => {
    
    getTodos()
        .then(items => {
            todos = items
            renderTodos(todos)
        }).catch(console.log)

    const form = document.querySelector('.form');
    const title = document.getElementById('task-title');


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit form');
        if (!title.value) {
            alert('please fill in the form');
            return;
        }
        const task_el = document.createElement('div')
        task_el.classList.add('task') 
        // title.value = ""

        const modal = document.querySelector('#modal')
        modal.classList.add('hidden')
        // creating a todo object

        const todo = {
            completed: false,
            id: todos.length +1,
            userId: 1,
            title: title.value
        }
        todos.unshift(todo)
        renderTodos(todos)


        // ends
    })


})


// fetching API

async function getTodos() {
    return new Promise((res, rej) => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(data => {
                data.json()
                    .then(res)
                    .catch(rej)
            })
            .catch(rej)
    })
}

function renderTodos(items){
    const taskComplete_el = document.createElement('div')
    taskComplete_el.classList.add('complete-parent')

    const taskIncomplete_el = document.createElement('div')
    taskComplete_el.classList.add('incomplete-parent')

    items.forEach(item => {
        const task_el = document.createElement('div')
        console.log(item.complete)
        task_el.classList.add(item.completed ? 'complete' : 'incomplete')

        const title_el = document.createElement('div')
        title_el.classList.add('title')
        title_el.innerText = item.title;

        const edit_el = document.createElement('button')
        edit_el.classList.add('edit')
        edit_el.innerText = item.completed ? 'move to incomplete' : 'move to complete'
        edit_el.addEventListener('click', ()=>{
            todos = todos.map(todo=>{
                if(todo.id === item.id){
                    todo.completed = !todo.completed
                    // edit_el.innerText = 'incompleted'
                }
                return todo;
            })
            renderTodos(todos)
        })


        task_el.appendChild(title_el)
        task_el.appendChild(edit_el)
        
        if(item.completed){
            taskComplete_el.appendChild(task_el)
        } else{
            taskIncomplete_el.appendChild(task_el)
        }

       
})
document.querySelector('#complete').replaceChildren(taskComplete_el)  
document.querySelector('#task').replaceChildren(taskIncomplete_el)
}

function clickBtn(){
   const modal = document.querySelector('#modal')

   if(modal.classList.contains('hidden')){
    modal.classList.remove('hidden')
   } else{
    modal.classList.add('hidden')
   }

}
