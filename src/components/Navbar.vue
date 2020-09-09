<template>
    <nav class="blue darken-1">
        <div class="nav-wrapper">
            <div class="nav-flex">
                <div class="logo-wrap">
                    <img 
                        class="logo-icon" 
                        src="../../public/img/icons/cat.svg" 
                        alt="Logo">
                    <router-link to="/" class="logo-title">TasKitty</router-link>
                </div>


                <ul id="nav-mobile" class="right">
                    <router-link 
                        tag="li" 
                        to="/" 
                        active-class="active"
                        exact
                    >
                        <a href="#">Tasks</a>
                    </router-link>
                    <router-link 
                        tag="li" 
                        to="/create" 
                        active-class="active"
                    >
                        <a href="#">Create</a>
                    </router-link>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
    padding: 0 3rem;
}

.nav-flex {
    display: flex;
    justify-content: space-around;
}

.logo-wrap {
    height: 100%;
    display: flex;
}

.logo-icon {
    width: 40px;
}

.logo-title {
    font-size: 2rem;
}

</style>