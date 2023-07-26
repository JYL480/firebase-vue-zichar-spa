<template>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img class='logoImage' src="../assets/logo.png" alt="IMG">
          </div>
  
          <form class="signup">
            <span class="login100-form-title">
            Sign In
            </span>
  
            <div class="wrap-input100 validate-input " data-validate="Valid email is required: ex@abc.xyz" >
              <!-- p::before{} -->
              <input class="input100" type="email" id='email' name="email" placeholder="Email" v-model='email' required>
              <span class="focus-input100"></span>
              <span class="symbol-input100">
              <!-- ::after -->
              <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
            
            <div class="wrap-input100 validate-input  " data-validate="Password is required" >
              <input class="input100" type="password" id='password' name="pass" placeholder="Password" required v-model='password'>
              <span class="focus-input100"></span>
              <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>
  
            <div class="container-login100-form-btn">
              <input @click='signIn' type="submit" class="login100-form-btn" id="signUp" name="signup_submit" value="Sign Up" @click.prevent="register">
            </div>
  
            <div class="text-center p-t-12">
              <span class="txt1">
              Forgot
              </span>
              <a class="txt2" href="#">
              Username / Password?
              </a>
            </div>
  
            <div class="bottom">
              <div class="txt2">
              Already have an account?
                <a class="txt2" href="/src/login_page/login.html">
                  Log in
                  <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </a>
            </div>
   
            </div>
          </form>
        </div>
      </div>
    </div>
  
  
  </template>

<script setup>

import{
    updateProfile,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged, getAuth
    }from 'firebase/auth'

    import {
    getDatabase,ref,update
    } from 'firebase/database'

    import {
    collection,
    getFirestore, getDocs,
    serverTimestamp, addDoc, deleteDoc,
    onSnapshot,setDoc,doc,orderBy
    } from 'firebase/firestore'


    import db from '../firebase'
    import database from '../firebase/database'

    import {ref as refV} from 'vue'
    import { useRouter } from 'vue-router'
    const email = refV('')
    const password = refV('')
    const auth = getAuth()
    const router = useRouter()

    const signIn=(loggedIn)=>{
        signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred) => {

            const user = cred.user
            const dt = new Date()

            update(ref(database, 'users/' + user.uid),{
                last_login: dt,
            })
        

            console.log('user logged in:', cred.user)
            alert('User Logged In!')
            loggedIn = true
            // emit('isLoggedIn',this.loggedIn)
            router.push('/')



        })
    }
        


