<template>

    <div v-if="!this.normalList && !this.hideDisclaimer" class="disclaimerList">
        <i class="gg-info" style="margin-top: auto; margin-bottom: auto; margin-left: 1vw"></i>
        <p style="margin-bottom: auto; margin-bottom: auto">Klicke einfach auf einen Namen, um die Übung zum Hinzufügen zu markieren.</p>
        <i class="gg-close" style="cursor:pointer;" @click="hideDisclaimer = true"></i>
    </div>

    <table class="table align-middle mb-0 bg-white" style="margin-top: 3vh; max-width: 80vw; margin-left: 10vw">
        <thead class="bg-light">
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Sets / Reps</th>
            <th>Comment</th>
            <th></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="exercise in this.filteredList" :key="exercise.id" :id="exercise.id">

            <td  @click="markExersice(exercise.id)">

                <div class="d-flex align-items-center" >
                    <input class="rounded-circle" v-if="markArr.includes(exercise.id) " type="checkbox" value="" id="flexCheckChecked" style="accent-color: #4f9b8f; width: 45px; height: 45px" checked/>
                    <div class="ms-3" style="cursor: pointer">
                        <p v-if="!clickedDArr.includes(exercise.id)" class="fw-bold mb-1">{{exercise.name}}</p>
                        <textarea class="form-control" v-if="clickedDArr.includes(exercise.id)" :value="exercise.name" style="height: auto" id="newName"></textarea>

                    </div>

                </div>

            </td>

            <td>
                <p class="fw-normal mb-1" v-if="exercise.machineType">Mit Maschine</p>
                <img src="@/assets/equipmentNeeded.png" v-if="exercise.machineType" style="height: 20px">
                <p class="fw-normal mb-1" v-if="!exercise.machineType">Ohne Equipment</p>
                <img src="@/assets/noEquipmentNeeded.png" v-if="!exercise.machineType" style="height: 20px">
            </td>



            <td>
                <span v-if="exercise.planed && !editClicked" class="badge badge-success rounded-pill d-inline" style="background-color: green">Active</span>
                <span v-if="exercise.planed && editClicked  && clickedDArr.includes(exercise.id)" class="badge badge-success rounded-pill d-inline" style="background-color: lightgrey">Active</span>
                <span v-if="!exercise.planed && !editClicked" class="badge badge-primary rounded-pill d-inline" style="background-color: #b71009">Not in use</span>
                <span v-if="!exercise.planed && editClicked  && clickedDArr.includes(exercise.id)" class="badge badge-success rounded-pill d-inline" style="background-color: lightgrey">Not in use</span>
            </td>


            <td>
                <p v-if="!exercise.machineType && !clickedDArr.includes(exercise.id) && exercise.sets == 0 && exercise.reps == 0"><b>---</b></p>
                <p v-else-if="!exercise.machineType && !clickedDArr.includes(exercise.id)"><b>{{exercise.sets}} á {{ exercise.reps}}</b></p>
                <p v-else-if="exercise.machineType && !clickedDArr.includes(exercise.id)"><b>{{exercise.sets}} á {{ exercise.reps}}</b> mit <b> {{exercise.weight}} kg </b></p>

                <select v-if="clickedDArr.includes(exercise.id)" id="setsField">
                    <option selected disabled>New set</option>
                    <option v-for="i in 40" :key="i">
                        {{i}}
                    </option>
                </select>
                <p  v-if="clickedDArr.includes(exercise.id)">Current: {{exercise.sets}}</p>

                <select v-if="clickedDArr.includes(exercise.id)" id="repsField">
                    <option selected disabled>New reps</option>
                    <option v-for="i in 40" :key="i">
                        {{i}}
                    </option>
                </select>
                <p  v-if="clickedDArr.includes(exercise.id)">Current: {{exercise.reps}}</p>

                <select v-if="exercise.machineType && clickedDArr.includes(exercise.id)" id="weightField">
                    <option selected disabled>New weight</option>
                    <option v-for="i in 200" :key="i">
                        {{i}}
                    </option>
                </select>
                <p  v-if="exercise.machineType && clickedDArr.includes(exercise.id)">Current: {{exercise.weight}}</p>
            </td>



            <td >
                <p v-if="!clickedDArr.includes(exercise.id) && exercise.comment ==  ''"><b>---</b></p>
                <p v-else-if="!clickedDArr.includes(exercise.id)">{{exercise.comment}}</p>
                <textarea class="form-control" v-if="clickedDArr.includes(exercise.id)" :value="exercise.comment" style="height: auto" id="commentField"></textarea>
            </td>



            <td>
                <button v-if="!editClicked && !clickedDArr.includes(exercise.id)" type="button" class="btn btn-link btn-sm btn-rounded" @click="edit(exercise.id)">Edit</button>
                <button v-if="clickedDArr.includes(exercise.id)" type="button" class="btn btn-link btn-sm btn-rounded" @click="deleteExercises(exercise.id)">Löschen</button>
                <button v-if="clickedDArr.includes(exercise.id)" type="button" class="btn btn-link btn-sm btn-rounded" @click="save(exercise.machineType, exercise.id)">Speichern</button>
                <button v-if="clickedDArr.includes(exercise.id)" type="button" class="btn btn-link btn-sm btn-rounded" @click="edit(exercise.id)">Abbrechen</button>
            </td>

        </tr>


        </tbody>
    </table>
    <button v-if="!normalList" class="btn btn-primary" @click="addNewExerciseToPlan()" style="margin-left: 10vw; margin-top: 4vh">Zum Plan hinzufügen</button>
    <h5 id="keineUbung" v-if="this.filteredList.length == 0">Keine Übung bissher.</h5>
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
            //normal checks if we come from TrainingPLan and want to add exercises or if its just a normal list in Alle Übungen
    }, normalList: Boolean,
        //day is for adding exercises to plan
        day: String,
        //comes from <EditBar> for search-function
        searchInput: String
},
    data() {
        return{
            clicked: false,
            clickedDArr: [],
            markArr: [],
            change: false,
            newExercise: true,
            mo: false,
            di: false,
            mi: false,
            don: false,
            fr: false,
            sa: false,
            so: false,
            exercisesChangable: this.exercises,
            editClicked: false,
            hideDisclaimer: false
        }
    },
    methods: {
        deleteExercises(){
            for (let i = 0; i < this.clickedDArr.length; i++) {
                this.exercisesChangable =
                    this.exercisesChangable.filter(ex => ex.id !== this.clickedDArr[i]
                )
                this.executeDeleteFetch(this.clickedDArr[i])
            }
            this.editClicked = false

        },
            edit(index){
                if(this.clickedDArr.includes(index)){
                    var array = this.clickedDArr.filter(item => item !== index);
                    this.clickedDArr = array;
                } else {
                    this.clickedDArr.push(index)
                }
                if (this.clickedDArr.length == 0) this.editClicked = false
                else this.editClicked = true

            }, markExersice(index){
            if (!this.normalList) {
                if (this.markArr.includes(index)) {
                    var array = this.markArr.filter(item => item !== index);
                    this.markArr = array;
                } else {
                    this.markArr.push(index)
                }
            }
        },
            addNewExerciseToPlan() {
                let day = this.day;
                let validArr =  this.markArr

                for (let i = 0; i < validArr.length; i++) {

                this.exercisesChangable.forEach(function (exercise) {
                    if (exercise.id == validArr[i]) {

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
                    const data = this.generateData(validArr[i]);
                    this.executeFetch(data, 'PUT', validArr[i]);

            }
                window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/exercises"
        },
            check(index){
                return clickedDiv.includes(index)
        },
            save(machineType, id){
                let newComment = document.getElementById("commentField").value
                let newSets = 0
                let newReps = 0
                let newWeight = 0;
                let newName = document.getElementById("newName").value

                this.exercisesChangable.forEach(function (exercise) {
                        if (exercise.id == id) {

                            if(document.getElementById("setsField").value == "New set") newSets = exercise.sets
                            else newSets = document.getElementById("setsField").value
                            if(document.getElementById("repsField").value == "New reps") newReps = exercise.reps
                            else newReps = document.getElementById("repsField").value
                            if(machineType && (document.getElementById("weightField").value == "New weight")) newWeight = exercise.weight
                            else if(machineType) newWeight = document.getElementById("weightField").value

                            exercise.comment = newComment;
                            exercise.sets = newSets;
                            exercise.reps = newReps;
                            exercise.weight = newWeight;
                            exercise.name = newName;
                        }
                    }
                );

                let data = this.generateData(id);
                this.executeFetch(data, 'PUT', id);

                this.edit(id)

        },
            executeFetch(data, type, endpoint){
            fetch(process.env.VUE_APP_BASE_URL_BACKEND + '/training/' + endpoint, {
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
            executeDeleteFetch(endpoint){
            fetch( process.env.VUE_APP_BASE_URL_BACKEND + '/training/' + endpoint, {
                method: 'DELETE'
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
        },
            input(){
            this.change = true;

        }
        }, computed: {
        backendURL() {
            return process.env.VUE_APP_BASE_URL_BACKEND
        }, frontendURL(){
            return process.env.VUE_APP_BASE_URL_FRONTEND
        },
        filteredList() {
            return this.exercisesChangable.filter(exercise => {
                //first filter search bar input
                return exercise.name.toLowerCase().includes(this.searchInput.toLowerCase())
            })
        }
    }
}
</script>


<style>



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


#allInOne{
    margin-top: 4vh;
}

.

table{
margin-left: 1.5vw;
    padding: 0.5vh;
}


td{
    padding: 5px;
}

#keineUbung{
    text-align: center;
    margin-top: 7vh;
    color: darkgrey;
}

.disclaimerList{
    margin-top: 3vh;
    display: flex;
    text-align: center;
    justify-content: space-between;
    height: auto;
    max-width: 40vw;
    margin-left: auto;
    margin-right: auto;
    background-color: cornflowerblue;
    color: white;
    border-radius: 3px;
    position: relative;
    z-index: 3;
    padding: 6px;
}

</style>