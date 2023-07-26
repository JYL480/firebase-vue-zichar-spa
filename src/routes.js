import { createRouter, createWebHashHistory } from "vue-router";
import PageViewer from './views/PageViewer.vue'
import LandingPage from './views/LandingPage.vue'
import MenuPage from './views/MenuPage.vue'
import CheckOut from './views/CheckOut.vue'
import Pages from './views/Pages.vue'
import Payment from './views/Payment.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {path: '/:index?',component: PageViewer, props: true}, // when there is a slash component will be displayed 


        // {path: '/pageviewer', component: PageViewer},

        {
            path: '/Menu' ,
            component: Pages,
            children:[
                {path:'', component: MenuPage},
                {
                    path:'CheckOut',
                    component: CheckOut,
                    meta:{needAuth:true},
                    // redirect:'/SignIn'
                },
                {
                    path:'Payment',
                    component: Payment
                }

            ]
        },

        {path: '/',component: LandingPage},
        {path: '/Home',component: LandingPage},
        {path: '/Register',component: SignUp},
        {path: '/SignIn', component: SignIn}

    ]

})

export default router;
