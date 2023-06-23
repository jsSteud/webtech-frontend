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
    }
}
</script>

<style>

</style>