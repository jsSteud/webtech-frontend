<template xmlns:input="http://www.w3.org/1999/html">
  <!--   TODO: so etwas in eigener Component?-->
    <div id="newExersice" @input="changed = true">

        <h4 style="padding-top: 6vh">Gib der Übung einen Namen</h4>
        <input type="text" name="" id="" placeholder="Name der Übung" v-model="name">
        <label style="margin-left: 2vw"><input type="checkbox" @click="machine = true">Übung mit einer Maschine</label> <br>
        <select style="margin-top: 3vh"  v-if="machine" v-model="weight">
            <option value="" selected hidden>Gewichg in kg</option>
            <option>Maschine ohne Gewichte</option>
            <option v-for="i in 200" :key="i">{{i}}</option>
        </select><br>

        <h4>Möchtest du die Übung direkt einplanen?</h4>
        <label><input type="checkbox" name="" id="mo" v-model="mo">Montag</label>
        <label><input type="checkbox" name="" id="die" v-model="di">Dienstag</label>
        <label><input type="checkbox" name="" id="mi" v-model="mi">Mittwoch</label>
        <label><input type="checkbox" name="" id="do" v-model="don">Donnerstag</label>
        <label><input type="checkbox" name="" id="fr" v-model="fr">Freitag</label>
        <label><input type="checkbox" name="" id="sa" v-model="sa">Samstag</label>
        <label><input type="checkbox" name="" id="so" v-model="so">Sonntag</label>

        <h4>Wie viele Sets & Wiederholungen willst du machen?</h4>
        <select @change="handleSets">
            <option selected disabled hidden>Sets</option>
            <option v-for="i in 40" :key="i" >{{i}}</option>
        </select><br>
        <select style="margin-top: 2vh" @change="handleReps">
            <option selected disabled hidden >Reps</option>
            <option v-for="i in 40" :key="i" id="generateIdReps(i)">{{i}}</option>
        </select>

        <h4>Hast du ein zusätzlichen Kommentar?</h4>
        <input type="text" name="" id="" placeholder="Kommentar" style="height: 10vh; width: 20vw" v-model="comment"><br>

        <button class="safeBtn" v-if="changed" @click="safe()">Speichern und zurück zur Übersicht</button>
    </div>
</template>

<script >

export default {
    name: "CreateNew",
    components: {

    }, data() {
        return{
            changed: false,
            machine: false,
            name: '',
            reps: 0,
            sets: '',
            weight: '',
            comment: '',
            mo: false,
            di: false,
            mi: false,
            don: false,
            fr: false,
            sa: false,
            so: false,
            planed: false
        }
    }, methods:{ testInput(){

            console.log(this.reps)
            console.log(this.sets)
            console.log(this.name)
            console.log(this.machine)
            console.log(this.weight)
            console.log(this.comment)
            console.log(this.mo)
            console.log(this.di)
            console.log(this.mi)
            console.log(this.don)
            console.log(this.fr)
            console.log(this.sa)
            console.log(this.mo)


        },handleReps(event){
        //there is not v-model for select
            this.reps = event.target.value;
        }, handleSets(event){
        this.sets = event.target.value;
        },
        generateIdReps(i){
        return "reps_" + i
        },
        safe(){
            const baseUrl = "http://localhost:8081"
            let end;
            let data;
            let days = ["mo", "die", "mi", "do", "fr", "sa", "so"]
            for (let i = 0; i < days.length; i++) {
                let elemet = document.getElementById(days[i]);
                if(elemet.checked) this.planed = true;
            }

                end = "/machinetraining"
                data = {
                    name: this.name,
                    reps: this.reps,
                    sets: this.sets,
                    weight: this.weight,
                    comment: this.comment,
                    mo: this.mo,
                    di: this.di,
                    mi: this.mi,
                    don: this.don,
                    fr: this.fr,
                    sa: this.sa,
                    so: this.so,
                    planed: this.planed,
                    machineType: this.machine
                }
            const endpoint = baseUrl + end
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Authorization: 'Bearer ' + this.accessToken
                },
                body: JSON.stringify(data)
            }
            fetch(endpoint, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                })
                .catch(error => console.log('error', error))

            window.location = "http://localhost:8080"
        }
        }


}
</script>

<style>

.safeBtn{

    margin-top: 5vh;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #4f9b8f;
    padding: 10px;
    cursor: pointer;

}

h4{
    margin-top: 6vh;
    color: #4f9b8f;
}
#newExersice{
    text-align: center;
    height: 80vh;
    width: 40vw;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border-radius: 20px;
    position: relative;
    z-index: 1;

}


</style>