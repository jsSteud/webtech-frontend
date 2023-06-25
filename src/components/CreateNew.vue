<template>

    <div class="registration-form">
    <form>
        <div class="form-icon">
        </div>
        <div class="form-group">
            <input type="text" class="form-control item" id="name" placeholder="Name" v-model="name">
        </div>
        <div class="form-group" style="text-align: center">
            <input type="checkbox" id="machine" style="color: #b71009; transform: scale(1.4); accent-color: #b71009" @click="machine = !machine">
            <label for="machine" style="margin-left: 10px">Übung an einer Maschine</label>
        </div>
        <div class="form-group" style="text-align: center" v-if="machine">
            <select class="" style="margin: 5px; margin-bottom: 15px; border-color: #b71009; border-radius: 8px; width: auto; padding: 10px" @change="handleWeight">
                <option selected disabled>Maschine ohne Gewichte</option>
                <option v-for="i in 200" :key="i">{{i}}</option>
            </select>
        </div>
        <hr>
        <div class="form-group">
            <input type="text" class="form-control item" id="kommentar" placeholder="Kommentar" v-model="comment">
        </div>
        <div  class="form-group" style="display: flex; flex-wrap: wrap">
                <div class="dayBtn" id="mo" @click="clickDay('mo')">Montag</div>
                <div class="dayBtn" id="di" @click="clickDay('di')">Dienstag</div>
                <div class="dayBtn" id="mi" @click="clickDay('mi')">Mittwoch</div>
                <div class="dayBtn" id="don" @click="clickDay('don')">Donnerstag</div>
                <div class="dayBtn" id="fr" @click="clickDay('fr')">Freitag</div>
                <div class="dayBtn" id="sa" @click="clickDay('sa')">Samstag</div>
                <div class="dayBtn" id="so" @click="clickDay('so')">Sonntag</div>

        </div>
<hr>
        <div class="form-group" style="text-align: center;">
            <select class="" style="margin: 5px; margin-bottom: 15px; border-color: #b71009; border-radius: 8px; width: auto; padding: 10px" @change="handleSets">
                <option selected disabled>Wie viele Sets?</option>
                <option v-for="i in 50" :key="i">{{i}}</option>
            </select>

            <select class="" style="margin: 5px; margin-bottom: 15px; border-color: #b71009; border-radius: 8px; width: auto; padding: 10px" @change="handleReps">
                <option selected disabled>Wie viele Wiederholungen?</option>
                <option v-for="i in 50" :key="i">{{i}}</option>
            </select>

        </div>

        <div class="form-group">

            <button type="button" class="btn btn-block create-account" style="width: 100%" @click="safe()">Create Exercise</button>

        </div>
    </form>

    </div>


</template>

<link href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">

<script>

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
            weight: 0,
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
    }, methods:{
        testInput(){

            console.log("Reps/Sets:")
            console.log(this.reps)
            console.log(this.sets)
            console.log("Name:")
            console.log(this.name)
            console.log("IsMachine?")
            console.log(this.machine)
            console.log("Weight")
            console.log(this.weight)
            console.log("Comment")
            console.log(this.comment)
            console.log("Planed?")
            console.log(this.planed)
            console.log("Days:")
            console.log(this.mo)
            console.log(this.di)
            console.log(this.mi)
            console.log(this.don)
            console.log(this.fr)
            console.log(this.sa)
            console.log(this.so)


        },handleReps(event){
        //there is no v-model for select
            this.reps = event.target.value;
        }, handleSets(event){
            //there is no v-model for select
        this.sets = event.target.value;
        },handleWeight(event){
            //there is no v-model for select
        this.weight = event.target.value;
        }, clickDay(id){

        let dataVar;
        let element = document.getElementById(id)

            switch (id) {
                case 'mo':
                    this.mo = !this.mo
                    dataVar = this.mo
                    break;
                case 'di':
                    this.di = !this.di
                    dataVar = this.di
                    break
                case 'mi':
                    this.mi = !this.mi
                    dataVar = this.mi
                    break
                case 'don':
                    this.don = !this.don
                    dataVar = this.don
                    break
                case 'fr':
                    this.fr = !this.fr
                    dataVar = this.fr
                    break
                case 'sa':
                    this.sa = !this.sa
                    dataVar = this.sa
                    break
                case 'so':
                    this.so = !this.so
                    dataVar = this.so
                    break
            }

            if (dataVar){
                element.style.backgroundColor = "#b71009"
                element.style.color = "white"
            } else {
                element.style.backgroundColor = "white"
                element.style.color = "black"
            }




        },
        async safe() {

            this.testInput()
            if (document.getElementById("name").value == '') alert("Gib der Übung mindestens einen Namen!")
            else {
                let data;
                let exercise_id;

                if (this.mo || this.di || this.mi || this.don || this.fr || this.sa || this.so) this.planed = true

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
                const endpoint = process.env.VUE_APP_BASE_URL_BACKEND + "/training"
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.gymToken
                    },
                    body: JSON.stringify(data)
                }
                await fetch(endpoint, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data)
                        exercise_id = data.id
                    })
                    .catch(error => console.log('error', error))

                let dataPut = {
                    id: exercise_id
                }
                console.log(dataPut)
                const requestOptionsPut = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.gymToken
                    },
                    body: JSON.stringify(dataPut)
                }

                await fetch(process.env.VUE_APP_BASE_URL_BACKEND+ '/addExercise', requestOptionsPut)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data)
                    })
                    .catch(error => console.log('error', error))


                window.location = process.env.VUE_APP_BASE_URL_FRONTEND + "/login"
            }
        }
        }


}
</script>

<style>

.dayBtn{
    cursor: pointer;
    border: 1px solid #b71009;
    padding: 8px;
    border-radius: 4px;
    margin: 0.5vw;
    width: 6vw;
    text-align: center;
    flex: 1;

}

.registration-form{
    padding: 50px 0;
}

.registration-form form{
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon{
    text-align: center;
    background-color: #b71009;
    border-radius: 50%;
    font-size: 40px;
    color: white;
    width: 100px;
    height: 100px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 100px;
}

.registration-form .item{
    border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}

.registration-form .create-account{
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #b71009;
    border: none;
    color: white;
    margin-top: 20px;
}

.registration-form .social-media{
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    padding: 35px 0;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #9fadca;
    border-top: 1px solid #dee9ff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .social-icons{
    margin-top: 30px;
    margin-bottom: 16px;
}

.registration-form .social-icons a{
    font-size: 23px;
    margin: 0 3px;
    color: #b71009;
    border: 1px solid;
    border-radius: 50%;
    width: 45px;
    display: inline-block;
    height: 45px;
    text-align: center;
    background-color: #fff;
    line-height: 45px;
}

.registration-form .social-icons a:hover{
    text-decoration: none;
    opacity: 0.6;
}

@media (max-width: 576px) {
    .registration-form form{
        padding: 50px 20px;
    }

    .registration-form .form-icon{
        width: 70px;
        height: 70px;
        font-size: 30px;
        line-height: 70px;
    }
}

h4{
    margin-top: 6vh;
    color: #4f9b8f;
}

</style>