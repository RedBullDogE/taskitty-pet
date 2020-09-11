<template>
    <div>
        <h1>List of Tasks</h1>

        <div class="row">
            <div class="valign-wrapper col s1 offset-s6">
                <button
                    v-if="filter"
                    class="btn btn-small filter-button"
                    @click="filter = null"
                >Clear Filter</button>
            </div>

            <div class="input-field col s3">
                <select ref="select" v-model="filter" :disabled="!tasks.length">
                    <option value disabled>Choose filter</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Status Filter</label>
            </div>
        </div>

        <table v-if="tasks.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Open</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, idx) of displayTasks" :key="task.id">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ task.title }}</td>
                    <td>{{ new Date(task.date).toLocaleDateString('ru-RU') }}</td>
                    <td class="table-textarea">
                        <div class="text">{{ task.description }}</div>
                    </td>
                    <td>
                        <span
                            :class="{ 
                                'green darken-1 white-text': task.status === 'completed',
                                'red white-text': task.status === 'outdated',
                            }"
                            class="status-sign z-depth-1 center-align"
                        >{{ task.status }}</span>
                    </td>
                    <td>
                        <router-link
                            tag="button"
                            class="btn btn-small"
                            :to="`/task/${task.id}`"
                        >Open</router-link>
                    </td>
                    <td>
<<<<<<< HEAD
                        <button
                            @click="taskToClose = task"
                            data-target="modal"
                            class="btn-flat modal-trigger"
                        >
=======
                        <button 
                            @click="taskToClose = task"
                            data-target="modal" 
                            class="btn-flat modal-trigger">
>>>>>>> 12e0933b7e173ee7eb9f0c0a940372d17acdfa28
                            <i class="material-icons red-text">close</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
<<<<<<< HEAD
        <div v-else class="center">
            <p>Still no tasks here</p>
            <p>
                Want to
                <router-link to="/create">add</router-link>?
            </p>
        </div>

        <Modal :task="taskToClose" />
=======
        <p v-else>No tasks</p>

        <Modal :task="taskToClose"/>
>>>>>>> 12e0933b7e173ee7eb9f0c0a940372d17acdfa28
    </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
    data() {
        return {
            filter: null,
<<<<<<< HEAD
            taskToClose: null,
=======
            taskToClose: null
>>>>>>> 12e0933b7e173ee7eb9f0c0a940372d17acdfa28
        };
    },
    components: {
        Modal,
    },
    computed: {
        tasks() {
            return this.$store.getters.tasks;
        },
        displayTasks() {
            return this.tasks.filter((t) => {
                if (!this.filter) {
                    return true;
                }
                return t.status === this.filter;
            });
        },
    },
    mounted() {
        M.FormSelect.init(this.$refs.select);
    },
};
</script>

<style>
.table-textarea {
    max-width: 400px;
}

.text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.filter-button {
    margin-top: 1.5rem;
}

.status-sign {
    padding: 5px 10px;
    border-radius: 10px;
}
</style>