var detailTpl=require("../templates/detail.string"); //引入home模板:
SPA.defineView('detail',{
	html:detailTpl,
	plugins:["delegated",{
		name:'avalon',
		options:function(vm){   //vm   v指视图   m指模板:  vm是对象自变量:     可以任意起名字:
			vm.imgsrc=null;
			vm.title=null;
			vm.description=null;
			vm.isShowloading=false;
		}
	}],
	bindEvents:{
		show:function(){
			var id=this.param.id;
			var vm=this.getVM();
			console.log(this);
			console.log(id);
			$.ajax({
				url:'/football/mock/livedetail.json',
				url:"/api/livedetail.php",
				data:{
					id:id
				},
				success:function(e){
					var data=e.data;
					vm.imgsrc=data.imgsrc;
					vm.title=data.title;
					vm.description=data.description;
					setTimeout(function(){
						vm.isShowloading=true;
					},1000);
				},error:function(){
					alert('数据传输错误!')
				}
			})


		}
	},
	bindActions:{
		'goto.back':function(){
			SPA.show('index');
		 }
	}
})