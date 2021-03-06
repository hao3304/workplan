/**
 * Created by Administrator on 2016/7/6.
 */


var Vue = require("component_modules/vue.js");

Vue.component("group",require("group/index.js"));
Vue.component("datetime",require("datetime/index.js"));
Vue.component("alert",require("alert/index.js"));

var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("plan.html"),
    props:["dep","month"],
    data: function () {
        return {
            loading:true,
            show:false,
            text:"计划加载中...",
            detail:{
                Dep:"",
                Plans:[]
            },
            tab:"",
            list:[],
            remark:""
        }
    },
    methods:{
        render: function () {
            if(!this.month){
                return;
            }
            this.loading = true;
            var self = this;
            Service.getResult(JSON.stringify({
                Token:Store.token,
                Dep:this.dep,
                Month:this._toDate(this.month)
            }), function (rep) {
                self.detail = rep;
                if(rep.Plans.length>0){
                    self.tab = rep.Plans[0].Name;
                    self.list = rep.Plans[0].List;
                }
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
        },
        onChangeTab: function (d) {
            this.tab = d.Name;
            this.list = d.List;
        },
        onShowRemark: function (remark) {
            this.show = true;
            this.remark = remark;
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
