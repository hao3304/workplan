/**
 * Created by Administrator on 2016/7/6.
 */

var Vue = require("component_modules/vue.js");

Vue.component("group",require("group/index.js"));
Vue.component("datetime",require("datetime/index.js"));

var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("target.html"),
    props:["dep","month"],
    data: function () {
        return {
            loading:true,
            text:"指标加载中...",
            detail:{
                Dep:"",
                Plans:[]
            },
            height:document.documentElement.clientHeight - 104
        }
    },
    methods:{
        render: function () {
            if(!this.month){
                return ;
            }
            this.loading = true;
            var self = this;

            Service.getTarget(JSON.stringify({
                Token:Store.token,
                Dep:this.dep,
                Month:this._toDate(this.month)
            }), function (rep) {
                self.detail = rep;
                self.loading = false;
            })
        },
        _toDate: function (d) {
            return d.replace("年","-").replace("月","");
        },
        onChange: function (d) {
            this.month = d;
        }
    },
    watch:{
        month: function (m) {
            this.render();
        }
    },
    ready: function () {
        this.render();
    }
});