import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
            let date = new Date(task.date);
            date.setHours(23, 59);
            
            if (task.time) date.setHours(...task.time.split(':'));
            
            if (date < new Date()) {
                task.status = 'outdated';
            }
            return task;
        })
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask(state, { id, description, date, time }) {
            const tasks = state.tasks.concat();

            const idx = tasks.findIndex(t => t.id === id);
            const task = tasks[idx];

            let dateTime = new Date(date);
            dateTime.setHours(23, 59);
            
            if (time) dateTime.setHours(...time.split(':'));

            const status = dateTime > new Date() ? 'active' : 'outdated';

            tasks[idx] = {...task, date, description, status, time};

            state.tasks = tasks;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask(state, id) {
            const idx = state.tasks.findIndex(t => t.id === id);
            state.tasks[idx].status = 'completed';
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask(state, id) {
            const idx = state.tasks.findIndex(t => t.id === id)
            state.tasks.splice(idx, 1);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    actions: {
        createTask({ commit }, task) {
            commit('createTask', task);
        },
        updateTask({ commit }, task) {
            commit('updateTask', task);
        },
        completeTask({ commit }, id) {
            commit('completeTask', id);
        },
        deleteTask({ commit }, id) {
            commit('deleteTask', id);
        }
    },
    modules: {
    },
    getters: {
        tasks: s => s.tasks,
        taskById: s => id => s.tasks.find(t => t.id === id)
    }
})
