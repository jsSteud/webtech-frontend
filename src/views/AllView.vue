<!--TODO: solution with event-bus-->
<template>

<div class="test">
    <h1 class="header">Meine <span style="color:#4f9b8f;">Übungen.</span></h1>
    <EditBar @searchInput="changeInput($event)" @filterInputMachine="changeFilterMachine($event)" @filterInputUbung="changeFilterUbung($event)" @filterInputNotInUse="changeFilterNotInUse($event)" @filterInputInUse="changeFilterInUse($event)"></EditBar>
  <AlleUebungen :exercises="this.exercises" page1=true :search-input="this.input" :machine="this.machine" :in-use="this.inUse" :not-in-use="this.notInUse" :ubung="this.ubung"></AlleUebungen>

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
            exercises: [],
            input: '',
            machine: true,
            ubung: true,
            notInUse: true,
            inUse: true
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