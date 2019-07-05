  var arrId=[]; 
  var foodPicId;
  var numPic=0;
  var sizePic;
  var timeS;
  var t=0;
  var length;
$(function(){ 
	repastxqDate(); 
	$(".restaurant").on("click",".left .btn_left",function(){
			moveL1();
	})
	 $(".restaurant").on("click",".left .btn_right",function(){ 
		   moveR1();	 
		})
}) 
//自动轮播
 //左边
 function moveL(){
 	numPic++;
	if(numPic==sizePic){
		$(".banner .img").css("left",0)	
	numPic=1;}
	$(".banner .img").stop().animate({left:-1000*numPic},500);
	if(numPic==sizePic-1){
		$(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
	}
	else{ 
	$(".banner .num li").eq(numPic).addClass("on").siblings().removeClass("on");
    }
}
	//右边
function moveR(){
	numPic--;
	if(numPic==-1){
		$(".banner .img").css("left",-1000*(sizePic-1))	
		numPic=sizePic-1;
	} 
	$(".banner .img").stop().animate({left:-1000*numPic},500);
	$(".banner .num li").eq(numPic).addClass("on").siblings().removeClass("on");
} 
var picSlideFood=function(){
	clearInterval(timeS);  
	var clone=$(".banner .img li").first().clone();
	$(".banner .img").append(clone);			
	 sizePic=$(".banner .img li").size();
	$('.banner .img').width(sizePic*1000);
	for(var j=0;j<sizePic-1;j++){ 
		$(".banner .num").append("<li></li>"); 
	} 
	$(".banner .num li").first().addClass("on") 
	//自动轮播
	 timeS=setInterval(moveL,3000);
	//控制自动轮播
	$(".banner .img li").hover(function(){
		clearInterval(timeS);
	},
	function(){
		 timeS=setInterval(moveL,3000);
	}) 
	//点击原点的滑动效果
	$(".banner .num li").click(function(){
		var index = $(".banner .num li").index(this);
		numPic=index 
		$(".banner .img").stop().animate({left:-1000*numPic},500);
		$(".banner .num li").eq(numPic).addClass("on").siblings().removeClass("on");
	})
	img();
}
//餐厅详情数据
var repastxqDate=function(){
	if(GetQueryString("id")==null){
		window.location.href="repast.html";
	} else { 
		var foodId;
	    var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="ctxxgl";
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
					arrId.push(parseInt(GetQueryString("id"))); 
					for (var i = items.length-1; i >=0; i--) {
						foodId=items[i].id;
						if(foodId!=GetQueryString("id")){
							var meetingxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right"><li class="title">'+jstag("xmltext185")+'</li><li>'+d.data[i].address+'</li><li class="title mg1">'+jstag("xmltext22")+'</li> <li>'+d.data[i].time+'</li></ul></div>'
							$('.restaurant .next_box').append(meetingxq); 
							arrId.push(foodId);
						}else{
							var meetingxq='<div class="restaurant_list"><ul class="left"><li class="title"><input type="button" value="<" class="hideInput_style btn btn_right"/><label>'+d.data[i].name+'</label><input type="button" value=">" class="hideInput_style btn btn_left"/></li><li class="content">'+d.data[i].text+'</li></ul><ul class="right"><li class="title">'+jstag("xmltext185")+'</li><li>'+d.data[i].address+'</li><li class="title mg1">'+jstag("xmltext22")+'</li> <li>'+d.data[i].time+'</li></ul></div>'
							$('.restaurant .next_box').prepend(meetingxq); 
						}
					}  
					if(arrId.length>0){
						foodPicId=arrId[0];
						imgData1();
					}  
				}
			}
		}) 
	} 
}
 function moveL1(){ 
 	t++; 
		if(t>=length){ 
			t--;
		}else{ 
			foodPicId=arrId[t]
			$(".restaurant .next_box").stop().animate({left:-1000*t},500); 
			imgData();
		}  
	} 
//右边
 function moveR1(){ 
		t--; 
		if(t<0){  
			t++;
		} else{ 
			foodPicId=arrId[t]
			$(".restaurant .next_box").stop().animate({left:-1000*t},500); 
			imgData();
		} 
	} 
	function imgData(){
		$('.food_pic .img').empty();
		$('.food_pic .num').empty();
		var foodPic="";
		var jsondatatyle;
	    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	    var json={};
			json["hotel"]=$('body').attr("data-id");
			json["ff"]="Byidcytp";
			var tyle = {};  
			tyle["cyid"] =foodPicId;
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
						for (var i = items.length-1; i >=0; i--) { 
						  foodPic+='<li><img src="'+d.data[i].img+'" class="adaimg"/></li>';
 						}
						 $('.food_pic .img').append(foodPic);
						img(); 
						picSlideFood();
					} 
				}
			})  
	}
function imgData1(){
	$('.food_pic .img').empty();
	$('.food_pic .num').empty();
	 var foodPic="";
//	$('.food_pic .img').empty();
	var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="Byidcytp";
		var tyle = {};  
		tyle["cyid"] =foodPicId;
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
					for (var i = items.length-1; i >=0; i--) { 
					 foodPic+='<li><img src="'+d.data[i].img+'" class="adaimg"/></li>';
 					}
					$('.food_pic .img').append(foodPic);
					img(); 
					picSlideFood();
				} 
			}
		})  
}
 