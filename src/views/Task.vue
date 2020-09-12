<template>
    <div class="row">
        <div v-if="task" class="col s8 offset-s2">
            <h3>{{ task.title }}</h3>

            <form @submit.prevent="submitHandler" v-if="task.status !== 'completed'">
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
                        class="materialize-textarea"
                    ></textarea>
                    <label for="description">Description</label>
                    <span
                        class="character-counter"
                        style="float: right; font-size: 12px;"
                    >{{ description.length }}/2048</span>
                </div>

                <div class="row">
                    <div class="col s4">
                        <div class="input-field">
                            <i class="material-icons prefix">date_range</i>
                            <input type="text" ref="datepicker" />
                        </div>
                    </div>
                    <div class="col s4">
                        <div class="input-field">
                            <i class="material-icons prefix">access_time</i>
                            <input type="text" ref="timepicker" />
                        </div>
                    </div>
                </div>

                <div>
                    <button class="btn" type="submit" style="margin-right: 1rem">Edit</button>
                    <button class="btn blue" type="button" @click="completeTask">Complete Task</button>
                </div>
            </form>

            <div v-else>
                <div class="info-block">
                    <i class="material-icons">local_offer</i>
                    <div class="chip-list">
                        <div class="chip" v-for="tags in task.tags" :key="tags.tag">{{ tags.tag }}</div>
                    </div>
                </div>

                <div class="info-block">
                    <i class="material-icons prefix">mode_edit</i>

                    <div class="description">{{ description }}</div>
                </div>

                <div class="info-block">
                    <i class="material-icons">date_range</i>
                    <div class="description">{{ task.date | formatDate }}</div>
                </div>

                <div class="info-block">
                    <i class="material-icons">access_time</i>
                    <div class="description">{{ task.time || '-' }}</div>
                </div>
            </div>
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
            description: "",
            chipsEl: null,
            dateEl: null,
            timeEl: null,
        };
    },
    mounted() {
        this.chipsEl = M.Chips.init(this.$refs.chips, {
            placeholder: "Task tags",
            secondaryPlaceholder: "new tag",
            data: this.task.tags,
            limit: 10,
        });

        this.description = this.task.description;

        this.dateEl = M.Datepicker.init(this.$refs.datepicker, {
            format: "dd.mm.yyyy",
            defaultDate: new Date(this.task.date),
            setDefaultDate: true,
        });

        this.timeEl = M.Timepicker.init(this.$refs.timepicker, {
            twelveHour: false,
            autoClose: true,
            showClearBtn: true,
            defaultTime: this.task.time,
        });

        this.$refs.iconChips;

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

        if (this.timeEl && this.timeEl.destroy) {
            this.timeEl.destroy();
        }
    },
    methods: {
        submitHandler() {
            this.$store.dispatch("updateTask", {
                id: this.task.id,
                description: this.description,
                date: this.dateEl.date,
                time: this.timeEl.time,
            });
            this.$router.push({ name: "list" });
        },
        completeTask() {
            this.$store.dispatch("completeTask", this.task.id);
            this.$router.push({ name: "list" });
        },
    },
};
</script>

<style lang="scss" scoped>
.info-block {
    display: flex;
    margin: 1rem 0;

    .material-icons {
        font-size: 2rem;
        flex: 0 0 3rem;
    }

    .chip-list {
        display: inline-block;
    }

    .description {
        font-weight: normal;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
}
</style>