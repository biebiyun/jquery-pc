$(function(){
	var jsondatatyle;
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
					for (var i = 0; i <items.length; i++) {
						var room='<div data-flid="' + items[i].lb + '" class="list"><div class="pic_first"><img src="'+items[i].img+'" class="adaimg"/></div> <ul class="roomlist"><li class="title">'+items[i].name+'</li><li class="discri">'+items[i].mj+'㎡&nbsp;&nbsp;'+items[i].cx+'</li><li class="roomst"><a>'+jstag("xmltext182")+'</a></li><li class="roommore"><a href="roomxq.html?id='+items[i].id+'">'+jstag("xmltext64")+' ></a></li></ul></div>'
					 	$('.favorable_list').append(room);
					}
					img();
					 var shadeHeight=$('.favorable_content').height(); 
   				 	$('.shadeDiv').height(shadeHeight);
				} 
			}
		})
		roomSort();
		$(".favorable_list").on("click",".list .roomlist .roomst a",function(){
			 $.cookie("hotelId", $('body').attr("data-id"), {
					path: '/'
			});
			window.location.href='../book1.html'; 
		}) 
})
var roomSort=function(){
	 var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    //客房类别名称
    var json={};
	json["hotel"]= $('body').attr("data-id");
	json["ff"]="getroomlbAll";
	var tyle={};
		tyle["lang"] = language;
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
				for (var i = items.length-1; i >=0; i--) {  
			    	var list='<li data-flid="' + items[i].id + '"><input type="button" class="btn_yes hideInput_style" style="background:url(images3/icon.png) 0 -262px no-repeat;"/><input class="btn_no hideInput_style" type="button" style="background:url(images3/icon.png) 0 -225px no-repeat;"/><span>'+items[i].name+'</span></li>';
			    	$('.room_sort').append(list);
			   }  
    	  	homeSwitch();
			}
			else{
				alertstyle(d.msg);
			}
		}
	}) 
}
//tap点击切换
var homeSwitch=function(){ 
	$(".room_sort li input").click(function(){
		 $(".room_sort li").removeClass("active"); 
         $(this).parent().addClass("active");
         $('.favorable_list .list').hide(); 
         var navList=$(this).parent().attr('data-flid'); 
         if(navList==""){
         	$('.favorable_list .list').show();
         }else{
         	$('.favorable_list .list[data-flid='+navList+']').show();
         } 
 	   	var img = $('.favorable_list .list').eq(i).find('.adaimg');
	     for (var ti = 0; ti < img.length; ti++) {
            var imgh = "auto";
            var imgw = "auto";
            if (img.eq(ti).width() * img.eq(ti).parent().height() / img.eq(ti).parent().width() < img.eq(ti).height()) {
                img.eq(ti).width(img.eq(ti).parent().width());
                imgw = img.eq(ti).parent().width() + "px";
            } else {
                img.eq(ti).height(img.eq(ti).parent().height());
                imgh = img.eq(ti).parent().height() + "px";
            }
            var ml = (img.eq(ti).parent().width() - img.eq(ti).width()) / 2;
            var mt = (img.eq(ti).parent().height() - img.eq(ti).height()) / 2;
            img.eq(ti).attr("style", "margin-left:" + ml + "px;margin-top:" + mt + "px;height:" + imgh + ";width:" + imgw + ";");
        }  
    })   
      
 }