/*入口脚本*/
require.config({
    baseUrl: "js/",
    paths: {
        "jquery": "lib/jquery"
    },
    waitSeconds: 15,
});

require(['app/a'], function (a){
 
    console.log(a.add(2,3));
 
});