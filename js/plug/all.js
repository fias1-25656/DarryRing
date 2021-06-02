
require(["config"],function(){
	require(["jquery","jquery.ui"],function($){
		$(function(){
			/*-----------------------search------------------------*/
			$("#searchkey").autocomplete({
				source: function(request,response){
					window.getsearchKey = function(data){
						response(data.s);
					}
					
					var _script = document.createElement("script");
					_script.src = "http://suggestion.baidu.com/su?wd="+request.term+"&cb=getsearchKey";
					document.body.appendChild(_script);
				}
			});
			
			/*-----------------------header------------------------*/
			//扫码效果
			$app = $(".app");
			$app.hover(
				function(){
					$(this).find("span").addClass("hover");
					$(this).find("dl").show();
				},
				function(){
					$(this).find("span").removeClass("hover");
					$(this).find("dl").hide();
				}
			);
		
			//语言选择
			$language = $(".language");
			$language.hover(
				function(){
					$(this).find("li").show();
				},
				function(){
					$(this).find("li").hide();
					$(this).find(".lang1").show();
				}
			);
		
			//实体店选择
			$stores = $(".stores");
			$stores.hover(
				function(){
					$(this).find(".storeAll").addClass("hover");
					$(this).find(".location").show();
				},
				function(){
					$(this).find(".storeAll").removeClass("hover");
					$(this).find(".location").hide();
				}
			);
		
			//查询提示
			$showMsg= $(".header_down");
			$showMsg.hover(
				function(){
					$(this).find(".check_msg").show();
					setTimeout(function(){
						$showMsg.find(".check_msg").hide();
					},2000);
				},
				function(){
					$(this).find(".check_msg").hide();
				}
			);
		
			//号码地区
			$currArea = $("#currArea");
			$areaList = $("#areaList");
			$idCard = $("#idCard");
		
			$currArea.click(function(){
				$areaList.show();
			});
		
			$areaList.find("li").click(function(){
				$currArea.text($(this).text());
				switch ($(this).text()){
					case "中国大陆": $idCard.prop("placeholder","请输入身份证号验证真爱承诺"); break;
					case "海外地区": $idCard.prop("placeholder","請輸入護照編號驗證真愛承諾"); break;
					case "港澳台": $idCard.prop("placeholder","請輸入港澳台身份證號碼驗證"); break;
					case "其他": $idCard.prop("placeholder","请输入国家证件号码验证真爱承诺"); break;
				}
				$areaList.hide();
			});
		
			var _placeholder = null;
			$idCard.focus(function(){
				_placeholder = $(this).prop("placeholder");
				$(this).prop("placeholder","");
			});
		
			$idCard.blur(function(){
				if($(this).text()){
					$(this).prop("value",$(this).text());
				}else{
					$(this).prop("placeholder",_placeholder);
				}
			});
			
			/*-----------------------nav------------------------*/
			$nav = $(".nav_list");
			console.log($nav.children());
			
			/*-----------------------sub_nav------------------------*/
			
			$(window).scroll(function(){
				var _top = $(window).scrollTop();
				if(_top > 200){
					$(".sub_nav").show();	
				}else{
					$(".sub_nav").hide();
				}
			});
			
			$(".quick_sort").hover(
				function(){
					$(this).addClass("hover");
					$(this).children().first().addClass("hover");
					$(this).children().last().animate({
						right:50,
						opacity : "show"
					},500);
				},
				function() {
					$(this).removeClass("hover");
					$(this).children().first().removeClass("hover");
					$(this).children().last().hide().css("right",0);
				}
			);
			
			
			/*-----------------------footer------------------------*/
			//service share
			$share = $(".service").find("li").first();
			$share.hover(
				function(){
					$(this).find(".share").show();
				},
				function() {
					$(this).find(".share").hide();
				}
			);
			
		});
	
	});
	
});