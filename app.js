// Tạo biến data để lưu dữ liệu
const TODOLIST_APP = 'TODOLIST_APP';
let data = [
    {
        task: 'Chạy 2km',
        is_complete: true
    },
    {
        task: 'Học lập trình 2h',
        is_complete: true
    }
];

// Tạo hàm lưu dữ liệu -> saveData()
const saveData = (data) => {
    localStorage.setItem(TODOLIST_APP, JSON.stringify(data));
};

// Tạo hàm lấy dữ liệu -> loadData()
const loadData = () => {
    let data;
    data = JSON.parse(localStorage.getItem(TODOLIST_APP));
    data = data ? data : [];
    return data;
}

// Tạo hàm add task
const addTask = (new_task) => {
    let data;
    data = loadData();
    // data.push(new_task);
    data = [...data, new_task];
    saveData(data);
} 

// Hàm xử lý nút thêm mới
const formAddTask = document.forms.add_task;
formAddTask.addEventListener('submit', (e) => {
    let new_task;
    const task = document.querySelector('#task');
    new_task = {
        task: task.value,
        is_complete: false
    };
    addTask(new_task);
    renderTask();
    task.value = '';
    e.preventDefault();
})

// Tạo hàm tạo công việc
const createTaskItem = (task, is_complete, index) => {
    return `
        <li class="task-item" index = ${index} is-complete = ${is_complete}>
                <span class="task" onclick="markTaskComplete(${index})">${task}</span>
                <div class="task-action">
                    <button class="pencil-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button onclick="deleteTask(this, ${index})" class="delete-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                        </svg>
                    </button>
                </div>
            </li>
    `;
}

// Xuất danh sách công việc
const renderTask = () => {
    let data, ulTasksHtml, ulTask;
    ulTask = document.querySelector('ul.task');
    data = loadData();
    ulTasksHtml = data.map((element, index) => {
        return createTaskItem(element.task, element.is_complete, index);
    });
    ulTask.innerHTML = ulTasksHtml.join('');
};

// Hàm đánh dấu công việc hoàn thành
const markTaskComplete = (index) => {
    let data;
    data = loadData();
    data[index].is_complete = !data[index].is_complete;
    saveData(data);
    renderTask();
}

// Hàm xóa công việc
const deleteTask = (element, index) => {
    let data;
    let deleteConfirm = confirm('Đã chắc xóa chưa?');
    if (deleteConfirm) {
        data = loadData();
        data.splice(index, 1);
        saveData(data);
        renderTask();
    } else {
        // alert('Giữ nguyên rồi đấy')
    }
}

renderTask();