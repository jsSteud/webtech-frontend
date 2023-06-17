<template>
    <button class="btnTemp" @click="edit()" v-if="hidden">Trainingsplan bearbeiten</button>
    <div class="btnDiv">
        <button id="bestatigen" @click="bestatigen()"  v-if="!hidden">Bestätigen </button>
        <button id="abbrechen" @click="abbrechen()"  v-if="!hidden">Abbrechen</button>
    </div>

  <div>
      <table class="training_table">
          <tr>
              <th id="mon">Montag</th>
              <th id="tue">Dienstag</th>
              <th id="wed">Mittwoch</th>
              <th id="thu">Donnerstag</th>
              <th id="fri">Freitag</th>
              <th id="sat">Samstag</th>
              <th id="sun">Sonntag</th>
          </tr>

          <tr v-for="(day, index) in days(this.exercisesChangable)" :key="day.id">
<!--              td-id is combination from day number and db-id-->
              <td class="0" v-on:click="color(createId(0, uniqueId()[0][index]))" :id="createId(0, uniqueId()[0][index])">{{days()[0][index]}}</td>
              <td class="1" v-on:click="color(createId(1, uniqueId()[1][index]))" :id="createId(1, uniqueId()[1][index])">{{days()[1][index]}}</td>
              <td class="2" v-on:click="color(createId(2, uniqueId()[2][index]))" :id="createId(2, uniqueId()[2][index])">{{days()[2][index]}}</td>
              <td class="3" v-on:click="color(createId(3, uniqueId()[3][index]))" :id="createId(3, uniqueId()[3][index])">{{days()[3][index]}}</td>
              <td class="4" v-on:click="color(createId(4, uniqueId()[4][index]))" :id="createId(4, uniqueId()[4][index])">{{days()[4][index]}}</td>
              <td class="5" v-on:click="color(createId(5, uniqueId()[5][index]))" :id="createId(5, uniqueId()[5][index])">{{days()[5][index]}}</td>
              <td class="6" v-on:click="color(createId(6, uniqueId()[6][index]))" :id="createId(6, uniqueId()[6][index])">{{days()[6][index]}}</td>
          </tr>

          <tr v-if="!hidden " class="createNewBtns">
              <td v-for="index in 7" :key="index" :id="index">
                  <router-link :to="routPath(index)">
                      <i class="gg-add"></i>
                  </router-link>
              </td>
          </tr>

      </table>

      <div v-if="!hidden && !disclaimerBtnHidden" class="disclaimer">
          <i class="gg-info" style="margin: auto"></i>
          <p>Klicke auf Übungen um sie zum Löschen zu markieren. Über das '+' kannst du neue Übungen hinzufügen. Bestätige oben rechts deinen neuen Plan.</p>
          <i class="gg-close" style="cursor:pointer;" @click="disclaimerBtnHidden = true"></i>
      </div>

  </div>
</template>

<script>


var arrClicked = [];

