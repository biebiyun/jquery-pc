$(function(){
    if(GetQueryString("ddh")==null){
        window.location.href="book1.html";
    } else {
        var jsondatatyle;
        if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
            var json = {};
            json["hotel"] =$.cookie("hotelId");
            json["ff"] = "cxddxx";
            var tyle = {};
            tyle["lang"]=language;
            tyle["ddh"] =GetQueryString("ddh");
            json["data"] = tyle;
            $.ajax({
                type: "POST",
                url: $('body').attr("data-url"), 
                dataType: jsondatatyle,
                data: { json: JSON.stringify(json) },
                success: function (date) {
                    var d;
                    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
                    if (d.id == 1) {
                        var item = d.data;
                        console.log(item);
                         $('.order_content .left li').eq(1).html(jstag("xmlbook56")+':'+'&nbsp;'+GetQueryString("ddh")); 
                         $('.order_content .left li').eq(3).html(jstag("xmlbook7")+':'+'&nbsp;'+timeConvert2(item.intime)+'&nbsp;'+getWeek(item.intime));
                         $('.order_content .left li').eq(4).html(jstag("xmlbook8")+':'+'&nbsp;'+timeConvert2(item.outtime)+'&nbsp;'+getWeek(item.outtime));
                         $('.order_content .left li').eq(5).html(jstag("xmlbook39")+':'+'&nbsp;'+item.fs);
                         $('.order_content .left li').eq(6).html(jstag("xmlbook27")+':'+'&nbsp;'+(parseInt(item.dr)+parseInt(item.xh)));
                         $('.order_content .left li').eq(7).html(jstag("xmlbook11")+':'+'&nbsp;'+item.kfm);
                         $('.order_content .left li').eq(8).html(jstag("xmlbook12")+':'+'&nbsp;'+(+item.fj).toFixed(2)+jstag("xmltext149"));
                         $('.order_content .right li').eq(1).html(jstag("xmlvip9")+':'+'&nbsp;'+item.sex);
                         $('.order_content .right li').eq(2).html(jstag("xmlbook15")+':'+'&nbsp;'+item.name);
                         $('.order_content .right li').eq(3).html(jstag("xmlbook16")+':'+'&nbsp;'+item.tel);
                    }
                }
            })
	}
})