<template>
    <!-- <nav>
    
import Navbarlink from './Navbarlink.vue';
      <div class="menu-item"><a href="#">Home</a></div>
      <div class="menu-item"><a href="#">About</a></div>
      <Dropdown title="Services" :items="services" />
      <div class="menu-item"><a href="#">Menu</a></div>
    </nav> -->

        
          
<!--       
      <div class="wordLinks"> 
        <a class="logoThing" href="#"><img class="logo" src="../assets/logo.png"></a>
        
        <div class='Header' v-for="(page, index) in pages" :key="index" >
            <navbar-link
                :page='page' 
                
                :index="index"

            ></navbar-link>

        </div>
            -->
<!-- RMB you always need to bind if you want to use the props from the parent -->
<!-- A link should have a title as well  -->


        
            



  <header class="header">
		<h1 class="logo"><a class="logoThing" href="#"><img class="logo" src="../assets/logo.png"></a></h1>
      <ul class="main-nav">
        <li>
            <a
          v-if ='isLoggedIn'
          class="welcomeText">Welcome! {{ nameDisplay }}</a>
        </li>
          <li>        
              <router-link
                to="/Menu"
                class="navBarLink"
                active-class="active hello"
                >Menu
              </router-link>
          </li>

          <li>        
              <router-link
                to="/"
                class="navBarLink"
                active-class="active hello"
                >Home
              </router-link>
          </li>

          <li class="profileIconandWelcome">
          <div class="dropdown">
          <a
                    
                    class="profile"
                    active-class="active hello"
                    @click = 'dropDown'
                
          ><font-awesome-icon icon="fa-solid fa-user"/>  
          <svg  fill="#000000" height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 330 330" xml:space="preserve" class="arrowDown">
                <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
            </svg>
          </a>


            <div class="profileMenu" v-if="isOpen">
                      <h3 class="userAccountWord">
                        <div class='userNameClass' id="userName"></div>
                      </h3>
                      <ul>
                          <p>
                    
                            
                                      
                            <router-link
                            to="/"
                            class="signIn"
                  
                            >
                            <span id="signIn" style="cursor: pointer;"><font-awesome-icon icon="fa-solid fa-user" class="icon"/>My Profile</span>
                            
                            </router-link>
                      
                          </p>

                          <p>
                    
                            
                              
                              <router-link
                              to="/SignIn"
                              class="signIn"
                              v-if='isLoggedIn'
                              >
                              <span id="signIn"  @click='logout' style="cursor: pointer;"><font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon"/>Log Out</span>
                              
                              </router-link>
                        
                            </p>
              
                          <p>
                    
                            
                              
                              <router-link
                              to="/SignIn"
                              class="signIn"
                              v-if ='!isLoggedIn'                              
                              >
                              <span id="signIn"  style="cursor: pointer;"><font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon"/>Sign In</span>
                              
                              </router-link>
                        
                            </p>




                          <p>
                            
                            
                              
                              <router-link
                              to="/Register"
                              class="registerbtn"
                              v-if ='!isLoggedIn'    

                              >
                              <span id="signIn" style="cursor: pointer;"><font-awesome-icon icon="fa-solid fa-user-plus" class="icon"/>Register</span>
                              </router-link>
                            </p>
                      </ul>
                  </div>
                </div>
              
              </li>

     

      </ul>
	</header> 



  </template>
  
  <script>
  import NavbarLink from './NavbarLink.vue';
  import{
    getAuth,
    signOut,
    onAuthStateChanged
  }from 'firebase/auth'
  import db from '../firebase'
  import database from '../firebase/database'

  
  
  export default {
    name: 'navbar',
    components: {
    NavbarLink,
    },

    created(){
      this.pages=this.$pages.getAllPages()  
      this.loggedin()    
    },
    
      data () {
        return {
          isOpen:false,
          isLoggedIn: false,
          pages:[],
          services: [
            {
              title: 'User Details',
              link: '#'
            },
            {
              title: 'Settings',
              link:'#'
            },
            {
              title: 'Logout',
              link: '#'
            }
          ],
          name:''
        }
      },
      methods:{
        dropDown(){
          this.isOpen=!this.isOpen
          // console.log(this.isOpen)
        },
        logout(){
          const auth = getAuth()
          signOut(auth)
            .then((cred)=>{
              console.log('User Logged Out')
              alert('User Logged Out')
              }) .catch(err => {
              console.log(err.message)
           })

        },
        loggedin(){
          const auth = getAuth()
          // console.log('hekkio')
          
          onAuthStateChanged(auth, (user)=>{
            if (user) {
              this.isLoggedIn = true
              
            } else {
              this.isLoggedIn = false
              
            }
            console.log(this.isLoggedIn)
            // return this.isLoggedIn
          })
        }

      },
      computed:{
        nameDisplay(){
          
          
          const auth = getAuth()
          onAuthStateChanged(auth, (user)=>{
            
          console.log('user state changed',user)
          

            if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            this.name = user.displayName;
            
            // console.log(this.name )
            
            }
            })
            return this.name
            
        }
      }
  }
  </script>
  
  <style>

* {
	box-sizing: border-box;
}
body {
	font-family: 'Montserrat', sans-serif;
	line-height: 1.6;
	margin: 0;
	min-height: 100vh;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  /* text-align: center; */
}



ul li{
  text-align: center;
}


.logo {
	margin: 0;
	font-size: 1.45em;
}

.main-nav {
	margin-top: 5px;
  text-align: left;
}
.logo a,
.main-nav a {
	padding: 10px 15px;
	text-transform: uppercase;
	text-align: center;
	display: block;
}

.main-nav a {
	color: #34495e;
	font-size: .99em;
}

.main-nav a:hover {
	color: #718daa;
}






/* ================================= 
  Media Queries
==================================== */




@media (min-width: 769px) {
	.header,
	.main-nav {
		display: flex;
	}
	.header {
		flex-direction: column;
		align-items: center;
    	.header{
		width: 80%;
		margin: 0 auto;
		max-width: 1150px;
    
	}
	}

}

@media (min-width: 1025px) {
	.header {
		flex-direction: row;
		justify-content: space-between;
    /* padding-bottom: 10px; */
	}

}


 .arrowDown{
    /* margin-left: 6px; */
    cursor: pointer;
 }


 
  .navBarLink{
    text-decoration: none;
    color: inherit;
    /* margin-left: auto; */
    
  }
  .profile{

    text-decoration: none;
    color: inherit;
    cursor: pointer;
    font-size: larger;   
   
  }
  .profileIconandWelcome{
    /* margin-right: 150px; */
    display: inline;
  }

    .profileMenu{
    /* box-sizing:0 5px 25px rgba(0,0,0,0.1); */
    border-radius: 15px;
    /* padding: 10px 20px; */
    position: absolute;
      right: 20px;
    width: 200px;
    height: auto;
    /* max-height: fit-content; */
    /* margin-right: 100px; */
    transition: 0.5s;
    top: 60px;
    background-color: #FFD500;
}
    


  #signIn{
    /* margin-right: 50px; */
    /* text-align: center; */
    padding: 0px 0px 15px 10px;
    float: left;
  }

  .registerbtn{
    text-decoration: none;
    color: inherit;
  }

  .signIn{
    text-decoration: none;
    color: inherit;
  }

 

  .welcomeText{
    /* margin-left: 80px; */
    text-decoration: none;
    color: inherit;
    font-size: larger;

  }

  </style>