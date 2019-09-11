import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history'
  , routes: [
    {
      path: '/'
      , redirect: '/form'
    }
    , {
      path: '/form'
      , component: resolve => require(['../components/form/Form.vue'], resolve)
      , meta: { title: 'form' }
    }
  ]
});
