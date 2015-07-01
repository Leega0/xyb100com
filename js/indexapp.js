/*入口脚本*/
require.config({
    baseUrl: "js/",
    paths: {
        "jquery": "lib/jquery-1.11.3.min"
    }
});

require(['jquery'], function ($){
 $("body").append('Some text')
});