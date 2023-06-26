<!--TODO: solution with event-bus-->
<template>
<NavBar></NavBar>
<div class="test">
    <h1 class="header">Meine <span style="color:#b71009;">Übungen.</span></h1>
    <EditBar @searchInput="changeInput($event)"></EditBar>
  <AlleUebungen :exercises="this.exercises" :search-input="this.input" :normal-list="true"></AlleUebungen>

</div>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
name: 'AllView',
    components: {
        NavBar,
        EditBar,
    AlleUebungen
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
            const fetch = require("node-fetch");

            const endpoint = process.env.VUE_APP_BASE_URL_BACKEND + '/allsessions';
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    'token': localStorage.gymToken
                }
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
.header{
    margin-left: 1.5vw;
}

.test{
    margin-top: 40px;
}
</style>