/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");
var Service = require("main/service.js");

Vue.component("loading",require("loading/index.js"));

Vue.use(Router);


Store = {
    uid:"",
    token:Service.GetQueryString("token"),
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
    }
});

router.redirect({
    "/":"home"
});

router.map({
    "/home":{
        component:require("page/home/home.js") /*首页*/
    },
    "/plan":{
        component:require("page/plan/plan.js") /*工作计划*/
    },
    "/detailed/:id":{
        component:require("page/plan/detailed/detailed.js") /*工作计划-详情*/
    },
    "/plan-summary":{
        component:require("page/plan-summary/plan-summary.js") /*工作计划总结*/
    },
    "/summary/:id":{
        component:require("page/plan-summary/detailed/summary/summary.js") /*工作计划总结-指标*/
    }
    //"/work/:name":{
    //    component:require("page/work/work.js") /*调班审核列表*/
    //}

});

router.start(App,'#app');

Vue.filter("getSrc", function (src) {
   if(src){
        return Service.path+src;
   }else{
       return null;
   }
});

Vue.filter("state", function (s) {
    switch  (parseInt(s)){
        case 1:{
            return "icon-dagou";
        }break;
        case 2:{
            return "icon-dagou yellow";
        }break;
        case 3:{
            return "icon-bianji";
        }break;
        case 4:{
            return "icon-guanbi";
        }break;
    }
});