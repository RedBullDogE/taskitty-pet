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
                <select 
                    ref="select"
                    v-model="filter"
                    :disabled="!tasks.length"
                    @change="$store.dispatch('setPage', 1)">
                    <option value disabled>Choose filter</option>
                    <option value="active">Active</option>
                    <option value="outdated">Outdated</option>
                    <option value="completed">Completed</option>
                </select>
                <label>Status Filter</label>
            </div>
        </div>

        <Pages v-if="tasks.length" :tasks="displayTasks" />
    
        <div v-else class="center">
            <p>Still no tasks here</p>
            <p>
                Want to
                <router-link to="/create">add</router-link>?
            </p>
        </div>
    </div>
</template>

<script>
import Pages from "../components/Pages";

export default {
    data() {
        return {
            filter: null,
        };
    },
    components: {
        Pages
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