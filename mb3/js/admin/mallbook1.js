var jsondatatyle; 
if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
var salePrice1;
var integral1;
var confirm=function(){
	$('.order_confrimlist ul').remove();
	var json2 = {};
	    json2["hotel"] = $('body').attr("data-id");
	    json2["ff"] = "goodsOrder_confirm";
		var tyle2={};
	    tyle2["lang"] = language;
		tyle2["cardNo"]=$.cookie("vipkh");
		tyle2["orderList"]=JSON.parse($.cookie("mall"));
		if($(".malladdress .active").length>0){
			tyle2["addressId"]=$(".malladdress .active").attr("data-id");
		}else{
			tyle2["addressId"]="0";
		} 
	    json2["data"] = tyle2;
	    $.ajax({
	        type: "POST",
	        url: $('body').attr("data-url"),
	        async: false,
	        dataType: jsondatatyle,
	        data: { json: JSON.stringify(json2) },
	        success: function (date) {
	           	var d;
			    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }			 
				if(d.goodsList.length>0){
				for(var i=0;i<d.goodsList.length;i++){
					var items=d.goodsList[i];
					var p;
					if(items.salePrice==0){
						p='<span data-id="1" data-sale="'+items.integral+'">'+items.integral*items.amount+'</span>'+jstag("xmlvip33")+'';
					 	integral1=items.integral;
					}else{
						p='<span data-id="0" data-sale="'+items.salePrice+'">'+(items.salePrice*items.amount).toFixed(2)+'</span>RMB'; 
						salePrice1=items.salePrice;
					} 
					$('.order_confrimlist').append('<ul class="clearfix"data-nub="'+items.stock+'"data-id="'+items.goodsId+'"><li class="pic"><img src="'+items.image+'"class="adaimg"/></li><li><span class="title">'+items.goodsName+'</span><span class="price">'+jstag("xmlmallb17")+'：'+p+'</span></li><li data-scale="'+items.specId+'"class="scale">'+jstag("xmlmall14")+'：'+items.specName+'</li><li class="chanage-num"><span class="font-num">'+jstag("xmlmall15")+'：</span><div class="mall-num"><input type="text"value="'+items.amount+'"class="mallnum"/><span class="calcu"><input type="button"class="hideInput_style plus"value=""/><input type="button"class="hideInput_style minus"value=""/></span></div><span class="font-unit">'+jstag("xmlmall16")+'</span></li><li>'+jstag("xmlmall42")+'：</li><li class="view"><input maxlength="200" type="text" value="'+items.remark+'"/></li></ul>')
	 			 }
				var f=0;
					var j=0;
					var t=$('.order_confrimlist ul');
					 for(var i=0;i<t.length;i++){
						if(t.eq(i).find(".price").find("span").attr("data-id")==0){
							f=f+parseFloat(t.eq(i).find(".price").find("span").text());
						}
						if(t.eq(i).find(".price").find("span").attr("data-id")==1){
							j=j+parseInt(t.eq(i).find(".price").find("span").text());
						}
					} 
				var freight = jstag("xmlmallb5")+"："; 
					if($(".order_way .active").attr("data-id")=="1"){
						if(d.freight.price != 0&&d.freight.integr != 0) {
							freight += d.freight.price.toFixed(2)+"RMB"+", "+d.freight.integr+ jstag("xmlvip33");
						}else if(d.freight.price == 0&&d.freight.integr != 0) {
							freight += d.freight.integr + jstag("xmlvip33");
						}else if(d.freight.price != 0&&d.freight.integr == 0){
							freight+=d.freight.price.toFixed(2)+"RMB";
						}else{
							freight +=jstag("xmlmallb6");
						} 
		 			$(".order_bottom .total .fare").html((f+d.freight.price).toFixed(2)+"RMB"+", "+(j+d.freight.integr)+jstag("xmlvip33"));
 					}else{
						 freight +=jstag("xmlmallb6");
		 			$(".order_bottom .total .fare").html(f.toFixed(2)+"RMB"+", "+j+jstag("xmlvip33"));
 					}  
 				$('.order_bottom .way .freight').text(freight).attr("data-price",d.freight.price).attr("data-integr",d.freight.integr);
				$('.order_bottom .way .transway').html($(".order_way .active").val());
			 	 if(d.error.length>0){
					 	alertstyle(d.error);
					 } 
					
				}else{
					alertstyle(d.error,"mall.html"); 
				}
				img();
				//	选择支付方式  
				if($(".order_confrimlist ul .price span[data-id=0]").length<=0){
					$(".line_pay input").attr("disabled","disabled");
					$(".mall-pay").hide();
				}  
	        }
	    })  
    //地址切换
	$(".malladdress ul").on("click",function(){
		$(".malladdress ul").removeClass("active")
		$(this).addClass("active");
		freight();
	})
	//收货方式转换
	$(".order_way input").on("click",function(){ 
		$(this).addClass("active").siblings().removeClass("active");
		$('.order_bottom .way .transway').html($(".order_way .active").val());
		if($(".order_way .active").attr("data-id")=="0"){
			$(".malladdress").hide();
			$(".order_addrchoose").hide();
		}else{
			$(".malladdress").show();
			$(".order_addrchoose").show();
		}
		freight();
	})
	//选数量
	$(".order_confrimlist").on("keyup",".mall-num .mallnum",function(){
		var c=$(this); 
		var tm=parseInt($(this).parents("ul").attr("data-nub"));
		var cm=parseInt(c.val());
		 if(/[^\d]/.test(c.val())){//替换非数字字符   
              $(this).val(1);
           }else if(cm>tm){
            	alertstyle(jstag("xmlmall99"));  
            	$(this).val(1);
            } 
            var priceall=$(this).parents("ul");
			pricesA(priceall)
            freight();
	})
	$(".order_confrimlist").on("blur",".mall-num .mallnum",function(){ 
		var c=$(this);  
		    if(c.val()==""||c.val()==0){
            	$(this).val(1);
            }else if(/[^\d]/.test(c.val())){//替换非数字字符   
              $(this).val(1);
            }
             var priceall=$(this).parents("ul");
			pricesA(priceall); 
            freight();
	})

	$(".order_confrimlist").on("click",".mall-num .plus",function(){ 
		var i=parseInt($(this).parents(".mall-num").find(".mallnum").val());
		var t=parseInt($(this).parents("ul").attr("data-nub"));
		if(i<t){
			i++;
			$(this).parents(".mall-num").find(".mallnum").val(i);
			var priceall=$(this).parents("ul");
			pricesA(priceall); 
			freight();
		}else{
			alertstyle(jstag("xmlmall100"));
		}
	})
	$(".order_confrimlist").on("click",".mall-num .minus",function(){
		var i=parseInt($(this).parents(".mall-num").find(".mallnum").val());
		if(i>1){
			i--;
			$(this).parents(".mall-num").find(".mallnum").val(i);
			 var priceall=$(this).parents("ul");
			pricesA(priceall) 
			freight();
		}else{
			alertstyle(jstag("xmlmall101"));
		}
	})
}
$(function(){ 
	if($.cookie("mall")==null||$.cookie("mall")==""){
		window.location.href="mall.html";
	}else{
		malladdrfind();
	}   
	$(".malladdress p .close").hide(); 
	//使用新地址
	$(".order_addrchoose .btn_newaddr").click(function(){
		$(".addrtable").hide();
		$(".addAddress_btn").hide(); 
		$(".addrTitle").text(jstag("xmlmall36"));
		$(".addshopAddr .changeAddre").removeClass("editAddress").addClass("addAddress");
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
	//收货地址管理
	$(".order_addrchoose .btn_addradmin").click(function(){ 
		$(".addrtable").show();
		$(".addAddress_btn").show(); 
		$(".addrTitle").text(jstag("xmlmall37")); 
		$(".addshopAddr .changeAddre").removeClass("addAddress").addClass("editAddress");
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
		addrList();
	}) 
	//查看更多收货地址
	$(".malladdress p .open").click(function(){
		$(".malladdress .moreaddr").show();
		$(".malladdress p .close").show();
		$(".malladdress p .open").hide();
	})
	$(".malladdress p .close").click(function(){
		$(".malladdress .moreaddr").hide();
		$(".malladdress p .close").hide();
		$(".malladdress p .open").show();
	})
	//订单生成 
	$(".btn_order .order_next").click(function(){
		if($.cookie("mall") == null || $.cookie("mall") == "") { 
			window.location.href = "mall.html";
		}else{ 
		if($(".line_pay input:checked").length==0&&$(".order_confrimlist ul .price span[data-id=0]").length>0){
			alertstyle(jstag("xmlmall102"));
		}else if($(".malladdress .active").length==0&&$(".order_way .active").attr("data-id")=="1"){
			alertstyle(jstag("xmlmall43"));
		}else{
			var json3={};
			json3["hotel"] = $('body').attr("data-id");
			json3["ff"] = "goodsOrder_add";
			var tyle3 = {};
			tyle3["lang"] = language;
			tyle3["cardNo"]=$.cookie("vipkh");
			if($(".order_confrimlist ul .price span[data-id=0]").length>0){
				tyle3["payMethod"]=$(".mall-pay .line_pay input:checked").attr("data-id"); 
			}else{
				tyle3["payMethod"]="integral"; 
			}  
			tyle3["receiveWay"]=$(".order_way .active").attr("data-id");
			if($(".order_way .active").attr("data-id")=="1"){
				tyle3["addressId"]=$(".malladdress .active").attr("data-id");
				tyle3["pricefreight"]=$('.order_bottom .way .freight').attr("data-price");
				tyle3["intfreight"]=$('.order_bottom .way .freight').attr("data-integr");
			}else{
				tyle3["addressId"]="0";
				tyle3["pricefreight"]="0";
				tyle3["intfreight"]="0";
			}
		 	tyle3["nexturl"]="mallbook2.html";
			tyle3["from"]=$.cookie("from");
			tyle3["phone"] = $.cookie("vipphone");
			tyle3["userName"] = $.cookie("vipname"); 
			var tyle5=[];
			for(var i=0;i<$('.order_confrimlist ul').length;i++){
				var tyle4={};
				tyle4["goodsId"]=$('.order_confrimlist ul').eq(i).attr("data-id");
				tyle4["amount"]=$('.order_confrimlist ul').eq(i).find(".mallnum").val();
				tyle4["specId"]=$('.order_confrimlist ul').eq(i).find(".scale").attr("data-scale");
				tyle4["remark"]=$('.order_confrimlist ul').eq(i).find(".view").find("input").val();
		 		tyle5.push(tyle4);
			}
			tyle3["item"]=tyle5;
			json3["data"] = tyle3;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"),
				async: false,
				dataType: jsondatatyle,
				data: { json: JSON.stringify(json3) },
				success: function (date) { 
					var d;
			    	if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }			 
					if(d.success==true){
						$.cookie("mall", "", { path: '/' });
						if($(".order_confrimlist ul .price span[data-id=0]").length==0){
	                    	 window.location.href=d.url;
	                    }
						else if ($(".line_pay input:checked").attr("data-id") == "zfb") {
	                        document.write(d.url);
	                    }
						else if ($(".line_pay input:checked").attr("data-id") == "yl") {
	                        document.write(d.url);
	                    } 
	                    if ($(".line_pay input:checked").attr("data-id") == "wx") {
	                        window.location.href = d.url + "?ddh=" + d.ddh + "&hotelid=" + parseInt($('body').attr("data-id")) + "&hyym=mallbook2.html";
	                    }
	                }else{
						alertstyle(d.msg);
					}
				}
			})
		}
		}
	})
})
function malladdrfind(){
	$(".malladdress ul").remove();
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json1 = {};
    json1["hotel"] = $('body').attr("data-id");
    json1["ff"] = "vipaddress_find";
    var tyle1 = {};
    tyle1["lang"] = language;
	tyle1["cardNo"]=$.cookie("vipkh");
    json1["data"] = tyle1;
    $.ajax({
        type: "POST",
        url: $('body').attr("data-url"),
        async: false,
        dataType: jsondatatyle,
        data: { json: JSON.stringify(json1) },
        success: function (date) {
           	var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }			 
			var addrLen=3;
			if(d.data.length<addrLen){
				addrLen=d.data.length
			}
			for(var i=0;i<d.data.length;i++){ 
				if(d.data[i].Default==1){
					$(".malladdress").prepend('<ul data-id="'+d.data[i].id+'"class="active"><li><span>'+d.data[i].userName+'</span><span>'+d.data[i].phone+'</span></li><li class="malldetailadd">'+d.data[i].proName+''+d.data[i].cityName+''+d.data[i].areaName+''+d.data[i].address+'</li></ul>');
				} 
			}
			for(var i=0;i<addrLen;i++){ 
				if(d.data[i].Default==0){ 
					$(".malladdress .moreaddr").before('<ul data-id="'+d.data[i].id+'"><li><span>'+d.data[i].userName+'</span><span>'+d.data[i].phone+'</span></li><li class="malldetailadd">'+d.data[i].proName+''+d.data[i].cityName+''+d.data[i].areaName+''+d.data[i].address+'</li></ul>');
				}
			}
			if(d.data.length>3){
				$(".malladdress p").show();
				for(var i=3;i<d.data.length;i++){ 
				if(d.data[i].Default==0){ 
					$(".malladdress .moreaddr").append('<ul data-id="'+d.data[i].id+'"><li><span>'+d.data[i].userName+'</span><span>'+d.data[i].phone+'</span></li><li class="malldetailadd">'+d.data[i].proName+''+d.data[i].cityName+''+d.data[i].areaName+''+d.data[i].address+'</li></ul>');
				}
			}
			}else{
				$(".malladdress p").hide();
			}
			$(".malladdress .moreaddr").hide();
			confirm();
        }
    })
}
function pricesA(priceall){
	var f = 0;
	var j = 0;
	var t = priceall; 
	if(t.find(".price").find("span").attr("data-id") == 0) {
		f =t.find(".price").find("span").attr("data-sale")* t.find(".mallnum").val();
		t.find(".price").find("span").text(f.toFixed(2));
	}
	if(t.find(".price").find("span").attr("data-id") == 1) {
		j =t.find(".price").find("span").attr("data-sale") * t.find(".mallnum").val();
		t.find(".price").find("span").text(j);
	}
} 
 function freight(){
 	var f=0;
	var j=0;
	var t=$('.order_confrimlist ul');
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json2 = {};
	json2["hotel"] = $('body').attr("data-id");
	json2["ff"] = "goodsOrder_confirm";
	var tyle2 = {};
	tyle2["lang"] = language;
	tyle2["cardNo"] = $.cookie("vipkh");
	tyle2["addressId"]=$(".malladdress .active").attr("data-id");
	var tyle5=[];
	for(var i = 0; i < $(".order_confrimlist ul").length; i++) {
		var tyle4 = {};
		tyle4["goodsId"] = $(".order_confrimlist ul").eq(i).attr("data-id");
		tyle4["amount"] = $(".order_confrimlist ul").eq(i).find(".mall-num").find(".mallnum").val();
		tyle4["specId"] = $(".order_confrimlist ul").eq(i).find(".scale").attr("data-scale");
		tyle4["remark"] = $(".order_confrimlist ul").eq(i).find(".view").find("input").val();
		tyle5.push(tyle4);
	}
	tyle2["orderList"] = tyle5;
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
			for(var i=0;i<t.length;i++){
				if(t.eq(i).find(".price").find("span").attr("data-id")==0){
					f=f+parseFloat(t.eq(i).find(".price").find("span").text());
				}
				if(t.eq(i).find(".price").find("span").attr("data-id")==1){
					j=j+parseInt(t.eq(i).find(".price").find("span").text());
				}
			} 
			var freight = jstag("xmlmallb5")+"："; 
			if($(".order_way .active").attr("data-id")=="1"){
				if(d.freight.price != 0&&d.freight.integr != 0) {
					freight += d.freight.price.toFixed(2)+"RMB"+", "+d.freight.integr+ jstag("xmlvip33");
				}else if(d.freight.price == 0&&d.freight.integr != 0) {
					freight += d.freight.integr + jstag("xmlvip33");
				}else if(d.freight.price != 0&&d.freight.integr == 0){
					freight+= d.freight.price.toFixed(2)+"RMB";
				}else{
					freight +=jstag("xmlmallb6");
				} 
		 	$(".order_bottom .total .fare").html((f+d.freight.price).toFixed(2)+"RMB"+", "+(j+d.freight.integr)+jstag("xmlvip33"));
 			}else{
				 freight +=jstag("xmlmallb6");
				$(".order_bottom .total .fare").html(f.toFixed(2)+"RMB"+", "+j+jstag("xmlvip33"));
 			} 
			$('.order_bottom .way .freight').text(freight).attr("data-price",d.freight.price).attr("data-integr",d.freight.integr);
 		}
	})
}
