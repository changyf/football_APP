var findTpl=require("../templates/find.string");
SPA.defineView("find",{
	html:findTpl,
	plugins:['delegated'],
	bindActions:{
		'go.index':function(){
			SPA.open('index');
		}
	}
})