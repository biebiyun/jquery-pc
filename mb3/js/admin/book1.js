$(function () {
	if ($.cookie("hotelId") == "" || $.cookie("hotelId") == null) {
		 window.location.href = "index.html";		        
	} 
	 $(".peoplechoose .input").click(function(){ 
		$(this).next().show(); 
	}) 
	 $('.peoplechoose .select li input').click(function () { 
	    $(this).parent().parent().parent().prev().val($(this).val()); 
		$(this).parent().parent().parent().hide();
      });
	recommend();
    var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }  
   $('.choose_roomTitle label').html(getWeek($.cookie("intime"))+' , '+timeConvert2( $.cookie("intime"))+'<i></i>'+getWeek($.cookie("outtime"))+' , '+timeConvert2( $.cookie("outtime")))
  	var json={};
	json["hotel"]= $.cookie("hotelId");
	json["ff"]="kfxxall"; 
	var tyle={};
	tyle["lang"]=language;
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
				for (var i=0;i<items.length;i++) { 
			      var roomItems='<div class="room_list" data-id="' + items[i].fxm + '" data-idR="' + items[i].id + '"><div class="clearfix"><ul><li class="top">'+items[i].name+'</li><li class="top1">'+items[i].cx+'</li></ul><div class="room_num"><label>'+jstag("xmlbook39")+'</label><input type="button" value="-" class="minus"/><label class="text" data-nub="">1</label><input type="button" value="+" class="plus"/></div></div><div class="clearfix"><div class="faciItem" data-idR="' + items[i].id + '" style="float: left;"><div class="room_pic clearfix"><img src="'+items[i].img+'" class="adaimg"/> </div><p class="first">'+items[i].mj+'㎡</p></div> <ol></ol></div> </div> '
			      	if(items[i].ptss!=""&&items[i].ptss!=null){
			      		var regex = new RegExp('//', 'g'); // 使用g表示整个字符串都要匹配
		                var result = items[i].ptss.match(regex);
		                var count = !result ? 0 : result.length;
		                var label = "";
		                if (count > 0) {
		                    var labeltext = items[i].ptss.split("//"); 
		                    for (var n = 0; n < labeltext.length; n++) {
		                        label += '<p>&#9830;&nbsp;&nbsp;' + labeltext[n] + '</p>';
		                     }
		                } else {
		                    label ='<p>&#9830;&nbsp;&nbsp;' + items[i].ptss + '</p>'; 
		                } 
				      $('.room_show').append(roomItems);
				       $('.faciItem[data-idR="' + items[i].id + '"]').append(label);
			      	}else{
			      		 $('.room_show').append(roomItems);
			      	}
			      	
				}
			}
			$('.room_show .room_list').hide();
			img();
		}
	})
	var json2={};
	json2["hotel"]=$.cookie("hotelId");
	json2["ff"]="fjcx";
	var tyle={};
	if($.cookie("viplev")!=""&&$.cookie("viplev")!=null){
	    tyle["fjfl"] = "hy";
	    tyle["hydj"] = $.cookie("viplev");
	}else{
		tyle["fjfl"]="sk";
	}
	tyle["lang"]=language;
	tyle["kssj"]=$.cookie("intime");
    tyle["jssj"]=$.cookie("outtime"); 
	json2["data"] = tyle; 
	$('.room_show .room_list').hide();
	$.ajax({
		type: "POST",
		url: $('body').attr("data-url"),
		beforeSend: function () { $('#loading,#layer_load').show(); },
		complete: function () { $('#loading,#layer_load').hide(); },
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json2)},
		success: function (date) {
		    var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
			if(d.id==1){ 
				var items=d.data; 
				for (var i = 0; i < items.length; i++) { 
					if(items[i].fl==0){
						$('.room_show .room_list[data-id="'+items[i].fx+'"]').find(".text").text(jstag("xmlbook64"));
						$('.room_show .room_list[data-id="'+items[i].fx+'"]').find(".minus").hide();
						$('.room_show .room_list[data-id="'+items[i].fx+'"]').find(".plus").hide();
						$('.room_show .room_list[data-id="'+items[i].fx+'"]').hide();
					}else{
					    $('.room_show .room_list[data-id="' + items[i].fx + '"]').find('.text').attr("data-nub", items[i].fl);
					    $('.room_show .room_list[data-id="' + items[i].fx + '"]').find('.text').text("1");
					    $('.room_show .room_list[data-id="' + items[i].fx + '"]').find(".minus").show();
					    $('.room_show .room_list[data-id="' + items[i].fx + '"]').find(".plus").show();
					    $('.room_show .room_list[data-id="' + items[i].fx + '"]').show(); 
						$('.room_show .room_list[data-id="' + items[i].fx + '"]').find("ol").append('<li class="mg10" data-fjm="' + items[i].fjm + '"><span class="price_intro">'+items[i].bjxx+'</span><span class="price room_price">'+(+items[i].roomrate).toFixed(2)+'</span><span class="price">'+jstag("xmltext134")+'</span><a><input type="button" class="hideInput_style" value="'+jstag("xmltext188")+'"/></a></li>');
 					} 
				}
				 $('.room_num').on("click",".minus",function (){
			        var l = $(this).parent().find('.text').attr("data-nub");
			        var t = $(this).parent().find('.text').text();
			        if (parseInt(t) > 1) {
			            t = parseInt(t) - 1;
			           $(this).parent().find('.text').text(t);
			        }
			        else {
			            alertstyle(jstag("xmlscript19"));
			        } 
			    })
			    $('.room_num').on("click",".plus",function () {
			        var l = $(this).parent().find('.text').attr("data-nub");
			        var t = $(this).parent().find('.text').text();
			        if (parseInt(t) < parseInt(l)) {
			            t = parseInt(t) + 1;
			            $(this).parent().find('.text').text(t);
			        }
			        else {
			            alertstyle(jstag("xmlscript20"));
			        } 
			    })
			    $('.room_list').on("click","ol li a input",function () { 
					if($(this).parents(".room_list").find(".text").text()==jstag("xmlbook64")){
						alertstyle(jstag("xmlscript21"));
					}else{
						$.cookie("ydkfm", $(this).parents('.room_list').find('ul').find('li').eq(0).text(), { path: '/' });
						$.cookie("ydfxm", $(this).parents('.room_list').attr("data-id"), { path: '/' });
						$.cookie("ydnub", $(this).parents('.room_list').find(".text").text(), { path: '/' });
						$.cookie("ydfjm", $(this).parent().parent().attr("data-fjm"), { path: '/' });
						$.cookie("oneprice", $(this).parent().parent().find(".room_price").text(), { path: '/' });
						$.cookie("bak", $(this).parent().parent().find(".price_intro").text(), { path: '/' });
						$.cookie("adult", $(".peoplechoose .adult").val(), { path: '/' });
						$.cookie("child", $(".peoplechoose .child").val(), { path: '/' });
						$.cookie("ydrxx", "", { path: '/' });
						$.cookie("roomID",$(this).parents('.room_list').attr("data-idR"), { path: '/' });
						window.location.href="book2.html";
					}
				}) 
				img();
			} 
		}
	}) 
})
 var recommend=function(){
	var jsondatatyle;
	if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json2={};
		json2["hotel"]=$.cookie("hotelId");
		json2["ff"]="jdjsxx";
		var tyle={};
	tyle["lang"]=language;
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
					if(items.length>0) {
						$('.room_head').append('<div class="activity_content mg9"><span class="pic_act1"><img src="'+items[0].img+'" class="adaimg"/></span><ol class="actOl1"><li class="top1">'+jstag('xmltext178')+'</li><li class="title">'+items[0].name+'</li><li class="line">——</li><li class="content">'+ellipsis(items[0].text,150)+'</li><li><a href="./' + $.cookie("hotelId") + '/index.html">'+jstag("xmltext64")+'&nbsp;></a></li></ol></div>');	 
					}  
					img();
				}else{
					alertstyle(d.msg);
				}
			}
		})
}
