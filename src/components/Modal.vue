<template>
    <div ref="closeModal" id="modal" class="modal">
        <div class="modal-content">
            <h4>Delete this Task?</h4>
            <p>Are you sure you want to delete <span class="red-text">'{{ task && task.title }}'</span> task?</p>
            <p>This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-gray btn-flat">Close</a>
            <a 
                class="modal-close waves-effect waves-green btn"
                @click="deleteTask">
                I sure</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['task'],
    mounted() {
        M.Modal.init(this.$refs.closeModal, {
            endingTop: "20%",
        });
    },
    methods: {
        deleteTask() {
            this.$store.dispatch('deleteTask', this.task.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.modal {
    width: 30%;

    .modal-footer {
        padding-right: 2rem;

        .modal-close {
            margin-left: 1rem;
        }
    }
}
</style>