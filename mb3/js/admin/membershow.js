$(function(){
	 
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	json["hotel"]=$('body').attr("data-id");
	json["ff"]="vipjs";
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
			if(d.id==1){ 
				 var items=d.data;  
				 $('.memberContent').html(items[0].text);
			}
			else{
				alertstyle(d.msg);
			}
		}
	})
})