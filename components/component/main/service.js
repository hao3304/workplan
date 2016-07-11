/**
 * Created by jack on 16/6/14.
 */


/**
 * Created by jack on 16/6/14.
 */
var prefix = "";
var prefix = "http://192.168.100.167:8086";

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.split("?")[1].match(reg);
    if (r!=null) return (r[2]); return null;
}

function co(callback){
    return function (rep) {
        if(rep.Code == 0){
            return callback.call(this,rep.Response);
        }else{
            alert(rep.Message);
        }
    }
}

/**
 * 获取组织架构
 * @param p {Token:string,EndType:DP}
 * @param c
 */
function getStructure(p,c){
    $.post(prefix +"/hd/dep/structure.json",p,co(c),"json");
}

/**
 * 月度计划查询接口
 *
 * @param p
 *   Token: string - 授权码 - 必填参数
     Dep: string - 部门编号 - 必填参数
     Month: string - 月份 2016-07 - 必填参数
 * @param c
 */
function getPlan(p,c){
    $.post(prefix +"/hd/plan/list.json",p,co(c),"json");
}


/**
 * 月度指标查询接口
 *
 * @param p
 *   Token: string - 授权码 - 必填参数
 Dep: string - 部门编号 - 必填参数
 Month: string - 月份 2016-07 - 必填参数
 * @param c
 */
function getTarget(p,c){
    $.post(prefix +"/hd/target/list.json", p,co(c),"json");
}

/**
 * 月度计划完成情况查询接口
 *
 * @param p
 *   Token: string - 授权码 - 必填参数
 Dep: string - 部门编号 - 必填参数
 Month: string - 月份 2016-07 - 必填参数
 * @param c
 */
function getResult(p,c){
    $.post(prefix +"/hd/plan/result.json", p,co(c),"json");
}

module.exports = {
    GetQueryString:GetQueryString,
    getStructure:getStructure,
    getPlan:getPlan,
    getTarget:getTarget,
    getResult:getResult,
    path:prefix
};

