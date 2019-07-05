$(function(){ 
	window.onload=function(){
		$('#loading').hide();
		$('#layer_load').hide(); 
	}  
	$.cookie("hotelId", $('body').attr("data-id"), {
				path: '/'
		});
	$(".room_booked input").click(function(){
		$.cookie("hotelId", $('body').attr("data-id"), {
				path: '/'
		});
		window.location.href='../book1.html';
	})
	$(".index_title .title_second").fadeIn(1000);
	var winHeight = document.documentElement.scrollTop || document.body.scrollTop;  
	if(winHeight>145){
      	$(".index_title .title_second").fadeOut(1000);
      	 $(".head").fadeOut(1000);
      }
	 else{
      	$(".index_title .title_second").fadeIn(1000);
      	 $(".head").fadeIn(1000);
      } 
	window.onscroll = function(){
    //t表示屏幕滚动的距离
	   var t = document.documentElement.scrollTop || document.body.scrollTop;  
//	   if(t>100){
//	   	  	$(".index_title .title_second").css("opacity",1-(t-100)*0.01);
//			$(".head").css("opacity",1-(t-100)*0.01); 
//	   } 
 		 if(t>145){
          	$(".index_title .title_second").stop().fadeOut(1000);
          	 $(".head").stop().fadeOut(1000);
          }
 		 else{
          	$(".index_title .title_second").fadeIn(1000);
          	 $(".head").fadeIn(1000);
          } 
	};
//	获取屏幕高度并赋值给banner
    var winHeight=$(window).height();
    $('.index_banner').height(winHeight+70);
    var contentHeight=winHeight-835;
    $('.favorable_list').css("min-height",contentHeight);
//  遮罩部分高度
    var shadeHeight=$('.favorable_content').height();
    $('.shadeDiv').height(shadeHeight);
    $('.about_content').css("top",winHeight+'px'); 
    $('.shadeDiv1').height(winHeight);
	bannerSlide();
	downList(); 
    hideOpinion(); 
    navList();
    hotelMsg();
})

//手动滑动
var contentSlide=function(){
	var i=0
	var length=$('.restaurant .next_box .restaurant_list').length;  
	$('.restaurant .next_box').width(length*1000) 
	 function moveL(){
     	i++;  
			if(i>=length){ 
				i--;
			}else{
				$(".restaurant .next_box").stop().animate({left:-1000*i},500); 
			}  
		} 
	//右边
	 function moveR(){
			i--; 
			if(i<0){  
				i++;
			} else{
				$(".restaurant .next_box").stop().animate({left:-1000*i},500); 
			} 
		}
	$(".restaurant .left .btn_left").click(function(){
		moveL(); 
	})
	$(".restaurant .left .btn_right").click(function(){
	   moveR();	 
	})
}
//头部下拉列表
var downList=function(){ 
	$(".head_choose .input").click(function(){
		$(this).next().show();
	})
	$(".head_choose .select li").click(function(){
		$(this).parent().parent().prev().find("p").text($(this).text());
		$(this).parent().parent().hide();
	}) 
	$(".choose_box .input").click(function(){
		$(this).next().show();
	})
	$(".choose_box .select li").click(function(){
		$(this).parent().parent().prev().find("p").text($(this).text());	 
		$(this).parent().parent().hide();
	})  
}
//微信分享
var wxShare=function(){
	$('.wx i').eq(0).on('mouseenter',function(){
		$('.wx .wxShare').show();
	})
	$('.wx i').eq(0).on('mouseleave',function(){
		$('.wx .wxShare').hide();
	})
	$('.wb i').eq(0).on('mouseenter',function(){
		$('.wb .wxShare').show();
	})
	$('.wb i').eq(0).on('mouseleave',function(){
		$('.wb .wxShare').hide();
	})
}
 
//点击页面其它地方隐藏该div
var hideOpinion=function(){
	function stopPropagation(e) { 
	if (e.stopPropagation) 
	e.stopPropagation(); 
	else 
	e.cancelBubble = true; 
	}  
	$(document).bind('click',function(){ 
	$('.head_choose .select').css('display','none'); 
	$('.choose_box .select').css('display','none'); 
	});  	
	$('.head_choose .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.choose_box .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
}
//banner图滚动效果
var bannerSlide=function(){
	var j = 0;  
	$(".index_banner .focus li").hide();
	$(".index_banner .focus li").eq(j).fadeIn(1000);
    setInterval(function () {
        j++;
        if (j == $('.index_banner .focus ul li').length) { j = 0; }
        $(".index_banner .focus ul li").fadeOut(1000);
        $(".index_banner .focus ul li").eq(j).fadeIn(1000);
        $(".title_second .num li").eq(j).addClass("one").siblings().removeClass("one");
    }, 5000) 
    var size=$(".index_banner .focus ul li").size();
		for(var i=0;i<size;i++){ 
			$(".title_second .num").append("<li></li>"); 
		} 
		$(".title_second .num li").first().addClass("one")
		//点击原点的滑动效果
		$(".title_second .num li").click(function(){
			var index = $(".title_second .num li").index(this);
			i=index
			$(".index_banner .focus ul li").fadeOut(1000);
        	$(".index_banner .focus ul li").eq(i).delay(800).fadeIn(1000);
			$(".title_second .num li").eq(i).addClass("one").siblings().removeClass("one");
		})
}
//头部导航
var navList=function(){
	var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
var json4 = {};
	json4["hotel"] = $('body').attr("data-id");
	json4["ff"] = "dhgl";
	var data = {};
	data["lang"] = language;
	json4["data"] = data;
	$.ajax({
	    type: "POST",
		url: $('body').attr("data-url"),
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json4)},
	    success: function (date) { 
	        var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); } 
	    	if(d.id=='1'){
	    		var items=d.data;
	    		for(var i=0;i<items.length;i++){ 
	    			var navList='<li><a href="'+items[i].lj+'">'+items[i].name+'</a></li>'
	    			$('.nav_list').append(navList); 
	    		}  
	    	}
	    }
	}) 	
}
//获取酒店信息
var hotelMsg=function(){
	var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
var json4 = {};
	json4["hotel"] = $('body').attr("data-id");
	json4["ff"] = "jdxx";
	var data = {};
	data["lang"] = language;
	json4["data"] = data;
	$.ajax({
	    type: "POST",
		url: $('body').attr("data-url"),
		async: false,
		dataType: jsondatatyle,
		data: { json: JSON.stringify(json4)},
	    success: function (date) { 
	        var d;
		    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); } 
	    	if(d.id=='1'){
	    		var items=d.data;
	    		$(".hotelLogo").attr('src',items[0].logo);
	    		$('.wb').html('<a href="'+items[0].wbdz+'"><i></i><img class="wxShare" src="'+items[0].wbimg+'" /></a>');
	    		$('.wx').html('<a><i></i><img class="wxShare" src="'+items[0].wximg+'" /><a>');
	    		$(".hotelName").html(items[0].name);
	    		$(".indexAbout").html(ellipsis(items[0].text,100));
	    		var hotelTel=items[0].tel;
	    		 $.cookie("hotelTel",hotelTel, { path: '/' }); 
	    		 wxShare();
	    	}
	    }
	}) 	
}

