var indexTpl=require("../templates/index.string");   //����indexģ��:
//����unti�ļ�:
var unti=require('../unti/unti');
console.log(unti);
//������ͼ:
SPA.defineView("index",{
	html:indexTpl,   //����html
	plugins:["delegated"],    //������delegated�¼������ڶ���Tap�İ��¼�:
	modules:[{
		name:'center',   //��ͼ������:���õľ��:
		defaultTag:'home',  //Ĭ�ϵ�ҳ��:
		views:['home','find','my'],   //�������������ͼ
		container:'.main'   //������ͼҪ��Ⱦ������ͼ���Ǹ�λ��:
	}],
	//����ͼ�¼�:
	bindEvents:{
		//��ͼ��ʾ����֮ǰִ�еĻص�����
		beforeShow:function(){

		},
		//��ͼ��ʾ����֮��ִ�еĻص�����
		show:function(){
			console.log(1);
		}
	},
	//��Ԫ���¼�:
	bindActions:{  //this�ǶԵ�ǰ�����ͼ������:
		"switch.tabs":function(e,data){
			//�����ڵ��Ϊ����:
			unti.setFoucs($(e.el),'on');
			//$(e.el).addClass('on').siblings().removeClass('on');
			//�л���ͼ:
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


