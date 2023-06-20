<!--TODO: solution with event-bus-->
<template>

<div class="test">
    <h1 class="header">Meine <span style="color:#b71009;">Übungen.</span></h1>
    <EditBar @searchInput="changeInput($event)"></EditBar>
  <AlleUebungen :exercises="this.exercises" :delete-exercise="false" normalList=true :search-input="this.input" :machine="this.machine" :in-use="this.inUse" :not-in-use="this.notInUse" :ubung="this.ubung" :all-machine="this.allMachine" :all-use="this.allUse"></AlleUebungen>

</div>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";

export default {
name: 'AllView',
    components: {
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
        }, changeFilterMachine(machine){
            this.machine = machine
        }, changeFilterUbung(ubung) {
            this.ubung = ubung
        }, changeFilterNotInUse(notInUse){
            this.notInUse = notInUse
        }, changeFilterInUse(inUse){
            this.inUse = inUse
        }, changeFilterAllMachine(allMachine){
            this.allMachine = allMachine
        }, changeFilterAllUse(allUse){
            this.allUse = allUse
        }
    },
    mounted () {
        const fetch = require("node-fetch");

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
    margin-left: 1.5vw;
}

.test{
    margin-top: 40px;
}
</style>