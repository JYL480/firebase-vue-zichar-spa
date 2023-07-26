<template>
    <div>
        <button v-on:click="neg_check"><div class="addText">-</div> </button>
       {{count}}
        <button v-on:click="pos_check"> <div class="addText">+</div> </button>
    </div>
  </template>



<script>

    export default {
        data(){
            return {
                count:0,
            }
        },
        methods:{
            pos_check(){
                this.empty_show= true
                if (this.count<10){
                    this.count++;
                }else{
                    alert('You cannot buy more than 10 items.');
                }
                this.$emit('counter', this.food, this.count)
            },
            neg_check(){
                if (this.count>0){
                    this.count--;
                }
                this.$emit('counter', this.food, this.count);
            },
            totalAmount(){
                let total=0;

            }
        },
        props:{
            food:{
                type:Object
                
            }
        }
    }
</script>


<style scoped>

button{
    width: fit-content;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 198, 0, 0.9900000095367432);
    padding: 3px 15px;
    cursor: pointer;
    color: white;
    
}
.addText{
    font-size: 20px;
}



</style>