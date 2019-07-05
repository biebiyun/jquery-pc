var jsondatatyle;
if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
$(function(){
	if(GetQueryString("ddh")==null){
		window.location.href="mall.html";
	}else{
		var json2 = {};
		json2["hotel"] = $('body').attr("data-id");
		json2["ff"] = "goodsOrder_findByOrderNo";
		var tyle2 = {};
		tyle2["lang"] = language;
		tyle2["cardNo"]=$.cookie("vipkh");
		tyle2["orderNo"]=GetQueryString("ddh");
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
			    $(".mall-success .orderno").html(jstag("xmlbook68")+" "+GetQueryString("ddh"));
				var addBook=d.data.address;
				var Badd=addBook.replace(/,/g,' ');
				$(".addr-msg p span").eq(1).text(Badd);
				$(".addr-msg p span").eq(3).text(d.data.userName); 
				if(d.data.totalPrices!=0&&d.data.totalIntegration==0){
					$(".order_bottom .total .price").html((+d.data.totalPrices).toFixed(2)+"RMB");
				}else if(d.data.totalPrices==0&&d.data.totalIntegration!=0){
					$(".order_bottom .total .price").html(d.data.totalIntegration+" "+jstag("xmlvip33"));
				}else{
					$(".order_bottom .total .price").html((+d.data.totalPrices).toFixed(2)+"RMB"+" , "+d.data.totalIntegration+" "+jstag("xmlvip33"));
				}
				var freight=jstag("xmlmallb5")+"：";
				if(d.data.pricefreight!=0){
					freight+=(+d.data.pricefreight).toFixed(2)+"RMB"+"  ";
				}
				if(d.data.intfreight!=0){
					freight+=d.data.intfreight+jstag("xmlvip33");
				}
				if(d.data.intfreight==0&&d.data.pricefreight==0){freight=jstag("xmlmallb6");}
				$(".order_bottom .way .freight").html(freight);
				var receiveWay
				if(d.data.receiveWay=="0"){
					$(".addr-msg p span").eq(0).text(jstag("xmlmall68"));
					$(".addr-msg p span").eq(1).text($.cookie("hotelTel"));
					$(".mall-addr .addr-msg p").eq(1).hide()
					receiveWay=jstag("xmlmall32");
				}else{
					receiveWay=jstag("xmlmall31");
				}
				$(".order_bottom .way .recway").html(receiveWay+"  ");
				for(var i=0;i<d.data.orderlist.length;i++){
					var t=d.data.orderlist[i];
					var p;
					if(t.totalPrices==0){
						p=t.totalIntegration+jstag("xmlvip33");
					}else{
						p=(+t.totalPrices).toFixed(2)+"RMB";
					}
					$(".order_confrimlist").append('<ul class="clearfix"><li class="pic"><img src="'+t.image+'"class="adaimg"/></li><li><span class="title">'+t.goodsName+'</span><span class="price">'+jstag("xmlbook160")+':'+p+'</span></li><li class="mallpr">'+jstag("xmlmall14")+'：'+t.specName+'</li><li class="chanage-num"><span>'+jstag("xmlmall15")+'：'+t.amount+jstag("xmlmall16")+'</span></li><li class="leave_msg">'+jstag("xmlmall42")+'：<br />'+t.remark+'</li></ul>')
 				}
				img();
			}
		})
	}
})
