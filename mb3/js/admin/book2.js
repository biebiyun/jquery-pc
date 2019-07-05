$(function() {
	if($.cookie("ydfjm") == null || $.cookie("ydfjm") == "" || $.cookie("ydfxm") == null || $.cookie("ydfxm") == "") {
		window.location.href = "book1.html";
	}
	$('.order_message ul li').eq(0).find('span').eq(1).html($.cookie("intimeWeek") + ' , ' + timeConvert2($.cookie("intime")) + '<i></i>' + $.cookie("outtimeWeek") + ' , ' + timeConvert2($.cookie("outtime")));
	$('.order_message ul li').eq(0).find('span').eq(2).html($.cookie("adult") + jstag("xmlmallb12") + ' , ' + $.cookie("child") + jstag("xmlmallb13") + "&nbsp; " + jstag("xmlmallb14"))
	$('.order_message ul li').eq(2).find('span').eq(0).html($.cookie("oneprice") + 'RMB');
	dayPriceData();
	payWay();
	roomSearch();
 var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	json["hotel"]=$.cookie("hotelId");
	json["ff"]="roomRateCodePayment";
	var data={};
	data["fjm"]=$.cookie("ydfjm");
	data["lang"] = language;
	if($.cookie("vipname")!=null&&$.cookie("vipname")!=""){
		data["isVip"]="1";
		data["vipLevel"]=$.cookie("viplev");
 	}else{ 
 		data["isVip"]="0";
 		data["vipLevel"]="";
 	} 
	json["data"]=data;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"), 
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json)},
		success: function (date) {
		    var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
			var item=d.data;
			if(d.success==true){
               if(d.zffs.zfb==1){
               	$(".room_pay input[data-id='zfb']").parent().show();
               }else{
               	$(".room_pay input[data-id='zfb']").parent().hide();
               }
               if(d.zffs.wx==1){
               	$(".room_pay input[data-id='wx']").parent().show();
               }else{
               	$(".room_pay input[data-id='wx']").parent().hide();
               }
               if(d.zffs.yl==1){
               	$(".room_pay input[data-id='yl']").parent().show();
               }else{
               	$(".room_pay input[data-id='yl']").parent().hide();
               }
                if(d.zffs.dd==1){
               	$(".room_pay input[data-id='dd']").parent().show();
               }else{
               	$(".room_pay input[data-id='dd']").parent().hide();
               }
               if(d.zffs.yl==0&&d.zffs.wx==0&&d.zffs.zfb==0){
               	$(".payLine").hide();
               }
			} 
		}
	}) 
	$(".room_pay li .tip").hide();
	var bookInday = $.cookie("intime");
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month < 10) {
		month = "0" + month;
	}
	var hour = date.getHours();
	var strDate = date.getDate();
	if(strDate < 10) {
		strDate = "0" + strDate;
	}
	var today = year + "-" + month + "-" + strDate;
	$(".bocsec .input").val("00")
	$(".bocsec ul").append('<li><input type="button" class="hideInput_style" value="00"/></li>')
	$(".bocsec ul").append('<li><input type="button" class="hideInput_style" value="15"/></li>')
	$(".bocsec ul").append('<li><input type="button" class="hideInput_style" value="30"/></li>')
	$(".bocsec ul").append('<li><input type="button" class="hideInput_style" value="45"/></li>')
	var hourNowF
	if(bookInday == today) {
		if(10 > (hour + 1) > 0) {
			hourNowF = "0" + (hour + 1);
		} else {
			hourNowF = (hour + 1);
		}
		$(".boxhour .input").val(hourNowF);
		for(var hourNow = hour + 1; hourNow < 24; hourNow++) {
			if(10 > hourNow > 0) {
				hourNow = "0" + hourNow
			}
			$(".timechoose .hour").append('<li><input type="button" class="hideInput_style" value="' + hourNow + '"/></li>')
		}
	} else {
		$(".boxhour .input").val("18")
		for(var hourNow = 0; hourNow < 24; hourNow++) {
			if(10 > hourNow > 0) {
				hourNow = "0" + hourNow
			}
			$(".timechoose .hour").append('<li><input type="button" class="hideInput_style" value="' + hourNow + '"/></li>')
		}
	}
	var arrdata;
	var nowhour = $(".boxhour .input").val().substring(0, 2);
	var nowsec = $(".bocsec .input").val().substring(0, 2);
	var ddin = 0;
	if($(".room_pay input[data-id='dd']").length > 0) {
		ddin = 1;
		var dataintime = $(".room_pay input[data-id='dd']").attr("data-intime").split(":");
		var dataouttime = $(".room_pay input[data-id='dd']").attr("data-outtime").split(":");
		if(parseInt(dataouttime[0]) < nowhour || nowhour < parseInt(dataintime[0])) {
			$(".room_pay input[data-id='dd']").parent().hide();
		}
		if(parseInt(dataouttime[0]) == nowhour && parseInt(dataouttime[1]) < nowsec) {
			$(".room_pay input[data-id='dd']").parent().hide();
		}
		if(parseInt(dataintime[0]) == nowhour && parseInt(dataintime[1]) > nowsec) {
			$(".room_pay input[data-id='dd']").parent().hide();
		}
	}
	$(".timechoose .input").click(function() {
		$(this).next().show();
	})
	$('.timechoose .select li input').click(function() {
		$(this).parent().parent().parent().prev().val($(this).val());
		$(this).parent().parent().parent().hide();
		nowhour = parseInt($(".boxhour .input").val().substring(0, 2));
		nowsec = parseInt($(".bocsec .input").val().substring(0, 2));
		if(ddin == 1) {
			if(parseInt(dataouttime[0]) < nowhour || nowhour < parseInt(dataintime[0])) {
				$(".room_pay input[data-id='dd']").parent().hide();
			} else if(parseInt(dataouttime[0]) == nowhour && parseInt(dataouttime[1]) < nowsec) {
				$(".room_pay input[data-id='dd']").parent().hide();
			} else if(parseInt(dataintime[0]) == nowhour && parseInt(dataintime[1]) > nowsec) {
				$(".room_pay input[data-id='dd']").parent().hide();
			} else {
				$(".room_pay input[data-id='dd']").parent().show();
			}
		}
	});
	nowhour = parseInt(nowhour);
	nowsec = parseInt(nowsec);
	arrdata = nowhour + ":" + nowsec;

	$('.btn_order .order_next input').click(function() {
		if($.cookie("ydfjm") == null || $.cookie("ydfjm") == "" || $.cookie("ydfxm") == null || $.cookie("ydfxm") == "") {
			window.location.href = "book1.html";
		} else { 
			$(this).removeAttr('onclick');
			if($(".xing").val() == "") {
				alertstyle(jstag("xmlscript3"));
			} else if($(".xing").toPinyin().length > 10) {
				alertstyle(jstag("xmlscript23"));
			} else if($(".xing").val().match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
				alertstyle(jstag("xmlscript26"));
			} else if($(".ming").val() == "") {
				alertstyle(jstag("xmlscript4"));
			} else if($(".ming").toPinyin().length > 25) {
				alertstyle(jstag("xmlscript27"));
			} else if($(".ming").val().match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
				alertstyle(jstag("xmlscript28"));
			} else if(!$("#phone1").val().match(/^1(3|4|5|7|8)\d{9}$/)) {
				alertstyle(jstag("xmlscript6"));
			} else if($(".email").val() == "") {
				alertstyle(jstag("xmlscript29"));
			} else if($(".email").val().length > 30) {
				alertstyle(jstag("xmlscript30"));
			} else if(!$(".email").val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
				alertstyle(jstag("xmlscript31"));
			} else if(/^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\[\]]+.*)$/.test($("#Remarks").val().replace(/\s/gi, ''))) {
				alertstyle(jstag("xmlscript32"));
			} else if($("#Remarks").val().length > 100) {
				alertstyle(jstag("xmlscript59"));
			} else if($("input[name='pay']:checked").length <= 0) {
				alertstyle(jstag("xmlmallb8"));
			} else if($(".room_pay li").eq(2).find("input[name='pay']:checked").length > 0 && $("input[name='line_pay']:checked").length <= 0) {
				alertstyle(jstag("xmlmallb8"));
			} else {
				var m = "{\"xing\":\"" + $(".xing").val() + "\",\"ming\":\"" + $(".ming").val() + "\",\"email\":\"" + $(".email").val() + "\",\"phone\":\"" + $("#phone1").val() + "\",\"xb\":\"" + $(".write_message ol li").eq(1).find('.input').val() + "\",\"bz\":\"" + $.trim($(".write_message textarea").val().replace(/"/g, "&quot;").replace(/'/g, "&acute;").replace(/\n/g, "<br />").replace(/\\/g, "\\\\")) + "\"}";
				$.cookie("ydrxx", m, {
					path: '/'
				});
				var ydrxx = JSON.parse($.cookie("ydrxx"));
				var jsondatatyle;
				if(IE()) {
					jsondatatyle = "jsonp";
				} else {
					jsondatatyle = "text";
				}
				var json = {};
				json["hotel"] = $.cookie("hotelId");
				json["ff"] = "yddd";
				var tyle = {};
				tyle["tsyq"] = ydrxx.bz;
				tyle["kh"] = $.cookie("vipkh") || "";
				tyle["dr"] = $.cookie("adult");
				tyle["xh"] = $.cookie("child");
				tyle["zffs"] = $(".room_pay li .payWay:checked").attr("data-id");
				tyle["fjm"] = $.cookie("ydfjm");
				tyle["fxm"] = $.cookie("ydfxm");
				tyle["xing"] = ydrxx.xing;
				tyle["ming"] = ydrxx.ming;
				if(ydrxx.xb == jstag("xmlvip10")) {
					tyle["xb"] = "0";
				} else {
					tyle["xb"] = "1";
				}
				tyle["tel"] = ydrxx.phone;
				tyle["intime"] = $.cookie("intime");
				tyle["outtime"] = $.cookie("outtime");
				tyle["ydjs"] = $.cookie("ydnub");
				tyle["zj"] = $.cookie("ydzj");
				tyle["email"] = ydrxx.email;
				tyle["nexturl"] = "book3.html";
				tyle["bjxx"] = $.cookie("bak");
				tyle["lang"] = language;
				tyle["rate"] = $.cookie("oneprice");
				tyle["ddsj"] = arrdata;
				json["data"] = tyle;
				$.ajax({
					type: "POST",
					url: $('body').attr("data-url"),
					beforeSend: function() {
						$('#loading,#shadow1').show();
					},
					complete: function() {
						$('#loading,#shadow1').hide();
					},
					dataType: jsondatatyle,
					data: {
						json: JSON.stringify(json)
					},
					success: function(date) {
						var d;
						if(IE()) {
							d = JSON.parse(date.message);
						} else {
							d = JSON.parse(date);
						}
						if(d.id == "1") {
							$.cookie("ydrxx", "", {
								path: '/'
							});
							$.cookie("ydfjm", "", {
								path: '/'
							});
							$.cookie("ydfxm", "", {
								path: '/'
							});
							$.cookie("intime", "", {
								path: '/'
							});
							$.cookie("outtime", "", {
								path: '/'
							});
							$.cookie("ydnub", "", {
								path: '/'
							});
							$.cookie("ydzj", "", {
								path: '/'
							});
							if(json.data.zffs == "dd") {
								//					        	console.log(d.url);
								window.location.href = d.url;
							}
							if(json.data.zffs == "zfb") {
								document.write(d.url);
							}
							if(json.data.zffs == "wx") {
								window.location.href = d.url + "?ddh=" + d.ddh + "&hotelid=" + parseInt($.cookie("hotelId")) + "&hyym=book3.html";
								if(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1) location = d.url + "?ddh=" + d.ddh + "&hotelid=" + parseInt($.cookie("hotelId")) + "&hyym=book3.html";
							}
							if(json.data.zffs == "yl") {
								document.write(d.url);
							}
						} else {
							alertstyle(d.msg, "book3.html");
							//					        window.location.href = "book3.html";
							if(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1) location = 'book3.html';
						}
					}
				})

			}
		}
	})
})
//每日房价数据
var dayPriceData = function() {
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json2 = {};
	json2["hotel"] = $.cookie("hotelId");
	json2["ff"] = "mrfj2";
	var tyle = {};
	tyle["fjm"] = $.cookie("ydfjm");
	tyle["fxm"] = $.cookie("ydfxm");
	tyle["kssj"] = $.cookie("intime");
	tyle["jssj"] = $.cookie("outtime");
	json2["data"] = tyle;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		async: false,
		dataType: jsondatatyle,
		data: {
			json: JSON.stringify(json2)
		},
		success: function(date) {
			var d;
			if(IE()) {
				d = JSON.parse(date.message);
			} else {
				d = JSON.parse(date);
			}
			if(d.id == 1) {
				var items = d.data;
				var m = "";
				var zjs = 0;
				for(var i = 0; i < items.length; i++) {
					zjs += parseInt(items[i].zj) * parseInt($.cookie("ydnub"));
					console.log(zjs)
				}
				$.cookie("ydzj", zjs, {
					path: '/'
				});
			}
		}
	})
}
// 支付方式
var payWay = function() {
	if(!$('.room_pay li input').eq(1).is(':checked')) {
		$('.room_pay li .line_pay input').attr("disabled", "true");
	}
	$('.room_pay li input').eq(1).click(function() {
		$('.room_pay li .line_pay input').removeAttr("disabled");
		$('.room_pay li .line_pay #zfb').attr("checked", "checked");
	})
	$('.room_pay li input').eq(0).click(function() {
		$('.room_pay li .line_pay input').attr("disabled", "true");
		$('.room_pay li .line_pay input').removeAttr("checked");
	})
}
//客房名查询
var roomSearch = function() {
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json = {};
	json["hotel"] = $.cookie("hotelId");
	json["ff"] = "getroombyid";
	var data = {};
	data["id"] = $.cookie("roomID");
	data["lang"] = language;
	json["data"] = data;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		async: false,
		dataType: jsondatatyle,
		data: {
			json: JSON.stringify(json)
		},
		success: function(date) {
			var d;
			if(IE()) {
				d = JSON.parse(date.message);
			} else {
				d = JSON.parse(date);
			}
			if(d.id == 1) {
				$('.order_message ul li').eq(1).find('span').eq(0).html(d.data.name + '&nbsp;&nbsp;' + $.cookie("ydnub") + jstag("xmltext102"))
				$('.order_message ul li').eq(1).find('span').eq(1).html(d.data.cx);
			} else {
				alertstyle(d.msg);
			}
		}
	})
}