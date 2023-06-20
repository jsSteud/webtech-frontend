<template>
    <div class="container">

    <div class="row height d-flex justify-content-center align-items-center">

        <div class="col-md-8">

            <div class="search">
                <i class="fa fa-search"></i>
                <input id="searchBar" type="text" class="form-control" placeholder="Looking for an exercise? Just search!" @change="searchBarChange">
                <button class="btn btn-primary">Search</button>
            </div>

        </div>

    </div>
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

            let allMachine = document.getElementById("allMachine")
            let machineCheckbox = document.getElementById("machine")
            let ubungCheckbox = document.getElementById("ubung")

            let allUse = document.getElementById("allUse")
            let notInUseCheckbox = document.getElementById("notInUse")
            let inUseCheckbox = document.getElementById("inUse")


            this.$emit("filterInputAllMachine", allMachine.checked)
            this.$emit("filterInputMachine", machineCheckbox.checked)
            this.$emit("filterInputUbung", ubungCheckbox.checked)

            this.$emit("filterInputAllUse", allUse.checked)
            this.$emit("filterInputNotInUse", notInUseCheckbox.checked)
            this.$emit("filterInputInUse", inUseCheckbox.checked)

        }
    }
}
</script>

<style>

.search{
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, .1);

}

.search input{

    height: 50px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;


}

.container{
    margin-top: 4vh;
}
.search input:focus{

    box-shadow: none;
    border: 2px solid blue;


}

.search button{

    position: absolute;
    top: 5px;
    right: 5px;
    height: 40px;
    width: 110px;
    background: #b71009;
    border: none;
}


</style>