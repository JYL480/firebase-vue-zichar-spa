
<template>


        <ul >
              <li v-for="item in foodSelected" :key="item.name">
        
                   
                <div class="orderedItems">
                    <div>
                        <img class='foodImage' :src=foodItems[item[3]].image>
                    </div >
                    <div class="foodText">
                      {{item[0]}} x {{item[1]}}
                    </div>
                  </div>
                
              </li>
          </ul>


</template>

<script>
    export default{
        data(){
        return{
            foodSelected:[], 
            foodItems:[]
        }
      
    },computed:{
            thing(){
                this.foodItems = this.$pages.getAllfood(),
                this.foodSelected= this.$pages.getAllorders()
            }
        }
    
    }

</script>





<style scoped>
.addDetails input{
    margin-top:5px;
    /* margin-bottom: 10px; */
}

.addDetails button{
    margin-top: 10px;
}


.addDetails{
    transition: 0.5s;
    display: grid;
    place-items: center;
    float:bottom;

}
</style>