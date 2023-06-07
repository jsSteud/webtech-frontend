<template>

<div class="test">
    <h1 class="header">Meine <span style="color:#4f9b8f;">Übungen.</span></h1>
    <EditBar></EditBar>
  <AlleUebungen :exercises="this.exercises" page1=true></AlleUebungen>

</div>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";


export default {
name: 'AllView',
    components: {
    AlleUebungen,
        EditBar
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
    margin-left: 19vw;
    color: white;
}

.test{
    margin-top: 100px;
}
</style>