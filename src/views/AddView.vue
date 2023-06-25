<template>
    <NavBar></NavBar>
    <CreateNew></CreateNew>
</template>

<script>

import CreateNew from "@/components/CreateNew.vue"
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'AddView',
    components: {
        NavBar,
        CreateNew
    }, data () {
        return {

        }
    }, mounted() {
        if (localStorage.gymToken == null || localStorage.gymToken == undefined) window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
    }
}
</script>

<style>

</style>