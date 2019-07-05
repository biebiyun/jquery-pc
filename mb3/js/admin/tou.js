$(function() {
	shopAddr();
	leavelLogin();
	roomBooked();
	shopSwitch();
	shoporderClick();
	$(".head ul li .shopcart").click(function() {
		if($.cookie("vipkh") == "" || $.cookie("vipkh") == null) {
			alertstyle(jstag("xmlscript42"))
		} else {
			window.location.href = "shoppingcart.html"
		}
	})
	$('.tel .hotelTel').text($.cookie("hotelTel"));
	var dateRange = new pickerDateRange('', {
		isTodayValid: true,
		defaultText: ' 至 ',
		inputTrigger: 'input_trigger_demo3',
		theme: 'ta',
	});
	$('.choose_room .itime').click(function() {
		$('#rl').show();
	})
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	//	注册验证码
	var zcInterValObj; //timer变量，控制时间
	var zccount = 60; //间隔函数，1秒执行
	var zccurCount; //当前剩余秒数
	var zccode = ""; //验证码
	var zccodeLength = 6; //验证码长度

	$('#sign_yzm').click(function() {
		zccurCount = zccount;
		//产生验证码
		if($('#phoneReg').val() != jstag("xmlbook16") &&  $.trim($('#phoneReg').val()).match(/^1(3|4|5|7|8)\d{9}$/)) {
			for(var i = 0; i < zccodeLength; i++) {
				zccode += parseInt(Math.random() * 9).toString();
			}
			//设置button效果，开始计时
			$('#phoneReg').attr("disabled", "true");
			$(this).attr("disabled", "true");
			$(this).val(zccurCount + jstag("xmltext174"));
			zcInterValObj = window.setInterval(function() {
				if(zccurCount == 0) {
					window.clearInterval(zcInterValObj); //停止计时器
					$('#phoneReg').removeAttr("disabled"); //启用按钮 
					$('#sign_yzm').removeAttr("disabled");
					$('#sign_yzm').val(jstag("xmltext100"));
					zccode = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
				} else {
					zccurCount--;
					$('#sign_yzm').val(zccurCount + jstag("xmltext174"));
				}
			}, 1000); //启动计时器，1秒执行一次 
			testCode($('#phoneReg').val(), zccode);
		} else {
			alertstyle(jstag("xmlscript6"));
		}
	})
	//	点击立即注册
	$('.login').on('click', '.enter_left1 p a input', function() {
		$('#lastName').val("");
		$('#lastName').hide();
		$('#lastName1').show();
		$('#lastName1').val(jstag("xmlbook42"));
		$('#firstName').val("");
		$('#firstName').hide();
		$('#firstName1').show();
		$('#firstName1').val(jstag("xmlbook43"));
		$('#phoneReg').val("");
		$('#phoneReg').hide();
		$('#phoneReg1').show();
		$('#phoneReg1').val(jstag("xmlbook16"));
		$('#emailReg').val("");
		$('#emailReg').hide();
		$('#emailReg1').show();
		$('#emailReg1').val(jstag("xmltext151"));
		$('#pwd').val("");
		$('#pwd').hide();
		$('#showPwd').show();
		$('#showPwd').val(jstag("xmlvip51"));
		$('#regCode').val("");
		$('#regCode').hide();
		$('#regCode1').show();
		$('#regCode1').val(jstag("xmlvip34"));
		window.clearInterval(zcInterValObj); //停止计时器
		$('#phoneReg').removeAttr("disabled"); //启用按钮 
		$('#sign_yzm').removeAttr("disabled");
		$('#sign_yzm').val(jstag("xmltext161"));
		zccode = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
		$('.register').show();
		$('.login').hide();
	})
	var wjInterValObj; //timer变量，控制时间
	var wjcount = 60; //间隔函数，1秒执行
	var wjcurCount; //当前剩余秒数
	var wjcode = ""; //验证码
	var wjcodeLength = 6; //验证码长度
	//忘记密码验证码
	$('#forget_yzm').click(function() {
		wjcurCount = wjcount;
		//产生验证码
		if($('#phoneFog').val() != jstag("xmlbook16") && $.trim($('#phoneFog').val()).match(/^1(3|4|5|7|8)\d{9}$/)) {
			for(var i = 0; i < wjcodeLength; i++) {
				wjcode += parseInt(Math.random() * 9).toString();
			}
			//设置button效果，开始计时
			$('#phoneFog').attr("disabled", "true");
			$(this).attr("disabled", "true");
			$(this).val(wjcurCount + jstag("xmltext174"));
			wjInterValObj = window.setInterval(function() {
				if(wjcurCount == 0) {
					window.clearInterval(wjInterValObj); //停止计时器
					$('#phoneFog').removeAttr("disabled"); //启用按钮 
					$('#forget_yzm').removeAttr("disabled");
					$('#forget_yzm').val(jstag("xmltext100"));
					wjcode = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
				} else {
					wjcurCount--;
					$('#forget_yzm').val(wjcurCount + jstag("xmltext174"));
				}
			}, 1000); //启动计时器，1秒执行一次 
			testCode($('#phoneFog').val(), wjcode);
		} else {
			alertstyle(jstag("xmlscript6"));
		}
	})
	//	点击忘记密码
	$('.login').on('click', '.enter_right .forget_password input', function() {
		$('.login').hide();
		$('.forgetPW').show();
		$('#phoneFog').val("");
		$('#phoneFog').hide();
		$('#phoneFog1').show();
		$('#phoneFog1').val(jstag("xmlscript1"));
		$('#nameFog').val("");
		$('#nameFog').hide();
		$('#nameFog1').show();
		$('#nameFog1').val(jstag("xmlscript53"));
		$('#codeFog').val("");
		$('#codeFog').hide();
		$('#codeFog1').show();
		$('#codeFog1').val(jstag("xmlvip34"));
		window.clearInterval(wjInterValObj); //停止计时器
		//		$('#phoneFog1').removeAttr("disabled"); //启用按钮 
		$('#phoneFog').removeAttr("disabled"); //启用按钮 
		$('#forget_yzm').removeAttr("disabled");
		$('#forget_yzm').val(jstag("xmltext161"));
		wjcode = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效   
	})
	//注册 
	$('.register').on('click', '.btn_reg input', function() {
		if($('#lastName').val() == "") {
			alertstyle(jstag("xmlscript3"));
		} else if($('#lastName').val().length > 10) {
			alertstyle(jstag("xmlscript23"));
		} else if($('#lastName').val().match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
			alertstyle(jstag("xmlscript26"));
		} else if($('#firstName').val() == "") {
			alertstyle(jstag("xmlscript4"));
		} else if($('#firstName').val().length > 25) {
			alertstyle(jstag("xmlscript27"));
		} else if($('#firstName').val().match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
			alertstyle(jstag("xmlscript28"));
		} else if($('#phoneReg').val() == "" || !$.trim($('#phoneReg').val()).match(/^1(3|4|5|7|8)\d{9}$/)) {
			alertstyle(jstag("xmlscript6"));
		} else if($('#emailReg').val() == "") {
			alertstyle(jstag("xmlscript29"));
		} else if(!$.trim($('#emailReg').val()).match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
			alertstyle(jstag("xmlscript31"));
		} else if($('#emailReg').val().length > 30) {
			alertstyle(jstag("xmlscript30"));
		} else if($('#pwd').val() == "") {
			alertstyle(jstag("xmlscript46"));
		} else if($('#pwd').val().match(/[^\a-\z\A-\Z\0-\9\ ]/g)) {
			alertstyle(jstag("xmlscript49"));
		} else if($('#pwd').val().length < 6 || $('#pwd').val().length > 20) {
			alertstyle(jstag("xmlscript50"));
		} else if(zccode == "" || zccode != $('#regCode').val() || zccode == null) {
			alertstyle(jstag("xmlscript18"));
		} else {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "vipzc";
			var tyle = {};
			var xbVal;
			if($('.choose_box #xb').text() == jstag("xmlvip10")) {
				xbVal = '0';
			} else {
				xbVal = '1';
			}
			tyle["xb"] = xbVal;
			tyle["lang"] = language;
			tyle["xing"] = $('#lastName').val();
			tyle["ming"] = $('#firstName').val();
			tyle["email"] = $('#emailReg').val();
			tyle["phone"] = $('#phoneReg').val();
			tyle["mm"] = $('#pwd').val();
			json["data"] = tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
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
						$.cookie("vipkh", d.kh, {
							path: '/'
						}); 
						var vipname = $('#lastName').val() + $('#firstName').val();
						$.cookie("vipname", vipname, {
							path: '/'
						});
						$.cookie("vipphone", $('#phoneReg').val(), {
							path: '/'
						}); 
						$('.register').hide(); 
						vipxx(d.kh);
						alertstyle(jstag("xmlscript43")); 
					} else {
						alertstyle(d.msg);
					}
				}
			});
		}
	})
	//	会员登录
	$('#btn_login').click(function() {
		if($.trim($('#phoneLog').val()) == "" || !$.trim($('#phoneLog').val()).match(/^1(3|4|5|7|8)\d{9}$/)) {
			alertstyle(jstag("xmlscript6"));
		} else if($('#pwd1').val() == '') {
			alertstyle(jstag("xmlscript46"));
		} else {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "vipdl";
			json["lx"] = "hy";
			var tyle = {};
			tyle["lang"] = language;
			tyle["id"] = $('#phoneLog').val();
			tyle["mm"] = $('#pwd1').val();
			json["data"] = tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
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
						$.cookie("vipkh", d.kh, {
							path: '/'
						});
						$.cookie("vipphone", $('#phoneLog').val(), {
							path: '/'
						});
						$.cookie("vipname", d.name, {
							path: '/'
						});
						$.cookie("viplev", d.kdj, {
							path: '/'
						});
						$('.login').hide();
						if($.cookie("ifbuy") == 1) {
							$.cookie("ifbuy", "5", {
								path: '/'
							});
							setTimeout('$(".btn_mall .cart input").trigger("click")', 50);
						} else if($.cookie("ifbuy") == 2) {
							$.cookie("ifbuy", "5", {
								path: '/'
							});
							$(".btn_mall .buy input").trigger("click");
						} else {
							vipxx(d.kh);
							alertstyle(jstag("xmlscript33"));
						}
					} else {
						alertstyle(d.msg);
					}
				}
			})
		}
	})

	//	忘记密码
	$('#forgetPW').click(function() {
		if($('#phoneFog').val() == "" || !$('#phoneFog').val().match(/^1(3|4|5|7|8)\d{9}$/)) {
			alertstyle(jstag("xmlscript6"));
		} else if($('#nameFog').val() == "") {
			alertstyle(jstag("xmlscript53"));
		} else if(wjcode == "" || wjcode != $('#codeFog').val() || wjcode == null) {
			alertstyle(jstag("xmlscript18"));
		} else {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "wjmm";
			var tyle = {};
			tyle["phone"] = $('#phoneFog').val();
			tyle["xm"] = $('#nameFog').val();
			tyle["lang"] = language;
			json["data"] = tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
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
						alertstyle(jstag("xmlscript54"));
						$('.forgetPW').hide();
						$('.login').show();
						$('#phoneLog').val("");
						$('#phoneLog').hide();
						$('#phoneLog1').show();
						$('#phoneLog1').val(jstag("xmlbook16"));
						$('#pwd1').val("");
						$('#pwd1').hide();
						$('#showPwd1').show();
						$('#showPwd1').val(jstag("xmlvip51"));
					} else {
						alertstyle(d.msg);
					}
				}
			});
		}
	})
	//  修改密码
	$('.changePwd .btn_login input').click(function() {
		if($.trim($('.changePwd .enter_right input').eq(1).val()) == "" || $.trim($('.changePwd .enter_right input').eq(3).val()).indexOf(' ') != -1) {
			alertstyle(jstag("xmlscript67"));
		} else if($.trim($('.changePwd .enter_right input').eq(3).val()) == "" || $.trim($('.changePwd .enter_right input').eq(3).val()).indexOf(' ') != -1) {
			alertstyle(jstag("xmlscript68"));
		} else if($.trim($('.changePwd .enter_right input').eq(3).val()).match(/[^\a-\z\A-\Z\0-\9\ ]/g)) {
			alertstyle(jstag("xmlscript49"));
		} else if($.trim($('.changePwd .enter_right input').eq(3).val()).length < 6 || $.trim($('.changePwd .enter_right input').eq(3).val()).length > 20) {
			alertstyle(jstag("xmlscript50"));
		} else if($.trim($('.changePwd .enter_right input').eq(3).val()) == $.trim($('.changePwd .enter_right input').eq(1).val())) {
			alertstyle(jstag("xmlscript66"));
		} else if($.trim($('.changePwd .enter_right input').eq(3).val()) != $.trim($('.changePwd .enter_right input').eq(5).val())) {
			alertstyle(jstag("xmlscript58"));
		} else {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "xgmm";
			var tyle = {};
			tyle["kh"] = $.cookie("vipkh");
			tyle["mm"] = $('.changePwd .enter_right input').eq(1).val();
			tyle["xmm"] = $('.changePwd .enter_right input').eq(3).val();
			tyle["lang"] = language;
			json["data"] = tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
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
						alertstyle(jstag("xmlscript51"));
						$('.personMessage').show();
						$('.changePwd').hide();
						$('.head_right li a input').eq(0).removeClass("color1");
					} else {
						alertstyle(d.msg);
					}
				}
			});
		}
	})
	//积分记录  
	$('.person_right ul li a input').eq(1).on('click', function() {
		var d = new Date();
		var json = {};
		json["hotel"] = $('body').attr("data-id");
		json["ff"] = "hyjfcx";
		var tyle = {};
		tyle["kh"] = $.cookie("vipkh");
		tyle["kssj"] = GetDateStr(-180);
		tyle["jssj"] = GetDateStr(180);
		tyle["lang"] = language;
		json["data"] = tyle;
		var l = JSON.stringify(json);
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"),
			beforeSend: function() {
				$('#loading2,#layer_load2').show();
			},
			complete: function() {
				$('#loading2,#layer_load2').hide();
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
				if(d.id == 1) {
					if(d.xxcz) {
						$('.personMessage').hide();
						var items = d.data;
						var m = "";
						var pagjson = [];
						for(var i = items.length - 1; i >= 0; i--) {
							var ch;
							if(parseFloat(items[i].charge) > 0) {
								ch = "-" + parseFloat(items[i].charge);
							} else if(parseFloat(items[i].credit) > 0) {
								ch = "+" + parseFloat(items[i].credit);
							} else {
								ch = 0;
							}
							var tyle = {};
							tyle["title1"] = items[i].Ref;
							tyle["title2"] = ch;
							tyle["title3"] = items[i].log_date;
							pagjson.push(tyle);
						}
						$('.integralRecord .record_right p label').text($('.person_right ul li').eq(1).find('label').eq(1).text());
						$('.integralRecord .record_right .record_ul').empty();
						for(var np = 0; np < pagjson.length; np++) {
							$('.integralRecord .record_right .record_ul').append(' <li><label>' + pagjson[np].title1 + '</label><span class="tip">' + jstag("xmltext189") + '</span><span>' + pagjson[np].title3 + '</span><span>' + pagjson[np].title2 + '</span></li>');
						}
						paging1('.integralRecord .record_right .record_ul li', '#pagjf', 4);
						$('.integralRecord').show()
					} else {
						$('.personMessage').hide();
						$('.integralRecord .record_right p label').text('0');
						$('.integralRecord .record_right .record_ul').empty();
						$('.integralRecord').show();
					}
				} else {
					$('.personMessage').hide();
					$('.integralRecord .record_right p label').text('0');
					$('.integralRecord .record_right .record_ul').empty();
					$('.integralRecord').show();
					alertstyle(d.msg);
				}
			}
		})
	})
	//储值记录
	$('.person_right ul li a input').eq(0).on('click', function() {
		var json = {};
		json["hotel"] = $('body').attr("data-id");
		json["ff"] = "hyczcx";
		var tyle = {};
		tyle["kh"] = $.cookie("vipkh");
		tyle["kssj"] = GetDateStr(-540);
		tyle["jssj"] = GetDateStr(180);
		tyle["lang"] = language;
		json["data"] = tyle;
		var l = JSON.stringify(json);
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"),
			beforeSend: function() {
				$('#loading2,#layer_load2').show();
			},
			complete: function() {
				$('#loading2,#layer_load2').hide();
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
				if(d.id == 1) {
					if(d.xxcz) {
						$('.personMessage').hide()
						var m = "";
						var items = d.data.data;
						var pagjson = [];
						for(var i = items.length - 1; i >= 0; i--) {
							var ch;
							if(parseFloat(items[i].xfje) > 0) {
								ch = "-" + parseFloat(items[i].xfje);
							} else if(parseFloat(items[i].fkje) > 0) {
								ch = "+" + parseFloat(items[i].fkje);
							} else {
								ch = 0;
							}
							var tyle = {};
							tyle["title1"] = items[i].xfms;
							tyle["title2"] = ch;
							tyle["title3"] = items[i].time;
							pagjson.push(tyle);
						}
						$('.storeRecord .record_right p label').text($('.person_right ul li').eq(0).find('label').eq(1).text());
						$('.storeRecord .record_right .record_ul').empty();
						for(var np = 0; np < pagjson.length; np++) {
							$('.storeRecord .record_right .record_ul').append('<li><label>' + pagjson[np].title1 + '</label><span class="tip">' + jstag("xmltext189") + '</span><span>' + pagjson[np].title3 + '</span><span>' + pagjson[np].title2 + '</span></li>');
						}
						paging1('.storeRecord .record_right .record_ul li', '#pagcz', 4);
						$('.storeRecord').show();
					} else {
						$('.personMessage').hide();
						$('.storeRecord .record_right p label').text('0.00');
						$('.storeRecord .record_right .record_ul').empty();
						$('.storeRecord').show();
					}
				} else {
					$('.personMessage').hide();
					$('.storeRecord .record_right p label').text('0.00');
					$('.storeRecord .record_right .record_ul').empty();
					$('.storeRecord').show();
					alertstyle(d.msg);
				}
			}
		})
	})
	//	订单查询
	$('.searchBooking .btn_search input').click(function() {
		if($('#orName').val() == "") {
			alertstyle(jstag("xmlscript53"));
		} else if($('#orName').val().match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
			alertstyle(jstag("xmlscript37"));
		} else if(!$('#orPhone').val().match(/^1(3|4|5|7|8)\d{9}$/)) {
			alertstyle(jstag("xmlscript6"));
		} else if($('#orOrder').val() == "") {
			alertstyle(jstag("xmlscript5"));
		} else {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "ddcx";
			var tyle = {};
			tyle["ddh"] = $('.searchBooking .search_right input').eq(0).val();
			tyle["ddlx"] = "1";
			tyle["lang"] = language;
			json["data"] = tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
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
					if(d.id == 1) {
						if(d.data[0].name != $('#orName').val()) {
							alertstyle(jstag("xmlscript38"));
						} else if(d.data[0].tel != $('#orPhone').val()) {
							alertstyle(jstag("xmlscript39"));
						} else {
							$.cookie("ddhcx", d.data[0].ddh, {
								path: '/'
							});
							$('.searchBooking').hide()
							$('.searchMessage').show();
							orderMessage();
						}
					} else {
						alertstyle(jstag("xmlscript40"));
					}
				}
			})
		}
	})
	//我的预订 
	$('.myBooked').on('click', function() {
		var jsondatatyle;
		if(IE()) {
			jsondatatyle = "jsonp";
		} else {
			jsondatatyle = "text";
		}
		if($.cookie("vipkh") == null || $.cookie("vipkh") == "") {
			$('.orderAdmin').hide();
			$(this).parents('.enter_left').parent().show();
		} else {
			var tyle = {};
			tyle["ddlx"] = "2";
			tyle["kh"] = $.cookie("vipkh");
			tyle["lang"] = language;
			tyle["time1"] = GetDateStr(-185);
			tyle["time2"] = GetDateStr(180);
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "ddcx";
			json["data"] = tyle;
			var l = JSON.stringify(json);
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				beforeSend: function() {
					$('#loading2,#layer_load2').show();
				},
				complete: function() {
					$('#loading2,#layer_load2').hide();
				},
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
						var pagjson = [];
						$(".enter_content").hide();
						$(this).parents('.enter_left').parent().hide();
						var items = d.data;
						for(var i = 0; i < items.length; i++) {
							var tyle = {};
							tyle["intime"] = timeConvert2(items[i].intime);
							tyle["outtime"] = timeConvert2(items[i].outtime);
							tyle["roomName"] = items[i].fxname;
							tyle["orderNum"] = items[i].ddh;
							pagjson.push(tyle);
						}
						$('.orderAdmin .record_right .order_ul').empty();
						var jstagk36=jstag("xmlbook36");
						var jstagt77=jstag("xmltext77");
						for(var np = 0; np < pagjson.length; np++) {
							if(pagjson[np].roomName) {
								var orderList = '<li data-id="' + pagjson[np].orderNum + '"><label>' + jstagk36 + '：' + pagjson[np].intime + '-' + pagjson[np].outtime + '</label><span class="detail"><input type="button" value="' + jstagt77 + '" class="hideInput_style" /></span><span>' + ellipsis(pagjson[np].roomName, 15) + '</span><span class="hotel_name">' + ellipsis($.cookie("hotelNameAll"), 15) + '</span></li>';
								$('.orderAdmin .record_right .order_ul').append(orderList);
							}
						}
						paging1('.orderAdmin .record_right .order_ul li', '#pagOrder', 4);
						$('.orderAdmin').show();
					} else {
						alertstyle(d.msg);
						$('.orderAdmin').hide();
						$(this).parents('.enter_left').parent().show();
					}
				}
			})
		}
	})
	$('.record_right').on('click', '.order_ul li .detail input', function() {
		$.cookie("ddhcx", $(this).parent().parent().attr('data-id'), {
			path: '/'
		});
		$('.orderAdmin').hide();
		$('.searchMessage').show();
		orderMessage();
	})

	var jsons = {};
	jsons["hotel"] = $('body').attr("data-id");
	jsons["ff"] = "showChina";
	var tyles = {};
	tyles["lang"] = language;
	jsons["data"] = tyles;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		async: false,
		dataType: jsondatatyle,
		data: {
			json: JSON.stringify(jsons)
		},
		success: function(date) {
			var d;
			if(IE()) {
				d = JSON.parse(date.message);
			} else {
				d = JSON.parse(date);
			}
			cityJson = d.data;
			$.each(cityJson, function(i, val) {
				if(val.item_code.substr(2, 4) == '0000') {
					$("#province").append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
				}
			});
		}
	})
	$('#country').change(function() {
		if($("#country option:selected").attr("id") == 'foreign') {
			$("#province").attr("disabled", true);
			$("#county").attr("disabled", true);
			$("#citys").attr("disabled", true);
			$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
			$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
			$("#province option[value='0']").prop("selected", true);
			$("#citys option[value='0']").prop("selected", true);
			$("#county option[value='0']").prop("selected", true);
		} else {
			$("#province").attr("disabled", false);
			$("#county").attr("disabled", false);
			$("#citys").attr("disabled", false);
		}
	})
	//设为默认地址
	$(".addrtable").on("click", ".addrorder .default", function() {
		var json3 = {};
		json3["hotel"] = $('body').attr("data-id");
		json3["ff"] = "vipaddress_update";
		var tyle3 = {};
		tyle3["id"] = $(this).parents(".addrorder").attr("data-id");
		tyle3["lang"] = language;
		tyle3["userName"] = $(this).parents(".addrorder").find(".name").text();
		tyle3["phone"] = $(this).parents(".addrorder").find(".phone").text();
		tyle3["cardNo"] = $.cookie("vipkh");
		tyle3["address"] = $(this).parents(".addrorder").attr("data-addr");
		tyle3["Default"] = 1;
		tyle3["pro"] = $(this).parents(".addrorder").attr("data-proid");
		tyle3["city"] = $(this).parents(".addrorder").attr("data-cityid");
		tyle3["area"] = $(this).parents(".addrorder").attr("data-areaid");
		json3["data"] = tyle3;
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"),
			async: false,
			dataType: jsondatatyle,
			data: {
				json: JSON.stringify(json3)
			},
			success: function(date) {
				var d;
				if(IE()) {
					d = JSON.parse(date.message);
				} else {
					d = JSON.parse(date);
				}
				if(d.success) {
					$("#country option[id='china']").prop("selected", true);
					$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
					$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
					$("#province option[value='0']").prop("selected", true);
					$("#citys option[value='0']").prop("selected", true);
					$("#county option[value='0']").prop("selected", true);
					$("#province").attr("disabled", false);
					$("#county").attr("disabled", false);
					$("#citys").attr("disabled", false);
					$(".addrRadio:checked").removeAttr("checked");
					$("#name,#phone,.addrxq").val("");
					//							var txt = d.msg;
					//					    var option = {
					//					        title: jstag("xmlbook104"),
					//					        onOk:function(){addrList()},
					//					        onClose:function() {
					//								addrList()
					//							}
					//					    }
					//			    		window.wxc.xcConfirm(txt, "custom", option);
					alertstyle(d.msg);
					addrList();
					malladdrfind();
				} else {
					$("#country option[id='china']").prop("selected", true);
					$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
					$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
					$("#province option[value='0']").prop("selected", true);
					$("#citys option[value='0']").prop("selected", true);
					$("#county option[value='0']").prop("selected", true);
					$("#province").attr("disabled", false);
					$("#county").attr("disabled", false);
					$("#citys").attr("disabled", false);
					$(".addrRadio:checked").removeAttr("checked");
					$("#name,#phone,.addrxq").val("");
					alertstyle(d.msg);
				}
			}
		})
	})
	//添加修改
	$(".addrchoose").on("click", ".save", function() {
		var save = $(this);
		if($.trim($(".addrchoose .addrxq").val()) == "") {
			alertstyle(jstag("xmlscript61"));
		} else if($.trim($(".addrchoose .addrxq").val()).length > 50) {
			alertstyle(jstag("xmlscript69"));
		} else if($("#province option:selected").attr("value") == "0" && $("#country option:selected").attr("id") == "china") {
			alertstyle(jstag("xmlscript62"));
		} else if($("#citys option:selected").attr("value") == "0" && $("#country option:selected").attr("id") == "china") {
			alertstyle(jstag("xmlscript63"));
		} else if($("#county option:selected").attr("value") == "0" && $("#country option:selected").attr("id") == "china") {
			alertstyle(jstag("xmlscript64"));
		} else if($.trim($(".addrchoose #name").val()) == "") {
			alertstyle(jstag("xmlscript65"));
		} else if($.trim($(".addrchoose #name").val()).length > 30) {
			alertstyle(jstag("xmlscript70"));
		} else if($.trim($(".addrchoose #name").val()).match(/[^\a-\z\A-\Z\u4E00-\u9FA5\ ]/g)) {
			alertstyle(jstag("xmlscript28"));
		} else if(!$(".addrchoose #phone").val().match(/^1(3|4|5|7|8)\d{9}$/)) {
			alertstyle(jstag("xmlscript6"));
		} else {
			if($(this).attr("data-id") == null || $(this).attr("data-id") == "") {

				var json3 = {};
				json3["hotel"] = $('body').attr("data-id");
				json3["ff"] = "vipaddress_add";
				var tyle3 = {};
				tyle3["lang"] = language;
				tyle3["userName"] = $("#name").val();
				tyle3["phone"] = $("#phone").val();
				tyle3["cardNo"] = $.cookie("vipkh");
				tyle3["address"] = $(".addrxq").val();
				tyle3["Default"] = $(".addrRadio:checked").length;
				tyle3["pro"] = $("#province option:selected").attr("value") || "";
				tyle3["city"] = $("#citys option:selected").attr("value") || "";
				tyle3["area"] = $("#county option:selected").attr("value") || "";
				json3["data"] = tyle3;
				$.ajax({
					type: "POST",
					url: $('body').attr("data-url"),
					async: false,
					dataType: jsondatatyle,
					data: {
						json: JSON.stringify(json3)
					},
					success: function(date) {
						var d;
						if(IE()) {
							d = JSON.parse(date.message);
						} else {
							d = JSON.parse(date);
						}
						if(d.success) {
							//							var txt = d.msg;
							//						    var option = {
							//						        title: jstag("xmlbook104"),
							//						        onOk:function(){addrList()},
							//						         onClose:function() {
							//									addrList()
							//								}
							//						    }
							//				    		window.wxc.xcConfirm(txt, "custom", option);
							alertstyle(d.msg);
							addrList();
							$("#country option[id='china']").prop("selected", true);
							$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
							$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
							$("#province option[value='0']").prop("selected", true);
							$("#citys option[value='0']").prop("selected", true);
							$("#county option[value='0']").prop("selected", true);
							$("#province").attr("disabled", false);
							$("#county").attr("disabled", false);
							$("#citys").attr("disabled", false);
							$(".addrRadio:checked").removeAttr("checked");
							$("#name,#phone,.addrxq").val("");
							save.attr("data-id", "");
							malladdrfind();
						} else {
							alertstyle(d.msg);
						}
					}
				})
			} else {
				var json3 = {};
				json3["hotel"] = $('body').attr("data-id");
				json3["ff"] = "vipaddress_update";
				var tyle3 = {};
				tyle3["id"] = $(this).attr("data-id");
				tyle3["lang"] = language;
				tyle3["userName"] = $("#name").val();
				tyle3["phone"] = $("#phone").val();
				tyle3["cardNo"] = $.cookie("vipkh");
				tyle3["address"] = $(".addrxq").val();
				tyle3["Default"] = $(".addrRadio:checked").length;
				tyle3["pro"] = $("#province option:selected").attr("value") || "";
				tyle3["city"] = $("#citys option:selected").attr("value") || "";
				tyle3["area"] = $("#county option:selected").attr("value") || "";
				json3["data"] = tyle3;
				$.ajax({
					type: "POST",
					url: $('body').attr("data-url"),
					async: false,
					dataType: jsondatatyle,
					data: {
						json: JSON.stringify(json3)
					},
					success: function(date) {
						var d;
						if(IE()) {
							d = JSON.parse(date.message);
						} else {
							d = JSON.parse(date);
						}
						if(d.success) {
							//							var txt = d.msg;
							//						    var option = {
							//						        title: jstag("xmlbook104"),
							//						        onOk:function(){addrList()},
							//						         onClose:function() {
							//									addrList()
							//								}
							//						    }
							//				    		window.wxc.xcConfirm(txt, "custom", option);
							alertstyle(d.msg);
							addrList();
							$("#country option[id='china']").prop("selected", true);
							$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
							$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
							$("#province option[value='0']").prop("selected", true);
							$("#citys option[value='0']").prop("selected", true);
							$("#county option[value='0']").prop("selected", true);
							$("#province").attr("disabled", false);
							$("#county").attr("disabled", false);
							$("#citys").attr("disabled", false);
							$(".addrRadio:checked").removeAttr("checked");
							$("#name,#phone,.addrxq").val("");
							save.attr("data-id", "");
							malladdrfind();
						} else {
							//							var txt = d.msg;
							//						    var option = {
							//						        title: jstag("xmlbook104"),
							//						        onOk:function(){addrList()},
							//						         onClose:function() {
							//									addrList()
							//								}
							//						    }
							//				    		window.wxc.xcConfirm(txt, "custom", option);
							alertstyle(d.msg);
							addrList();
							$("#country option[id='china']").prop("selected", true);
							$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
							$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
							$("#province option[value='0']").prop("selected", true);
							$("#citys option[value='0']").prop("selected", true);
							$("#county option[value='0']").prop("selected", true);
							$("#province").attr("disabled", false);
							$("#county").attr("disabled", false);
							$("#citys").attr("disabled", false);
							$(".addrRadio:checked").removeAttr("checked");
							$("#name,#phone,.addrxq").val("");
							save.attr("data-id", "");
						}
					}
				})
			}
		}
	})
	$(".addrtable").on("click", ".operate .edit", function() {
		var _this = $(this).parents(".addrorder");
		var pro = _this.attr("data-proId");
		var city = _this.attr("data-cityId");
		var area = _this.attr("data-areaId");
		var address = _this.attr("data-addr");
		if(pro == "0" || pro == null) {
			$("#country option[id='foreign']").prop("selected", true);
			$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
			$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
			$("#province option[value='0']").prop("selected", true);
			$("#citys option[value='0']").prop("selected", true);
			$("#county option[value='0']").prop("selected", true);
			$("#province").attr("disabled", true);
			$("#county").attr("disabled", true);
			$("#citys").attr("disabled", true);
		} else {
			$("#country option[id='china']").prop("selected", true);
			$("#province").attr("disabled", false);
			$("#county").attr("disabled", false);
			$("#citys").attr("disabled", false);
			$("#province option[value=" + pro + "]").prop("selected", true);
			var city1 = $("#citys");
			var county = $("#county");
			if(city1.children().length > 0) {
				city1.empty();
			}
			if(county.children().length > 0) {
				county.empty();
			}
			var sb = new StringBuffer();
			$.each(cityJson,
				function(i, val) {
					if(val.item_code.substr(0, 2) == $("#province").val().substr(0, 2) && val.item_code.substr(2, 4) != '0000' && val.item_code.substr(4, 2) == '00') {
						sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
					}
				});
			$("#citys").append(sb.toString());
			$("#citys").find("option[value=" + city + "]").attr("selected", true);
			var cityVal = $("#citys").val();
			$.each(cityJson,
				function(i, val) {
					if(cityVal == '110100' || cityVal == "120100" || cityVal == "310100" || cityVal == "500100") {
						if(val.item_code.substr(0, 3) == cityVal.substr(0, 3) && val.item_code.substr(4, 2) != '00') {
							sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
						}
					} else {
						if(val.item_code.substr(0, 4) == cityVal.substr(0, 4) && val.item_code.substr(4, 2) != '00') {
							sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
						}
					}
				});
			$("#county").append(sb.toString());
			$("#county").find("option[value=" + area + "]").attr("selected", true);
		}
		$(".addrchoose .save").attr("data-id", _this.attr("data-id"));
		$(".addrchoose .addrxq").val(address);
		$(".addrchoose #name").val(_this.find("li").eq(0).text());
		$(".addrchoose #phone").val(_this.find("li").eq(2).text());
		if(_this.find(".addrRadio:checked").length == 0) {
			$(".addrchoose .address_info ul li input[type=checkbox]").removeAttr("checked");
		} else {
			$(".addrchoose .address_info ul li input[type=checkbox]").attr("checked", "true");
		}
	})
	$(".addrtable").on("click", ".operate .delete", function() {
		var json4 = {};
		json4["hotel"] = $('body').attr("data-id");
		json4["ff"] = "vipaddress_deleteOne";
		var tyle4 = {};
		tyle4["lang"] = language;
		tyle4["id"] = $(this).parents(".addrorder").attr("data-id");
		json4["data"] = tyle4;
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"),
			async: false,
			dataType: jsondatatyle,
			data: {
				json: JSON.stringify(json4)
			},
			success: function(date) {
				var d;
				if(IE()) {
					d = JSON.parse(date.message);
				} else {
					d = JSON.parse(date);
				}
				var txt = jstag("xmlmall97");
				var option = {
					title: jstag("xmlbook104"),
					onOk: function() {
						addrList()
					},
					onClose: function() {
						addrList()
					}
				}
				window.wxc.xcConfirm(txt, "custom", option);
				$("#country option[id='china']").prop("selected", true);
				$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
				$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
				$("#province option[value='0']").prop("selected", true);
				$("#citys option[value='0']").prop("selected", true);
				$("#county option[value='0']").prop("selected", true);
				$("#province").attr("disabled", false);
				$("#county").attr("disabled", false);
				$("#citys").attr("disabled", false);
				$(".addrRadio:checked").removeAttr("checked");
				$("#name,#phone,.addrxq").val("");
				malladdrfind();
			}
		})
	})
})

