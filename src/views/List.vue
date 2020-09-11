<template>
    <div>
        <h1>List of Tasks</h1>

        <div class="row">
            <div class="valign-wrapper col s2 offset-s6">
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
                    <th class='center'>Status</th>
                    <th>Open</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, idx) of displayTasks" :key="task.id">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ task.title }}</td>
                    <td>{{ new Date(task.date).toLocaleDateString('ru-RU') }} {{ task.time}}</td>
                    <td class="table-textarea">
                        <div class="text">{{ task.description }}</div>
                    </td>
                    <td class="center">
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
                        <button
                            @click="taskToClose = task"
                            data-target="modal"
                            class="btn-flat modal-trigger"
                        >
                            <i class="material-icons red-text">close</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="center">
            <p>Still no tasks here</p>
            <p>
                Want to
                <router-link to="/create">add</router-link>?
            </p>
        </div>

        <Modal :task="taskToClose" />
    </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
    data() {
        return {
            filter: null,
            taskToClose: null,
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