document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    const fetchTasks = async () => {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        todoList.innerHTML = '';
        completedList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <span class="timestamp">[Added: ${task.added}]</span>`;
            if (task.completed) {
                li.innerHTML += ` <span class="timestamp">[Completed: ${task.completed}]</span>`;
                completedList.appendChild(li);
            } else {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.className = 'complete';
                completeButton.addEventListener('click', () => completeTask(task.id));
                li.appendChild(completeButton);
                todoList.appendChild(li);
            }
        });
    };

    const addTask = async (text) => {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        fetchTasks();
    };

    const completeTask = async (id) => {
        await fetch(`/tasks/${id}/complete`, { method: 'POST' });
        fetchTasks();
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value;
        if (newTask) {
            addTask(newTask);
            newTaskInput.value = '';
        }
    });

    fetchTasks();
});
