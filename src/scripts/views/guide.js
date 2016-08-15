var guideTpl=require("../templates/guide.string");
SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var mySwiper = new Swiper('.swiper-container',{
				 autoplay:2000
			})
		}
	},
	bindActions:{
		"go.index":function(){
			SPA.open('index');
		}
	}
})
