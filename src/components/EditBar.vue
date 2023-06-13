<template>
    <div class="editBar">
        <details @change="filterChange()"><summary>Filter</summary>
            <label><input type="checkbox" name="" id="machine" checked>Maschinenübung</label> <br>
            <label> <input type="checkbox" name="" id="ubung" checked>Freie Übung </label><br>
            <label> <input type="checkbox" name="" id="notInUse" checked>Not in use  </label><br>
            <label> <input type="checkbox" name="" id="inUse" checked>In use</label> <br>
        </details>
        <input type="text" name="" id="searchBar" placeholder="Suche Übungen" @input="searchBarChange()">
        <router-link to="/createnew"><i class="gg-file-add"></i></router-link>


    </div>
</template>

<script>

import {eventBus} from "@/router/eventBus";


export default {
    name: "EditBar",
    components:{

    }, data(){
        return {

        }
    }, methods: {
        searchBarChange(){
            let input = document.getElementById("searchBar").value
            //1st param 'searchInput' is the name of the '@searchInput'-event called when creating <EditBar> Tag
            this.$emit("searchInput", input)

        }, filterChange(){
            let machine = document.getElementById("machine").checked
            // let ubung = document.getElementById("ubung").checked
            // let notInUse = document.getElementById("notInUse").checked
            // let inUse = document.getElementById("inUse").checked

            eventBus.$emit('mein-ereignis', machine)


            // this.$emit("filterInputMachine", machine)
            // this.$emit("filterInputUbung", ubung)
            // this.$emit("filterInputNotInUse", notInUse)
            // this.$emit("filterInputInUse", inUse)

        }
    }
}
</script>

<style>
.gg-file-add{
    color: #4f9b8f;
    --ggs: 1.6;
    margin-left: 3vw;
    cursor: pointer;
}
details{
    color: white;
    font-size: 1.4vw;
    padding: 4px;
    cursor: pointer;
    accent-color: #4f9b8f;
}

.editBar{
    display: flex;
    align-items: center;
    margin-left: 60vw;
}


#searchBar{
    width: 10vw;
    height: 1.5vh;
    background-color: white;
    border: 1px solid lightgrey;
    color: lightgrey;
    border-radius: 15px;
    font-size: 1vw;
    padding: 4px;
    margin-left: 3vw;

}

</style>