var shoporder = function() {
	$(".shoplist").remove();
	$('.shopOrderRight .shop_tap input').removeClass("on");
	$('.shopOrderRight .shop_tap input').eq(0).addClass("on");
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json2 = {};
	json2["hotel"] = $('body').attr("data-id");
	json2["ff"] = "goodsOrder_find";
	var tyle2 = {};
	tyle2["cardNo"] = $.cookie("vipkh");
	tyle2["lang"] = language;
	json2["data"] = tyle2;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		beforeSend: function() {
			$('#loading2,#layer_load2').show();
		},
		complete: function() {
			$('#loading2,#layer_load2').hide();
		},
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
			var html = "";
			var items = d.data;
			var jstag33=jstag("xmlvip33");
			var jstagb5=jstag("xmlmallb5");
			var jstagb6=jstag("xmlmallb6");  
			var jstagb16=jstag("xmlmallb16");
			var jstag53=jstag("xmlmall53");
			var jstagk68=jstag("xmlbook68"); 
			var jstagk12=jstag("xmlbook12");
			var jstagm14=jstag("xmlmall14");
			var jstagm15=jstag("xmlmall15"); 
			var jstagm16=jstag("xmlmall16");
			var jstagm42=jstag("xmlmall42");
			var jstagm40=jstag("xmlmall40");
			var jstagm71=jstag("xmlmall71");
			var jstagm72=jstag("xmlmall72");
			var jstagm73=jstag("xmlmall73");
			var jstagm75=jstag("xmlmall75");
			var jstagm76=jstag("xmlmall76");
			var jstagm77=jstag("xmlmall77");
			var jstagm82=jstag("xmlmall82");
			var jstagm83=jstag("xmlmall83");
			var jstagt77=jstag("xmltext77");
			for(var ishop = 0; ishop < items.length; ishop++) {
				var orderStatus;
				var btnStatus;
				var tracknum;
				if(items[ishop].orderStatus == 0 && items[ishop].paystate == 0) {
					orderStatus = jstagm71;
					tracknum = "";
					btnStatus = '<input type="button" class="hideInput_style" data-order="' + items[ishop].orderNo + '" data-id="' + items[ishop].id + '" value="' + jstagm83 + '"/>'
				} else if(items[ishop].orderStatus == 0 && items[ishop].paystate == 1) {
					orderStatus = jstagm72;
					btnStatus = "";
					tracknum = "";
				} else if(items[ishop].orderStatus == 1) {
					orderStatus = jstagm73;
					tracknum = items[ishop].express + ' ' + jstagm82 + ':' + items[ishop].expressNo;
					btnStatus = '<input type="button" class="hideInput_style" data-order="' + items[ishop].orderNo + '" data-id="' + items[ishop].id + '" value="' + jstagm75 + '"/>'
				} else if(items[ishop].orderStatus == 2) {
					if(items[ishop].receiveWay == '0') {
						orderStatus = jstagm76;
						tracknum ="";
						btnStatus = '';
					} else {
						orderStatus = jstagm76;
						tracknum = items[ishop].express + ' ' + jstagm82 + ':' + items[ishop].expressNo;
						btnStatus = "";
					}
				} else if(items[ishop].orderStatus == 3) {
					tracknum = "";
					orderStatus = jstagm77;
					btnStatus = "";
				}
				var shopAdd = items[ishop].address;
				shopAdd = shopAdd.split(",");
				var addrcontent;
				var addrtitle;
				var addrMsg = '<a class="addrMsg">' + jstagb16 + '</a>';
				var addrBox;
				if(items[ishop].receiveWay == "0") {
					addrMsg = '';
					addrBox = '';
				}
				if(shopAdd.length == 3) {
					addrtitle = '<div class="addrtitle">' + shopAdd[0] + '•' + shopAdd[1] + '</div>';
					addrcontent = '<div class="addrcontent">' + shopAdd[2] + '</div>';
				} else {
					addrtitle = '<div class="addrtitle">' + shopAdd[0] + '</div>';
					addrcontent = '<div class="addrcontent">' + shopAdd[1] + '</div>';
				}
				var addrBox = '<div class="addrBox"><div class="toptri"></div><div class="contenttri"><ul><li>' + addrtitle + addrcontent + '</li></ul><div class="addrtel">' + items[ishop].phone + '</div><div class="addrname">' + items[ishop].userName + ' ' + jstag53 + '</div></div></div>';
				var p = "";
				if(items[ishop].totalPrices != 0) {
					p += '<span data-id="0">' + items[ishop].totalPrices.toFixed(2) + '</span>RMB ';
				}
				if(items[ishop].totalIntegration != 0) {
					p += '<span data-id="1">' + items[ishop].totalIntegration + '</span>' + '' + jstag33;
				}

				if(items[ishop].totalPrices == 0 && items[ishop].totalIntegration == 0) {
					p = "0"
				}
				var freight = jstagb5 + "：";
				if(items[ishop].pricefreight != 0 && items[ishop].intfreight != 0) {
					freight += items[ishop].pricefreight.toFixed(2) + "RMB" + "," + items[ishop].intfreight + jstag33;
				} else if(items[ishop].pricefreight == 0 && items[ishop].intfreight != 0) {
					freight += items[ishop].intfreight + jstag33;
				} else if(items[ishop].pricefreight != 0 && items[ishop].intfreight == 0) {
					freight += items[ishop].pricefreight.toFixed(2) + "RMB";
				} else {
					freight += jstagb6;
				}
 					html += '<div class="shoplist"data-pay="' + items[ishop].paystate + items[ishop].orderStatus + '"><div class="shophead">' + addrBox + '<span class="data">' + items[ishop].time + '</span><span class="orderNo">' + jstagk68 + '：' + items[ishop].orderNo + '</span>' + addrMsg + '<input type="button"class="hideInput_style more"value="' + jstagt77 + '  ∨"/></div><div class="shop_content"><div class="shopnext clearfix">'
 				var html2 = "";
				for(var j = 0; j < items[ishop].items.length; j++) {
					var m;
					var innPrice = items[ishop].items;
					if(innPrice[j].totalPrices == 0) {
						m = '<span data-id="1">' + innPrice[j].totalIntegration + '</span>' + '' + jstag33;
					} else {
						m = '<span data-id="0">' + innPrice[j].totalPrices.toFixed(2) + '</span>RMB';
					}
 					html2 += '<ul class="clearfix" data-remark="' + innPrice[j].remark + '"data-num="' + innPrice[j].amount + '"><li class="pic"><img src="' + innPrice[j].image + '"class="adaimg"/></li><li><div class="title"><a href="mallxq.html?id=' + innPrice[j].goodsId + '">' + innPrice[j].goodsName + '</a></div><div class="price">' + jstagk12 + '：' + m + '</div></li><li class="mallpr">' + jstagm14 + '：' + innPrice[j].specName + '&nbsp;' + jstagm15 + '：' + innPrice[j].amount + '' + jstagm16 + '</li><li class="orderremark">' + jstagm42 + '：<br/>' + innPrice[j].remark + '</li></ul>';
				}
				html += html2 + '</div><div class="shopmsg clearfix"><div class="left"><label>' + orderStatus + '</label>' + tracknum + '<br/><label class="shoptotal">' + jstagm40 + '</label><label>' + p + '</label><label style="color:#000000">（' + freight + '）</label></div><div class="right">' + btnStatus + '</div></div><div class="line"></div></div></div>';
			}
			$('.shop_tap').after(html);
			img();
			paging1('.shopOrderRight .shoplist', '#pagshopOrder', 6);
		}
	})

}
var shoporderClick = function() {
	$(".shopOrderRight").on("click", ".shoplist .shophead .addrMsg", function() {
		var ifshow1
		if($(this).parents(".shoplist").find(".addrBox").is(":hidden")) {
			ifshow1 = "true";
		} else {
			ifshow1 = "false";
		}
		$(".shoplist .addrBox").hide();
		if(ifshow1 == "true") {
			$(this).parents(".shoplist").find(".addrBox").show();
		} else {
			$(this).parents(".shoplist").find(".addrBox").hide();
		}
	})
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	$(".shopOrderRight").on("click", ".shopmsg input", function() {
		var _this = $(this);
		if(_this.val() == jstag("xmlmall83")) {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "goods_waitforpayment";
			var tyle = {};
			tyle["orderNo"] = $(this).attr("data-order");
			tyle["lang"] = language;
			tyle["nexturl"] = "mallbook2.html";
			json["data"] = tyle;
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
					if(d.paymentMethod == "zfb") {
						document.write(d.url);
					}
					if(d.paymentMethod == "wx") {
						window.location.href = d.url + "?ddh=" + d.ddh + "&hotelid=" + parseInt($('body').attr("data-id")) + "&hyym=mallbook2.html";
					}
					if(d.paymentMethod == "yl") {
						document.write(d.url);
					}
				}
			})
		} else if(_this.val() == jstag("xmlmall75")) {
			var json = {};
			json["hotel"] = $('body').attr("data-id");
			json["ff"] = "goodsstatus_update";
			var tyle = {};
			tyle["orderId"] = $(this).attr("data-id");
			tyle["orderStatus"] = "2";
			tyle["lang"] = language;
			json["data"] = tyle;
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
					var txt = d.msg;
					var option = {
						title: jstag("xmlbook104"),
						onOk: function() {
							_this.hide(); 
							_this.parents(".shopmsg").find(".left").find("label").eq(0).text(jstag("xmlmall76"));
 							if($(".store_sort li .on").attr("data-pay") != "") {
								_this.parents(".shoplist").hide();
							}
							_this.parents(".shoplist").attr("data-pay","12");
						},
						onClose: function() {
							_this.hide();
							 _this.parents(".shopmsg").find(".left").find("label").eq(0).text(jstag("xmlmall76"));
							if($(".store_sort li .on").attr("data-pay") != "") {
								_this.parents(".shoplist").hide();
							}
							_this.parents(".shoplist").attr("data-pay","12");
						}
					}
					window.wxc.xcConfirm(txt, "custom", option);
				}
			})
		}
	})

	$('.shopOrderRight').on("click", ".shophead input", function() {
		var ifshow;
		if($(this).parents(".shoplist").find(".shop_content").is(":hidden")) {
			ifshow = "true";
		} else {
			ifshow = "false";
		}
		$(".shop_content").hide();
		if(ifshow == "true") {
			$(this).parents(".shoplist").find(".shop_content").show();
		} else {
			$(this).parents(".shoplist").find(".shop_content").hide();
		}
	});
	$('.shopOrderRight').on("click", ".shop_tap input", function() {
		var _this = $(this);
		//		$(".shoplist").remove(); 
		//		$('.shop_tap').after(html);
		//		img();
		_this.addClass("on").siblings().removeClass("on");
		var pay = _this.attr("data-pay");
		var status = _this.attr("data-status");
		$(".shoplist").hide();
		if(pay == '' && status == '') {
			$(".shoplist").show();
			paging1('.shopOrderRight .shoplist', '#pagshopOrder', 6);
		} else {
			$('.shoplist[data-pay="' + pay + status + '"]').show();
			paging1('.shopOrderRight .shoplist[data-pay="' + pay + status + '"]', '#pagshopOrder', 6);
		}
	})
}
var orderMessage = function() {
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json = {};
	json["hotel"] = $('body').attr("data-id");
	json["ff"] = "ddcx";
	var tyle = {};
	tyle["ddh"] = $.cookie("ddhcx");
	tyle["ddlx"] = "2";
	tyle["lang"] = language;
	json["data"] = tyle;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		beforeSend: function() {
			$('#loading2,#layer_load2').show();
		},
		complete: function() {
			$('#loading2,#layer_load2').hide();
		},
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
				var items = d.data;
				$('.searchMessage .Message1 ol li label').eq(0).text(items[0].ddh);
				$('.searchMessage .Message1 ol li span label').eq(0).html(timeConvert2(items[0].intime) + '&nbsp;&nbsp;' + getWeek(items[0].intime));
				$('.searchMessage .Message1 ol li label label').eq(0).text(items[0].fxname);
				$('.searchMessage .Message1 ol li span label').eq(1).html(timeConvert2(items[0].outtime) + '&nbsp;&nbsp;' + getWeek(items[0].outtime));
				$('.searchMessage .Message1 ol li').eq(5).find('label').text(items[0].numRooms);
				$('.searchMessage .Message1 ol li').eq(6).find('label').text(items[0].ydzt);
				$('.searchMessage .Message2 ol li label').eq(0).text(items[0].name);
				$('.searchMessage .Message2 ol li label').eq(1).text(items[0].tel);
			}
		}
	})
}
//	会员信息
function vipxx(kh) {
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var jsonxx = {};
	jsonxx["hotel"] = $('body').attr("data-id");
	jsonxx["ff"] = "hyxxcx";
	var tylexx = {};
	tylexx["lang"] = language;
	tylexx["kh"] = kh;
	jsonxx["data"] = tylexx;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		dataType: jsondatatyle,
		data: {
			json: JSON.stringify(jsonxx)
		},
		success: function(date) {
			var d;
			if(IE()) {
				d = JSON.parse(date.message);
			} else {
				d = JSON.parse(date);
			}
			if(d.id == "1") {
				$.cookie("vipkh", d.kh, {
					path: '/'
				});
				$.cookie("vipname", d.xing + d.ming, {
					path: '/'
				});
				$.cookie("viplev", d.kdj, {
					path: '/'
				});
				var sexF;
				if(d.xb == jstag("xmlvip10")) {
					sexF = jstag("xmlvip10");
				} else {
					sexF = jstag("xmlvip11");
				}
				if($.cookie("vipname") != null && $.cookie("vipname") != "") {
					$('.head_right li a input').eq(0).val($.cookie("vipname") + "," + jstag("xmlvip66"));
				} else {
					$('.head_right li a input').eq(0).val(jstag("xmlvip7"))
				}
				$('.person_right p label').eq(0).text(d.xing + d.ming);
				$('.person_right p label').eq(1).text(sexF);
				$('.person_right ul li').eq(0).find('label').eq(0).text(d.email);
				$('.person_right ul li').eq(0).find('label').eq(1).text(Math.abs(d.ye) + '.00');
				$('.person_right ul li').eq(1).find('label').eq(0).text(d.tel);
				$('.person_right ul li').eq(1).find('label').eq(1).text(d.jf);
				$('.personMessage').show();
				$('#shadow').show();
			} else {
				alertstyle(d.msg);
			}
		}
	});
} 
//退出登录
var leavelLogin = function() {
	$('.leave_login').click(function() {
		var txt = jstag("xmlscript52");
		var option = {
			title: jstag("xmlbook104"),
			btn: parseInt("0011", 2),
			onOk: function() {
				$.cookie("vipkh", "", {
					path: '/'
				});
				$.cookie("vipname", "", {
					path: '/'
				});
				$.cookie("viplev", "", {
					path: '/'
				});
				$.cookie("intime", "", {
					path: '/'
				});
				$.cookie("outtime", "", {
					path: '/'
				});
				$.cookie("ifbuy", "5", {
					path: '/'
				});
				$('#shadow').hide();
				$('.enter_content').hide();
				$('.head_right li a input').removeClass("color1");
				window.location.href = "index.html";
			}
		}
		window.wxc.xcConfirm(txt, "custom", option);
	})
}