</script>
  
  
  <style scoped>
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box
  }
  
  body,html {
      height: 100%;
      font-family: Poppins-Regular,sans-serif
  }
  
  a {
      font-family: Poppins-Regular;
      font-size: 14px;
      line-height: 1.7;
      color: #666;
      margin: 0;
      transition: all .4s;
      -webkit-transition: all .4s;
      -o-transition: all .4s;
      -moz-transition: all .4s
  }
  
  a:focus {
      outline: none!important
  }
  
  a:hover {
      text-decoration: none;
      color: #57b846
  }
  
  h1,h2,h3,h4,h5,h6 {
      margin: 0
  }
  
  p {
      font-family: Poppins-Regular;
      font-size: 14px;
      line-height: 1.7;
      color: #666;
      margin: 0
  }
  
  ul,li {
      margin: 0;
      list-style-type: none
  }
  
  input {
      outline: none;
      border: none
  }
  
  textarea {
      outline: none;
      border: none
  }
  
  textarea:focus,input:focus {
      border-color: transparent!important
  }
  
  input:focus::-webkit-input-placeholder {
      color: transparent
  }
  
  input:focus:-moz-placeholder {
      color: transparent
  }
  
  input:focus::-moz-placeholder {
      color: transparent
  }
  
  input:focus:-ms-input-placeholder {
      color: transparent
  }
  
  textarea:focus::-webkit-input-placeholder {
      color: transparent
  }
  
  textarea:focus:-moz-placeholder {
      color: transparent
  }
  
  textarea:focus::-moz-placeholder {
      color: transparent
  }
  
  textarea:focus:-ms-input-placeholder {
      color: transparent
  }
  
  input::-webkit-input-placeholder {
      color: #999
  }
  
  input:-moz-placeholder {
      color: #999
  }
  
  input::-moz-placeholder {
      color: #999
  }
  
  input:-ms-input-placeholder {
      color: #999
  }
  
  textarea::-webkit-input-placeholder {
      color: #999
  }
  
  textarea:-moz-placeholder {
      color: #999
  }
  
  textarea::-moz-placeholder {
      color: #999
  }
  
  textarea:-ms-input-placeholder {
      color: #999
  }
  
  button {
      outline: none!important;
      border: none;
      background: 0 0
  }
  
  button:hover {
      cursor: pointer
  }
  
  iframe {
      border: none!important
  }
  
  .txt1 {
      font-family: Poppins-Regular;
      font-size: 13px;
      line-height: 1.5;
      color: #999
  }
  
  .txt2 {
      font-family: Poppins-Regular;
      font-size: 13px;
      line-height: 1.5;
      color: #666
  }
  
  .limiter {
      width: 100%;
      margin: 0 auto
  }
  
  .container-login100 {
      width: 100%;
      min-height: 60vh;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 15px;
  }
  
  .wrap-login100 {
      width: 960px;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 100px 130px 33px 95px
  }
  
  .login100-pic {
      width: 316px
  }
  
  .login100-pic img {
      max-width: 100%
  }
  
  .login100-form {
      width: 290px
  }
  
  .login100-form-title {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 40px;
      color: #333;
      /* line-height: .3; */
      margin-bottom: 40px;
      text-align: center;
      width: 100%;
      display: block;
      padding-bottom: 10px
  }
  
  .wrap-input100 {
      position: relative;
      width: 100%;
      z-index: 1;
      margin-bottom: 10px
  }
  
  .input100 {
      font-family: Poppins-Medium;
      font-size: 15px;
      line-height: 1.5;
      color: #666;
      display: block;
      width: 100%;
      background: #e6e6e6;
      height: 50px;
      border-radius: 25px;
      padding: 0 30px 0 68px
  }
  
  .focus-input100 {
      display: block;
      position: absolute;
      border-radius: 25px;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      box-shadow: 0 0;
      color: rgba(87,184,70,.8)
  }
  
  .input100:focus+.focus-input100 {
      -webkit-animation: anim-shadow .5s ease-in-out forwards;
      animation: anim-shadow .5s ease-in-out forwards
  }
  
  @-webkit-keyframes anim-shadow {
      to {
          box-shadow: 0 0 70px 25px;
          opacity: 0
      }
  }
  
  @keyframes anim-shadow {
      to {
          box-shadow: 0 0 70px 25px;
          opacity: 0
      }
  }
  
  .symbol-input100 {
      font-size: 15px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      position: absolute;
      border-radius: 25px;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-left: 35px;
      pointer-events: none;
      color: #666;
      -webkit-transition: all .4s;
      -o-transition: all .4s;
      -moz-transition: all .4s;
      transition: all .4s
  }
  
  .input100:focus+.focus-input100+.symbol-input100 {
      color: #57b846;
      padding-left: 28px
  }
  
  .container-login100-form-btn {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-top: 20px
  }
  
  .login100-form-btn {
      font-family: Montserrat-Bold;
      font-size: 15px;
      line-height: 1.5;
      color: #fff;
      text-transform: uppercase;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      background: #57b846;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      -webkit-transition: all .4s;
      -o-transition: all .4s;
      -moz-transition: all .4s;
      transition: all .4s;
      margin-bottom: 20px;
  }
  
  .login100-form-btn:hover {
      background: #333
  }
  
  @media(max-width: 992px) {
      .wrap-login100 {
          padding:177px 90px 33px 85px
      }
  
      .login100-pic {
          width: 35%
      }
  
      .login100-form {
          width: 50%
      }
  }
  
  @media(max-width: 768px) {
      .wrap-login100 {
          padding:100px 80px 33px
      }
  
      .login100-pic {
          display: none
      }
  
      .login100-form {
          width: 100%
      }
  }
  
  @media(max-width: 576px) {
      .wrap-login100 {
          padding:100px 15px 33px
      }
  }
  
  .validate-input {
      position: relative
  }
  
  .alert-validate::before {
      content: attr(data-validate);
      position: absolute;
      max-width: 50%;
      background-color: #fff;
      border: 1px solid #c80000;
      border-radius: 13px;
      padding: 4px 25px 4px 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 8px;
      pointer-events: none;
      font-family: Poppins-Medium;
      color: #c80000;
      font-size: 13px;
      line-height: 1.4;
      text-align: left;
      visibility: hidden;
      opacity: 0;
      -webkit-transition: opacity .4s;
      -o-transition: opacity .4s;
      -moz-transition: opacity .4s;
      transition: opacity .4s
  }
  
  .alert-validate::after {
      content: "\f06a";
      font-family: FontAwesome;
      display: block;
      position: absolute;
      color: #c80000;
      font-size: 15px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 13px
  }
  
  .alert-validate:hover:before {
      visibility: visible;
      opacity: 1
  }
  
  @media(max-width: 992px) {
      .alert-validate::before {
          visibility:visible;
          opacity: 1
      }
  }
  
  img{
      height: 100px;
      align-items: center;
      margin-top: 60px;
      margin-left: 50px;
    
  }
  
  
  .bottom{
      display:flex;
      text-align: center;
  }
  
  </style>
  
  