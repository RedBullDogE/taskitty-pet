<template>
    <div class="row">
        <div class="col s8 offset-s2">
            <h1>Create task</h1>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input id="title" v-model="title" type="text" class="validate" required />
                    <label for="title">Title</label>
                    <span class="helper-text" data-error="Title is required"></span>
                </div>

                <div class="input-field">
                    <i class="material-icons prefix">local_offer</i>
                    <div class="chips" ref="chips"></div>
                </div>

                <div class="input-field">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea
                        id="description"
                        maxlength="2048"
                        v-model="description"
                        class="materialize-textarea"
                    ></textarea>
                    <label for="description">Description</label>
                    <span
                        :class="{ full: description.length === 2048}"
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

                <button class="btn" type="submit">Create Task</button>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "create",
    data() {
        return {
            title: "",
            description: "",
            chipsEl: null,
            dateEl: null,
            timeEl: null,
        };
    },
    mounted() {
        this.chipsEl = M.Chips.init(this.$refs.chips, {
            placeholder: "Task tags",
            limit: 10,
        });

        this.dateEl = M.Datepicker.init(this.$refs.datepicker, {
            format: "dd.mm.yyyy",
            defaultDate: new Date(),
            setDefaultDate: true,
        });

        this.timeEl = M.Timepicker.init(this.$refs.timepicker, {
            twelveHour: false,
            showClearBtn: true,
            autoClose: true,
        });
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
            let dateTime = new Date(this.dateEl.date.setHours(23, 59));

            if (this.timeEl.time) {
                dateTime = new Date(this.dateEl.date.setHours(...this.timeEl.time.split(':')));
            }
            
            
            if (dateTime < new Date()) {
                M.toast({ 
                    html: 'Outdated! Please specify right date and time',
                    classes: 'red' });
            } else {
                const task = {
                    title: this.title,
                    description: this.description,
                    id: Date.now(),
                    status: "active",
                    tags: this.chipsEl.chipsData,
                    date: this.dateEl.date,
                    time: this.timeEl.time || null,
                };
    
                this.$store.dispatch("createTask", task);
                this.$router.push({ name: "list" });
            }
            
        },
    },
};
</script>

<style lang="scss" scoped>
.full {
    color: red;
}
</style>
