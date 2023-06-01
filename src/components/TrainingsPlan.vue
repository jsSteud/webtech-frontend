<template>
    <button class="btnTemp" @click="edit()" v-on:click="hidden = false" v-if="hidden">Trainingsplan bearbeiten</button>
    <div class="btnDiv">
        <button id="bestatigen" v-on:click="hidden = true" v-if="!hidden">Bestätigen </button>
        <button id="abbrechen" @click="abbrechen()" v-on:click="hidden = true" v-if="!hidden">Abbrechen</button>
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
          <tr v-for="(day, index) in days(exercises)" :key="day.id">
              <td class="0" v-on:click="color(this.uniqueId(0, index))" :id="uniqueId(0, index)">{{days(exercises)[0][index]}}</td>
              <td class="1" v-on:click="color(this.uniqueId(1, index))" :id="uniqueId(1, index)">{{days(exercises)[1][index]}}</td>
              <td class="2" v-on:click="color(this.uniqueId(2, index))" :id="uniqueId(2, index)">{{days(exercises)[2][index]}}</td>
              <td class="3" v-on:click="color(this.uniqueId(3, index))" :id="uniqueId(3, index)">{{days(exercises)[3][index]}}</td>
              <td class="4" v-on:click="color(this.uniqueId(4, index))" :id="uniqueId(4, index)">{{days(exercises)[4][index]}}</td>
              <td class="5" v-on:click="color(this.uniqueId(5, index))" :id="uniqueId(5, index)">{{days(exercises)[5][index]}}</td>
              <td class="6" v-on:click="color(this.uniqueId(6, index))" :id="uniqueId(6, index)">{{days(exercises)[6][index]}}</td>
          </tr>

          <tr v-if="!hidden" class="createNewBtns">
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>
              <td><i class="gg-add"></i></td>

          </tr>

      </table>

  </div>
</template>

<script>

var arrClicked = [];

export default {
    name: 'TrainingsPlan',
    data(){
        return {
            hidden: true,
            id: ''
        }
    },
props: {
    exercises: {
        type: Array,
            required: true
    }
}, methods: {
        uniqueId(day, index){

            let dayString = day.toString();
            let indexString = index.toString();
            let connect = dayString + indexString;
            return connect;
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
            location.reload();
        },
        edit(){
            document.getElementsByClassName("training_table").item(0).style.cursor = "pointer";
        }
    }

}
</script>

<style>

@import url('https://css.gg/css');




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
    font-size: 1.2vh;
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