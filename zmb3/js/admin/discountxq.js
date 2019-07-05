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
		data["lang"] = language; 
		data["yhid"]=GetQueryString("id");
		json["data"]=data;
		$.ajax({
			type: "POST",
			url:  $('body').attr("data-url"), 
			async: false,
			dataType: jsondatatyle,
			data: { json: JSON.stringify(json)},
			success: function (date) {
			    var d;
			    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
				if(d.id==1){ 
				     var favorPic='<img src="'+d.data.img+'" class="adaimg"/>';
				    $('.favorable_detail .title').text(d.data.name);
				    $('.favorable_detail .pic_first').append(favorPic);
				    $('.favorable_detail .content').html(d.data.text);
				    $('.favorable_detail .time').text(jstag("xmltext193")+'：'+d.data.time); 
				    var shadeHeight=$('.favorable_content').height();
   				 	$('.shadeDiv').height(shadeHeight);
   				 	 img();
				}else{
					alertstyle(d.msg);
				} 
			}
		}) 
	}
})