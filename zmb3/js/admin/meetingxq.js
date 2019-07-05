var length;
$(function(){
	if(GetQueryString("id")==null){
		window.location.href="meeting.html";
	} else { 
		contentSlide1();
		var meetingId; 
	    var arrId=[];
	    var arrImg=[];
	    var meetImg="";
	     var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="hytxx";
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
//					meetingxq(parseInt(GetQueryString("id")))
					for (var i = items.length-1; i >=0; i--) {
						meetingId=items[i].id; 
						if(meetingId!=GetQueryString("id")){
//							arrId.push(meetingId);
//							setTimeout(meetingxq(meetingId), 1000);
							var meetingxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right"><li class="title">'+jstag("xmltext185")+'</li><li>'+d.data[i].address+'</li><li class="title mg1">'+jstag("xmltext22")+'</li> <li>'+d.data[i].time+'</li></ul></div>'
							$('.restaurant .next_box').append(meetingxq);
							arrImg.push(items[i].img);
						}else{
							var meetingxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right"><li class="title">'+jstag("xmltext185")+'</li><li>'+d.data[i].address+'</li><li class="title mg1">'+jstag("xmltext22")+'</li> <li>'+d.data[i].time+'</li></ul></div>'
							$('.restaurant .next_box').prepend(meetingxq);
							arrImg.unshift(items[i].img);
						}
					} 
					for(var t=arrImg.length-1;t>=0;t--){
						meetImg+='<li style="background-image:url('+arrImg[t]+')"></li>';
  					}
					$(".index_banner1 .focus ul").append(meetImg);
				} 
			}
		}) 
	}
})  
//手动滑动
var contentSlide1=function(){
	var i=0 
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