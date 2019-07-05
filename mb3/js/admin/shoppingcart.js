var jsondatatyle;
if(IE()) {
	jsondatatyle = "jsonp";
} else {
	jsondatatyle = "text";
}
var specShow = function() {
	var _this = $(".order_confrimlist ul");
	var mycars = "";
	for(var t = 0; t < _this.length; t++) {
		var carid = _this.eq(t).find(".goodsname").find("span").attr("data-id");
		if(mycars.indexOf(carid) == -1) {
			mycars += _this.eq(t).find(".goodsname").find("span").attr("data-id") + ",";
		}
	}
	var mycars1 = mycars.substring(0, mycars.length - 1);
	var json2 = {};
	json2["hotel"] = $('body').attr("data-id");
	json2["ff"] = "showSpec";
	var tyle2 = {};
	tyle2["lang"] = language;
	tyle2["idList"] = mycars1;
	json2["data"] = tyle2;
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
			if(d[0].data != "") {
				for(var i = 0; i < d.length; i++) {
					var it = d[i];
					for(var n = 0; n < it.spec.length; n++) {
						var p;
						if(it.spec[n].salePrice == 0) {
							p = it.spec[n].integral;
						} else {
							p = it.spec[n].salePrice.toFixed(2);
						}
						if(it.spec[n].stock!="0"){
							$(".order_confrimlist ul .goodsname span[data-id=" + it.goodsID + "]").parents("ul").find("ol").append('<li data-id="' + it.spec[n].id + '" data-stock="' + it.spec[n].stock + '" data-price="' + p + '">' + it.spec[n].name + '</li>');
 						}
					}
				}
			}
		}
	})
}
$(function() {
	if($.cookie("vipkh") == "" || $.cookie("vipkh") == null) {
		window.location.href = "mall.html"
	}
	var json2 = {};
	json2["hotel"] = $('body').attr("data-id");
	json2["ff"] = "shoppingCart_find";
	var tyle2 = {};
	tyle2["lang"] = language;
	tyle2["cardNo"] = $.cookie("vipkh");
	json2["data"] = tyle2;
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
			if(d.data != "" && d.data != null) {
				for(var i = 0; i < d.data.length; i++) {
					var p;
					if(d.data[i].salePrice == 0) {
						p = '<span data-id="1">' + d.data[i].integral + '</span>' + jstag("xmlvip33") + '';
					} else {
						p = '<span data-id="0">' + d.data[i].salePrice.toFixed(2) + '</span>RMB';
					}
					$(".order_confrimlist").append('<ul data-id="' + d.data[i].id + '"class="clearfix cartlist"><li class="cartcheck"><input type="checkbox"/></li><li class="pic"><img src="' + d.data[i].image + '"class="adaimg"/></li><li class="goodsname"><span class="title"data-id="' + d.data[i].goodsId + '">' + d.data[i].goodsName + '</span><span class="goodsstutas">' + jstag("xmlmallb15") + '</span><input type="button" class="hideInput_style delete" value=""/></li><li>' + jstag("xmlbook12") + '：' + p + '</li><li class="chanage-num"><span class="cart_scale"><label>' + jstag("xmlmall14") + ':</label><label class="scalenow" data-stock="' + d.data[i].stock + '" data-id="' + d.data[i].specId + '">' + d.data[i].specName + '</label><input type="button"class="hideInput_style edit"value=""/><div class="scale_choose"><ol></ol></div></span><span class="font-num">' + jstag("xmlmall15") + '：</span><div class="mall-num"><input type="text"value="' + d.data[i].amounnt + '"class="mallnum"/><span class="calcu"><input type="button"class="hideInput_style plus"value=""/><input type="button"class="hideInput_style minus"value=""/></span></div><span class="font-unit">' + jstag("xmlmall16") + '</span></li><li>' + jstag("xmlmall42") + '：</li><li class="cartview"><input maxlength="200" type="text"/></li></ul>')
					$(".order_confrimlist ul").eq(i).find(".goodsstutas").hide();
					if(d.data[i].putaway == false) {
						$(".order_confrimlist ul").eq(i).find(".goodsstutas").show();
						$(".order_confrimlist ul").eq(i).find(".plus").attr("disabled", true)
						$(".order_confrimlist ul").eq(i).find(".minus").attr("disabled", true)
						$(".order_confrimlist ul").eq(i).find(".mallnum").attr("disabled", true)
						$(".order_confrimlist ul").eq(i).find(".cartcheck").find("input").attr("disabled", true)
					}
					if(d.data[i].enough == false) {
						$(".order_confrimlist ul").eq(i).find(".mallnum").val(d.data[i].stock);
					}
					 if(d.data[i].stock==0){
						$(".order_confrimlist ul").eq(i).find(".mallnum").attr("disabled",true);
 					}else{
						$(".order_confrimlist ul").eq(i).find(".mallnum").attr("disabled",false);
 					} 
				} 
				specShow();
				img();
			}
		}
	})

	//选数量
	$(".order_confrimlist").on("keyup", ".mall-num .mallnum", function() {
		var c = $(this);
		var tm = $(this).parents("ul").find(".scalenow").attr("data-stock");
		var cm = parseInt(c.val());
		if(/[^\d]/.test(c.val())) { //替换非数字字符   
			$(this).val(1);
		} else if(cm > tm) {
			alertstyle(jstag("xmlmall99"));
			$(this).val(1);
		}
		prices();
	})
	$(".order_confrimlist").on("blur", ".mall-num .mallnum", function() {
		var c = $(this);
		if(c.val() == "" || c.val() == 0) {
			$(this).val(1);
		} else if(/[^\d]/.test(c.val())) { //替换非数字字符   
			$(this).val(1);
		}
		prices();
		modify($(this).parents(".cartlist"));
	})

	$(".order_confrimlist").on("click", ".mall-num .plus", function() {
		var i = parseInt($(this).parents(".mall-num").find(".mallnum").val());
		var t = $(this).parents("ul").find(".scalenow").attr("data-stock");
		if(i < t) {
			i++;
			$(this).parents(".mall-num").find(".mallnum").val(i);
			var numt = $(this);
			//			priceA(numt);
			prices();
			modify($(this).parents(".cartlist"));
		} else {
			alertstyle(jstag("xmlmall100"));
		}
	})
	$(".order_confrimlist").on("click", ".mall-num .minus", function() {
		var i = parseInt($(this).parents(".mall-num").find(".mallnum").val());
		if(i > 1) {
			i--;
			$(this).parents(".mall-num").find(".mallnum").val(i);
			var numt = $(this);
			//			priceA(numt);
			prices();
			modify($(this).parents(".cartlist"));
		} else {
			alertstyle(jstag("xmlmall101"));
		}
	})
	//选择物品
	$(".order_confrimlist").on("click", ".cartcheck input", function() {
		if($(this).prop("checked")) {
			$(".account .shopnum").text(parseInt($(".account .shopnum").text()) + 1);
			prices();
		} else {
			$(".account .shopnum").text(parseInt($(".account .shopnum").text()) + 1);
			prices();
		}
	})
	$(".edit_all").on("click", " .check", function() {
		var items = $(".order_confrimlist ul");
		if($(this).prop("checked")) {
			items.find(".cartcheck").find("input").prop("checked", true);
			prices();
		} else {
			items.find(".cartcheck").find("input").removeAttr("checked");
			$(".account .shopnum").text(0);
			$(".account .shopinteg").text(0);
			$(".account .shopprice").text(0);
			prices();
		}
	})
	//删除
	$(".order_confrimlist").on("click", " ul .delete", function() {
		var _this = $(this);
		var mycars = new Array();
		mycars[0] = $(this).parents("ul").attr("data-id");
		var json2 = {};
		json2["hotel"] = $('body').attr("data-id");
		json2["ff"] = "shoppingCart_delete";
		var tyle2 = {};
		tyle2["lang"] = language;
		tyle2["idList"] = mycars;
		json2["data"] = tyle2;
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
				var txt = d.msg;
				var option = {
					title: jstag("xmlbook104"),
					onOk: function() {
						_this.parents("ul").remove();
						prices();
					},
					onClose: function() {
						_this.parents("ul").remove();
						prices();
					}
				}
				window.wxc.xcConfirm(txt, "custom", option);
			}
		})
	})
	$(".edit_all").on("click", ".delete", function() {
		var mycars = new Array();
		var t = $(".cartcheck input:checked");
		if(t.length > 0) {
			for(var i = 0; i < t.length; i++) {
				mycars[i] = t.eq(i).parents("ul").attr("data-id");
			}
			var json2 = {};
			json2["hotel"] = $('body').attr("data-id");
			json2["ff"] = "shoppingCart_delete";
			var tyle2 = {};
			tyle2["lang"] = language;
			tyle2["idList"] = mycars;
			json2["data"] = tyle2;
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
					t.parents("ul").remove();
					prices();
					alertstyle(d.msg);
				}
			})
		} else {
			alertstyle(jstag("xmlmallb7"));
		}
	})
	//修改规格
	$(".order_confrimlist").on("click", " .chanage-num .edit", function(e) {
		e.stopPropagation();
		$(this).parents(".cart_scale").find(".scale_choose").toggle();
	})
	$(".scale_choose").on("click", "ol li", function() {
		$(this).parents(".cart_scale").find(".scalenow").text($(this).text());
		$(this).parents(".cart_scale").find(".scalenow").attr("data-id", $(this).attr("data-id"));
		$(this).parents(".cart_scale").find(".scalenow").attr("data-stock", $(this).attr("data-stock"))
		if($(this).attr("data-stock")==0){
			$(this).parents("ul").find(".mallnum").attr("disabled",true);
			$(this).parents(".chanage-num").find(".mallnum").val(0);
		}else{
			$(this).parents("ul").find(".mallnum").attr("disabled",false);
			$(this).parents(".chanage-num").find(".mallnum").val(1);
		} 
		$(this).parents("ul").find("li").eq(3).find("span").text($(this).attr("data-price"));
		$(this).parents(".scale_choose").hide();
		modify($(this).parents("ul"));
		prices();
	})
	//结算
	$(".account input").click(function() {
		var json = [];
		var t = $(".cartcheck input:checked");
		if(t.length <= 0) {
			alertstyle(jstag("xmlmallb7"));
		} else {
			var flag = true;
			for(var i = 0; i < t.length; i++) {
				if(t.eq(i).parents("ul").find(".mallnum").val() == "0") { 
					flag = false;
				}  
				var tyle = {};
				tyle["goodsId"] = t.eq(i).parents("ul").find(".goodsname").find("span").attr("data-id");
				tyle["specId"] = t.eq(i).parents("ul").find(".scalenow").attr("data-id");
				tyle["amount"] = t.eq(i).parents("ul").find(".mallnum").val();
				tyle["remark"] = t.eq(i).parents("ul").find(".cartview").find("input").val();
				json.push(tyle);
			}
			if(flag==false){
				alertstyle(jstag("xmlscript71"));
			}else{
				$.cookie("mall", JSON.stringify(json), {
					path: '/'
				});
				$.cookie("from", "1", {
					path: '/'
				});
				$(".edit_all .check").attr("checked",false)
				window.location.href = "mallbook1.html";
			} 
		} 
	})
})

