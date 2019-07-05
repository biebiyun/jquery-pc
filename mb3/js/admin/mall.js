var goodsTypeId=0;
var px="default"; 
var mode="all";
$(function(){  
	$(".store_tap .store_seq li input").eq(0).addClass("current")
	$(".store_tap .store_seq li input").not(".store_price input").click(function(){
		$(".mall_list").empty();
		px=$(this).attr("data-type"); 
		$(".store_tap .store_seq li input").removeClass("current")
		$(this).addClass("current");
		mallList();
	});
//	$(".store_sort .moresort").hide();
	 storeSwitch();
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	json["hotel"] = $('body').attr("data-id");
	json["ff"]="goodsType_find";
	var tyle={};
		tyle["lang"] = language;
		json["data"]=tyle;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"), 
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json)},
		success: function (date) {
		    var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }			 
		 	var items=d.data;
		 	if(items.length<5){
	 			$('.store_tap .store_sort .moresort').hide(); 	
		 	} 
		 	for (var i =0 ; i <items.length; i++) {
 		    	if($('.store_tap .store_sort li').length<=5){
		    		var list='<li data-id="'+items[i].id+'"><input type="button" class="hideInput_style" value="'+items[i].name+'" title="'+items[i].name+'"/></li> ';
		    		$('.store_tap .store_sort li').eq(0).after(list); 
		    	}else{
		    		var list1='<li data-id="'+items[i].id+'"><input type="button" class="hideInput_style" value="'+items[i].name+'" title="'+items[i].name+'"/></li> ';
					$('.store_tap .store_sort .moresort ul').append(list1); 
		    	}
			 }
			$(".store_tap .store_sort li input").eq(0).addClass("on"); 
	        $('.sort_intro').eq(0).show().siblings('.sort_intro').hide(); 
			 mallList();  
		}
	})
//	$(".store_tap .store_sort").on("click","li input",function(){
	 $('.store_tap .store_sort li input').not(".moresort input").click(function(){
	 	$(".sort_intro").empty();
	 	px="default";
	 	goodsTypeId=$(this).parent().attr("data-id");
	 	mallList();
	 })
	 //多出部分一下拉形式显示
	$(".store_sort .moresort .input").click(function(){
		$(this).parent().find("ul").show();
	})
	$(".store_sort .moresort").on("click","ul li input",function(){
		$(this).parents('.moresort').find(".input").val($(this).val()); 
		$(".store_tap .store_sort li input").removeClass("on"); 
		$(".store_tap .store_sort .moresort .input").addClass("active"); 
		px="default";
	 	goodsTypeId=$(this).parent().attr("data-id");
	 	mallList(); 
	 	$(this).parents('.moresort').find("ul").hide(); 
	 	return false;
	})
		//搜索
	$(".shopSearch .shopbtn").click(function(){
		var json3 = {};
		json3["hotel"] = $('body').attr("data-id");
		json3["ff"] = "goods_search";
		var tyle3 = {};
		tyle3["lang"] = language;
		tyle3["name"]=$(".shopSearch .shopuse").val();
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
				$(".sort_intro").empty();
				goodsTypeId=0;
				mode="default";
				$(".store_tap .store_seq li input").eq(0).addClass("current")
				for(var i=0;i<d.data.length;i++){
					var t;
					if(d.data[i].typeId=="1"){
						t=d.data[i].salePrice+jstag("xmltext149");
					}else{
						t=d.data[i].integral+jstag("xmlvip33");
					}
					$(".sort_intro").append('<ol><li class="pic1"><img src="'+d.data[i].image+'"class="adaimg"/></li><li class="title">'+d.data[i].name+'</li><li class="content">'+t+'</li><li class="know_more"><a href="mallxq.html?id='+d.data[i].id+'">'+jstag("xmlmall22")+'></a></li></ol>')
				}
				img();
				paging1('.mall_content .sort_intro ol', '#pagmall', 6);
			}
		})
	})
	 storeSelect(); 
})
var mallList=function(){
	$(".sort_intro").empty();
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	json["hotel"] = $('body').attr("data-id");
	json["ff"]="goods_find";
	var tyle={};
		tyle["lang"] = language;
		tyle["mode"] = mode;
		tyle["px"]=px;
		tyle["goodsTypeId"] = goodsTypeId;
		json["data"]=tyle;
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"), 
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json)},
		success: function (date) {
		    var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }			 
		 	var items=d.data; 
			for (var i = 0; i <items.length; i++) {  
	    		var t; 
				if(d.data[i].type=="1"){
					t=d.data[i].salePrice+jstag("xmltext149");
				}else{
					t=d.data[i].integral+jstag("xmlvip33");
				} 
				$(".sort_intro").append('<ol><li class="pic1"><img src="'+d.data[i].image+'"class="adaimg"/></li><li class="title">'+d.data[i].name+'</li><li class="content">'+t+'</li><li class="know_more"><a href="mallxq.html?id='+d.data[i].id+'">'+jstag("xmlmall22")+'></a></li></ol>')
			}
			img();
			paging1('.sort_intro ol', '#pagmall', 6);
		}
	})  
}

 var storeSwitch=function(){
	 var index = "0";
//	    if(index=="0"){
//	        $(".store_tap .store_sort li input").eq(0).addClass("on"); 
//	        $('.sort_intro').eq(0).show().siblings('.sort_intro').hide(); 
//	    }
	$(".store_tap .store_sort").on("click","li:not(.moresort) input",function(){ 
        index=$(".store_tap .store_sort li input").index(this);
        $(".store_tap .store_sort li input").removeClass("on"); 
        $(".store_tap .store_sort .moresort .input").removeClass("active"); 
	 	$(".store_tap .store_sort .moresort .input").val(jstag("xmltext64")); 
        $(this).addClass("on");
        $('.sort_intro').eq(index).show().siblings('.sort_intro').hide();
//       mallList();
         var img = $('.sort_intro').eq(index).find('.adaimg');
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
    })   
 }
