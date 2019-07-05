 
$(function () {  
    var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	json["hotel"]=$('body').attr("data-id");
	json["ff"]="xwxxall";
	var tyle = {}; 
	tyle["lang"] =language; 
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
		  	if(d.id==1){
				var items=d.data; 
				var pagjson=[];
				for (var i = items.length-1; i >=0; i--) {
					var tyle={}; 
					tyle["zbt"]=items[i].name; 
					tyle["time"]=items[i].time;
					tyle["fbt"]=items[i].zy;
					tyle["xwid"]=items[i].id;
					tyle["img"]=items[i].img;
					pagjson.push(tyle); 
				} 
				for(var np=0;np<pagjson.length;np++){
					$('.news_content').append('<ul><li class="news_pic"><img src="'+pagjson[np].img+'" class="adaimg"/></li><li class="title">'+pagjson[np].zbt+'</li><li class="time">'+pagjson[np].time.substring(0,10)+'</li><li class="content">'+ellipsis(pagjson[np].fbt,92)+'</li><li class="more"><a href="newsxq.html?id='+pagjson[np].xwid+'">'+jstag("xmltext114")+'</a> ></li></ul>');
				}
				paging1('.news_content ul', '#pagNews', 6);
				img();
			}
		}
	}) 
})	
 
 
 