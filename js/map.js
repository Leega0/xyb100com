var polygonNames = {
	'黑龙江': 'heilongjiang',
	'吉林': 'jilin',
	'辽宁': 'liaoning',
	'河北': 'hebei',
	'山东': 'shandong',
	'江苏': 'jiangsu',
	'浙江': 'zhejiang',
	'安徽': 'anhui',
	'河南': 'henan',
	'山西': 'shanxi',
	'陕西': 'shaanxi',
	'甘肃': 'gansu',
	'湖北': 'hubei',
	'江西': 'jiangxi',
	'福建': 'fujian',
	'湖南': 'hunan',
	'贵州': 'guizhou',
	'四川': 'sichuan',
	'云南': 'yunnan',
	'青海': 'qinghai',
	'海南': 'hainan',
	'上海': 'shanghai',
	'重庆': 'chongqing',
	'天津': 'tianjin',
	'北京': 'beijing',
	'宁夏': 'ningxia',
	'内蒙古': 'neimongol',
	'广西': 'guangxi',
	'新疆': 'xinjiang',
	'西藏': 'xizang',
	'广东': 'guangdong',
	'香港': 'hongkong',
	'台湾': 'taiwan',
	'澳门': 'macau'
}
var pointPosition = {
	'heilongjiang': '423|50',
	'jilin': '418|88',
	'liaoning': '393|113',
	'hebei': '331|161',
	'shandong': '365|167',
	'jiangsu': '380|200',
	'zhejiang': '387|254',
	'anhui': '357|211',
	'henan': '322|201',
	'shanxi': '308|174',
	'shaanxi': '282|194',
	'gansu': '170|130',
	'hubei': '325|235',
	'jiangxi': '349|261',
	'fujian': '370|290',
	'hunan': '317|265',
	'guizhou': '262|282',
	'sichuan': '226|240',
	'yunnan': '220|304',
	'qinghai': '183|176',
	'hainan': '296|359',
	'shanghai': '403|224',
	'chongqing': '266|245',
	'tianjin': '352|137',
	'beijing': '334|120',
	'ningxia': '255|161',
	'neimongol': '291|127',
	'guangxi': '292|315',
	'xinjiang': '73|97',
	'xizang': '98|229',
	'guangdong': '338|316',
	'hongkong': '0|0',
	'taiwan': '0|0',
	'macau': '0|0'
}
function offsetXY(e) {
	var pointTip = $('.mapStateTip');
	var mouseX, mouseY, tipWidth = pointTip.outerWidth(),
	tipHeight = pointTip.outerHeight();
	if (e && e.pageX) {
		mouseX = e.pageX;
		mouseY = e.pageY
	} else {
		mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
	}
	mouseX = mouseX - tipWidth / 2 < 0 ? 0 : mouseX - tipWidth / 2;
	mouseY = mouseY - tipHeight - 14 < 0 ? mouseY - 14: mouseY - tipHeight - 14;
	return [mouseX, mouseY]
};
function ChinaMapDis(){
	var map = $('#ChinaMapArea');
	globle_map_hastips = $('.mapStateTip');
	if(globle_map_hastips.length>0) {
		return false;
	} else {
	   $.ajax({
		url: environment.basePath+'map.json',
		//url: environment.globalPath+'/v2/local/json/citydis.json',
		dataType: 'json',
		type: 'GET',
		beforeSend: function() {
			
		},
		success: function(data) {
		    var point = '';
		$('body').append('<div class="mapStateTip"><div class="items"></div><b class="arrows-down"></b></div>');
		$.each(data, function(key, val){
			var pinyin = polygonNames[key];
			var position = pointPosition[pinyin];
			point += '<a href="javascript:;" style="left:'+position.split('|')[0]+'px; top:'+position.split('|')[1]+'px" data-rel="'+pinyin+'">'+key+''+val+'笔</a>'
		});
		map.html(point);
		var pointTip = $('.mapStateTip');
		var cont = pointTip.find('.items');
		map.find('a').hover(function(e){
			var self = $(this);
			var _offsetXY = new offsetXY(e);
			self.parent().addClass('map-'+self.attr('data-rel'));
			//self.parent().attr('style', 'background:url('+environment.basePath+'/v2/local/img/maps/'+self.attr('data-rel')+'.jpg)');
			cont.html(self.text());
			var tmpTop = self.offset().top - pointTip.width()/2 - 8;
			var tmpLeft = self.offset().left - pointTip.height() - 14;
			pointTip.css({
				left: _offsetXY[0],
				top: _offsetXY[1],

			}).show();
		}, function(){
			var self = $(this);
			setTimeout(function(){
				self.parent().removeClass('map-'+self.attr('data-rel'));
				//self.parent().attr('style', '');
				pointTip.hide();
			},100)
		});
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
			$(document).on('mousemove', function(e){
				var _offsetXY = new offsetXY(e);
				pointTip.css({
					left: _offsetXY[0],
					top: _offsetXY[1]
				})
			})
		};
		},
		error: function() {
			
		}
	  });
	}
};