<template>
    <div class="editBar">
        <details @change="filterChange()"><summary>Filter</summary>
            <label><input type="radio" name="name_1" id="machine" >Nur Maschinenübung</label> <br>
            <label> <input type="radio" name="name_1" id="ubung" >Nur Freie Übung </label><br>
            <hr>
            <label> <input type="radio" name="name_2" id="notInUse">Nur 'Not in use'  </label><br>
            <label> <input type="radio" name="name_2" id="inUse">Nur 'In use'</label> <br>
        </details>
        <input type="text" name="" id="searchBar" placeholder="Suche Übungen" @input="searchBarChange()">
        <router-link to="/createnew"><i class="gg-file-add"></i></router-link>


    </div>
</template>

<script>

export default {
    name: "EditBar",
    components:{

    }, data(){
        return {

        }
    }, methods: {
        searchBarChange(){
            let input = document.getElementById("searchBar").value
            //1st param 'searchInput' is the name of the '@searchInput'-event, called when creating <EditBar> Tag
            this.$emit("searchInput", input)

        }, filterChange(){
            //TODO: checkbox deactivate

            let machineCheckbox = document.getElementById("machine")
            let ubungCheckbox = document.getElementById("ubung")
            let notInUseCheckbox = document.getElementById("notInUse")
            let inUseCheckbox = document.getElementById("inUse")



            this.$emit("filterInputMachine", machineCheckbox.checked)
            this.$emit("filterInputUbung", ubungCheckbox.checked)
            this.$emit("filterInputNotInUse", notInUseCheckbox.checked)
            this.$emit("filterInputInUse", inUseCheckbox.checked)

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