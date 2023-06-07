<template>
<div id="allInOne">
<!--    <EditBar></EditBar>-->
<div class="allExercisesContainer">
  <div class="exerciseContainer" v-for="exercise in exercises" :key="exercise.id" :id="exercise.id">
<table>
    <tr @click="showExerciseDetails(exercise.id)">
        <td class="leftColumn"><img src="@/assets/liegestutze.png" alt="sport_icon" id="sport_icon"></td>
        <td class="rightColumn" id="exerciseName"><b>{{ exercise.name }}</b></td>

    </tr>
    <tr @click="showExerciseDetails(exercise.id)">
        <td v-if="exercise.planed" class="leftColumn"><i class="gg-check-o"></i></td>
        <td v-if="exercise.planed" class="rightColumn">in use</td>
        <td v-if="!exercise.planed"><i class="gg-close-o"></i></td>
        <td v-if="!exercise.planed">not in use</td>
    </tr>
    <tr @click="showExerciseDetails(exercise.id)">
        <td v-if="!exercise.machineType" class="leftColumn"><img src="@/assets/noEquipmentNeeded.png" alt="no_equipment_needed" id="noEquipmentNeeded"></td>
        <td v-if="!exercise.machineType" class="rightColumn">no equipment needed</td>
        <td v-if="exercise.machineType"><img src="@/assets/equipmentNeeded.png" alt="equipment_needed" id="equipmentNeeded"></td>
        <td v-if="exercise.machineType" style="font-size: 1vw;">equipment needed</td>
    </tr>
</table>
      <div v-if="clickedDArr.includes(exercise.id) && page1" class="hiddenDiv" :id=createIDForHiddenDiv(exercise.id) @input="input(exercise.comment, exercise.sets, exercise.reps)">
          <hr>
          <h3 class="commentHeader">Kommentar</h3>
          <textarea :value="exercise.comment"></textarea>
          <h3 class="commentHeader">Sets & Reps</h3>
          <select>
              <option value="" selected disabled hidden>Sets: {{exercise.sets}}</option>
              <option v-for="i in 40" :key="i" >Sets: {{i}}</option>
          </select><br>
          <select style="margin-top: 2vh">
              <option value="" selected disabled hidden>Reps: {{exercise.reps}}</option>
              <option v-for="i in 40" :key="i" >Reps: {{i}}</option>
          </select>
          <button v-if="change" style="margin-left: 2vw" @click="save()">Speichern</button>
      </div>

  </div>

</div>
<!--    TODO: disable button until exercise is choosen-->
    <button v-if="!page1" id="reinBtn" @click="addNewExerciseToPlan()">Rein in den Plan!</button>

</div>

</template>


<script>

let clickedDiv = []

export default {
    name: 'AlleUebungen',
    components:{

    },
    props: {
        exercises: {
            type: Array,
            required: true
    }, page1: Boolean,
        day: String
}, data() {
        return{
            clicked: false,
            clickedDArr: clickedDiv,
            change: false,
            newExercise: true
        }
    },
    methods: {
            showExerciseDetails(index){
                if(this.page1){
                    this.change = false;
                    // for (let i = 0; i < this.exercises.length; i++) {
                    //     document.getElementById(i).style.height = "18vh";
                    // }

                    if (clickedDiv.includes(index)) {
                        document.getElementById(index).style.height = "18vh";
                        var array = clickedDiv.filter(item => item !== index);
                        clickedDiv = array;

                    } else {
                        document.getElementById(index).style.height = "52vh";
                        var array2 = clickedDiv.filter(item => item == index);
                        clickedDiv = array2;
                        clickedDiv.push(index);
                    }
                    this.clickedDArr = clickedDiv;
                } else {
                    if (clickedDiv.includes(index)){
                        document.getElementById(index).style.border = "none";
                        document.getElementById(index).style.height = "18vh";
                        array = clickedDiv.filter(item => item !== index);
                        clickedDiv = array;
                    } else {
                        document.getElementById(index).style.border = "0.5vh solid red";
                        document.getElementById(index).style.height = "17vh";
                        clickedDiv.push(index);
                    }

                }
            },addNewExerciseToPlan() {

                for (let i = 0; i < clickedDiv.length; i++) {
                const data = {
                    // machine: false,
                    // reps: 0,
                    // sets: '',
                    // weight: '',
                    // comment: '',
                    mo: false,
                    di: true,
                    mi: false,
                    don: false,
                    fr: false,
                    sa: false,
                    so: true,
                    planed: true
                };

                fetch('http://localhost:8081/machinetraining/' + clickedDiv[i], {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        // Erfolgreiche Antwort
                        console.log(response);
                    })
                    .catch(error => {
                        // Fehlerbehandlung
                        console.error(error);
                    });
            }
        },
            check(index){
                return clickedDiv.includes(index)
        },
            createIDForHiddenDiv(index){
                var con = "hiddenDiv_";
                return con.concat(" ", index)
        }, save(){
                alert()
        }, input(comment, sets, reps){
                //TODO: hide safe button if nothing changes
            console.log(comment, sets, reps)
            this.change = true;

        },add(){
                this.newExercise = true;
                document.getElementById("allInOne").style.filter= "blur(5px)"
        }

        }
}
</script>


<style>

#reinBtn{
    position: absolute;
    width: 15vw;
    bottom: 10vh;
    right: 43vw;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #4f9b8f;
    padding: 10px;
    font-size: 1vw;
    cursor: pointer;

}

#reinBtn:disabled{
    cursor: not-allowed;
}

select{
    width: 10vw;
    height: 2.4vw;
    margin-left: 1vw;
 }

textarea{
    margin-left: 1vw;
    width: 17vw;
    height: 8vh;
    max-width: 19vw;
    max-height: 25vh;
    border-color: #4f9b8f;
    border-radius: 3px;
}

.commentHeader{
    color: #4f9b8f;
    margin-left: 1vw;
}

.allExercisesContainer{
    width: 70vw;
    margin-left: auto;
    margin-right: auto;

}


.gg-check-o{
    color: #4f9b8f;
}

.gg-close-o{
    color: red;
}
.exerciseContainer{
    background-color: white;
    width: 20vw;
    height: 18vh;
    border-radius: 15px;
    float: left;
    margin-top: 3vh;
    /*TODO: Find a better way to center*/
    margin-left: 2.5vw;
    cursor: pointer;
}

table{
margin-left: 1.5vw;
    padding: 0.5vh;
}

.leftColumn{
    width: 5vw;


}

td{
    padding: 5px;
}
.rightColumn{
    width: 10vw;
    font-size: 1vw;
}

#sport_icon{
    height: 4vh;
    margin-right: 15px;
    pointer-events: none;

}
#noEquipmentNeeded{
    height: 4vh;
    margin-right: 15px;
    pointer-events: none;

}

#equipmentNeeded{
    height: 3vh;
    margin-right: 15px;
    pointer-events: none;
}
#exerciseName{
    color: #4f9b8f;
    font-size: 1.2vw;
}

</style>