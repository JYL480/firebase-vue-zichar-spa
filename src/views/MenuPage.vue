<template>

    <div class="container">
        <header>
            <h1>Menu</h1>
            <div class="shopping">
                <img class='bag' src="../assets/shopping.svg">      
                <span class="quantity">{{ number }}</span>
            </div>
        </header>
    </div>
    <ul id="itemsList">
        <li class="containerPictures" v-for="(food, index) in foodItems" :key="index">
            <section class="layout">
                
                <img :src="food.image">
                <p class="foodName">{{ food.title }}</p>
                <p id="price">${{ food.price }}</p>
                
                <QuantityCounter 
                    @counter="onCounter" 
                    :food="food" 
                ></QuantityCounter>
                
            </section>
            
        </li>
        
    </ul>
    <div class="sideBarContainer">
 
    
        <div class="sideBar">
            <div class="head"><p>My Cart</p></div>

            

            <basket :foodItems='foodItems' :items-selected="itemsSelected" :isEmpty="isEmpty"></basket>
            <div class="foot">
                <h3>Total</h3>
                <h2 id="total">${{ calulateTotal }}</h2>
            </div>

            <router-link
                :itemsSelected="itemsSelected"
                to="/Menu/CheckOut"
               
            ><button @click='storeLocalAndFirestore(itemsSelected)' class="checkOutButton">CheckOut</button>
            </router-link>
            
        </div>
    
    
    </div>

   



</template>


<script>
import db from '../firebase/index.js'
    import QuantityCounter from '../components/QuantityCounter.vue'
    import Basket from '../components/Basket.vue'
    import {
    collection,
    getFirestore, getDocs,
    serverTimestamp, addDoc, deleteDoc,
    onSnapshot,doc
} from 'firebase/firestore'
    import{
    getAuth,
    onAuthStateChanged
  }from 'firebase/auth'
import { resolveDirective } from 'vue'


    export default{
  
        components:{
            QuantityCounter,
            Basket
            
    },
    created(){
        // this.foodItems = this.$pages.getAllfood()
        this.getFood()
        
    },
    data(){
        return{
            foodItems:[],
            itemsSelected:[],
            isEmpty:true,
            total:0
           
        }
    },
    methods: {
        onCounter(item, count) {
            console.log(this.itemsSelected)
            let isAdded = false;
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.title, 'No.:',count, item.price, item.id]);
                this.isEmpty=false
            } else {

                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    const num=curr_item[3];

                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.title && count > 0){
                        this.itemsSelected.splice(i, 1, [item.title, 'No.:',count, item.price, item.id]);
                        isAdded = true;
                        this.isEmpty=false
                        break;
                    }
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name == item.title && count==0){
                        this.itemsSelected.splice(i,1);
                        if(this.itemsSelected.length==0){
                            this.isEmpty=true
                        }
                        
                        
                        
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    
                }
                if (!isAdded && count>0){
                    this.itemsSelected.push([item.title, 'No.:',count, item.price, item.id]);
                    this.isEmpty=false
                }
            }
            
        },
        storeLocalAndFirestore(itemsSelected){
            let string = JSON.stringify(itemsSelected)
            
            localStorage.setItem("order",string)
            
            // To firebase
            const colOrderRef = collection(db,'test')
            console.log(string)
            const auth = getAuth()
            
            onAuthStateChanged(auth, (user)=>{
            if (user) {
                const docRef_users = doc(db, "Users", user.email);
                const coldRef_delivery = collection(docRef_users, "FoodOrder")
                addDoc(coldRef_delivery,{
                foodOrder: string,
                createdAt: serverTimestamp(),
                })
              
            } else {
              alert("Please log in to place an order")
              
            }

          }
          )

        },
        async getFood(){
            let res = await fetch('food.json')
            let data = await res.json()
            this.foodItems=data
        }

    },
    computed:{
        calulateTotal(){
                var totalAmount = 0
                this.itemsSelected.forEach((value)=>{
                        let count=value[2]
                        let price=value[3]
                        totalAmount+=price*count
                    
                })
                return totalAmount
              },
        number(){
            var countNo = 0
                this.itemsSelected.forEach((value)=>{
                        let count=value[2]
                        countNo+=count
                    
                })
                return countNo
        }

        }

    }

</script>


<style scoped>

#price{
    font-size: 15px;
}

.foodName{
    font-size: 13px;
}

.sideBar{
    float: right;
    width: 30%;
    border-radius: 5px;
    background-color: #eee;
    padding: 15px;
    text-align: center;

}