export default {
    name: 'TrainingsPlan',
    data(){
        return {
            //shows or hides add new exercise buttons etc. (edit mode)
            hidden: true,
            disclaimerBtnHidden: true,
            exercisesChangable: this.exercises,
            day: ''
        }
    },
    props: {
    exercises: {
        type: Array,
            required: true
    }
},
    methods: {
        routPath(index){
        return "/addtoplan/" + index;
        }, createId(day ,id){
            return day + "_" + id;
        },
        uniqueId(){

            var monday = [];
            var tuesday = [];
            var wednesday = [];
            var thursday = [];
            var friday = [];
            var saturday = [];
            var sunday = [];

            this.exercisesChangable.forEach(function (exercise) {
                if (exercise.mo) monday.push(exercise.id)
                if (exercise.di) tuesday.push(exercise.id)
                if (exercise.mi) wednesday.push(exercise.id)
                if (exercise.don) thursday.push(exercise.id)
                if (exercise.fr) friday.push(exercise.id)
                if (exercise.sa) saturday.push(exercise.id)
                if (exercise.so) sunday.push(exercise.id)

            })

            var week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
            return week;

            }, days(){
        var monday = [];
        var tuesday = [];
        var wednesday = [];
        var thursday = [];
        var friday = [];
        var saturday = [];
        var sunday = [];

        for (let i = 0; i < this.exercisesChangable.length; i++) {
            if(this.exercisesChangable[i].mo) monday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].di) tuesday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].mi) wednesday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].don) thursday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].fr) friday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].sa) saturday.push(this.exercisesChangable[i].name);
            if(this.exercisesChangable[i].so) sunday.push(this.exercisesChangable[i].name);
        }
        var week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
        return week;

    }, colorRestDay(){

     },
        color(id){
            var notEmpty = document.getElementById(id).innerHTML != "";

            if (arrClicked.includes(id)) {
                var newArray = arrClicked.filter(item => item !== id);
                arrClicked = newArray;
                document.getElementById(id).style.backgroundColor = "white";
                document.getElementById(id).style.color = "black";
            }
            else if(notEmpty && !this.hidden){
                arrClicked.push(id);
                document.getElementById(id).style.backgroundColor = "red";
            }


        },
        abbrechen(){
            this.hidden = true;
            this.disclaimerBtnHidden = true
            this.makeFieldsWhite()
            //make all fields white
        }, makeFieldsWhite(){
            //make all fields white
            for (let classId = 0; classId < 7; classId++) {
                let arr = document.getElementsByClassName(classId);
                for(let field of arr){
                    field.style.backgroundColor = "white"
                }

            }
        },
        //acticate edit mode
        edit(){
            this.hidden = false;
            this.disclaimerBtnHidden = false;
            document.getElementsByClassName("training_table").item(0).style.cursor = "pointer";
        },
        bestatigen() {
            for (let i = 0; i < arrClicked.length; i++) {

                //separation between database id & day id to check WHICH exercise should be removed on WHICH day
                var  db_id = arrClicked[i].slice(2);
                var day_id = arrClicked[i].slice(0, 1);

                //make day false which should be removed
                this.exercisesChangable.forEach(function (exercise) {
                    if (exercise.id == db_id){
                        switch (day_id) {
                            case "0":
                                exercise.mo = false
                                break
                            case "1":
                                exercise.di = false
                                break
                            case "2":
                                exercise.mi = false
                                break
                            case "3":
                                exercise.don = false
                                break
                            case "4":
                                exercise.fr = false
                                break
                            case "5":
                                exercise.sa = false
                                break
                            case "6":
                                exercise.so = false
                                break
                        }
                    }
                })

                //generate data and execute fetch
                var data = this.generateData(db_id)
                this.executeFetch(data, 'PUT', db_id)

                this.makeFieldsWhite()


            }
            this.hidden = true;
            this.disclaimerBtnHidden = true;

        },generateData(id){
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
                }

            })
            return data;
        }, executeFetch(data, type, endpoint){
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
        }

        }, mounted() {
        const date = new Date();
        let day = date.toString().slice(0,3).toLowerCase()
        document.getElementById(day).style.color = "black"
    }
}


</script>

<style>

@import url('https://css.gg/css');


.disclaimer{
    margin-top: 4vh;
    display: flex;
    text-align: center;
    justify-content: space-between;
    height: auto;
    max-width: 70vw;
    margin-left: auto;
    margin-right: auto;
    background-color: cornflowerblue;
    color: white;
    border-radius: 3px;

}


.gg-add{
    margin-bottom: 20px;
    margin-top: 10px;
}
.btnTemp{
    width: 10vw;
    height: 5vh;
    background-color: black;
    border: 1px solid #4f9b8f;
    color: white;
    border-radius: 20px;
    font-size: 1.5vh;
    margin-left: 70vw;
    cursor: pointer;

}
#abbrechen {
    width: 10vw;
    height: 5vh;
    background-color: black;
    border: 1px solid #b71009;
    color: white;
    border-radius: 20px;
    font-size: 1.2vh;
    margin-left: 2vw;
    cursor: pointer;
}

#bestatigen{
    width: 10vw;
    height: 5vh;
    background-color: black;
    border: 1px solid #4f9b8f;
    color: white;
    border-radius: 20px;
    font-size: 1.2vh;
    margin-left:58vw;
    cursor: pointer;

}

.btnDiv{
    display: flex;
}

.training_table {
    margin-top: 40px;
    border-spacing: 0;
    text-align: left;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 60vw;

}

.training_table th{
    color: white;
    background-color:#c96528;
    /*width: 10vw;*/
    font-size: 110%;
    line-height: 300%;
    padding: 10px;
    padding-left: 25px;
}

.training_table td{
    /*width: 10vw;*/
    padding-left: 30px;
    line-height: 300%;
    border-right: 1px solid lightgrey;
    background-color: white;


}

.createNewBtns td{
    color: darkgrey;
    background-color: white;
}

#sun{
    border-top-right-radius: 10px;
}
#mon{
    border-top-left-radius: 10px;
}



</style>