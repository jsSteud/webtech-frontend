<template>
    <div class="content_startView">
       <h1 class="welcomeHeader">Mein Trainingplan</h1>
        <TrainingsPlan :exercises="this.exercises"></TrainingsPlan>
    </div>
</template>

<script>

import TrainingsPlan from "@/components/TrainingsPlan.vue";

export default {
    name: 'StartView',
    components: {
        TrainingsPlan
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
.welcomeHeader{
margin-left: 5vw;
}

.content_startView{
    margin-top: 100px;
}

body{
    background-size: cover;
    background-color: #c4d3f6;
}
</style>