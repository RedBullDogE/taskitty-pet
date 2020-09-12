<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th class="row-id">#</th>
                    <th class="row-title">Title</th>
                    <th class="row-date">Date</th>
                    <th class="row-desc">Description</th>
                    <th class="row-status center">Status</th>
                    <th class="row-open center">Open</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(task, idx) of displayTasksOnPage" :key="task.id">
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
                    <td class="center">
                        <router-link
                            tag="button"
                            class="btn btn-small"
                            :to="`/task/${task.id}`"
                        >Open</router-link>
                    </td>
                    <td class="center">
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

        <br>

        <div class="row">
            <div class="col s3 offset-s2">
                <ul class="pagination">
                    <li class="waves-effect" :class="{ disabled: currentPage == 1}" @click="prevPage">
                        <a>
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li
                        style="cursor: pointer"
                        :class="{ 'active indigo accent-2': currentPage == idx }"
                        v-for="idx in numberOfPages"
                        :key="idx"
                        @click="setPage(idx)"
                    >
                        <a>{{ idx }}</a>
                    </li>
                    <li
                        class="waves-effect"
                        :class="{ disabled: currentPage == numberOfPages}"
                        @click="nextPage"
                    >
                        <a>
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="input-field col s3 offset-s2">
                <select 
                    ref="select"
                    v-model="tasksPerPage"
                    @change="$store.dispatch('setPage', 1)">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <label>Tasks per page</label>
            </div>
        </div>

        <Modal :task="taskToClose" />
    </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
    props: ["tasks"],
    data() {
        return {
            tasksPerPage: 5,
            taskToClose: null,
        };
    },
    components: {
        Modal,
    },
    computed: {
        currentPage() {
            return this.$store.getters.currentPage;
        },
        numberOfPages() {
            return Math.ceil(this.tasks.length / this.tasksPerPage);
        },
        displayTasksOnPage() {
            return this.tasks.slice(
                this.tasksPerPage * (this.currentPage - 1),
                this.tasksPerPage * this.currentPage
            );
        },
    },
    methods: {
        nextPage() {
            if (this.currentPage != this.numberOfPages)
                this.$store.dispatch('setPage', this.currentPage + 1);
        },
        prevPage() {
            if (this.currentPage != 1)
                this.$store.dispatch('setPage', this.currentPage - 1);
        },
        setPage(idx) {
            this.$store.dispatch('setPage', idx);
        }
    },
    mounted() {
        M.FormSelect.init(this.$refs.select);
    }
};
</script>

<style lang="scss" scoped>
table {
    table-layout: fixed;

    .row {
        &-id {
            width: 5%;
        }

        &-title {
            width: 25%;
        }

        &-date {
            width: 15%;
        }

        &-desc {
            width: 30%;
        }

        &-status {
            width: 10%;
        }

        &-open {
            width: 10%;
        }

    }
}
</style>