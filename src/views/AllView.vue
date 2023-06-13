<template>

<div class="test">
    <h1 class="header">Meine <span style="color:#4f9b8f;">Übungen.</span></h1>
    <EditBar @searchInput="changeInput($event)" @filterInputMachine="changeFilterMachine($event)"></EditBar>
  <AlleUebungen :exercises="this.exercises" page1=true :search-input="this.input"></AlleUebungen>

</div>
</template>

<script>

import AlleUebungen from "@/components/AlleUebungen.vue";
import EditBar from "@/components/EditBar.vue";
import {eventBus} from "@/router/eventBus";


export default {
name: 'AllView',
    components: {
    AlleUebungen,
        EditBar
}, methods: {
        changeInput(input){
            this.input = input
        }, changeFilterMachine(machine){
            this.machine = machine
        }
    }, data () {
        return {
            exercises: [],
            input: '',
            machine: true
        }
    },
    mounted () {
    eventBus.$on('mein-ereignis', (para1) => {
        console.log(para1)
    })
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