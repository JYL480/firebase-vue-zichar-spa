<template>
    <div>
        <div v-show="isEmpty" class="cartItem">Your cart is empty</div>
          <ul >
              <li v-for="item in itemsSelected" :key="item.name">

                   
                <div class="orderedItems">
                    <div>
                        <img class='foodImage' :src=foodItems[item[4]].image>
                    </div >
                    <div class="foodText">
                      {{item[0]}} x {{item[2]}}
                    </div>
                  </div>
                
              </li>
          </ul>
          <!-- <button @:click="findTotal">Calculate Total</button>
          
          <div id="total" v-show="check">
              <p>Subtotal: ${{total}}</p>
              <p>Grand Total: ${{gst}}</p>
          </div> -->
    </div>
  </template>
  
  <script>
  export default {
      data(){
          return{
              total:0,
              check:false
          }
      },
      props:['itemsSelected','foodItems','isEmpty'],
      
  }
  </script>
  
  <style scoped>

  .foodImage{
    width: 70px;
    margin-right: 10px;
    display: grid;
    grid-template-columns: 100px repeat(3, 1fr);
    gap: 8px;
    grid-gap: 20px;
    
  }

  ul{
    list-style: none;
  }

  .orderedItems{
    display: flex;
    
  }
  
.foodText{
  font-size: 13px;
  margin-top: 30px;
  margin-left: 10px;
}

  </style>