import create, {State, StateCreator} from 'zustand';
import { devtools } from 'zustand/middleware';

import { generateId } from '../helpers';

interface Task {
   id: string;
   title: string;
   createAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    console.log(' applying', args);
    //set(...args);
    console.log(' new state', get());
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks))
    }
    set(nextState, ...args);
}, get, api);

function getCurrentState(params:type) {
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || [])) as Task[];
        return currentState
    } catch(err) {
        window.localStorage.setItem('tasks', '[]');
    }

    return [];
}



export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createAt: Date.now(),
        };

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map(task => ({
                ...task,
                title: task.id === id ? title : title.task,

            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();

        set({
            tasks: tasks.filter(task => task.id !== id)
        });

    },
}))));
