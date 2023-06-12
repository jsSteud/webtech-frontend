<template>
    <button class="btnTemp" @click="edit()" v-if="hidden">Trainingsplan bearbeiten</button>
    <div class="btnDiv">
        <button id="bestatigen" @click="bestatigen()"  v-if="!hidden">Bestätigen </button>
        <button id="abbrechen" @click="abbrechen()"  v-if="!hidden">Abbrechen</button>
    </div>

  <div>
      <table class="training_table">
          <tr>
              <th id="topLeft">Montag</th>
              <th>Dienstag</th>
              <th>Mittwoch</th>
              <th>Donnerstag</th>
              <th>Freitag</th>
              <th>Samstag</th>
              <th id="topRight">Sonntag</th>
          </tr>
<!--          <tr v-for="(day, index) in days(exercises)" :key="day.id">-->
<!--              <td class="0" v-on:click="color(this.uniqueId(0, index))" :id="uniqueId(0, index)">{{days(exercises)[0][index]}}</td>-->
<!--              <td class="1" v-on:click="color(this.uniqueId(1, index))" :id="uniqueId(1, index)">{{days(exercises)[1][index]}}</td>-->
<!--              <td class="2" v-on:click="color(this.uniqueId(2, index))" :id="uniqueId(2, index)">{{days(exercises)[2][index]}}</td>-->
<!--              <td class="3" v-on:click="color(this.uniqueId(3, index))" :id="uniqueId(3, index)">{{days(exercises)[3][index]}}</td>-->
<!--              <td class="4" v-on:click="color(this.uniqueId(4, index))" :id="uniqueId(4, index)">{{days(exercises)[4][index]}}</td>-->
<!--              <td class="5" v-on:click="color(this.uniqueId(5, index))" :id="uniqueId(5, index)">{{days(exercises)[5][index]}}</td>-->
<!--              <td class="6" v-on:click="color(this.uniqueId(6, index))" :id="uniqueId(6, index)">{{days(exercises)[6][index]}}</td>-->
<!--          </tr>-->

          <tr v-for="(day, index) in days(exercises)" :key="day.id">
