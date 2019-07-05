$(function(){ 
	if(GetQueryString("id")==null){
		window.location.href="discount.html";
	} else { 
	    var jsondatatyle;
	    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
		var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="yhxxxq";
		var data={};
		data["yhid"]=GetQueryString("id");
		data["lang"] = language;
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
				if(d.id==1){
                    $('.hotel_intro .name').text(item.name);
				    $('.hotel_intro .title').text(item.zy); 
				    var pic='<img src="'+item.img+'"/>'
				    $('.hotel_intro .pic_firstRecommend').append(pic);
				    $('.recommend_detial .reContent').html(item.text); 
				}else{
					alertstyle(d.msg);
				}
			}
		}) 
		var json2={};
		json2["hotel"]=$('body').attr("data-id");
		json2["ff"]="yhxxtj";
		var data2={}; 
		data2["lang"] = language;
		json2["data"]=data2;
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"), 
			async: false,
			dataType: jsondatatyle,
			data: { json: JSON.stringify(json2)},
			success: function (date) {
			    var d;
			    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }				
				if(d.id==1){
					var items=d.data; 
					var recommendLength=3
					if(recommendLength>items.length){
						recommendLength=items.length
					} 
					for (var i = recommendLength-1; i >=0; i--) {
						$('.recommend_detial .sort_intro').append('<ol><li class="pic1"><img src="'+items[i].img+'"  class="adaimg"/></li> <li class="title">'+items[i].name+'</li><li class="content">'+items[i].zy+'</li><li class="know_more"><a href="discountxq.html?id='+items[i].id+'">'+jstag("xmltext64")+' &nbsp;></a></li></ol>');	 
					} 
					img();
				}else{
					alertstyle(d.msg);
				}
			}
		})
	}
})