/**
 * Created by Administrator on 2016/7/6.
 */

var Vue = require("component_modules/vue.js");

Vue.component("group",require("group/index.js"));
Vue.component("datetime",require("datetime/index.js"));

var Service = require("main/service.js");

var plan = require("page/plan-summary/detailed/plan.js");
var target = require("page/plan-summary/detailed/target.js");

module.exports = Vue.extend({
    template:__inline("summary.html"),
    data: function () {
        return {
            detail:{
                Dep:"",
                Plans:[]
            },
            month:"",
            Dep:"",
            view:"target"
        }
    },
    methods:{
        render: function (id) {
            if(!this.month){
                return;
            }
            var self = this;
            Service.getTarget(JSON.stringify({
                Token:Store.token,
                Dep:this.Dep,
                Month:this._toDate(this.month)
            }), function (rep) {
                self.detail = rep;
            })
        },
        _toDate: function (d) {
            return d.replace("年","-").replace("月","");
        },
        getNow: function () {
            this.month  ="";
            var self = this;
            Vue.nextTick(function () {
                var d = new Date();
                self.month = d.Format("yyyy年MM月");
            })
        },
        onChange: function (d) {
            this.month = d;
        },
        onChangeView: function (v) {
            this.view =v;
        }
    },
    watch:{
        month: function () {
            this.render();
        }
    },
    components:{
      "plan":plan,
      "target":target
    },
    route: {
        data: function () {
            this.Dep = this.$route.params.id;
            this.getNow();
            this.render();

        }
    }
});