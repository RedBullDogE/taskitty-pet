<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
            <h3>{{ task.title }}</h3>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <i ref="iconChips" class="material-icons prefix">local_offer</i>
                    <div class="chips" ref="chips"></div>
                </div>

                <div class="input-field">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea 
                        style="min-height: 150px"
                        id="description" 
                        v-model="description" 
                        class="materialize-textarea"></textarea>
                    <label for="description">Description</label>
                    <span
                        class="character-counter"
                        style="float: right; font-size: 12px;"
                    >{{ description.length }}/2048</span>
                </div>

                <div class="input-field">
                    <i class="material-icons prefix">access_time</i>
                    <input type="text" ref="datepicker" />
                </div>

                <div v-if="task.status !== 'completed'">
                    <button 
                        class="btn" 
                        type="submit"
                        style="margin-right: 1rem"
                    >Edit</button>
                    <button class="btn blue" type="button" @click="completeTask">Complete Task</button>
                </div>
            </form>
        </div>
        <p v-else>Task not found :(</p>
    </div>
</template>

<script>
export default {
    computed: {
        task() {
            return this.$store.getters.taskById(+this.$route.params.id);
        },
    },
    data() {
        return {
            description: '',
            chipsEl: null,
            dateEl: null,
        };
    },
    mounted() {
        this.chipsEl = M.Chips.init(this.$refs.chips, {
            placeholder: "Task tags",
            secondaryPlaceholder: "new tag",
            data: this.task.tags
        });

        this.description = this.task.description

        this.dateEl = M.Datepicker.init(this.$refs.datepicker, {
            format: "dd.mm.yyyy",
            defaultDate: new Date(this.task.date),
            setDefaultDate: true,
        });

        this.$refs.iconChips

        // Fix textarea and label imposition
        setTimeout(() => {
            M.updateTextFields();
        }, 0);
    },
    destroyed() {
        // Memory Leak Solution
        if (this.dateEl && this.dateEl.destroy) {
            this.dateEl.destroy();
        }

        if (this.chipsEl && this.chipsEl.destroy) {
            this.chipsEl.destroy();
        }
    },
    methods: {
        submitHandler() {
            this.$store.dispatch("updateTask", {
                id: this.task.id,
                description: this.description,
                date: this.dateEl.date
            });
            this.$router.push({ name: 'list' });
        },
        completeTask() {
            this.$store.dispatch('completeTask', this.task.id);
            this.$router.push({ name: 'list' });
        }
    },
};
</script>

<style>
</style>