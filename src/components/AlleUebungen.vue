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
      <div v-if="clickedDArr.includes(exercise.id) && page1" class="hiddenDiv" :id=createIDForHiddenDiv(exercise.id) @input="input()">
          <hr>
          <h3 class="commentHeader">Kommentar</h3>
          <textarea :value="exercise.comment" id="commentField"></textarea>
          <h3 v-if="exercise.machineType" class="commentHeader">Gewicht, Sets & Reps</h3>
          <h3 v-else class="commentHeader">Sets & Reps</h3>
          <select id="setsField">
              <option value="" selected disabled hidden>Sets: {{exercise.sets}}</option>
              <option v-for="i in 40" :key="i" >Sets: {{i}}</option>
          </select><br>
          <select style="margin-top: 2vh" id="repsField">
              <option value="" selected disabled hidden>Reps: {{exercise.reps}}</option>
              <option v-for="i in 40" :key="i" >Reps: {{i}}</option>
          </select>
          <select style="margin-top: 2vh" id="weightField">
              <option value="" selected disabled hidden>Weight: {{exercise.weight}}</option>
              <option v-for="i in 200" :key="i" >Weight: {{i}}</option>
          </select>

          <button v-if="change && exercise.machineType" style="margin-left: 2vw" @click="save(true)">Speichern</button>
          <button v-else-if="change" style="margin-left: 2vw" @click="save(false)">Speichern</button>
      </div>

  </div>

</div>
<!--    TODO: disable button until exercise is choosen-->
    <button v-if="!page1" id="reinBtn" @click="addNewExerciseToPlan()">Rein in den Plan und zurück!</button>

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
            //page1 checks if we come from TrainingPLan
    }, page1: Boolean,
        //day is for adding exercises to plan
        day: String
}, data() {
        return{
            clicked: false,
            clickedDArr: clickedDiv,
            change: false,
            newExercise: true,
            mo: false,
            di: false,
            mi: false,
            don: false,
            fr: false,
            sa: false,
            so: false
        }
    },
    methods: {
            showExerciseDetails(index){
                if(this.page1){
                    this.change = false;
                    this.exercises.forEach(ex => document.getElementById(ex.id).style.height = "18vh")

                    if (clickedDiv.includes(index)) {
                        document.getElementById(index).style.height = "18vh";
                        var array = clickedDiv.filter(item => item !== index);
                        clickedDiv = array;

                    } else {
                        document.getElementById(index).style.height = "60vh";
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

            if(this.day == 1) this.mo = true;
            else if(this.day == 2) this.di = true;
            else if(this.day == 3) this.mi = true;
            else if(this.day == 4) this.don = true;
            else if(this.day == 5) this.fr = true;
            else if(this.day == 6) this.sa = true;
            else if(this.day == 7) this.so = true;


                for (let i = 0; i < clickedDiv.length; i++) {
                const data = {

                    mo: this.mo,
                    di: this.di,
                    mi: this.mi,
                    don: this.don,
                    fr: this.fr,
                    sa: this.sa,
                    so: this.so,
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
                window.location = "http://localhost:8080"
        },
            check(index){
                return clickedDiv.includes(index)
        },
            createIDForHiddenDiv(index){
                var con = "hiddenDiv_";
                return con.concat(" ", index)
        }, save(machineType){
                // let newComment = document.getElementById("commentField").value;
                // let newSets = document.getElementById("setsField").value;
                // let newReps = document.getElementById("repsField").value;
                // if (machineType){
                //     let newWeight = document.getElementById("weightField").value;
                //     let newWeightClean = newWeight.slice(8);
                // }
                //  //Cut 'Reps: ' and 'Sets: '
                // let newSetsClean = newSets.slice(6);
                // let newRepsClean = newReps.slice(6);
                //
                //

        }, input(){
                //TODO: hide safe button if nothing changes

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