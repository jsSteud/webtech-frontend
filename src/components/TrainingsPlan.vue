<template>
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
          <tr v-for="exercise in mondayExercises(exercises)" :key="exercise.id">
              <td>Übung 1.1</td>
              <td>Übung 2.1</td>
              <td>Übung 3.1</td>
              <td>Übung 2.1</td>
              <td>Übung 3.1</td>
              <td>Übung 2.1</td>
              <td>Übung 3.1</td>
          </tr>

          <tr class="createNewBtns">
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
export default {
    name: 'TrainingsPlan',
props: {
    exercises: {
        type: Array,
            required: true
    }
}, methods: {
     mondayExercises(exercises){
         var name = [];
         for (let i = 0; i < exercises.length; i++) {
             if(exercises[i].mo) name.push(exercises[i].name);
         }

         return name;

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


.training_table {
    margin-top: 40px;
    border-spacing: 0;
    text-align: left;
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;

}

.training_table th{
    color: white;
    background-color: #6c7ae0;
    width: 10vw;
    font-size: 110%;
    line-height: 300%;
    padding-left: 30px;

}

.training_table td{
    width: 10vw;
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