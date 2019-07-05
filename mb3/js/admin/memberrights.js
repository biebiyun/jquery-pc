$(function(){
	 
	if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json={};
	var json2={};
	json2["hotel"]=$('body').attr("data-id");
	json2["ff"]="vipqy";
	var tyle={};
		tyle["lang"] = language;
		json2["data"]=tyle;
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
				  $('.profitContent').html(items[0].text);
			}
			else{
				alertstyle(d.msg);
			}
		}
	}) 
})