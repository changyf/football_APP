var util={
	setFoucs:function(el,cla){
		el.addClass(cla).siblings().removeClass(cla);
	}
}
module.exports=util;
//使用module.exports蒋util抛出去：