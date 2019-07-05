$(function(){ 
	if(GetQueryString("id")==null){
		window.location.href="facilities.html";
	} else {
	    var jsondatatyle;
	    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
		var json={};
		json["hotel"] = $('body').attr("data-id");
		json["ff"]="getjdssbyid";
		var data={};
		data["id"]=GetQueryString("id");
		data["lang"]=language;
		json["data"]=data;
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
				   $('.facilities_detail ul .title').html(items.name);
				   $('.facilities_detail ul .content').html(items.text);
				   $('.facilities_detail ul li').eq(2).html(jstag("xmltext22")+'：'+items.time); 
	 		   	if(d.data.imgs.length>0){
			   		 	var pic='<img src="'+d.data.imgs[0].img+'" class="adaimg"/>'
			   		 $('.facilities_detail .pic_first').append(pic);
				   	for(var i=0;i<d.data.imgs.length;i++){ 
						 var facilityPic='<li><img src="'+d.data.imgs[i].img+'" class="adaimg"/></li>';	      
				   		 $('.banner .img').append(facilityPic);
				   	}
				}  
				picSlide();
			}
			}
		}) 
	}
	 
})
//自动轮播
var picSlide=function(){
	var i=0;
	var clone=$(".banner .img li").first().clone();
	$(".banner .img").append(clone);			
	var size=$(".banner .img li").size();
	$('.banner .img').width(size*1000); 
	 //左边
	 function moveL(){
	 	i++;
		if(i==size){
			$(".banner .img").css("left",0)	
		i=1;}
		$(".banner .img").stop().animate({left:-1000*i},500);
		 
	}
	//右边
 	function moveR(){
		i--;
		if(i==-1){
			$(".banner .img").css("left",-1000*(size-1))	
			i=size-2;
		} 
		$(".banner .img").stop().animate({left:-1000*i},500); 
	}  
	$(".banner .btn_l").click(function(){
		moveL();
	})
	$(".banner .btn_r").click(function(){
	moveR();					
	}) 
	img();
}