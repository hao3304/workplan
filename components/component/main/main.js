/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");
var Service = require("main/service.js");

Vue.use(Router);


Store = {
    uid:"",
    //token:"575e45026da1e212e48c8ec3",
    showLoading:true
};

router = new Router();
var App = Vue.extend({
    data: function () {
        return {
            showLoading:false
        }
    },
    ready: function () {
        //this.token = Service.GetQueryString("token");
    }
});


router.map({
    "/home":{
        component:require("page/home/home.js") /*首页*/
    },
    "/plan":{
        component:require("page/plan/plan.js") /*工作计划*/
    },
    "/detailed":{
        component:require("page/plan/detailed/detailed.js") /*工作计划-详情*/
    },
    "/plan-summary":{
        component:require("page/plan-summary/plan-summary.js") /*工作计划总结*/
    },
    "/target":{
        component:require("page/plan-summary/detailed/target.js") /*工作计划总结-指标*/
    },
    "/target":{
        component:require("page/plan-summary/detailed/plan.js") /*工作计划总结-指标*/
    }

    //"/work/:name":{
    //    component:require("page/work/work.js") /*调班审核列表*/
    //}

});

router.start(App,'#app');
router.go("/home");