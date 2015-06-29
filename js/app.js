/*入口脚本*/
require.config({
    baseUrl: "js/",
    paths: {
        "jquery": "lib/jquery"
    },
    shim:{
    	'excanvas':['lib/jquery']
    }
});

require(['app/a','jquery'], function (add,$){
 	var c=add(1,4)
   console.log(c);
 $("body").append('Some text')
 
});