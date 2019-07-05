var pagenub=6;
var showpagenub=5;
var l;
var pagjson=[];
$(function(){
	var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="xwxxall";
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
				var m=""; 
				if(d.id==1){
					var items=d.data; 
					pagjson=[];
					for (var i = 0; i <items.length; i++) {
						var tyle={}; 
						tyle["zbt"]=items[i].name; 
						tyle["fbt"]=items[i].zy;
						tyle["zt"]=items[i].img;
						tyle["xwid"]=items[i].id;
						pagjson.push(tyle);
					}
					paging(pagjson,"#pagnews");
					img();
				}
				var shadeHeight=$('.favorable_content').height();
   				 $('.shadeDiv').height(shadeHeight);
			}
		}) 
		
})
/*根据页码加载内容*/ 
function pageitem(e){
   $('.favorable_list').empty();
	var overpage;
	if(e==Math.ceil(l/pagenub)){
		overpage=l;
	}else{
		overpage=pagenub*e;
	}
	for(var np=(pagenub*(e-1));np<overpage;np++){
	    $('.favorable_list').append('<div class="list"><div class="pic_first"><img src="'+pagjson[np].zt+'" class="adaimg"/></div><ul><li class="title">'+pagjson[np].zbt+'</li><li class="content">'+pagjson[np].fbt+'</li><li class="more"><a href="newsxq.html?id='+pagjson[np].xwid+'">'+jstag("xmltext64")+'></a></li></ul></div>');
	}
}
