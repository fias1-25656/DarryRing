require(["config"],function(){
	require(["jquery","jquery.swiper","jquery.cookie"],function($){
		$(function(){
			//轮播图
			new Swiper('.swiper-container',{
        		pagination: '.swiper-pagination',
		        paginationClickable: true,
		        effect: 'fade',
		        loop: true,
		        autoplay: 3000,
		        speed : 1000,
		        paginationBulletRender: function () {
     				return '<span class="swiper-pagination-bullet">' + "<i></i>" + '</span>';
  				}
			});
			
						
			/*----------------------登陆验证之用户名验证-------------------*/
			var user = {id:"",pwd:""};
			var isId = false;
			var isPwd = false;
			$("#username").blur(function(){
				user.id = this.value;
				if(!user.id){
					$(".errormsg").text("请输入邮箱或手机号").show();
				}else{
					var $this = $(this);
					$.ajax({
						"type": "get",
						"url": "json/user.json",
						 success: function(data){
							if(data.filter(function(item){
								return item.id == user.id;
							}).length){
								$(".errormsg").hide();
								$this.removeClass("error");
								isId = true;
							}
							else{
								$this.addClass("error");
								$(".errormsg").text("账户不存在，请重新输入").show();
								isId = false;
							}
						 }
					});
					
				}
			});
			
			/*----------------------登陆验证之密码验证-------------------*/
			$("#pwd").blur(function(){
				user.pwd = this.value;
				if(!user.pwd){
					$(".errormsg").text("请输入密码").show();
				}else{
					var $this = $(this);
					$.ajax({
						"type": "get",
						"url": "json/user.json",
						 success: function(data){
							if(data.filter(function(item){
								return (item.pwd == user.pwd && item.id == user.id);
							}).length){
								$(".errormsg").hide();
								$this.removeClass("error");
								isPwd = true;
							}
							else{
								$this.addClass("error");
								$(".errormsg").text("用户名或密码输入错误，请重新输入").show();
								isPwd = false;
							}
						 }
					});
				}
			});
			
			/*-----------------------------记住密码----------------------*/
			
			if($.cookie("user")){
				var str = JSON.parse($.cookie("user"));
				console.log(str);
				user.id = str.id;
				user.pwd = str.pwd;
				$("#username").attr("value",user.id);
				$("#pwd").attr("value",user.pwd);
				isId = true;
				isPwd = true;
			}
						
			
			$("#loginBtn").click(function(){
				if(!isId){
					$(".errormsg").text("邮箱或手机号输入错误，请重新输入").show();
				}else if(!isPwd){
					$(".errormsg").text("密码输入错误，请重新输入").show();
				}else{
					if($("#remember").prop("checked") || $.cookie("user")){
						$.cookie("user",JSON.stringify(user),{expires:7,path:'/'});
						setTimeout(function(){
							history.go(-1);
						},1000);
					}else{
						$.cookie("user",JSON.stringify(user),{path:'/'});
					}
				}
			});
				
			
		});
	});
});