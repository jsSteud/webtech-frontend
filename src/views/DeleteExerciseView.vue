<template>
    <NavBar></NavBar>
    <h1 class="header"><span style="color:#4f9b8f;">Lösche</span> meine <span style="color:#4f9b8f;">Übungen.</span></h1>
    <EditBar @searchInput="changeInput($event)" ></EditBar>
    <AlleUebungen :exercises="this.exercises" :delete-exercise=true :normalList=false :search-input="this.input" ></AlleUebungen>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'DeleteExerciseView',
    components: {
        NavBar,
        AlleUebungen,
        EditBar
    }, data () {
        return {
            exercises: [],
            input: '',
            machine: false,
            ubung: false,
            notInUse: false,
            inUse: false,
            allMachine: true,
            allUse: true
        }
    }, methods: {
        changeInput(input){
            this.input = input
        }
    },
    mounted () {
        if (localStorage.gymToken == null || localStorage.gymToken == undefined) window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
        else {

            const endpoint = process.env.VUE_APP_BASE_URL_BACKEND + '/allsessions';
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
}

</script>


<style>


</style>