/**
 * Created by Administrator on 2016/7/5.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:__inline("plan-summary.html"),
    data: function () {
        return {
            list:[],
            loading:true,
            text:"菜单加载中..."
        }
    },
    methods:{
        render: function () {
            this.renderMenu();
        },
        renderMenu: function () {
            var self = this;
            this.loading = true;
            Service.getStructure(JSON.stringify({
                Token:Store.token,
                EndType:"DP"
            }), function (rep) {
                self.loading  = false;
                self.list = rep;
            })
        }
    },
    ready: function () {
        this.render();
    }
});