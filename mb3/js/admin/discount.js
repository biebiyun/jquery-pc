 
$(function () { 
	recommendPic();
	$('.nav ul li').eq(5).find('a').css('font-weight','bold');
    var jsondatatyle;
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
     if(GetQueryString("id")==null){
		var json={};
		json["hotel"]=$('body').attr("data-id");
		json["ff"]="yhxxall";
		var data = {};
		data["lang"] = language;
		json["data"] = data; 
		$.ajax({
			type: "POST",
			url: $('body').attr("data-url"), 
			async: false,
			dataType: jsondatatyle,
			data: { json: JSON.stringify(json)},
			success: function (date) {
			    var d;
			    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
				var m=""; 
				if(d.id==1){
					var pagjson=[];
					var navArr=[];
					var navid=[];//所有类别id
					var lbnav=[];//去重后的类别id
					var items=d.data; 
					for (var i = items.length-1; i >=0; i--) {
						navArr.push(items[i].lbname);
						navid.push(items[i].lb)
						var tyle={}; 
						tyle["zbt"]=items[i].name; 
						tyle["fbt"]=items[i].zy;
						tyle["zt"]=items[i].img;
						tyle["yhid"]=items[i].id;
						tyle["lbid"]=items[i].lb;
						pagjson.push(tyle);
					}
					 for(var np=0;np<pagjson.length;np++){
					    $('.hotel_recommend .sort_intro').append('<ol data-id="'+pagjson[np].lbid+'"><li class="pic1"><img src="'+pagjson[np].zt+'"  class="adaimg"/></li> <li class="title">'+pagjson[np].zbt+'</li><li class="content">'+pagjson[np].fbt+'</li><li class="know_more"><a href="discountxq.html?id='+pagjson[np].yhid+'">'+jstag("xmltext64")+'&nbsp;></a></li></ol>');	    
					}
					 paging1('.hotel_recommend .sort_intro ol', '#pagRecommend', 6);
					  img();
					navArr=unique(navArr);  
					lbnav=unique(navid); 
					for(var j=0;j<=navArr.length-1; j++){
				    	var list='<li class="border3"><input data-id="'+lbnav[j]+'" type="button" class="hideInput_style navItem" value="'+navArr[j]+'"/></li>';
				    	$('.hotel_recommend .recommend_sort ul').append(list);
				    }
					   $('.recommend_sort ul .navItem').on('click',function(){
						$('.hotel_recommend .sort_intro ol').hide();
						$(this).addClass('active').parent().siblings().find('input').removeClass('active');
					  	if($(this).attr('data-id')==""){
							 $('.hotel_recommend .sort_intro ol').show();
							 paging1('.hotel_recommend .sort_intro ol', '#pagRecommend', 6);
						}else{
//							for(var j=0;j<=navid.length-1; j++){
//						    	 if($(this).attr('data-id')==navid[j]){
//						    	 	 $('.hotel_recommend .sort_intro ol[data-id="' + navid[j] + '"]').show();
//						    	 }
//						   	} 
						     $('.hotel_recommend .sort_intro ol[data-id="' + $(this).attr('data-id') + '"]').show();

						   	paging1('.hotel_recommend .sort_intro ol[data-id="'+ $(this).attr('data-id') + '"]', '#pagRecommend', 6);
						} 
						 
					}) 
				}
			}
		})
	}  
})	 
  function unique(arr) {
 　var res =[]; 
　　var json = {}; 
　　for(var i=0;i<arr.length;i++){ 
　　　　if(!json[arr[i]]){ 
　　　　　　res.push(arr[i]); 
　　　　　　json[arr[i]] = 1; 
　　　　} 
　　} 
　　return res;
}  
//优惠推荐图片数据
var recommendPic=function(){
	var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
	var json2={};
	json2["hotel"]=$('body').attr("data-id");
	json2["ff"]="yhxxtj";
	var data = {};
	data["lang"] = language;
	json2["data"] = data; 
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
					$('.banner .img').append(' <li><a href="discountxq.html?id='+items[i].id+'"><img src="'+items[i].img+'" class="adaimg"/></a></li>');	 
				} 
				img();
				var length2=$('.banner .img li').length;  
				if(length2>1){
					picSlide(); 
				}else{
					$('.banner .img').width(750+'px')
				}  
			}else{
				alertstyle(d.msg);
			}
		}
	})
}
