<template>
    <NavBar></NavBar>
    <EditBar @searchInput="changeInput($event)"></EditBar>
    <AlleUebungen :exercises="this.exercises" :delete-exercise="false" :normal-list="false" :day="this.day" :search-input="this.input"></AlleUebungen>

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
    if (localStorage.gymToken == null || localStorage.gymToken == undefined) window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
    else {
        //if we come to add a new exercise
        this.day = this.$route.params.day;

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

</style>