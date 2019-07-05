$(function(){ 
	picSlide();  
//	精选优惠
    var jsondatatyle;
	if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json2={};
		json2["hotel"]=$('body').attr("data-id");
		json2["ff"]="yhxxtj";
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
					for (var i = items.length-1; i >=0; i--) {
						$('.activity_box .next_box').append('<div class="activity_content actBox"><span class="pic_act"><img src="'+items[i].img+'" class="adaimg"/></span><ol class="actOl"><li class="top1">'+items[i].name+'</li><li class="title">'+items[i].zy+'</li><li class="line">——</li><li class="content">'+ellipsis(items[i].text,85)+'</li><li><a href="discountxq.html?id='+items[i].id+'">'+jstag("xmltext64")+' &nbsp;></a></li></ol></div>');	 
					} 
					contentSlide();
					img();
				}else{
					alertstyle(d.msg);
				}
			}
		})
})  
 //手动轮播
var contentSlide=function(){
	var i=0;
	var m=1;
	var length2=$('.activity_box .next_box .activity_content').length;
	$('.hotel_activity ul li .parent').text(length2); 
	$('.hotel_activity ul li .child').text('1');
	$('.activity_box .next_box').width(length2*981);  
	var size=$(".activity_box .next_box .activity_content").size();
	 //左边
     function moveL(){
     	i++; 
			if(i>=length2){ 
				i--;
			}else{
				$(".activity_box .next_box").stop().animate({left:-981*i},500);
				m++;
			}  
		} 
	//右边
	 function moveR(){
			i--; 
			if(i<0){  
				i++;
			} else{
				$(".activity_box .next_box").stop().animate({left:-981*i},500);
				m--;
			} 
		}
	$(".hotel_activity .btn_left").click(function(){
		moveL();
		$('.hotel_activity ul li .child').text(m);
	})
	$(".hotel_activity .btn_right").click(function(){
	   moveR();	
	   $('.hotel_activity ul li .child').text(m);
	}) 
}
 