//价格、商品排序下拉框
var storeSelect=function(){
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	$('.store_price .input').click(function(){
		$(this).parents("ol").find(".store_price ul").hide();
		$(this).parent().find("ul").show();
	})
	$('.mallprice ul li input').click(function(){
		$(this).parents('.mallprice').find(".input").val($(this).val());
	 	$(".store_seq li input").removeClass("current"); 
		$(this).parents('.mallprice').find(".price").addClass("current"); 
		px=$(this).attr("data-type"); 
	 	$(this).parents('.mallprice').find("ul").hide(); 
		var json2 = {};
		json2["hotel"] = $('body').attr("data-id");
		json2["ff"] = "goods_find";
		var tyle2 = {};
		tyle2["lang"] = language;
		tyle2["mode"]=mode;
		tyle2["px"]=px;
		tyle2["goodsTypeId"]=goodsTypeId;
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
				$(".sort_intro").empty();
				for(var i=0;i<d.data.length;i++){
					var t;
					if(d.data[i].type=="1"){
						t=d.data[i].salePrice+jstag("xmltext149");
					}else{
						t=d.data[i].integral+jstag("xmlvip33");
					} 
					$(".sort_intro").append('<ol><li class="pic1"><img src="'+d.data[i].image+'"class="adaimg"/></li><li class="title">'+d.data[i].name+'</li><li class="content">'+t+'</li><li class="know_more"><a href="mallxq.html?id='+d.data[i].id+'">'+jstag("xmlmall22")+'></a></li></ol>')
				}
				img();
				paging1('.sort_intro ol', '#pagmall', 6);
			}
		}) 
  	})
//	$(".mallintegral .shop").addClass("current");
	$(".mallintegral ul li input").click(function(){
		$(this).parents('.mallintegral').find(".input").val($(this).val());
//	 	$(".store_seq li input").removeClass("current");
//		$(this).parents('.mallintegral').find(".shop").addClass("current");
	 	mode=$(this).attr("data-type");
	 	$(this).parents('.mallintegral').find("ul").hide(); 
		var json2 = {};
		json2["hotel"] = $('body').attr("data-id");
		json2["ff"] = "goods_find";
		var tyle2 = {};
		tyle2["lang"] = language;
		tyle2["mode"]=mode;
		tyle2["px"]=px;
		tyle2["goodsTypeId"]=goodsTypeId;
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
				$(".sort_intro").empty();
				for(var i=0;i<d.data.length;i++){
					var t;
					if(d.data[i].type=="1"){
						t=d.data[i].salePrice+jstag("xmltext149");
					}else{
						t=d.data[i].integral+jstag("xmlvip33");
					}
						$(".sort_intro").append('<ol><li class="pic1"><img src="'+d.data[i].image+'"class="adaimg"/></li><li class="title">'+d.data[i].name+'</li><li class="content">'+t+'</li><li class="know_more"><a href="mallxq.html?id='+d.data[i].id+'">'+jstag("xmlmall22")+'></a></li></ol>')
				}
				img();
				paging1('.sort_intro ol', '#pagmall', 6);
			}
		})
	}) 
}