function prices() {
	var f = 0;
	var j = 0;
	var t = $(".cartcheck input:checked");
	for(var i = 0; i < t.length; i++) {
		if(t.eq(i).parents("ul").find("li").eq(3).find("span").attr("data-id") == 0) {
			f = f + parseFloat(t.eq(i).parents("ul").find("li").eq(3).find("span").text() * t.eq(i).parents("ul").find(".mallnum").val());
		}
		if(t.eq(i).parents("ul").find("li").eq(3).find("span").attr("data-id") == 1) {
			j = j + parseInt(t.eq(i).parents("ul").find("li").eq(3).find("span").text() * t.eq(i).parents("ul").find(".mallnum").val());
		}
	}
	$(".account .shopprice").text(f.toFixed(2));
	$(".account .shopinteg").text(j);
	$(".account .shopnum").text(t.length);
}

function modify(t) {
	var jsondatatyle;
	if(IE()) {
		jsondatatyle = "jsonp";
	} else {
		jsondatatyle = "text";
	}
	var json2 = {};
	json2["hotel"] = $('body').attr("data-id");
	json2["ff"] = "shoppingCart_update";
	var tyle2 = {};
	tyle2["lang"] = language;
	tyle2["cartId"] = t.attr("data-id");
	tyle2["goodsId"] = t.find(".goodsname").find("span").attr("data-id");
	tyle2["amount"] = t.find(".mallnum").val();
	tyle2["specId"] = t.find(".scalenow").attr("data-id");
	tyle2["specName"] = t.find(".scalenow").text();
	tyle2["remark"] = t.find(".cartview").find("input").val();;
	json2["data"] = tyle2;
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
			//			alert(d.msg);
		}
	})
}