.head{
    background-color: rgba(255, 198, 0, 0.9900000095367432);
    border-radius: 3px;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    color: white;
    display: flex;
    align-items: center;
}

.foot{
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    padding: 10px 0px;
    border-top: 1px solid #333;
}

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(4, 1fr);
float: left;
    
/* #price{
    font-size: small;
}
     */
  
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;

  margin-bottom: 0px;
  
}
li {
  flex-grow: 1;
  /* flex-basis: 300px; */
  text-align: center;
  padding: 8px;
  border: 2px solid rgba(255, 198, 0, 0.9900000095367432);
  margin: 7px;
  text-align: center;
    /* box-shadow: 0 50px 50px #757676; */
    border-radius: 10px;
letter-spacing: 1px;
height: 235px;

}


.checkOutButton{
    width: 100%;
    position: relative;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 198, 0, 0.9900000095367432);
    padding: 7px 25px;
    cursor: pointer;
    color: white;

}

.container{
    width: 890px;
    /* height: ; */
    /* margin: auto; */
    transition: 0.5s;  
}
header{
    display: grid;
    grid-template-columns: 1fr 50px;
    /* margin-top: 50px; */
}
header .shopping{
    position: relative;
    text-align: right;
}
header .shopping img{
    width: 40px;
}
header .shopping span{
    background: rgba(255, 198, 0, 0.9900000095367432);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: -5px;
    left: 80%;
    padding: 3px 10px;
}

  .containerPictures img{
    width: 90px;
    height: 90px

  }

  
  .containerPictures{
    transition: 0.5s;
  }



  
  .layout p{
    text-align: center;

  }
.container header h1{
    margin-left: 50px;
}

.container header .shopping img {
    /* Styles for the img element */
    /* Example: */
   margin-left: -100px;

   width: 120px;
  }
  
  .container header .shopping .quantity {
    /* Styles for the span element */
    /* Example: */
    margin-left: -45px;
  }


*{
    margin-left: 0px;
    margin-left: 0px;
    padding: 10 0;
    box-sizing: border-box;
    font-family: 'poppins', sans-serif;
    font-size: 18px;
    max-width: 500em;
  }
  
  
  
  body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  

  
  


#profilePic{
  font-size: larger;
  margin-left: 5px;
  margin-top: 3px; 
}
.action .profile img{
    width: 100%;
    top:0;
    position: absolute;
    object-fit: cover;
    left: 0;
    height: 100%;
}

.action .menuu{
    background-color:#FFF;
    /* box-sizing:0 5px 25px rgba(0,0,0,0.1); */
    border-radius: 15px;
    /* padding: 10px 20px; */
    position: absolute;
    right: 25px;
    width: 200px;
    transition: 0.5s;
    top: 120px;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(255, 198, 0, 0.9900000095367432);
}
.action .menuu.active{
    opacity: 1;
    top: 80px;
    visibility: visible;
}
/* .action .menu::before{
    background-color:#fff;
    content: '';
    height: 20px;
    position: absolute;
    right: 30px;
    transform:rotate(45deg);
    top:-5px;
    width: 20px;
} */
.action .menuu h3{
    color: #555;
    /* font-size: 16px; */
    font-weight: 600;
    margin-right: 500px;
    
}
.action .menuu h3 div{
    color: #818181;
    font-size: 14px;
    font-weight: 400;
}
.action .menuu ul li{
    align-items: center;
    border-top:1px solid rgba(0,0,0,0.05);
    display: flex;
    justify-content: left;
    list-style: none;
    padding: 10px 0px;
    margin-left: 40px;
    

}
.action .menuu ul li img{
    max-width: 60px;
    margin-left: 1000px;
    opacity: 0.5;
    transition:0.5s
}
.action .menuu ul li a{
    display: inline-block;
    color: #555;
    font-size: 14px;
    font-weight: 600;
    padding-left: 15px;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    
}
.action .menuu ul li:hover img{
    opacity: 1;
}
.action .menuu ul li:hover a{
    color:white;
}

.userAccountWord{
  width: 120px;
  /* margin: 0 0 ; */
  margin-left: 20px;
}


.logOutThing{
  display: inline-block;
  color: #555;
  font-size: 14px;
  font-weight: 600;
  padding-left: 15px;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.5s;
}

.logOutThing:hover{
  color:white;
}
#userName{
  font-size: large;
  color: black;
  font-family: 'poppins', sans-serif;
  font-weight: bold;
}

.bag{
    height:  35px;
    cursor: pointer;
}

.headerAddress{
    text-align: center;
}


    /* margin-right: auto; */

</style>