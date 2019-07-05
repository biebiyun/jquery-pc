var pici = -1;
var picnum;
var flag=0; 
var shoppingtype=0;
var mallNav=function(){
	var index = "0";
	    if(index=="0"){
	        $(".mall-detail .store_sort li input").eq(0).addClass("on"); 
	        $('.goods-detail').eq(0).show().siblings('.goods-detail').hide(); 
	    } 
	$(".mall-detail .store_sort li input").click(function(){
        index=$(".mall-detail .store_sort li input").index(this);
        $(".mall-detail .store_sort li input").removeClass("on"); 
        $(this).addClass("on");
        $('.goods-detail').eq(index).show().siblings('.goods-detail').hide();
     })   
 }

$(function () { 
    mallNav();
    var cityJson;
   var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    if(GetQueryString("id")==null){
		window.location.href="mall.html";
	} else{ 
    var json2 = {};
    json2["hotel"] = $('body').attr("data-id");
    json2["ff"] = "goods_findOne";
    var tyle2 = {};
    tyle2["lang"] = language;
	tyle2["id"]=GetQueryString("id");
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
			$(".mall-msg .title").text(d.data.name); 
			$(".mall-fare .addr").text(d.data.address+" "+jstag("xmltext17"));
			$(".mall-sales .num").text(d.data.sales);
			$(".goods-detail").eq(0).html(d.data.description);
			$(".goods-detail").eq(1).html(d.data.notice); 
			for(var i=0;i<d.data.images.length;i++){
 				$(".cytp .tplb").append(' <img src="'+d.data.images[i]+'" />');
				$(".hylb .tps").append(' <div class="tpdw"><img src="'+d.data.images[i]+'"/></div>');
 			}
			  var t = $('.cytp .tplb img');
			  picnum = t.length; 
				$('.cytp .hylb .hylbtp .tps').width(150*picnum); 
			  var timer = null;
			  $('.cytp .tplb img:eq(0)').show(); 
			  imgbtn();  
			var maxprice=0,minprice=0,stocks=0;
			for(var n=0;n<d.data.spec.length;n++){
				$(".mall-scale").append('<li><input data-id="'+d.data.spec[n].specId+'" data-price="'+d.data.spec[n].salePrice.toFixed(2)+'" data-integral="'+d.data.spec[n].integral+'" data-img="'+d.data.spec[n].image+'" data-stock="'+d.data.spec[n].stock+'" type="button" class="hideInput_style" value="'+d.data.spec[n].specName+'"/></li>');
			 	stocks+=parseInt(d.data.spec[n].stock);
				if(d.data.spec[n].salePrice=="0"){ 
					shoppingtype=1;
					if(maxprice<d.data.spec[n].integral){maxprice=d.data.spec[n].integral;}
					if(minprice>d.data.spec[n].integral||minprice==0){minprice=d.data.spec[n].integral;}
				}else{ 
					if(maxprice<d.data.spec[n].salePrice){maxprice=d.data.spec[n].salePrice.toFixed(2);}
					if(minprice>d.data.spec[n].salePrice||minprice==0){minprice=d.data.spec[n].salePrice.toFixed(2);}
				}
			}
			$(".mall-scale li input[data-stock='0']").attr("disabled",true).css("color","#A9A9A9");
 			if(maxprice==minprice||minprice==0){
					if(shoppingtype==0){ 
						$(".mall-msg .price").text(maxprice+"RMB");
						$(".mall-total .total").text("0.00RMB");
					}else{ 
						$(".mall-msg .price").text(maxprice+" "+jstag("xmlvip33"));
						$(".mall-total .total").text("0"+jstag("xmlvip33"));
					}
				}else{
					if(shoppingtype==0){
						$(".mall-total .total").text("0.00RMB")
						$(".mall-msg .price").text(minprice+"~"+maxprice+"RMB");
					}else{ 
						$(".mall-total .total").text("0"+jstag("xmlvip33"))
						$(".mall-msg .price").text(minprice+"~"+maxprice+" "+jstag("xmlvip33"));
					}
				}
			if(shoppingtype==0){
				$(".mall-fare .fare").html("0.00"+"RMB");
			}else{
				$(".mall-fare .fare").html("0"+jstag("xmlvip33"));
			}
 			$(".mall-size .size").text(stocks);
        }
    })
   } 
   	//地址
	var json1 = {};
    json1["hotel"] = $('body').attr("data-id");
    json1["ff"] = "showChina";
    var tyle1 = {};
    tyle1["lang"] = language;
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
			var c=$(".mall-fare strong").html();
			cityJson=d.data;
			$.each(cityJson,function(i, val) {
			  if (val.item_code.substr(2, 4) == '0000') {
				$(".mall-fare .costs_details").append("<p data-id='" + val.item_code + "'>" + val.item_name + "</p>");
			  if(val.item_name.indexOf(c)>=0){$(".mall-fare strong").attr("data-id",val.item_code);}
			  }
			});
			$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
			  	$.each(cityJson, function(i, val) {
					if(val.item_code.substr(2, 4) == '0000') {
						if(remote_ip_info.province==val.chinapro){
							$(".mall-fare strong").html(val.item_name);
							$(".mall-fare strong").attr("data-id",val.item_code);
							 return;
						} 
	 				}
				});   
		   	});
        }  
    })
    $(".mall-fare strong").click(function(){
    	if($(".mall-scale li .on").length>0){ 
			$(".mall-fare .costs_details").slideDown();
		}else{
			alertstyle(jstag("xmlmall26"));
		}
	})
	$(".mall-fare .costs_details").on("click","p",function(){
		$(this).parent().slideUp();
		$(".mall-fare strong").text($(this).text()).attr("data-id",$(this).attr("data-id"));
		freight()
	})
	//选择规格
	$(".mall-scale").on("click","li input",function(){
		flag=0;
//		 clearTimeout(timer);
//		$(".cytp .tplb").empty(); 
		$(".mall-scale li input").removeClass("on");
		$(this).addClass("on");
		prices();
		$(".cytp .tplb").html('<img src="'+$(this).attr("data-img")+'" />');
 		$('.cytp .tplb img:eq(0)').fadeIn(1000).siblings().fadeOut(1000);
		$('.cytp .hylb .hylbtp .tpdw').css('background-color', '');
		if($(this).attr("data-price")==0){
			$(".mall-msg .price").html("<lable>"+$(this).attr("data-integral")+"</lable>"+" "+jstag("xmlvip33"));
		}else{
			$(".mall-msg .price").html("<lable>"+$(this).attr("data-price")+"</lable>"+"RMB");
		} 
		$(".mall-size .size").text($(this).attr("data-stock"));
		$(".mall-num .mallnum").val(1);
		freight();
	}) 
	$(".mall-num .mallnum").keyup(function(){
		var c=$(this); 
		var tm=parseInt($(".mall-size .size").text());
		var cm=parseInt(c.val());
		 if(/[^\d]/.test(c.val())){//替换非数字字符   
              $(this).val(1);
            }else if(cm>tm){
            	alertstyle(jstag("xmlmall99"));
            	$(this).val(1);
            }
	})
	$(".mall-num .mallnum").blur(function(){
		var c=$(this);  
		    if(c.val()==""||c.val()==0){
            	$(this).val(1);
           }else if(/[^\d]/.test(c.val())){//替换非数字字符   
              $(this).val(1);
            } 
            freight()
	})
	//选数量
	$(".mall-num .plus").click(function(){ 
		if($(".mall-scale li .on").length>0){ 
			var i=parseInt($(".mall-num .mallnum").val());
			if(i<parseInt($(".mall-size .size").text())){
				i++;
				$(".mall-num .mallnum").val(i);
				prices();
			}else{
				alertstyle(jstag("xmlmall100"));
			}
			freight()
		}else{
			alertstyle(jstag("xmlmall26"));
		}
	})
	$(".mall-num .minus").click(function(){
		if($(".mall-scale li .on").length>0){ 
			var i=parseInt($(".mall-num .mallnum").val());
			if(i>1){
				i--;
				$(".mall-num .mallnum").val(i);
				prices();
			}else{
				alertstyle(jstag("xmlmall101"));
			}
			freight()
		}else{
			alertstyle(jstag("xmlmall26"));
		}
	})
	//加入购物车
	$(".btn_mall .cart input").click(function(){
		$(".enter_content").hide();
		$("#shadow").hide();
		$('.head_right li a input').eq(0).removeClass("color1");
		if($.cookie("vipname")!=null&&$.cookie("vipname")!=""){
			$('.head_right li a input').eq(0).val($.cookie("vipname")+","+jstag("xmlvip66"));  
		}else{ 
			$('.head_right li a input').eq(0).val(jstag("xmlvip7"))
		} 
		if($(".mall-scale li .on").length<=0){
			alertstyle(jstag("xmlmall26"));
		}else if($.cookie("vipkh")==null||$.cookie("vipkh")==""){
			$.cookie("ifbuy", "1", { path: '/' });
			alertstyle(jstag("xmlscript42"));
		}else{
			var json1 = {};
			json1["hotel"] = $('body').attr("data-id");
			json1["ff"] = "shoppingCart_add";
			var tyle1 = {};
			tyle1["lang"] = language;
			tyle1["cardNo"]=$.cookie("vipkh");
			tyle1["goodsId"]=GetQueryString("id");
			tyle1["goodsName"]=$(".mall-msg .title").text();
			tyle1["amount"]=$(".mall-num .mallnum").val();
			tyle1["specId"]=$(".mall-scale li .on").attr("data-id");
			tyle1["specName"]=$(".mall-scale li .on").val();
			tyle1["remark"]="";
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
					alertstyle(d.msg);
				}
			})
		}
	})
	//购买
	$(".btn_mall .buy input").click(function(){ 
		var tyle={};
		tyle["goodsId"]=GetQueryString("id");
		tyle["specId"]=$(".mall-scale li .on").attr("data-id");
		tyle["amount"]=$(".mall-num .mallnum").val();
		tyle["remark"]="";
		var json=[];
		json.push(tyle);
		$.cookie("mall", JSON.stringify(json), { path: '/' }); 
		$.cookie("from", "1", { path: '/' }); 
		if($(".mall-scale li .on").length<=0){
			alertstyle(jstag("xmlmall26"));
		}else if($.cookie("vipkh")==null||$.cookie("vipkh")==""){
			$.cookie("ifbuy", "2", { path: '/' });
			alertstyle(jstag("xmlscript42"));
		}else{ 
			window.location.href="mallbook1.html";
		} 
	}) 
})

