var indexTpl=require("../templates/index.string");   //引入index模板:
//引入unti文件:
var unti=require('../unti/unti');
console.log(unti);
//定义视图:
SPA.defineView("index",{
	html:indexTpl,   //设置html
	plugins:["delegated"],    //引入插件delegated事件：用于定义Tap的绑定事件:
	modules:[{
		name:'center',   //视图的名字:引用的句柄:
		defaultTag:'home',  //默认的页面:
		views:['home','find','my'],   //定义的所有子视图
		container:'.main'   //将子视图要渲染到主视图的那个位置:
	}],
	//绑定视图事件:
	bindEvents:{
		//视图显示出来之前执行的回调函数
		beforeShow:function(){

		},
		//视图显示出来之后执行的回调函数
		show:function(){
			console.log(1);
		}
	},
	//绑定元素事件:
	bindActions:{  //this是对当前这个视图的引用:
		"switch.tabs":function(e,data){
			//让正在点击为高亮:
			unti.setFoucs($(e.el),'on');
			//$(e.el).addClass('on').siblings().removeClass('on');
			//切换视图:
			this.modules.center.launch(data.tag);
		},
		'goto.my':function(){
			SPA.open('my',{
				ani:{
					name:"dialog",
					width:300,
					height:200
				}
			});
		}
	}
})


