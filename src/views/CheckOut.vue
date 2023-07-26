
<template>
    <!-- <form class="addDetails">
            <h1 class="headerAddress">Input delivery details</h1>
            <label for="phoneNumber">Phone Number:</label>
            <input ref='form1' class='phoneNumber' type="number" name="phoneNumber" required v-model="number"><br>
            <label for="streetName">Street Name:</label>
            <input ref='form1' class='streetName' type="text" name="streetName" required v-model="streetName"><br>
            <label for="postalCode">Postal Code:</label>
            <input ref='form1' class='postalCode' type="text" name="postalCode" required v-model="postalCode"><br>
            <label for="others">Others:</label>
            <input ref='form1' class='others' type="text" name="others" v-model="others"><br>
            
            <button @click.prevent='getData' class="deliveryButton">Submit</button>
        </form> -->
<!-- 
        <ul >
              <li v-for="item in foodSelected" :key="item.name">
        
                   
                <div class="orderedItems">
                    <div>
                        <img 
                        class='foodImage' 
                        :src=foodItems[item[3]].image
                        >
                    </div >
                    <div class="foodText">
                      {{item[0]}} x {{item[1]}}
                    </div>
                  </div>
                
              </li>
          </ul> -->

<div class="row">
  <div class="col-75">
    <div class="container">
      <form action="/action_page.php">

        <div class="row">
          <div class="col-50">
            <h3>Billing Address</h3>
            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
            <input type="text" v-model='fullName' id="fname" name="firstname" placeholder="John M. Doe">
            <div class="form-group col-md-2">
            <label for="inputCity">Phone Number</label>
            <input v-model="number" type="text" class="form-control" id="inputCity" placeholder="+65 12345678" required>
          </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" v-model="address" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
            </div>
            <div class="form-group">
              <label for="inputAddress2">Address 2</label>
              <input type="text" v-model="address2" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" required>
            </div>
            <div class="row">
                <div class="col-50">
                  <label for="inputAddress2">Others</label>
                  <input  v-model="others" type="text" class="form-control" id="others" placeholder="Others" >
                </div>
              <div class="form-group col-md-2">
          <label for="inputZip">Postal Code</label>
          <input v-model="postalCode" type="text" class="form-control" id="inputZip" required placeholder="123455">
        </div>
            </div>
          </div>

          <div class="col-50">
            <h3>Payment</h3>
            <label for="fname">Accepted Cards</label>
            <div class="icon-container">
              <font-awesome-icon class='iconsPayment' icon="fa-brands fa-cc-visa" style="color:navy;"/>
              <font-awesome-icon class='iconsPayment' icon="fa-brands fa-cc-amex" style="color:blue;"/>
              <font-awesome-icon class='iconsPayment' icon="fa-brands fa-cc-mastercard" style="color:orange;"/>
              <font-awesome-icon class='iconsPayment' icon="fa-brands fa-cc-paypal" style="color:blue;"/>
            </div>
            <label for="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="John More Doe">
            <label for="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
            <label for="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="September">

            <div class="row">
              <div class="col-50">
                <label for="expyear">Exp Year</label>
                <input type="text" id="expyear" name="expyear" placeholder="2018">
              </div>
              <div class="col-50">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="352">
              </div>
            </div>
          </div>

        </div>
        <label>
          <input type="checkbox" checked="checked" name="sameadr"> Shipping address same as billing
        </label>
        <input type="submit" @click.prevent='getData' value="Continue to checkout" class="btn">
      </form>
    </div>
  </div>

  <!-- <div class="col-25">
    <div class="container">
      <h4>Cart
        <span class="price" style="color:black">
          <i class="fa fa-shopping-cart"></i>
          <b>4</b>
        </span>
      </h4>
      <p><a href="#">Product 1</a> <span class="price">$15</span></p>
      <p><a href="#">Product 2</a> <span class="price">$5</span></p>
      <p><a href="#">Product 3</a> <span class="price">$8</span></p>
      <p><a href="#">Product 4</a> <span class="price">$2</span></p>
      <hr>
      <p>Total <span class="price" style="color:black"><b>$30</b></span></p>
    </div>
  </div> -->
</div>

</template>

<!-- <script>


    export default{
        created(){

     
            this.foodItems = this.$pages.getAllfood(),
            this.foodSelected= this.$pages.getAllorders()


        },
        data(){
        return{
            foodSelected:[], 
            foodItems:[],
            images : []
            }
        },
        methods:{

        }
}

</script> -->


<script>
    import{
    getAuth,
    onAuthStateChanged
  }from 'firebase/auth'
import db from '../firebase'
import {
    collection,
    getFirestore, getDocs,
    serverTimestamp, addDoc, deleteDoc,
    onSnapshot,doc
} from 'firebase/firestore'


export default{

    data(){
        return{
            fullName:null,
            number: null,
            address: null,
            address2:null,
            postalCode: null,
            others: null

            
        }
    }, 
    methods:{

        async getData(){
          const auth = getAuth()
          onAuthStateChanged(auth, (user)=>{
            
            const docRef_users = doc(db, "Users", user.email);
            const coldRef_delivery = collection(docRef_users, "deliveryDetials")
            addDoc(coldRef_delivery, {
              PhoneNumber: this.number,
              FullName: this.fullName,
              address: this.address,
              address2: this.address2,
              postalCode: this.postalCode,
              others: this.others,
              createdAt: serverTimestamp()
        }) 
        this.fullName=''
        this.number=''
        this.address=''
        this.address2=''
        this.postalCode=''
        this.others=''
        }
      )}
    },
    created(){
        // this.fetchItems()
    }

}




</script>


<style scoped>
.iconsPayment{
  margin-right: 10px;
  font-size: 40px;
}


#butn{
    margin-top: 10px;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  /* background-color: #f2f2f2; */
  padding: 5px 20px 15px 20px;
  /* border: 1px solid lightgrey; */
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #04AA6D;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (and change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>