var picSearch=function(){
	$(".cytp .tplb").empty(); 
	$(".hylb .tps").empty();
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json2 = {};
    json2["hotel"] = $('body').attr("data-id");
    json2["ff"] = "goods_findOne";
    var tyle2 = {};
    tyle2["lang"] = language;
	tyle2["id"]=GetQueryString("id");
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
			for(var i=0;i<d.data.images.length;i++){
//			for(var i=0;i<8;i++){
				$(".cytp .tplb").append(' <img src="'+d.data.images[i]+'" />');
				$(".hylb .tps").append(' <div class="tpdw"><img src="'+d.data.images[i]+'"/></div>');
//				$(".cytp .tplb").append(' <img src="images3/kfgj3.png" />');
//				$(".hylb .tps").append(' <div class="tpdw"><img src="images3/kfgj3.png" /></div>');
			}
			  var t = $('.cytp .tplb img');
			  picnum = t.length;
				$('.cytp .hylb .hylbtp .tps').width(150*picnum); 
			  var timer = null;
			  $('.cytp .tplb img:eq(0)').show(); 
			  imgbtn();  
        }
    })
}
function prices(){
	var f=0; 
	if($(".mall-scale li .on").attr("data-price")==0){
		f=$(".mall-scale li .on").attr("data-integral")*$(".mall-num .mallnum").val()
			$(".mall-total .total").text(f+jstag("xmlvip33"));
		}else{
			f=$(".mall-scale li .on").attr("data-price")*$(".mall-num .mallnum").val()
			$(".mall-total .total").text(f.toFixed(2)+"RMB");
		} 
}
function auto() {
//  pici++; 
    if (pici >= picnum) {
        pici = 0;
    }
    $('.cytp .tplb img:eq(' + pici + ')').fadeIn(2000).siblings().fadeOut(2000); 
    $('.cytp .hylb .hylbtp .tpdw:eq(' + pici + ')').css('background-color', '#000').siblings().css('background-color', '');
//	imgwy(pici)
//  timer = window.setTimeout(auto, 5000);
} 
function imgbtn() {
    $('.cytp .hylb .hylbtp .tpdw').each(function (y) {
        $(this).click(function () {
//          clearTimeout(timer);
				flag++;
        	if(flag==1){
        		picSearch(); 
        	}
            pici = y;
            $('.cytp .tplb img:eq(' + pici + ')').fadeIn(2000).siblings().fadeOut(2000);
            $('.cytp .hylb .hylban span .sz1').text('0' + (pici + 1));
            $('.cytp .hylb .hylbtp .tpdw:eq(' + pici + ')').css('background-color', '#000').siblings().css('background-color', '');
			imgwy(pici);
			auto();
//          timer = window.setTimeout(auto, 5000);
        });
    });
}
function imgwy(pici){
	if(picnum>4){ 
		if(pici>1&&pici<picnum-2){
			$('.cytp .hylb .hylbtp .tps').css("margin-left",-150*(pici-2));
		}else if(pici<=1){
			$('.cytp .hylb .hylbtp .tps').css("margin-left",0);
		}else if(pici>=picnum-2){
			$('.cytp .hylb .hylbtp .tps').css("margin-left",-150*(picnum-4));
		}
	}
}
function freight(){
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json1 = {};
		json1["hotel"] = $('body').attr("data-id");
		json1["ff"] = "address_switch";
		var tyle1 = {};
		tyle1["goodsId"]=GetQueryString("id");
		tyle1["amount"]=$(".mall-num .mallnum").val();
		tyle1["specId"]=$(".mall-scale li .on").attr("data-id");
		tyle1["addressId"]=$(".mall-fare strong").attr("data-id");
		tyle1["lang"] = language;
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
				 if(shoppingtype==0){
					$(".mall-fare .fare").html((+d.freight).toFixed(2)+"RMB");
				}else{
					$(".mall-fare .fare").html(d.freight+jstag("xmlvip33"));
				}
			}
		})
}
