<template>
    <div class="editBar">
        <details><summary>Filter</summary>
            <label><input type="checkbox" name="" id="" checked>Maschinenübung</label> <br>
            <label> <input type="checkbox" name="" id="" checked>Freie Übung </label><br>
            <label> <input type="checkbox" name="" id="" checked>Not in use  </label><br>
            <label> <input type="checkbox" name="" id="" checked>In use</label> <br>
        </details>
        <input type="text" name="" id="searchBar" placeholder="Suche Übungen">
        <router-link to="/createnew"><i class="gg-file-add"></i></router-link>


    </div>
</template>

<script>
export default {
    name: "EditBar",
    components:{

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