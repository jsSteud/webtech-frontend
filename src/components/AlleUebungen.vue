<template>

        <table class="exercise_table">
            <tr v-for="exercise in exercises" :key="exercise.id">
                <img src="@/assets/liegestutze.png" alt="sport_icon" id="sport_icon">
                <td id="exercise_title"><b>{{exercise.name}}</b></td>
                <td v-if="exercise.machineType">mit Maschine</td>
                <td v-else>ohne Maschine</td>
                <td v-if="exercise.planed" id="planed">eingeplant</td>
                <td v-else id="not_planed">nicht eingeplant</td>
                <img src="@/assets/edit.png" alt="edit_icon" id="edit_icon">
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
    font-size: 110%;

}

.exercise_table td{
    width: 25vw;

}

.exercise_table tr{
    border: 1px solid red;
}

#planed{
color: #7aad15;
}

#not_planed{
    color: #ab1c1c;;
}

#edit_icon{
    height: 3vh;
    margin-right: 15px;

}

#sport_icon{
    height: 4vh;
    margin-right: 15px;

}

#exercise_title :hover{
    color: #6c7ae0;
  cursor: pointer;
}

</style>