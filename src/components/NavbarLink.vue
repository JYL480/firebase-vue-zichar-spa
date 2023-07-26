<template>
    <div class="header">
        <router-link
            :to="`/${index}`"
            class="navBarLink"
            active-class="active hello"

            :title="`This link goes to ${page.pageTitle}`"
            
        >{{ page.link.text }}</router-link>
    </div>


</template>

<script>
    export default{
        props:['page','index']

    }

</script>

<style>
.hello{
    text-decoration: underline !important;
}

</style>

