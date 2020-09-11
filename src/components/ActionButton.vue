<template>
    <div ref="actionButton" class="fixed-action-btn">
        <router-link 
            class="waves-effect waves-light btn-floating btn-large deep-purple"
            to="/create"
        >
            <i class="large material-icons">mode_edit</i>
        </router-link>
        <!--
        <ul>
            <li>
                <a class="btn-floating red">
                    <i class="material-icons">insert_chart</i>
                </a>
            </li>
            <li>
                <a class="btn-floating yellow darken-1">
                    <i class="material-icons">format_quote</i>
                </a>
            </li>
            <li>
                <a class="btn-floating green">
                    <i class="material-icons">publish</i>
                </a>
            </li>
            <li>
                <a class="btn-floating blue">
                    <i class="material-icons">attach_file</i>
                </a>
            </li>
        </ul>
        -->
    </div>
</template>

<script>
export default {
    mounted() {
        M.FloatingActionButton.init(this.$refs.actionButton);
    }
};
</script>

<style>
.fixed-action-btn {
    margin-bottom: 2%;
    margin-right: 5%;
}
</style>