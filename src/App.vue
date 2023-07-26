<template>
  
  <navbar></navbar>
  <!-- Soo the child will pass the index from here to this activePage value -->
  <!-- <menu-page
    :foodItems="foodItems"
  ></menu-page> -->
  <!-- <landing-page></landing-page>   -->

  
  
  <router-view></router-view>
</template>


<script>
  


import Navbar from './components/Navbar.vue';
// Have to import the page viewer, page viewer is the one that will switch the pages


  export default
  {
    components:{
      Navbar,
   
    },
    created(){ // So we will load our content when the data is processd via methods, but before the content is loaded in the web

      this.getFood()
      // Here you will listen and check for the gloabl event bus thing
      // this.$bus.$on('nabarLinkActivated',(index)=>{
      //   this,this.activePage=index
      // })
    },
    data(){
      return{
        pages: [],
        foodItems:[]
      }
    },
    methods:
    {

      async getFood(){
          let res = await fetch('food.json')
          let data = await res.json();
          this.foodItems=data

      }
    }
  }

</script>


<style>

</style>