<!--              td-id is combination from day number and db-id-->
              <td class="0" v-on:click="color(createId(0, uniqueId(exercises)[0][index]))" :id="createId(0, uniqueId(exercises)[0][index])">{{days(exercises)[0][index]}}</td>
              <td class="1" v-on:click="color(createId(1, uniqueId(exercises)[1][index]))" :id="createId(1, uniqueId(exercises)[1][index])">{{days(exercises)[1][index]}}</td>
              <td class="2" v-on:click="color(createId(2, uniqueId(exercises)[2][index]))" :id="createId(2, uniqueId(exercises)[2][index])">{{days(exercises)[2][index]}}</td>
              <td class="3" v-on:click="color(createId(3, uniqueId(exercises)[3][index]))" :id="createId(3, uniqueId(exercises)[3][index])">{{days(exercises)[3][index]}}</td>
              <td class="4" v-on:click="color(createId(4, uniqueId(exercises)[4][index]))" :id="createId(4, uniqueId(exercises)[4][index])">{{days(exercises)[4][index]}}</td>
              <td class="5" v-on:click="color(createId(5, uniqueId(exercises)[5][index]))" :id="createId(5, uniqueId(exercises)[5][index])">{{days(exercises)[5][index]}}</td>
              <td class="6" v-on:click="color(createId(6, uniqueId(exercises)[6][index]))" :id="createId(6, uniqueId(exercises)[6][index])">{{days(exercises)[6][index]}}</td>
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
            hidden: true,
            disclaimerBtnHidden: true,
            id: '',
            mo: false,
            di: false,
            mi: false,
            don: false,
            fr: false,
            sa: false,
            so: false,
            planed: false,
            exercisesChangable: this.exercises
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
        uniqueId(exercises){

            var monday = [];
            var tuesday = [];
            var wednesday = [];
            var thursday = [];
            var friday = [];
            var saturday = [];
            var sunday = [];

            for (let i = 0; i < exercises.length; i++) {
                if(exercises[i].mo) monday.push(exercises[i].id);
                if(exercises[i].di) tuesday.push(exercises[i].id);
                if(exercises[i].mi) wednesday.push(exercises[i].id);
                if(exercises[i].don) thursday.push(exercises[i].id);
                if(exercises[i].fr) friday.push(exercises[i].id);
                if(exercises[i].sa) saturday.push(exercises[i].id);
                if(exercises[i].so) sunday.push(exercises[i].id);
            }
            var week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
            return week;

            },
        days(exercises){
            var monday = [];
            var tuesday = [];
            var wednesday = [];
            var thursday = [];
            var friday = [];
            var saturday = [];
            var sunday = [];

            for (let i = 0; i < exercises.length; i++) {
                if(exercises[i].mo) monday.push(exercises[i].name);
                if(exercises[i].di) tuesday.push(exercises[i].name);
                if(exercises[i].mi) wednesday.push(exercises[i].name);
                if(exercises[i].don) thursday.push(exercises[i].name);
                if(exercises[i].fr) friday.push(exercises[i].name);
                if(exercises[i].sa) saturday.push(exercises[i].name);
                if(exercises[i].so) sunday.push(exercises[i].name);
            }
            var week = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
            return week;

        },
        colorRestDay(){

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
                document.getElementById(id).style.color = "white";
            }


        },
        abbrechen(){
            this.hidden = true;
            this.disclaimerBtnHidden = true
        },
        edit(){
            this.hidden = false;
            this.disclaimerBtnHidden = false;
            document.getElementsByClassName("training_table").item(0).style.cursor = "pointer";
        },
        bestatigen() {
            console.log(arrClicked)

            for (let i = 0; i < arrClicked.length; i++) {

                var  db_id = arrClicked[i].slice(2);
                var day_id = arrClicked[i].slice(0, 1);
                var index;

                for (let j = 0; j < this.exercisesChangable.length; j++) {
                    if (this.exercisesChangable[j].id == db_id) {
                        index = j;
                        console.log(this.exercisesChangable[j])
                        this.mo = this.exercisesChangable[j].mo;
                        this.di = this.exercisesChangable[j].di;
                        this.mi = this.exercisesChangable[j].mi;
                        this.don = this.exercisesChangable[j].don;
                        this.fr = this.exercisesChangable[j].fr;
                        this.sa = this.exercisesChangable[j].sa;
                        this.so = this.exercisesChangable[j].so;
                    }
                }

                if(day_id == 0) {
                    this.mo = false;
                    this.exercisesChangable[index].mo = false;
                }
                else if(day_id == 1) {
                    this.di = false;
                    this.exercisesChangable[index].di = false;
                }
                else if(day_id == 2) {
                    this.mi = false;
                    this.exercisesChangable[index].mi = false;
                }
                else if(day_id == 3) {
                    this.don = false;
                    this.exercisesChangable[index].don = false;
                }
                else if(day_id == 4) {
                    this.fr = false;
                    this.exercisesChangable[index].fr = false;
                }
                else if(day_id == 5) {
                    this.sa = false;
                    this.exercisesChangable[index].sa = false;
                }
                else if(day_id == 6) {
                    this.so = false;
                    this.exercisesChangable[index].so = false;
                }

                if(this.exercisesChangable[index].mo || this.exercisesChangable[index].di || this.exercisesChangable[index].mi || this.exercisesChangable[index].don || this.exercisesChangable[index].fr || this.exercisesChangable[index].sa ||this.exercisesChangable[index].so) this.planed = true;
                else this.planed = false;

                var data = {
                    mo: this.mo,
                    di: this.di,
                    mi: this.mi,
                    don: this.don,
                    fr: this.fr,
                    sa: this.sa,
                    so: this.so,
                    planed: this.planed
                }


                fetch('http://localhost:8081/remove/' + db_id, {
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
            this.hidden = true;
            this.disclaimerBtnHidden = true;

        }

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

#topRight{
    border-top-right-radius: 10px;
}
#topLeft{
    border-top-left-radius: 10px;
}



</style>