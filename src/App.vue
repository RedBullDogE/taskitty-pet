<template>
    <div id="app">
        <app-navbar></app-navbar>
        
        <main class="container">
            <router-view></router-view>
        </main>
        <app-footer></app-footer>

        <action-button></action-button>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActionButton from "./components/ActionButton";

export default {
    components: {
        appNavbar: Navbar,
        ActionButton,
        appFooter: Footer,
    },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

#app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    main {
        flex: 1 0 auto;
    }
}
</style>
