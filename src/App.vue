<template>
    <div id="app">
        <navbar></navbar>
        <div class="container">
            <router-view></router-view>
        </div>
        <action-button></action-button>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import ActionButton from "./components/ActionButton";

export default {
    components: {
        Navbar,
        ActionButton,
    },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
