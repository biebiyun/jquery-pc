$(function(){
	mapShow();
	 var jsondatatyle; 
    if (IE()) { jsondatatyle = "jsonp"; } else { jsondatatyle = "text"; }
    $('.contact_submit').click(function(){
		if($('.about_contactAs .left ul li input').eq(0).val()==""||!$('.about_contactAs .left ul li input').eq(0).val().match(/^1(3|4|5|7|8)\d{9}$/)){
			alertstyle(jstag("xmlscript6"));
		}else if (/^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\[\]]+.*)$/.test($(".txtProblem").val().replace(/\s/gi,''))) {
		    alertstyle(jstag("xmlscript56")); 
		}else if($(".txtProblem").val()==''||$(".txtProblem").val()==null){
			 alertstyle(jstag("xmlscript57")); 
		}else if($(".txtProblem").val().length>100){
			alertstyle(jstag("xmlscript59"));
		}else{ 
			var json={};
			json["hotel"] = $('body').attr("data-id");
			json["ff"]="tsjy"; 
			var tyle={};
			tyle["tel"]=$('.about_contactAs .left ul li input').eq(0).val();
			tyle["tsnr"]=$(".txtProblem").val();
			tyle["lang"] = language;
			json["data"]=tyle;
			$.ajax({
				type: "POST",
				url: $('body').attr("data-url"), 
				dataType: jsondatatyle,
				data: { json: JSON.stringify(json)},
				success: function (date) {
				    var d;
				    if (IE()) { d = JSON.parse(date.message); } else { d = JSON.parse(date); }
					if(d.yz==true){ 
						alertstyle(jstag("xmlscript8"));
						$('.about_contactAs .left ul li input').eq(0).val("");
						$(".txtProblem").val("");
					}else{
						alertstyle(jstag("xmlscript9"));
					}
				}
			})
		}
	}) 
})
//地图坐标
var mapShow=function(){
	var map;
//创建和初始化地图函数：
    function initMap(x, y) {
	    createMap(x, y); //创建地图
	    setMapEvent(); //设置地图事件
	    addMapControl(); //向地图添加控件
	    addMapOverlay(x, y); //向地图添加覆盖物
	}
    function createMap(x, y) {
	    map = new BMap.Map("map");
	    map.centerAndZoom(new BMap.Point(x, y), 17);
	}
    function setMapEvent() {
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
    }
    function addClickHandler(target, window) {
        target.addEventListener("click", function () {
            target.openInfoWindow(window);
        });
    }
   function addMapOverlay(x, y) {
	    var markers = [{ title: $(document).attr("title"), imageOffset: { width: -46, height: -21 }, position: { lat: y, lng: x } }, ];
	    for (var index = 0; index < markers.length; index++) {
	        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
	        var marker = new BMap.Marker(point, {
	            icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
	                imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
	            })
	        });
	        var label = new BMap.Label(markers[index].title, { offset: new BMap.Size(25, 5) });
	        var opts = {
	            width: 200,
	            title: markers[index].title,
	            enableMessage: false
	        };
	        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
	        marker.setLabel(label);
	        map.addOverlay(marker);
	    };
	}
    //向地图添加控件
    function addMapControl() {
        var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
       // map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
       // map.addControl(overviewControl);
    }  
	setTimeout(function(){
		 initMap(mapX,mapY); 
	}, 500);
	 
}
