$(function(){
	var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="jdssxxgl";
		var tyle = {};  
		tyle["lang"] = language; 
		json["data"]=tyle; 
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
					var items=d.data;  
					for (var i = 0; i <items.length; i++) {
						var facilities='<div class="list"><div class="pic_first"><img src="'+items[i].img+'" class="adaimg"/></div><ul><li class="title">'+items[i].name+'</li><li class="content">'+removeHTMLTag(items[i].text)+'</li><li class="more"><a href="facilitiesxq.html?id='+items[i].id+'">'+jstag("xmltext64")+'></a></li></ul></div>' 
						$('.favorable_list').append(facilities);
					}
					img();
					 var shadeHeight=$('.favorable_content').height(); 
   				 	$('.shadeDiv').height(shadeHeight);
				} 
			}
		}) 
		
})