//	验证码数据请求
var testCode = function(phoneNum, testCode) {
	//向后台发送处理数据
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json = {};
	json["hotel"] = $('body').attr("data-id");
	json["ff"] = "yzmdx";
	var tyle = {};
	tyle["phone"] = phoneNum;
	tyle["yzm"] = testCode;
	json["data"] = tyle;
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

		}
	});
}

//客房预订
var roomBooked = function() {
	$('#intime').val($.cookie("intime"));
	$('#outtime').val($.cookie("outtime"));
	$.cookie("ydrxx", "", {
		path: '/'
	});
	$('.choose_room .btn_booked').click(function() {
		if($.cookie("hotelId") == null || $.cookie("hotelId") == "") {
			alertstyle(jstag("xmlscript14"));
		} else if($("#intime").val() == "" || $("#outtime").val() == "") {
			alertstyle(jstag("xmlscript17"));
		} else {
			$.cookie("intime", $("#intime").val(), {
				path: '/'
			});
			$.cookie("outtime", $("#outtime").val(), {
				path: '/'
			});
			$.cookie("hotelId", $('#hotelID').attr('data-id'), {
				path: '/'
			});
			window.location.href = 'book1.html'
		}
	})
}
//查看商品订单tap点击切换
var shopSwitch = function() {
	//进入商品订单管理
	$(".shop_order").on("click", function() {
		$(".enter_content").hide();
		$('.shopOrder').show();
		$('#loading2,#layer_load2').show();
		setTimeout('shoporder()', 10);
		//			shoporder();
	})
	var index = "0";
	if(index == "0") {
		$(".shop_tap .store_sort li input").eq(0).addClass("on");
		$('.sort_intro').eq(0).show().siblings('.sort_intro').hide();
	}
	$(".shop_tap .store_sort li input").click(function() {
		index = $(".shop_tap .store_sort li input").index(this);
		$(".shop_tap .store_sort li input").removeClass("on");
		$(this).addClass("on");
		$('.sort_intro').eq(index).show().siblings('.sort_intro').hide();
		var img = $('.sort_intro').eq(index).find('.adaimg');
		for(var ti = 0; ti < img.length; ti++) {
			var imgh = "auto";
			var imgw = "auto";
			if(img.eq(ti).width() * img.eq(ti).parent().height() / img.eq(ti).parent().width() < img.eq(ti).height()) {
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
	})
}
//商品地址管理
var shopAddr = function() {
	if(IE()) {
		$(".addAddress table").css("display", "block")
	} else {
		$(".addAddress table").css("display", "table-row")
	}
	$(".goods_addr").on("click", function() {
		$(".addrtable").show();
		$(".addAddress_btn").show();
		$(".addrTitle").text(jstag("xmlmall37"));
		$(".addshopAddr .changeAddre").removeClass("addAddress").addClass("editAddress");
		$(".enter_content").hide();
		addrList();
		$("#country option[id='china']").prop("selected", true);
		$("#citys").html('<option value="0">' + jstag("xmlmall45") + '</option>');
		$("#county").html('<option value="0">' + jstag("xmlmall46") + '</option>');
		$("#province option[value='0']").prop("selected", true);
		$("#citys option[value='0']").prop("selected", true);
		$("#county option[value='0']").prop("selected", true);
		$("#province").attr("disabled", false);
		$("#county").attr("disabled", false);
		$("#citys").attr("disabled", false);
		$(".addrRadio:checked").removeAttr("checked");
		$("#name,#phone,.addrxq").val("");
		$(".addshopAddr").show();
		$('#shadow').show();
	})
}
var addrList = function() {
	if($(".addrorder")) {
		$(".addrorder").remove();
	}
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json1 = {};
	json1["hotel"] = $('body').attr("data-id");
	json1["ff"] = "vipaddress_find";
	var tyle1 = {};
	tyle1["lang"] = language;
	tyle1["cardNo"] = $.cookie("vipkh");
	json1["data"] = tyle1;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		beforeSend: function() {
			$('#loading2,#layer_load2').show();
		},
		complete: function() {
			$('#loading2,#layer_load2').hide();
		},
		async: false,
		dataType: jsondatatyle,
		data: {
			json: JSON.stringify(json1)
		},
		success: function(date) {
			var d;
			if(IE()) {
				d = JSON.parse(date.message);
			} else {
				d = JSON.parse(date);
			}
			var addlist = "";
			for(var i = 0; i < d.data.length; i++) {
				if(d.data[i].Default == 1) {
					addlist += '<ol class="addrorder" data-id="' + d.data[i].id + '" data-proId="' + d.data[i].proId + '" data-cityId="' + d.data[i].cityId + '" data-areaId="' + d.data[i].areaId + '" data-addr="' + d.data[i].address + '"><li class="name">' + d.data[i].userName + '</li><li class="address">' + d.data[i].proName +' '+ d.data[i].cityName+' ' + d.data[i].areaName+' ' + d.data[i].address + '</li><li class="phone">' + d.data[i].phone + '</li><li class="operate"><input type="button"class="hideInput_style edit"value=""/><input type="button"class="hideInput_style delete"value=""/><input type="button"class="hideInput_style defaultY"value="' + jstag("xmlmall54") + '"/></li></ol>';
				} else {
					addlist += '<ol class="addrorder" data-id="' + d.data[i].id + '" data-proId="' + d.data[i].proId + '" data-cityId="' + d.data[i].cityId + '" data-areaId="' + d.data[i].areaId + '" data-addr="' + d.data[i].address + '"><li class="name">' + d.data[i].userName + '</li><li class="address">' + d.data[i].proName +' ' + d.data[i].cityName+' ' + d.data[i].areaName+' ' + d.data[i].address + '</li><li class="phone">' + d.data[i].phone + '</li><li class="operate"><input type="button"class="hideInput_style edit"value=""/><input type="button"class="hideInput_style delete"value=""/><input type="button"class="hideInput_style default"value="' + jstag("xmlmall96") + '"/></li></ol>';
				}
			}
			$(".addrtable").append(addlist);
		}
	})
}
var cityJson = [];
// 省值变化时 处理市
function doProvAndCityRelation() {
	var city = $("#citys");
	var county = $("#county");
	if(city.children().length > 0) {
		city.empty();
	}
	if(county.children().length > 0) {
		county.empty();
	}
	if($("#chooseCity").length === 0) {
		city.append("<option id='chooseCity' value='0'>" + jstag("xmlmall45") + "</option>");
	}
	if($("#chooseCounty").length === 0) {
		county.append("<option id='chooseCounty' value='0'>" + jstag("xmlmall46") + "</option>");
	}
	var sb = new StringBuffer();
	$.each(cityJson,
		function(i, val) {
			if(val.item_code.substr(0, 2) == $("#province").val().substr(0, 2) && val.item_code.substr(2, 4) != '0000' && val.item_code.substr(4, 2) == '00') {
				sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
			}
		});
	$("#chooseCity").after(sb.toString());
}
// 市值变化时 处理区/县
function doCityAndCountyRelation() {
	var cityVal = $("#citys").val();
	var county = $("#county");
	if(county.children().length > 0) {
		county.empty();
	}
	if($("#chooseCounty").length === 0) {
		county.append("<option id='chooseCounty' value='0'>" + jstag("xmlmall46") + "</option>");
	}
	var sb = new StringBuffer();
	$.each(cityJson,
		function(i, val) {
			if(cityVal == '110100' || cityVal == "120100" || cityVal == "310100" || cityVal == "500100") {
				if(val.item_code.substr(0, 3) == cityVal.substr(0, 3) && val.item_code.substr(4, 2) != '00') {
					sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
				}
			} else {
				if(val.item_code.substr(0, 4) == cityVal.substr(0, 4) && val.item_code.substr(4, 2) != '00') {
					sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
				}
			}
		});
	$("#chooseCounty").after(sb.toString());

}

function StringBuffer(str) {
	var arr = [];
	str = str || "";
	var size = 0; // 存放数组大小
	arr.push(str);
	// 追加字符串
	this.append = function(str1) {
		arr.push(str1);
		return this;
	};
	// 返回字符串
	this.toString = function() {
		return arr.join("");
	};
	// 清空 
	this.clear = function(key) {
		size = 0;
		arr = [];
	};
	// 返回数组大小 
	this.size = function() {
		return size;
	};
	// 返回数组 
	this.toArray = function() {
		return buffer;
	};
	// 倒序返回字符串 
	this.doReverse = function() {
		var str = buffer.join('');
		str = str.split('');
		return str.reverse().join('');
	};
}