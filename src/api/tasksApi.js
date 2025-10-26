// Minimal fake API using localStorage to persist tasks between reloads
const KEY = "th_tasks";

function read() {
    const raw = localStorage.getItem(KEY);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

export async function getTasks() {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 300));
    return read();
}

export async function addTask(task) {
    const tasks = read();
    const newTask = { 
        id: Date.now().toString(), 
        createdAt: new Date().toISOString(),
        category: task.category || 'general',
        dueDate: task.dueDate || null,
        ...task 
    };
    tasks.unshift(newTask);
    write(tasks);
    await new Promise((r) => setTimeout(r, 200));
    return newTask;
}

export async function updateTask(id, patch) {
    const tasks = read();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx >= 0) {
        tasks[idx] = { ...tasks[idx], ...patch };
        write(tasks);
        await new Promise((r) => setTimeout(r, 200));
        return tasks[idx];
    }
    throw new Error("Not found");
}

export async function deleteTask(id) {
    let tasks = read();
    tasks = tasks.filter((t) => t.id !== id);
    write(tasks);
    await new Promise((r) => setTimeout(r, 200));
    return true;
}
