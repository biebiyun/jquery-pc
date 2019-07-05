var language=$.cookie("lang");  
//获取星期几
   var getWeek=function(time){
	    var week=time;  
	   	var timeArr=time.split("-");
	   	if(timeArr[1].length<2){
	   		timeArr[1]="0"+timeArr[1]
	   	}
	   	if(timeArr[2].length<2){
	   		timeArr[2]="0"+timeArr[2]
	   	} 
		var inday = new Date(timeArr[0],parseInt(timeArr[1]-1),timeArr[2]);  
		 
		var today;
		if($.cookie("lang")=="1"){
			today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
		}else{
			today = new Array('Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.');
		} 
			var timeWeek = today[inday.getDay()];    
			return timeWeek;  
  	} 
$(function(){
	if($.cookie("intime")==null||$.cookie("intime")==""){
		$.cookie("intime", GetDateStr(0), { path: '/' });
		$.cookie("outtime", GetDateStr(1), { path: '/' }); 
	}else{
		$.cookie("intimeWeek",getWeek($.cookie("intime")), { path: '/' });
		$.cookie("outtimeWeek", getWeek($.cookie("outtime")), { path: '/' });
	} 
	$('#time1').val(GetDateStr(0));
	$('#time2').val(GetDateStr(1)); 
	img(); 
	$('.langChoose ul li').on('click',function(){ 
		var language1=$(this).attr('data-id');
		$.cookie("lang", language1, { path: '/' }); 
		window.location.reload();
	})
	$('.head_choose ul li').on('click',function(){ 
		$(this).parent().parent().hide();
		var language2=$(this).attr('data-id');
		$.cookie("lang", language2, { path: '/' }); 
		window.location.reload();
	})
	   /*语言内容显示*/
	var lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language);
	lang = lang.substr(0, 2);
	if ($.cookie("lang") == null || $.cookie("lang") == "") {
	    if ($(".langChoose ul li[data-title=" + lang + "]").length > 0) {
	    	$("#langShow").text($(".langChoose ul li[data-title=" + lang + "]").text());
	        $("#index_roomnum").text($(".langChoose ul li[data-title=" + lang + "]").text());
	        $.cookie("lang", $(".langChoose ul li[data-title=" + lang + "]").attr("data-id"), { path: '/' });
	    } else {
	    	$("#langShow").text($(".langChoose ul li").eq(0).text());
	        $("#index_roomnum").text($(".langChoose ul li").eq(0).text())
	        $.cookie("lang", $(".langChoose ul li").eq(0).attr("data-id"), { path: '/' });
	    }
	} else {
		$("#langShow").text($(".langChoose ul li[data-id=" + $.cookie("lang") + "]").text());
	    $("#index_roomnum").text($(".langChoose ul li[data-id=" + $.cookie("lang") + "]").text()); 
	}
	langpath = './lang/' + $(".langChoose ul li[data-id=" + $.cookie("lang") + "]").attr("data-title") + '.xml';
  	TranslateElementsAsy(document, 'a', 'innerHTML', langpath);
	TranslateElementsAsy(document, 'input', 'value', langpath);
	TranslateElementsAsy(document, 'label', 'innerHTML', langpath);
	TranslateElementsAsy(document, 'li', 'innerHTML', langpath);
	TranslateElementsAsy(document, 'p', 'innerHTML', langpath);
	TranslateElementsAsy(document, 'span', 'innerHTML', langpath);
	TranslateElementsAsy(document, 'div', 'innerHTML', langpath);
})
//语言内容显示
function TranslateElementsAsy(targetDocument, tag, propertyToSet, path) { //方法一  
    $.ajax({
        url: path,
        type: 'get',
        async: false,
        success: function (data) {
            var e = targetDocument.getElementsByTagName(tag);
            for (var i = 0 ; i < e.length ; i++) {
                var sKey
                sKey = e[i].getAttribute('data-name');
                if (sKey) {
                    var s = getString(path, sKey, data);
                    if (s) {
                        eval('e[i].' + propertyToSet + ' = s');
                    }
                }
            }
        }
    });
} 
//弹出框方法
function jstag(id) {
    var s;
    $.ajax({
        url: langpath,
        type: 'get',
        async: false,
        success: function (data) {
            s = getString(langpath, id, data);
        }
    });
    return s;
}
function getString(path, req_name, xmlDoc) {
    //解析XML  
    //var oError = xmlDoc.parseError;  
    var nodeName = xmlDoc.getElementsByTagName(req_name);
    if (nodeName[0] == null || nodeName[0] == "undefined") {
        return null;
    } else {
        return nodeName[0].childNodes[0].nodeValue;
    }
}
//内容省略
function ellipsis(text,leng) {
    var text = removeHTMLTag(text);
    if (text.length > leng) text = text.substring(0, leng - 3) + "..";
    return text;
}
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行 
    return str;
}
//获取url参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
//日期
function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	return y+"-"+m+"-"+d; 
} 
//图片裁切
function img() {
    var img = $('.adaimg');
    img.load(function () {
        for (var ti = 0; ti < img.length; ti++) {
            var imgh = "auto";
            var imgw = "auto";
            if (img.eq(ti).width() * img.eq(ti).parent().height() / img.eq(ti).parent().width() < img.eq(ti).height()) {
                img.eq(ti).width(img.eq(ti).parent().width());
                imgw = img.eq(ti).parent().width() + "px";
            } else {
                img.eq(ti).height(img.eq(ti).parent().height());
                imgh = img.eq(ti).parent().height() + "px";
            }
            var ml = (img.eq(ti).parent().width() - img.eq(ti).width()) / 2;
            var mt = (img.eq(ti).parent().height() - img.eq(ti).height()) / 2;
            img.eq(ti).attr("style", "margin-left:" + ml + "px;margin-top:" + mt + "px;height:" + imgh + ";width:" + imgw + ";");
        }
    });
    for (var ti = 0; ti < img.length; ti++) {
            var imgh = "auto";
            var imgw = "auto";
            if (img.eq(ti).width() * img.eq(ti).parent().height() / img.eq(ti).parent().width() < img.eq(ti).height()) {
                img.eq(ti).width(img.eq(ti).parent().width());
                imgw = img.eq(ti).parent().width() + "px";
            } else {
                img.eq(ti).height(img.eq(ti).parent().height());
                imgh = img.eq(ti).parent().height() + "px";
            }
            var ml = (img.eq(ti).parent().width() - img.eq(ti).width()) / 2;
            var mt = (img.eq(ti).parent().height() - img.eq(ti).height()) / 2;
            img.eq(ti).attr("style", "margin-left:" + ml + "px;margin-top:" + mt + "px;height:" + imgh + ";width:" + imgw + ";");
        }
}
function IE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    }
    else {
        return false;
    }
}
function IEVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }
    return rv;
}
//my97时间选择关联
function gettime2(date, id) {
    var date = new Date(Date.parse(date.replace(/-/g, "/")));
    date.setDate(date.getDate() + 1);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    $(id).val(date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day));
}
// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}  
//分页
function paging(pagjson, index) {
    l = pagjson.length;
    $(index).empty();
    if (l > pagenub) {
        $(index).show();
        $(index).append('<div class="pag_jump"><input type="text" class="text_input" /><a>GO</a></div><div class="pag_item"><span class="prv">&lt;</span><span class="first">1</span><span class="leftmore">...</span><ul class="clearfix"></ul><span class="rightmore">...</span><span class="last"></span><span class="next">&gt;</span></div>');
        for (var n = 1; n <= Math.ceil(l / pagenub) ; n++) {
            if (n > showpagenub) {
                var n = Math.ceil(l / pagenub);
                $(index).find(".last,.rightmore").show();
                $(index).find(".last").text(n);
                break;
            } else {
                $(index).find("ul").append('<a class="pagenav">' + n + '</a>');
                $(index).find(".last,.rightmore").hide();
            }
        }
    } else {
        $(index).hide();
    }
    $(index).find(".first,.leftmore").hide();
    $(index).find("ul").find("a").first().addClass('current');
    $(index).find("span").first().removeClass("prv").addClass("normal");
    if (l != "0") { pageitem(1); }

    /*选择页码显示内容*/
    $(index).find(".pag_item").find("a").click(function () {
        var nu = parseInt($(this).text());
        pageitem(nu);
        $(this).addClass("current").siblings().removeClass("current");
        noprvnextpage(nu, index);
        pagemore(nu, index);
        img();
        var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })
    /*上一页*/
    $(index).on("click", ".prv", function () {
        $(this).parent().find("ul").find('.current').prev().addClass("current").siblings().removeClass("current");
        pageitem($(this).parent().find("ul").find('.current').text());
        noprvnextpage($(this).parent().find("ul").find('.current').text(), index);
        pagemore(parseInt($(this).parent().find("ul").find('.current').text()), index);
    	img();
    	var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })
    /*下一页*/
    $(index).on("click", ".next", function () {
        $(this).parent().find("ul").find(".current").next().addClass("current").siblings().removeClass("current");
        pageitem($(this).parent().find("ul").find(".current").text());
        noprvnextpage($(this).parent().find("ul").find(".current").text(), index);
        pagemore(parseInt($(this).parent().find("ul").find(".current").text()), index);
        img();
        var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })
    /*首页*/
    $(index).on("click", ".first", function () {
        pageitem(1);
        noprvnextpage(1, index);
        pagemore(1, index);
        $(this).parent().find("ul").find('.pagenav').first().addClass("current").siblings().removeClass("current");
   		img();
   		var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })
    /*尾页*/
    $(index).on("click", ".last", function () {
        pageitem(Math.ceil(l / pagenub));
        noprvnextpage(Math.ceil(l / pagenub), index);
        pagemore(Math.ceil(l / pagenub), index);
        $(this).parent().find("ul").find(".pagenav").last().addClass("current").siblings().removeClass("current");
    	img();
    	var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })

    /*页面跳转*/
    $(index).find(".pag_jump").find("a").click(function () {
        var tpage = parseInt($(this).prev().val());
        if ($(this).prev().val() == null || $(this).prev().val() == "") {
            alertstyle(jstag("xmlscript12"));
        } else if (tpage > Math.ceil(l / pagenub) || tpage <= 0 || !$(".pag .pag_jump .text_input").val().match(/^\+?[1-9][0-9]*$/)) {
            alertstyle(jstag("xmlscript13"));
        } else {
            pageitem(tpage);
            noprvnextpage(tpage, index);
            pagemore(tpage, index);
        }
        img();
        var shadeHeight=$('.favorable_content').height();
		$('.shadeDiv').height(shadeHeight);
    })
}

