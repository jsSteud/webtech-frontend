<template>
    <NavBar></NavBar>
    <EditBar @searchInput="changeInput($event)" @filterInputMachine="changeFilterMachine($event)" @filterInputUbung="changeFilterUbung($event)" @filterInputNotInUse="changeFilterNotInUse($event)" @filterInputInUse="changeFilterInUse($event)" @filterInputAllMachine="changeFilterAllMachine($event)" @filterInputAllUse="changeFilterAllUse($event)"></EditBar>
    <AlleUebungen :exercises="this.exercises" :delete-exercise="false" :normal-list="false" :day="this.day" :search-input="this.input" :machine="this.machine" :in-use="this.inUse" :not-in-use="this.notInUse" :ubung="this.ubung" :all-machine="this.allMachine" :all-use="this.allUse"></AlleUebungen>

</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "AddToPlanView",
    components: {
        NavBar,
        EditBar,
    AlleUebungen
    }, data () {
    return {
        exercises: [],
        input: '',
        day: null,
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
        //if we come to add a new exercise
    this.day = this.$route.params.day;


    const endpoint = 'http://localhost:8081/allsessions';
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
</script>

<style>

</style>