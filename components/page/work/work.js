/**
 * Created by Administrator on 2016/7/4.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.extend({
    template:__inline("work.html"),
    data: function () {
        return {
            name:""
        }
    },
    route: {
        data: function () {
            this.name = this.$route.params.name;
        }
    }
});