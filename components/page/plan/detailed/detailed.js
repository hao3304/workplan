/**
 * Created by Administrator on 2016/7/5.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

Vue.component("group",require("group/index.js"));
Vue.component("datetime",require("datetime/index.js"));

module.exports = Vue.extend({
    template:__inline("detailed.html"),
    data: function () {
        return {
            loading:true,
            text:"计划加载中...",
            detail:{
                Dep:"",
                Plans:[]
            },
            month:"",
            Dep:""
        }
    },
    methods:{
        render: function () {
            if(!this.month){
                return;
            }
            this.loading = true;
            var self = this;
            Service.getPlan(JSON.stringify({
                Token:Store.token,
                Dep:this.Dep,
                Month:this._toDate(this.month)
            }), function (rep) {
                self.detail = rep;
                self.loading = false;
            })
        },
        _toDate: function (d) {
            return d.replace("年","-").replace("月","");
        },
        getNow: function () {
            var d = new Date();
            this.month = d.Format("yyyy年MM月");
        },
        onChange: function (d) {
            this.month = d;
        }
    },
    watch:{
        month: function () {
            this.render();
        }
    },
    route: {
        data: function () {
            this.Dep = this.$route.params.id;
            this.getNow();
            this.render();

        }
    }
});