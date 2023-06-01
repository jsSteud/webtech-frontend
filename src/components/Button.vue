<template>
  <button class="btnTemp">{{btn}}</button>
</template>


<script>
export default {
    name: 'ButtonTemp',
    props: {
        btn: String
    }
}

</script>

<style>
.btnTemp{
    width: 10vw;
    height: 5vh;
    background-color: black;
    border: 1px solid #4f9b8f;
    color: white;
    border-radius: 20px;
    font-size: 1.2vh;
    margin-left: 70vw;
    cursor: pointer;

}

</style>