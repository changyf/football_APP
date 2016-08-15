var loginTpl=require("../templates/login.string"); //引入home模板:
SPA.defineView('login', {
  html: loginTpl,
  styles: {
    'background': '#fff !important'
  },
  plugins: ['delegated'],
  bindActions: {
   'tap.cancel': function () {
      this.hide();
    }
  },
  bindEvents: {
    beforeShow:function() {

    },
    show:function(){
    	
    }

  }
});