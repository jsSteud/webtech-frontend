<template>
<div id="allInOne">
<!--    <EditBar></EditBar>-->
<div class="allExercisesContainer">
  <div class="exerciseContainer" v-for="exercise in this.filteredList" :key="exercise.id" :id="exercise.id">
<table>
    <tr @click="showExerciseDetails(exercise.id)">
        <td class="leftColumn"><img src="@/assets/liegestutze.png" alt="sport_icon" id="sport_icon"></td>
        <td class="rightColumn" id="exerciseName"><b>{{ exercise.name }}</b></td>

    </tr>
    <tr @click="showExerciseDetails(exercise.id)">
        <td v-if="!exercise.planed"><i class="gg-close-o"></i></td>
        <td v-if="!exercise.planed">not in use</td>
        <td v-if="exercise.planed" class="leftColumn"><i class="gg-check-o"></i></td>
        <td v-if="exercise.planed" class="rightColumn">in use</td>

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
          <select style="margin-top: 2vh" id="weightField" v-if="exercise.machineType">
              <option value="" selected disabled hidden>Weight: {{exercise.weight}}</option>
              <option v-for="i in 200" :key="i" >Weight: {{i}}</option>
          </select>

          <button v-if="change && exercise.machineType" style="margin-left: 2vw" @click="save(true, exercise.id)">Speichern</button>
          <button v-else-if="change" style="margin-left: 2vw" @click="save(false, exercise.id)">Speichern</button>
      </div>
      <!--    TODO: disable button until exercise is choosen-->
      <button v-if="!page1" id="reinBtn" @click="addNewExerciseToPlan()">Rein in den Plan und zurück!</button>
  </div>

</div>


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
        day: String,
        searchInput: String
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
            so: false,
            exercisesChangable: this.exercises
        }
    }, beforeCreate() {
        clickedDiv = []
    },
    methods: {
            showExerciseDetails(index){
                if(this.page1){
                    this.change = false;
                    this.filteredList.forEach(ex => document.getElementById(ex.id).style.height = "18vh")

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
                let day = this.day;
            for (let i = 0; i < clickedDiv.length; i++) {

                this.exercisesChangable.forEach(function (exercise) {
                    if (exercise.id == clickedDiv[i]) {

                        switch (day) {
                            case "1":
                                exercise.mo = true
                                break
                            case "2":
                                exercise.di = true
                                break
                            case "3":
                                exercise.mi = true
                                break
                            case "4":
                                exercise.don = true
                                break
                            case "5":
                                exercise.fr = true
                                break
                            case "6":
                                exercise.sa = true
                                break
                            case "7":
                                exercise.so = true
                                break
                        }
                    }
                });
                    const data = this.generateData(clickedDiv[i]);
                    this.executeFetch(data, 'PUT', clickedDiv[i]);

            }
                window.location = "http://localhost:8080"
        },
            check(index){
                return clickedDiv.includes(index)
        },
            createIDForHiddenDiv(index){
                var con = "hiddenDiv_";
                return con.concat(" ", index)
        }, save(machineType, id){

                let newComment = document.getElementById("commentField").value;
                let newSets = document.getElementById("setsField").value.slice(6);
                let newReps = document.getElementById("repsField").value.slice(6);
                let newWeight = 0;
                if (machineType) newWeight = document.getElementById("weightField").value.slice(8);

                this.exercisesChangable.forEach(function (exercise) {
                        if (exercise.id == id) {
                            exercise.comment = newComment;
                            exercise.sets = newSets;
                            exercise.reps = newReps;
                            exercise.weight = newWeight;
                        }
                    }
                );

                let data = this.generateData(id);
                this.executeFetch(data, 'PUT', id);


        }, executeFetch(data, type, endpoint){
                //TODO: Delete type
            fetch('http://localhost:8081/machinetraining/' + endpoint, {
                method: type,
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
        },
        generateData(id){
                let data;

                this.exercisesChangable.forEach(function(exercise){
                    if(exercise.id == id){

                        let isPlaned = (exercise.mo || exercise.di || exercise.mi || exercise.don || exercise.fr || exercise.sa || exercise.so)

                        data = {
                            id: exercise.id,
                            mo: exercise.mo,
                            di: exercise.di,
                            mi: exercise.mi,
                            don: exercise.don,
                            fr: exercise.fr,
                            sa: exercise.sa,
                            so: exercise.so,
                            planed: isPlaned,
                            comment: exercise.comment,
                            machineType: exercise.machineType,
                            name: exercise.name,
                            reps: exercise.reps,
                            sets: exercise.sets,
                            weight: exercise.weight
                        }
                        console.log(data)
                    }

                })
                return data;
        }, validPlaned(id){
                this.exercisesChangable.forEach(function (exercise) {
                    if(exercise.id == id){
                        return (exercise.mo || exercise.di || exercise.mi || exercise.don || exercise.fr || exercise.sa || exercise.so)
                    }
                })
            return false
        }, input(){
                //TODO: hide safe button if nothing changes
            this.change = true;

        },add(){
                this.newExercise = true;
                document.getElementById("allInOne").style.filter= "blur(5px)"
        }

        }, computed: {
        filteredList() {
            return this.exercisesChangable.filter(exercise => {
                return exercise.name.toLowerCase().includes(this.searchInput.toLowerCase())
            })
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