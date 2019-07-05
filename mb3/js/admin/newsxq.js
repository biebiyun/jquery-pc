$(function(){
	if(GetQueryString("id")==null){
		window.location.href="news.html";
	} else { 
	    var jsondatatyle;
	    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
		var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="xwxxxq";
		var data={};
		data["xwid"]=GetQueryString("id");
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
				if(d.id==1){ 
				     var newsPic='<img src="'+d.data.img+'"/>'; 
				    $('.news_detial .name').html(d.data.time.substring(0,10));
				    $('.news_detial .title').html(d.data.name);
				    $('.news_detial .pic_main').append(newsPic);
				    $('.news_detial .content_news').html(d.data.text);  
				}else{
					alertstyle(d.msg);
				} 
			}
		}) 
	}
})