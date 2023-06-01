<template>

        <table class="exercise_table">

            <tr v-for="exercise in exercises" :key="exercise.id">
                <div>
<!--                <img src="@/assets/liegestutze.png" alt="sport_icon" id="sport_icon">-->
                <td id="exercise_title"><b>{{exercise.name}}</b></td>
                <td v-if="exercise.machineType">mit Maschine</td>
                <td v-else>ohne Maschine</td>
                <td v-if="exercise.planed" id="planed"><i class="gg-check-o"></i>in use</td>
                <td v-else id="not_planed"><i class="gg-close"></i>not in use</td>
            </div>
            </tr>

        </table>

</template>


<script>
export default {
    name: 'AlleUebungen',
    props: {
        exercises: {
            type: Array,
            required: true
    }
}
}
</script>


<style>


.exercise_table{
    margin-left: auto;
    margin-right: auto;
    :hover{
        transition: all .2s ease-in-out;
        transform: scale(1.02);
        border: 1px solid #6c7ae0;
        #exercise_title {
            color: #6c7ae0;

        }
    }
}

#exercise_title {
    font-size: 120%;
}

.exercise_table td{
    width: 15vw;
    pointer-events: none;

}


.exercise_table div{
    background-color: white;
    padding: 3px;
    border-radius: 10px;

}

#planed{
    color: #7aad15;

}

#not_planed{
    color: #ab1c1c;;
}


#sport_icon{
    height: 2vh;
    margin-right: 15px;
    pointer-events: none;

}



</style>