/*隐藏上下页按钮*/
function noprvnextpage(e, index) {
    if (e == "1") {
        $(index).find("span").first().removeClass("prv").addClass("normal");
        $(index).find("span").last().removeClass("normal").addClass("next");
    } else if (e == Math.ceil(l / pagenub)) {
        $(index).find("span").last().removeClass("next").addClass("normal");
        $(index).find("span").first().removeClass("normal").addClass("prv");
    } else {
        $(index).find("span").last().removeClass("normal").addClass("next");
        $(index).find("span").first().removeClass("normal").addClass("prv");
    }
}

/*更多页码*/
function pagemore(e, index) {
    if (Math.ceil(l / pagenub) > showpagenub) {
        var znub = Math.ceil(showpagenub / 2);
        if (e > znub && e < Math.ceil(l / pagenub) - znub + 1) {
            for (var n1 = 0; n1 < showpagenub; n1++) {
                $(index).find("ul").find("a.pagenav").eq(n1).text(e - znub + 1 + n1);
            }
            $(index).find("ul").find("a.pagenav").eq(znub - 1).addClass("current").siblings().removeClass("current");
            $(index).find(".first,.leftmore").show();
            $(index).find(".last,.rightmore").show();
        }
        if (e <= znub) {
            for (var n1 = 0; n1 < showpagenub; n1++) {
                $(index).find("ul").find("a.pagenav").eq(n1).text(n1 + 1);
            }
            $(index).find("ul").find("a.pagenav").eq(e - 1).addClass("current").siblings().removeClass("current");
            $(index).find(".first,.leftmore").hide();
            $(index).find(".last,.rightmore").show();
        }

        if (e >= Math.ceil(l / pagenub) - znub + 1) {
            for (var n1 = 0; n1 < showpagenub; n1++) {
                $(index).find("ul").find("a.pagenav").eq(n1).text(Math.ceil(l / pagenub) - showpagenub + 1 + n1);
            }
            $(index).find("ul").find("a.pagenav").eq(showpagenub - Math.ceil(l / pagenub) + e - 1).addClass("current").siblings().removeClass("current");
            $(index).find(".first,.leftmore").show();
            $(index).find(".last,.rightmore").hide();
        }
    } else {
        $(index).find("ul").find("a.pagenav").eq(e - 1).addClass("current").siblings().removeClass("current");
    }
}
//弹出提示框样式
	function alertstyle(text, url) {
	    var txt = text;
	    var option = {
	        title: jstag("xmlbook104"),
	        onOk: function () {
	            if (url != null && url != "" && url != "undefined") {
	                window.location.href = url;
	            }
	        }
	    }
	    window.wxc.xcConfirm(txt, "custom", option);
	}