var myTpl=require("../templates/my.string");
SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	styles:{
		background:'transparent!important',
	},
	bindEvents:{
		show:function(){
			
		}
	},
	bindActions:{
		'tap.close':function(){
			this.hide();
		},
		'tap.login':function(){
			SPA.show('login',{
	        ani:{
	          name:'actionSheet',
	          distance: 200  //距离:
	        }
     	 	});
		}
	}
})