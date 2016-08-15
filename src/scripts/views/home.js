var homeTpl=require("../templates/home.string"); //引入home模板:
//引入unti文件:
var unti=require('../unti/unti');
SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:'avalon',
		options:function(vm){   //vm   v指视图   m指模板:  vm是对象自变量:     可以任意起名字:
			vm.liveData=[];   //蒋获ajax请求的数据传入liveData中:
		}
	}],
	//初始化：
	init:{
		vm:null,//定义全局变量  为了让所有函数有能用vm这个变量:
		homeSwiper:null,
		hotSwiper:null,
		livelistArr:[],
		foramtData:function(data){   //蒋json数据中的一维数据转化成二维数据:
			//console.log(data);   //如何将一维数据转化成二维数据:
			var tempArr=[];
			for(i=0;i<Math.ceil(data.length/2);i++){   //  将每个循环的个数给
				tempArr[i]=[];  //每一个数组中在添加一个数组:
				//蒋每一个数据对象添加到数组中:
				tempArr[i].push(data[2*i]);
				tempArr[i].push(data[2*i+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){  //ajax请求数据:
			var that=this;  //获取视图     因为this指向视图:
			//引入vm:即让ajax与plugins中vm.liveData有联系：
			that.vm=this.getVM();
			$.ajax({
				//url:'/football/mock/livelist.json',
				url:"/api/getLivelist.php",
				data:{
					 rtype:"origin"   //原始参数:   
				},
				success:function(e){
					that.livelistArr=e.data;  //蒋一维数组取出来存放到that.livelistArr；
					that.vm.liveData=that.foramtData(e.data);   //将数据变成二维数据然后挂在vm上:
				},
				error:function(){
					alert('服务器请求失败，请重新加载!');
				}
			})
		},
		show:function(){
			var that=this;   //使用swiper框架的是热点 关注的页面:
			this.hotSwiper = new Swiper('#swiper-home',{
			 	loop:false,
			 	onSlideChangeStart:function(swiper){  //swiper指的是new swiper的实例化对象的引用
			 		console.log(swiper);
			 		var index =swiper.activeIndex;   //activeIndex 获取当前页面的索引
			 		var tags=$('.ol li');
			 		unti.setFoucs(tags.eq(index),'active');  //页面切换变成高亮:

			 	}
			 })
			 this.homeSwiper = new Swiper('#swiper-slide',{   //是足球生活  足球美女等使用的swiper框架
			 	loop:false,
			 	onSlideChangeStart:function(swiper){  //swiper指的是new swiper的实例化对象的引用
			 		console.log(swiper);
			 		var index =swiper.activeIndex;   //获取当前页面的索引
			 		var tags=$('.nav ul li');
			 		unti.setFoucs(tags.eq(index),'active');  //页面切换变成高亮:

			 	}
			 })
			 //下拉刷新上拉加载:
			var myScroll=this.widgets.homelist;
			var scrollSize=30;   //设置变量值:
			myScroll.scrollBy(0,-30);
			var head=$('.head img'),
			    topImgHasClass=head.hasClass('up');
			var foot=$('.foot img'),
				bottomImgHasClass=head.hasClass('down');
			myScroll.on('scroll',function(){
				var y=this.y,
				maxY=this.maxScrollY-y;   //求出滚动的高度:
				if(y>=0){
					!topImgHasClass && head.addClass('up');
					return '';
				}
				if(maxY>=0){    //滚动的距离大于0的时候,我就让其成为down的样式:
					!bottomImgHasClass && foot.addClass('down');
					return '';
				}
			})	
			myScroll.on('scrollEnd',function(){
				if(this.y>=-scrollSize && this.y<0){  //没有拖动的时候:我就让其滚动条为-30，即下拉刷新不出来
					myScroll.scrollTo(0,-scrollSize);
					head.removeClass('up'); //并且删除up的样式:
				}else if(this.y>=0){
					head.attr('src','images/ajax-loader.gif');
					$.ajax({
						//url:'/football/mock/livelist.json',
						url:"/api/getLivelist.php",
						data:{
							rtype:"refresh"
						},
						success:function(e){
							//console.log(e);
							that.livelistArr=e.data.concat(that.livelistArr);
							that.vm.liveData=that.foramtData(that.livelistArr);
							myScroll.scrollTo(0,-scrollSize);
							head.removeClass('up');
							head.attr('src','images/arrow.png');

						},error:function(){
							alert('数据传输错误,请重新加载!');
						}
					})
				}
				var maxY=this.maxScrollY-this.y;
				var self=this;
				if(maxY>-scrollSize && maxY<0){
					myScroll.scrollTo(0,self.maxScrollY+scrollSize);
					foot.removeClass('down');
				}else if(maxY>=0){
					foot.attr('src','images/ajax-loader.gif');
					$.ajax({
						//url:'/football/mock/livelist.json',
						url:"/api/getLivelist.php",
						data:{
							rtype:"more"
						},
						success:function(e){
							//console.log(e);
							var arr=that.livelistArr.concat(e.data);
							that.vm.liveData=that.foramtData(arr);
							that.livelistArr=arr;
							//console.log(that.vm.liveData);
							 myScroll.refresh();
		                     myScroll.scrollTo(0,self.y+maxY);
		                     foot.removeClass("down");
		                     foot.attr("src","images/arrow.png");

						},error:function(){
							alert('数据传输错误,请重新加载!');
						}
					})
				}
			})    

		}

	},
	bindActions:{
		'tap.slide':function(e){
			var index=$(e.el).index();
			this.homeSwiper.slideTo(index);
		},
		'hot.slide':function(e){
			var index=$(e.el).index();
			this.hotSwiper.slideTo(index);
		},
		'goto.detail':function(e,data){
			SPA.open('detail',{
				param:data   //跳转视图时传递的参数:

			});   //open用于打开一个新的视图:
		}
	}
})