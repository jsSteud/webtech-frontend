<template>
    <NavBar></NavBar>
    <div class="content_startView">
       <h1 class="welcomeHeader" >Meine <span style="color:#b71009;">Ziele. </span></h1>
        <h1 class="welcomeHeader">Mein <span style="color:#b71009;">Trainingsplan. </span></h1>
        <TrainingsPlan :exercises="this.exercises"></TrainingsPlan>
    </div>
</template>

<script>

import TrainingsPlan from "@/components/TrainingsPlan.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'StartView',
    components: {
        NavBar,
        TrainingsPlan
    }, data () {
        return {
            exercises: []
        }
    },
    mounted () {
        if (localStorage.gymToken == null || localStorage.gymToken == undefined) window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
        else {
            const url = process.env.VUE_APP_BASE_URL_BACKEND + "/allsessions";
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'token': localStorage.gymToken
                }
            }

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => result.forEach(exercise => {
                    this.exercises.push(exercise)
                }))
                .catch(error => console.log('error', error))
        }
    }, methods:{
    },
}
</script>

<style>


.welcomeHeader{
    margin-left: 20vw;
}

.content_startView{
    margin-top: 50px;
}

</style>