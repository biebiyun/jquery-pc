
$(function(){
	window.onload=function(){
		$('#loading').hide();
		$('#layer_load').hide();
	}
	headList();
	window.onscroll = function(){
        //t表示屏幕滚动的距离
		   var t = document.documentElement.scrollTop || document.body.scrollTop;  
		   if(t>=330){
		   $(".nav").css("position",'fixed');
		   $(".nav").css("z-index",44);
		   $(".nav").css("background","#fff");
		   $(".nav").css("top",'70px');
	 		$(".navhide").show();
		   }
		   else
		   {
		   	$(".nav").css("position",'static');
		   $(".navhide").hide();
		   }
     	};
	hotelSon(); 
	var j = 0;
	if($.cookie("vipname")!=null&&$.cookie("vipname")!=""){
			$('.head_right li a input').eq(0).val($.cookie("vipname")+","+jstag("xmlvip66"));  
		}else{ 
			$('.head_right li a input').eq(0).val(jstag("xmlvip7"))
		}
	$(".index_banner .focus li").hide();
	$(".index_banner .focus li").eq(j).fadeIn(1000);
    setInterval(function () {
        j++;
        if (j == $('.index_banner .focus li').length) { j = 0; }
        $(".index_banner .focus li").fadeOut(1000);
        $(".index_banner .focus li").eq(j).fadeIn(1000);
    }, 5000)  
	hideOpinion();
	personMessage(); 
	inputPwd(); 
	navShow();
	hotelMsg();  
})  
//头部下拉列表
var headList=function(){ 
	$(".choose_box .input").click(function(){
		$(this).next().show();
	})
	$(".choose_box .select li input").click(function(){
		$(this).parent().parent().parent().prev().val($(this).val());
		$(this).parent().parent().parent().prev().attr('data-id',$(this).attr('data-id'));
		$.cookie("hotelId", $('#hotelID').attr('data-id'), { path: '/' });
		$.cookie("hotelName", $('#hotelID').val(), { path: '/' }); 
		$(this).parent().parent().parent().hide();
	})
	$(".regsex .reginput").click(function(){
		$(this).next().show();
	})
	$(".regsex .select li").click(function(){
		$(this).parent().parent().prev().find("p").text($(this).text()); 
		$(this).parent().parent().hide();
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
	$('.regsex .select').css('display','none');
	$('.timechoose .select').css('display','none');
	$('.store_price ul').css('display','none');
	$('#rl').hide();
	$(".store_tap .store_sort .moresort ul").hide();
	 $(".mall-fare .costs_details").slideUp();
//		$(".addrBox").hide();
	}); 
//	$('.addrMsg').bind('click',function(e){ 
//		stopPropagation(e); 
//	});
	$(".mall-fare strong").bind('click',function(e){ 
		stopPropagation(e); 
	}); 
	$('.store_tap .store_sort .moresort .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('#outtime').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('#intime').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.head_choose .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.regsex .reginput').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.choose_box .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.timechoose .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
	$('.store_price .input').bind('click',function(e){ 
	stopPropagation(e); 
	});
}

//点击我的酒店显示隐藏
var personMessage=function(){
	//判断是否登录
	//点击我的酒店  
	$('.head_right li a input').eq(0).on('click',function(){
		  $("#phoneLog").hide();  
		   $("#pwd1").hide();  
		if($.cookie("vipname")!=null&&$.cookie("vipname")!=""){
			vipxx($.cookie("vipkh"));  
		}else{  
			$('.login').show();
			$('#phoneLog1').val(jstag("xmlbook16"));
			$('#phoneLog1').show();
			$('#phoneLog').val("");
			$('#showPwd1').val(jstag("xmlvip51")); 
			$('#showPwd1').show();
			$('#Pwd1').val(""); 
		}  
		$('#shadow').show();   
		$(this).addClass("color1"); 
   })  
//	注册进入点击立即登录
	$('.register').on('click','.enter_left1 p a input',function(){
		$('.login').show();
		$('#phoneLog').val("");
		$('#phoneLog').hide();
		$('#phoneLog1').show();
		$('#phoneLog1').val(jstag("xmlbook16")); 
		$('#pwd1').val("");
		$('#pwd1').hide();
		$('#showPwd1').show();
		$('#showPwd1').val(jstag("xmlvip51")); 
		$('.register').hide();
	})
	//	忘记密码进入点击立即登录
	$('.forgetPW').on('click','.enter_left1 p a input',function(){
		$('.login').show();
		$('#phoneLog').val("");
		$('#phoneLog').hide();
		$('#phoneLog1').show();
		$('#phoneLog1').val(jstag("xmlbook16")); 
		$('#pwd1').val("");
		$('#pwd1').hide();
		$('#showPwd1').show();
		$('#showPwd1').val(jstag("xmlvip51")); 
		$('.forgetPW').hide()
	}) 
	//储值记录
	$('.person_right ul li a input').eq(0).on('click',function(){ 
		$('.personMessage').hide()
		$('.storeRecord').show()
	}) 
	//积分储值返回个人中心
	$('.record_right p a input').on('click',function(){ 
		 $(this).parents('.record_right').parent().hide();
		 $('.personMessage').show();
	})
	//点击遮罩隐藏个人信息页面
	$('#shadow').on('click',function(){
		$('#shadow').hide();
		$('.enter_content').hide();
		$('.head_right li a input').removeClass("color1"); 
	}) 
	//点击预订查询
	$('.enter_content ul li .searchB').on('click',function(){ 
		$('#orOrder').val("");
		$('#orOrder').hide();
		$('#orOrder1').show();
		$('#orOrder1').val(jstag("xmlbook68"));
		$('#orPhone').val("");
		$('#orPhone').hide();
		$('#orPhone1').show();
		$('#orPhone1').val(jstag("xmlbook16")); 
		$('#orName').val("");
		$('#orName').hide();
		$('#orName1').show();
		$('#orName1').val(jstag("xmlbook15"));   
		$(".enter_content").hide();
		$('.searchBooking').show();
	}) 
	$('.enter_content .searchBooked ul li input').eq(0).on('click',function(){
		$(this).parents('.searchBooked').parent().hide();
		$('.searchBooking').show();
		$('#orOrder').val("");
		$('#orOrder').hide();
		$('#orOrder1').show();
		$('#orOrder1').val(jstag("xmlbook68"));
		$('#orPhone').val("");
		$('#orPhone').hide();
		$('#orPhone1').show();
		$('#orPhone1').val(jstag("xmlbook16")); 
		$('#orName').val("");
		$('#orName').hide();
		$('#orName1').show();
		$('#orName1').val(jstag("xmlbook15")); 
	})
	//查询结果进入登录
	$('.enter_content .searchBooked ul li input').eq(1).on('click',function(){
		$(this).parents('.searchBooked').parent().hide();
		if($.cookie("vipname")!=null&&$.cookie("vipname")!=""){
			$('.personMessage').show();  
		}else{
			$('.login').show();
			$('#phoneLog').val("");
			$('#phoneLog').hide();
			$('#phoneLog1').show();
			$('#phoneLog1').val(jstag("xmlbook16")); 
			$('#pwd1').val("");
			$('#pwd1').hide();
			$('#showPwd1').show();
			$('#showPwd1').val(jstag("xmlvip51")); 
		}
	})
	  
	//预订查询进入登录
	$('.searchBooking .enter_left p a input').on('click',function(){ 
		 $(this).parents('.enter_left').parent().hide();
		 if($.cookie("vipname")==''||$.cookie("vipname")==null){
		 	 $('.login').show();
			$('#phoneLog').val("");
			$('#phoneLog').hide();
			$('#phoneLog1').show();
			$('#phoneLog1').val(jstag("xmlbook16")); 
			$('#pwd1').val("");
			$('#pwd1').hide();
			$('#showPwd1').show();
			$('#showPwd1').val(jstag("xmlvip51")); 
		 }else{
		 	$('.personMessage').show();
		 }
		
	})
	//点击房间预订
	$('.head').on('click','ul li .room_booked input',function(){  
		 $('.choose_room').toggle();
	})
 
//	进入修改密码
    $('.logined .changePwd2').on('click',function(){
    	$(this).parents('.logined').parent().hide();
    	$('.changePwd').show();
    	$('.changePwd .enter_right input').eq(1).hide();
    	$('.changePwd .enter_right input').eq(1).val("");
    	$('.changePwd .enter_right input').eq(0).show();
    	$('.changePwd .enter_right input').eq(3).hide();
    	$('.changePwd .enter_right input').eq(3).val("");
    	$('.changePwd .enter_right input').eq(2).show();
    	$('.changePwd .enter_right input').eq(5).hide();
    	$('.changePwd .enter_right input').eq(5).val("");
    	$('.changePwd .enter_right input').eq(4).show(); 
    })
//  修改密码进入个人中心
    $('.changePwd .enter_left1 p a input').on('click',function(){
    	$('.changePwd').hide();
    	$('.personMessage').show();
    })
}

//图片自动轮播
var picSlide=function(){ 
	var clone=$(".banner .img li").first().clone();
	var clone2=$(".banner .img li").eq(1).clone();
	$(".banner .img").append(clone);
	$(".banner .img").append(clone2);
	var length1=$('.banner .img li').length;  
	$('.banner .img').width(length1*760)  
	 var i=0; 
	var size=$(".banner .img li").size();  
     //左边
     function moveL(){  
     	i++;
			if(i==size-1){
				$(".banner .img").css("left",0)	
			i=1;}
			$(".banner .img").stop().animate({left:-760*i},500); 
		} 
	//自动轮播
	var t=setInterval(moveL,3000);
	//控制自动轮播
	$(".banner").hover(function(){
		clearInterval(t);
	},
	function(){
		 t=setInterval(moveL,3000);
	})  
}


 //input加密
var inputPwd=function(){
 	 $("#showPwd").focus(function(){  
	    $("#pwd").show().focus();  
	    $("#showPwd").hide();  
	}); 
	$("#pwd").blur(function(){  
	   if($("#pwd").val()=="") {  
	        $("#showPwd").show();  
	        $("#pwd").hide();  
	   }  
	}); 
	$("#showPwd1").focus(function(){  
	    $("#pwd1").show().focus();  
	    $("#showPwd1").hide();  
	}); 
	$("#pwd1").blur(function(){  
	   if($("#pwd1").val()=="") {  
	        $("#showPwd1").show();  
	        $("#pwd1").hide();  
	   }  
	});  
	$("#showOldPwd").focus(function(){  
	    $("#oldPwd").show().focus();  
	    $("#showOldPwd").hide();  
	}); 
	$("#oldPwd").blur(function(){  
	   if($("#oldPwd").val()=="") {  
	        $("#showOldPwd").show();  
	        $("#oldPwd").hide();  
	   }  
	});  
	$("#showNewPwd").focus(function(){  
	    $("#newPwd").show().focus();  
	    $("#showNewPwd").hide();  
	}); 
	$("#newPwd").blur(function(){  
	   if($("#newPwd").val()=="") {  
	        $("#showNewPwd").show();  
	        $("#newPwd").hide();  
	   }  
	});  
	$("#showNewPwd1").focus(function(){  
	    $("#newPwd1").show().focus();  
	    $("#showNewPwd1").hide();  
	}); 
	$("#newPwd1").blur(function(){  
	   if($("#newPwd1").val()=="") {  
	        $("#showNewPwd1").show();  
	        $("#newPwd1").hide();  
	   }  
	});
	 $("#orName1").focus(function(){  
	    $("#orName").show().focus();  
	    $("#orName1").hide();  
	}); 
	$("#orName").blur(function(){  
	   if($("#orName").val()=="") {  
	        $("#orName1").show();  
	        $("#orName").hide();  
	   }  
	}); 
	 $("#orPhone1").focus(function(){  
	    $("#orPhone").show().focus();  
	    $("#orPhone1").hide();  
	}); 
	$("#orPhone").blur(function(){  
	   if($("#orPhone").val()=="") {  
	        $("#orPhone1").show();  
	        $("#orPhone").hide();  
	   }  
	}); 
	 $("#orOrder1").focus(function(){  
	    $("#orOrder").show().focus();  
	    $("#orOrder1").hide();  
	}); 
	$("#orOrder").blur(function(){  
	   if($("#orOrder").val()=="") {  
	        $("#orOrder1").show();  
	        $("#orOrder").hide();  
	   }  
	}); 
	 $("#phoneLog1").focus(function(){  
	    $("#phoneLog").show().focus();  
	    $("#phoneLog1").hide();  
	}); 
	$("#phoneLog").blur(function(){  
	   if($("#phoneLog").val()=="") {  
	        $("#phoneLog1").show(); 
	        $("#phoneLog").hide();  
	   }  
	});
	 $("#lastName1").focus(function(){  
	    $("#lastName").show().focus();  
	    $("#lastName1").hide();  
	}); 
	$("#lastName").blur(function(){  
	   if($("#lastName").val()=="") {  
	        $("#lastName1").show();  
	        $("#lastName").hide();  
	   }  
	}); 
	 $("#firstName1").focus(function(){  
	    $("#firstName").show().focus();  
	    $("#firstName1").hide();  
	}); 
	$("#firstName").blur(function(){  
	   if($("#firstName").val()=="") {  
	        $("#firstName1").show();  
	        $("#firstName").hide();  
	   }  
	}); 
	 $("#phoneReg1").focus(function(){  
	    $("#phoneReg").show().focus();  
	    $("#phoneReg1").hide();  
	}); 
	$("#phoneReg").blur(function(){  
	   if($("#phoneReg").val()=="") {  
	        $("#phoneReg1").show();  
	        $("#phoneReg").hide();  
	   }  
	}); 
	$("#emailReg1").focus(function(){  
	    $("#emailReg").show().focus();  
	    $("#emailReg1").hide();  
	}); 
	$("#emailReg").blur(function(){  
	   if($("#emailReg").val()=="") {  
	        $("#emailReg1").show();  
	        $("#emailReg").hide();  
	   }  
	}); 
	$("#phoneFog1").focus(function(){  
	    $("#phoneFog").show().focus();  
	    $("#phoneFog1").hide();  
	}); 
	$("#phoneFog").blur(function(){  
	   if($("#phoneFog").val()=="") {  
	        $("#phoneFog1").show();  
	        $("#phoneFog").hide();  
	   }  
	}); 
	$("#nameFog1").focus(function(){  
	    $("#nameFog").show().focus();  
	    $("#nameFog1").hide();  
	}); 
	$("#nameFog").blur(function(){  
	   if($("#nameFog").val()=="") {  
	        $("#nameFog1").show();  
	        $("#nameFog").hide();  
	   }  
	}); 
	$("#codeFog1").focus(function(){  
	    $("#codeFog").show().focus();  
	    $("#codeFog1").hide();  
	}); 
	$("#codeFog").blur(function(){  
	   if($("#codeFog").val()=="") {  
	        $("#codeFog1").show();  
	        $("#codeFog").hide();  
	   }  
	}); 
	$("#regCode1").focus(function(){  
	    $("#regCode").show().focus();  
	    $("#regCode1").hide();  
	}); 
	$("#regCode").blur(function(){  
	   if($("#regCode").val()=="") {  
	        $("#regCode1").show();  
	        $("#regCode").hide();  
	   }  
	}); 
	 $(".shopsee").focus(function(){  
	    $(".shopuse").show().focus();  
	    $(".shopsee").hide();  
	}); 
	$(".shopuse").blur(function(){  
	   if($(".shopuse").val()=="") {  
	        $(".shopsee").show();  
	        $(".shopuse").hide();  
	   }  
	}); 
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
 
//导航信息展示
var navShow=function(){
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
	    			var navList='<li data-lj="'+items[i].lj+'"><a><input type="button" value="'+items[i].name+'" class="hideInput_style"/></a></li>'
	    			$('.nav ul').append(navList);
	    			if(items[i].lj=="membershow.html"){
	    				var navMember='<ol><li class="pr3"><a href="membershow.html">'+jstag("xmlvip4")+'</a></li><li><a href="memberrights.html">'+jstag("xmlvip3")+'</a></li></ol>'
	    			    $('.nav ul li[data-lj="membershow.html"]').append(navMember); 
	    			} 
	    		} 
	    		$('.nav ul li a input').click(function(){   
	    			window.location.href=$(this).parent().parent().attr("data-lj");
	    		})
	    	}
	    }
	}) 	
}
//获取酒店信息
var mapX,mapY;
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
	    		mapX=items[0].mapx;
	    		mapY=items[0].mapy; 
	    		document.title =items[0].name;
	    		$('.wb').html('<a href="'+items[0].wbdz+'"><i></i><img class="wxShare" src="'+items[0].wbimg+'" /></a>');
	    		$('.wx').html('<a><i></i><img class="wxShare" src="'+items[0].wximg+'" /><a>');
	    		$(".hotelName").html(items[0].name);
	    		$(".hotelLogo").attr('src',items[0].logo);
	    		$('.searchMessage .Message1 ol li label').eq(1).text(items[0].name);
	    		$('.aboutHotel .name').html(items[0].name);
	    		$('.aboutHotel .pic_main').append('<img src="'+items[0].img+'" class="adaimg"/>');
	    		$('.aboutHotel .content_news').append(items[0].text);
	    		$('.hotelName1').html(jstag("xmlbook120")+':'+'&nbsp;&nbsp;'+items[0].name);//BOOK3酒店名
	    		$(".hotelAddress").html(items[0].address);
	    		$(".hotelTel").html(items[0].tel);
	    		$(".contactTel").html(items[0].tel);
	    		$.cookie("hotelNameAll",items[0].name, { path: '/' });
	    		$.cookie("hotelTel",items[0].tel, { path: '/' });
	    		img(); 
				wxShare();
	    	}
	    }
	}) 	
}
//查询所有子酒店
var hotelSon=function(){
	 var jsondatatyle;
	if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    var json2={};
		json2["hotel"]=$('body').attr("data-id");
		json2["ff"]="allzjd";
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
					//首页子酒店推荐
					var Zhotel=3;
					if(items.length<Zhotel){
						Zhotel=items.length;
					} 
					for (var j = Zhotel-1; j >=0; j--) {
						var hotelList1='<ol><li class="pic1"><img src="'+items[j].img+'"  class="adaimg"/></li> <li class="title">'+items[j].address+'</li><li class="content">'+items[j].name+'</li><li class="know_more"><a href="./' + items[j].id + '/index.html">'+jstag("xmltext187")+' &nbsp;></a></li></ol>' 	 
						$(".indexhotel").append(hotelList1);
					} 
					//所有子酒店
					for (var i =0; i<items.length; i++) {
						var hotelList='<div class="hotel_content"><span class="pic_act"><img src="'+items[i].img+'" class="adaimg"/></span><ol> <li class="title">'+items[i].name+'</li><li class="content">'+ellipsis(items[i].text,210)+'</li><li>'+jstag("xmltext185")+'：<label>'+items[i].address+'</label></li><li class="pr3">'+jstag("xmlbook141")+'：<label>'+items[i].tel+'</label></li><li><a href="./' + items[i].id + '/index.html">'+jstag("xmltext187")+'</a></li></ol></div>'
						$(".hotel_message").append(hotelList);
						var hotelSon='<li><input data-id="'+items[i].id+'" type="button" class="hideInput_style" value="'+items[i].name+'"/></li>'
						$(".choose_room ul").append(hotelSon);
					}
					if ($.cookie("hotelId") != "" && $.cookie("hotelId") != null) {
				      	$('#hotelID').attr('data-id',$.cookie("hotelId"));
						$('#hotelID').val($(".hoteltou li input[data-id=" + $.cookie("hotelId") + "]").val());  
				    } else {
				        $.cookie("hotelId", items[0].id, { path: '/' });
				        $.cookie("hotelName", items[0].name, { path: '/' });
				        $('#hotelID').val(items[0].name);
						$('#hotelID').attr('data-id',items[0].id);
				    }
					img();
					headList();
				}else{
//					alertstyle(d.msg);
				}
			}
		})
}
