$(function(){
	if(GetQueryString("id")==null){
		window.location.href="room.html";
	} else { 
		contentSlide2();
		var roomId;
	    var jsondatatyle;
	    var arrId=[];
	    var arrImg=[];
	    var roomImg="";
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="kfxxall";
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
					 length=items.length;  
					 $('.restaurant .next_box').width(length*1000); 
//					arrId.push(parseInt(GetQueryString("id")));
					for (var i = items.length-1; i >=0; i--) {
						roomId=items[i].id;
						if(roomId!=GetQueryString("id")){
							var roomxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right" data-idF="' + items[i].id + '"><li class="title1">'+jstag("xmltext58")+'&nbsp;&nbsp;'+ $.cookie("hotelTel")+'</li><li class="title2">'+jstag("xmltext45")+'</li></ul></div>'
							$('.restaurant .next_box').append(roomxq);  
 //							arrId.push(roomId);
							arrImg.push(items[i].img);
						}else{
							var roomxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right" data-idF="' + items[i].id + '"><li class="title1">'+jstag("xmltext58")+'&nbsp;&nbsp;'+ $.cookie("hotelTel")+'</li><li class="title2">'+jstag("xmltext45")+'</li></ul></div>'
							$('.restaurant .next_box').prepend(roomxq); 
							arrImg.unshift(items[i].img);
						}
						if(items[i].ptss!=""&&items[i].ptss!=null){
				      		var regex = new RegExp('//', 'g'); // 使用g表示整个字符串都要匹配
			                var result = items[i].ptss.match(regex);
			                var count = !result ? 0 : result.length;
			                var label = "";
			                if (count > 0) {
			                    var labeltext = items[i].ptss.split("//"); 
			                    for (var n = 0; n < labeltext.length; n++) {
			                        label += '<li>&#9830;&nbsp;&nbsp;' + labeltext[n] + '</li>';
			                     }
			                } else {
			                    label ='<li>&#9830;&nbsp;&nbsp;' + items[i].ptss + '</li>'; 
			                } 
			                $('.restaurant_list .right[data-idF="' + items[i].id + '"]').append(label);
		           		 } 	
					} 
					for(var t=arrImg.length-1;t>=0;t--){
						roomImg+='<li style="background-image:url('+arrImg[t]+')"></li>';
  					}
					$(".index_banner1 .focus ul").append(roomImg);
				} 
			}
		}) 
	} 
})
//手动滑动
var contentSlide2=function(){
	var i=0
//	var length=$('.restaurant .next_box .restaurant_list').length;  
//	$('.restaurant .next_box').width(length*1000) 
	 function moveL(){
     	i++;  
			if(i>=length){ 
				i--;
			}else{
				$(".restaurant .next_box").stop().animate({left:-1000*i},500); 
				$(".index_banner1 .focus ul li").hide();
        		$(".index_banner1 .focus ul li").eq(length-i-1).show();
			}  
		} 
	//右边
	 function moveR(){
			i--; 
			if(i<0){  
				i++;
			} else{
				$(".restaurant .next_box").stop().animate({left:-1000*i},500); 
				$(".index_banner1 .focus ul li").hide();
        		$(".index_banner1 .focus ul li").eq(length-i-1).show();
			} 
		}
	$(".restaurant").on("click",".left .btn_left",function(){
		moveL(); 
	})
	$(".restaurant").on("click",".left .btn_right",function(){
	   moveR();	 
	})
}