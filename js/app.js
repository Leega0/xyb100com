/*入口脚本*/
require.config({
    baseUrl: "js/",
    paths: {
        "jquery": "lib/jquery"
    },
    waitSeconds: 15,
    map: {
        '*': {
            'css': 'lib/css'
        }
    },
    shim : {
        'util': ['css!../css/index.css']
    }
});

require(["util"], function(util) {
    // todo
});