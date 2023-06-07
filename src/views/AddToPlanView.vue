<template>
  <AlleUebungen :exercises="this.exercises" :day="this.day"></AlleUebungen>

</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";

export default {
    name: "AddToPlanView",
    components: {
    AlleUebungen
    }, data () {
    return {
        exercises: [],
        day: null
    }
},
mounted () {
    this.day = this.$route.params.day;
    const endpoint = 'http://localhost:8081/allsessions';
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(exercise => {
            this.exercises.push(exercise)
        }))
        .catch(error => console.log('error', error))
}
}
</script>

<style>

</style>