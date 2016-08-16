require("./lib/spa.min");  //引入spa类库:

//引入swiper框架:
require("./lib/swiper-3.3.1.min")
//引入视图文件:
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/guide");
require('./views/detail');
require('./views/login');
SPA.config({
	indexView:"index"
})
console.log('hello index');
