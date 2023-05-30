<template>
<div class="test">
    <h1 class="header">Meine Übungen</h1>
  <AlleUebungen :exercises="this.exercises"></AlleUebungen>
</div>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";

export default {
name: 'AllView',
    components: {
    AlleUebungen
}, data () {
        return {
            exercises: []
        }
    },
    mounted () {
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
.header{
    margin-left: 5vw;
}

.test{
    margin-top: 100px;
}
</style>