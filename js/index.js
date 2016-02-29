
//借鉴代码
;(function($){
        $.fn.extend({//局部插件，去掉.fn是全局插件
                'swipeleft':function(fn){//手指左滑动，fn是回调函数
                        $(this).on('touchstart',function(e){
                                e=e.originalEvent.touches[0];//获取对应触摸对象
                                var sx=0;
                                sx=e.pageX;
                                $(this).on('touchend',function(e){
                                        e=e.originalEvent.changedTouches[0];//获取对应触摸对象
                                        if((sx-e.pageX)>50){//如果滑动距离大于50px就认为是要触发左滑动事件了
                                                fn();//调用回调函数
                                        }
                                        $(this).unbind('touchend');
                                });
                        });
                        return this;
                },
                'swiperight':function(fn){//手指右滑动，fn是回调函数
                        $(this).on('touchstart',function(e){
                                e=e.originalEvent.touches[0];//获取对应触摸对象
                                var sx=0;
                                sx=e.pageX;
                                $(this).on('touchend',function(e){
                                        e=e.originalEvent.changedTouches[0];//获取对应触摸对象
                                        if((e.pageX-sx)>50){//如果滑动距离大于50px就认为是要触发右滑动事件了
                                                fn();//调用回调函数
                                        }
                                        $(this).unbind('touchend');
                                });
                        });
                },
                'swipetop':function(fn){//手指上滑动，fn是回调函数
                        $(this).on('touchstart',function(e){
                                e=e.originalEvent.touches[0];//获取对应触摸对象
                                var sy=0;
                                sy=e.pageY;
                                $(this).on('touchend',function(e){
                                        e=e.originalEvent.changedTouches[0];//获取对应触摸对象
                                        if((sy-e.pageY)>50){//如果滑动距离大于50px就认为是要触发上滑动事件了
                                                fn();//调用回调函数
                                        }
                                        $(this).unbind('touchend');
                                });
                        });
                },
                'swipedown':function(fn){//手指下滑动，fn是回调函数
                        $(this).on('touchstart',function(e){
                                e=e.originalEvent.touches[0];//获取对应触摸对象
                                var sy=0;
                                sy=e.pageY;
                                $(this).on('touchend',function(e){
                                        e=e.originalEvent.changedTouches[0];//获取对应触摸对象
                                        if((e.pageY-sy)>50){//如果滑动距离大于50px就认为是要触发下滑动事件了
                                                fn();//调用回调函数
                                        }
                                        $(this).unbind('touchend');
                                });
                        });
                }
        });
})(jQuery);

;(function($) {
	$.fn.navFixed = function (index) {
	    $nav = $(this);
	    var navH = $nav.height();
	    var direct = arguments[1] ? arguments[1] : 'up';
	    if(index > 0 && direct == 'down') {
	    	$nav.css({
	    		'position': 'fixed',
	    		'top': 0
	    	});
	    	$nav.next().css('margin-top',navH + 'px');
	    }else if(index < 1 && direct == 'up'){
	    	$nav.css('position','static');
	    	$nav.next().css('margin-top',0);
	    }
	};
})(jQuery);

var winH;
var sections = ['home','about','skill','workEXP','works','contact'];
var secIndex = 0;
var isScroll = false;
var dataPhoto;
$(document).ready(function() {
	$(window).resize();
	dataPhoto = data_photo
	addPhotos();

	$('.icon-circle-down').click(function() {
		scrollToPage(1);
	});
	$('.icon-circle-down').hover(function() {
		$(this).removeClass('icon-circle-toggle');
	},function() {
		$(this).addClass('icon-circle-toggle');
	});
	$('.icon-circle-up').hover(function() {
		$(this).removeClass('icon-circle-toggle');
	},function() {
		$(this).addClass('icon-circle-toggle');
	});
	var IsPC = function() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
	var showSkill = function() {
		setTimeout(function() {
			var skillcharts = echarts.init(document.getElementById('skill-echarts-main'));
			var labelTop = {
			    normal : {
			        label : {
			            show : true,
			            position : 'center',
			            formatter : '{b}',
			            textStyle: {
			                baseline : 'bottom'
			            }
			        },
			        labelLine : {
			            show : false
			        }
			    }
			};
			var labelFromatter = {
			    normal : {
			        label : {
			            formatter : function (params){
			                return 100 - params.value + '%'
			            },
			            textStyle: {
			                baseline : 'top'
			            }
			        }
			    },
			}
			var labelBottom = {
			    normal : {
			        color: '#ccc',
			        label : {
			            show : true,
			            position : 'center'
			        },
			        labelLine : {
			            show : false
			        }
			    },
			    emphasis: {
			        color: 'rgba(0,0,0,0)'
			    }
			};
			var radius = [60, 75];
			option = {
			    legend: {
			        x : 'center',
			        y : 'center',
			        data:[
			            'HTML(5)','CSS(3)','Javascript','PHP','MySQL'
			        ]
			    },
			    series : [
			        {
			            type : 'pie',
			            center : ['10%', '30%'],
			            radius : radius,
			            x: '0%', // for funnel
			            itemStyle : labelFromatter,
			            data : [
			                {name:'other', value:10, itemStyle : labelBottom},
			                {name:'HTML(5)', value:90,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['30%', '30%'],
			            radius : radius,
			            x:'20%', // for funnel
			            itemStyle : labelFromatter,
			            data : [
			                {name:'other', value:20, itemStyle : labelBottom},
			                {name:'CSS(3)', value:80,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['50%', '30%'],
			            radius : radius,
			            x:'40%', // for funnel
			            itemStyle : labelFromatter,
			            data : [
			                {name:'other', value:35, itemStyle : labelBottom},
			                {name:'Javascript', value:65,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['70%', '30%'],
			            radius : radius,
			            x:'60%', // for funnel
			            itemStyle : labelFromatter,
			            data : [
			                {name:'other', value:50, itemStyle : labelBottom},
			                {name:'PHP', value:50,itemStyle : labelTop}
			            ]
			        },
			        {
			            type : 'pie',
			            center : ['90%', '30%'],
			            radius : radius,
			            x:'80%', // for funnel
			            itemStyle : labelFromatter,
			            data : [
			                {name:'other', value:60, itemStyle : labelBottom},
			                {name:'MySQL', value:40,itemStyle : labelTop}
			            ]
			        }
			    ]
			};
			skillcharts.setOption(option);
		},500);
	};
	var showWorkEXP = function() {
		setTimeout(function() {
			var workEXPcharts = echarts.init(document.getElementById('workEXP-echarts-main'));
			option = {
			    tooltip : {
			        trigger: 'item',
			        enterable: true
			    },
			    legend: {
			        data:['大学', '实习']
			    },
			    xAxis : [
			        {
			            type : 'time',
			            boundaryGap: [0.05,0.1]
			        }
			    ],
			    series : [
			        {
			            "name": "大学", 
			            "type": "eventRiver", 
			            "weight": 5, 
			            "data": [
			                {
			                    "name": "开始上大学", 
			                    "weight": 5, 
			                    "evolution": [
			                        {
			                            "time": "2012-09-01", 
			                            "value": 1, 
			                            "detail": {
			                                "text": "大一心理保健员"
			                            }
			                        }, 
			                        {
			                            "time": "2013-09-01", 
			                            "value": 1, 
			                            "detail": {
			                                "text": "加入桑梓创新实验室"
			                            }
			                        }, 
			                        {
			                            "time": "2014-03-01", 
			                            "value": 1, 
			                            "detail": {
			                                "text": "参与桑梓微助手2.0的部分模块开发"
			                            }
			                        }, 
			                        {
			                            "time": "2015-02-01", 
			                            "value": 1, 
			                            "detail": {
			                                "text": "完成桑梓新媒体导航的开发"
			                            }
			                        }, 
			                        {
			                            "time": "2016-07-01", 
			                            "value": 1, 
			                            "detail": {
			                                "text": "毕业"
			                            }
			                        }
			                    ]
			                }
			            ]
			        }, 
			        {
			            "name": "实习", 
			            "type": "eventRiver", 
			            "weight": 10, 
			            "data": [
			                {
			                    "name": "优芽网络科技有限公司", 
			                    "weight": 10, 
			                    "evolution": [
			                        {
			                            "time": "2015-07-27", 
			                            "value": 5, 
			                            "detail": {
			                                "link": "www.baidu.com", 
			                                "text": "web前端开发工程师"
			                            }
			                        }, 
			                        {
			                            "time": "2015-09-30", 
			                            "value": 5, 
			                            "detail": {
			                                "link": "http://www.baidu.com", 
			                                "text": "实习结束"
			                            }
			                        }
			                    ]
			                }
			            ]
			        }
			    ]
			};
			workEXPcharts.setOption(option);
		},500);
	};
	var scrollToPage = function(index,dir) {
		secIndex = index;
		var scrolltop = - secIndex * winH;
		$('#wrap-inner').animate({
			'top': scrolltop + 'px'
		},500);
		if(index < 2 && dir == 'down') {
			setTimeout(function() {
				$('#nav').navFixed(index,dir);
			},500);
			
		} else {
			$('#nav').navFixed(index,dir);
		}
		if(index == 0 && dir == 'up') {
			setTimeout(function() {
				$('.myPhoto img').addClass('t-2-b');
				$('.home h1').addClass('l-2-r');
				$('.home h3').addClass('r-2-l');
				$('.home .download').addClass('b-2-t');
			},500);
		}else {
			setTimeout(function() {
				if($('.myPhoto img').hasClass('t-2-b')) {
					$('.myPhoto img').removeClass('t-2-b');
				}
				if($('.home h1').hasClass('l-2-r')) {
					$('.home h1').removeClass('l-2-r');
				}
				if($('.home h3').hasClass('r-2-l')) {
					$('.home h3').removeClass('r-2-l');
				}
				if($('.home .download').hasClass('b-2-t')) {
					$('.home .download').removeClass('b-2-t');
				}
			},500);
		}

		if(index == 5) {
			setTimeout(function() {
				$('#contact h1').addClass('l-2-r');
				$('#contact a').addClass('r-2-l');
			},500);
		} else {
			setTimeout(function() {
				if($('#contact h1').hasClass('l-2-r')) {
					$('#contact h1').removeClass('l-2-r');
				}
				if($('#contact a').hasClass('r-2-l')) {
					$('#contact a').removeClass('r-2-l');
				}
			},500);
		}
		/*if(index == 1) {
			setTimeout(function() {
				$('#about h2').addClass('t-2-b');
				$('#about .fl').addClass('l-2-r');
				$('#about .fr').addClass('r-2-l');
			},500);
		} else {
			setTimeout(function() {
				if($('#about h2').hasClass('t-2-b')) {
					$('#about h2').removeClass('t-2-b');
				}
				if($('#about .fl').hasClass('l-2-r')) {
					$('#about .fl').removeClass('l-2-r');
				}
				if($('#about .fr').hasClass('r-2-l')) {
					$('#about .fr').removeClass('r-2-l');
				}
			},500);
		}*/
	};
	if(IsPC()) {
		var scrollFunc = function(e) {
			var direct = '';
			e = e || window.event;
			if(!isScroll) {
				isScroll = true;
				setTimeout(function() {
					if(e.wheelDelta) {
						if(e.wheelDelta > 0) {
							direct = 'up';
						} else {
							direct = 'down';
						}
					} else if(e.detail) {
						if(e.detail > 0) {
							direct = 'down';
						} else {
							direct = 'up';
						}
					}
					if(direct == 'down') {
						if(secIndex < 5)
							secIndex++;
						scrollToPage(secIndex,direct);
					}else if(direct == 'up') {
						if(secIndex > 0)
							secIndex--;
						scrollToPage(secIndex,direct);
					}
					if(sections[secIndex] == 'skill') {
						showSkill();
					}
					if(sections[secIndex] == 'workEXP') {
						showWorkEXP();
					}
					isScroll = false;
				},500);
				
			}
		};

		if(document.addEventListener){
		    document.addEventListener('DOMMouseScroll',scrollFunc,false);
		}//W3C
		window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
	}else {
		$(window).swipedown(function() {
			if(secIndex > 0)
				secIndex--;
			scrollToPage(secIndex);
			if(sections[secIndex] == 'skill') {
				showSkill();
			}
			if(sections[secIndex] == 'workEXP') {
				showWorkEXP();
			}
		});
		$(window).swipetop(function() {
			if(secIndex < 5)
				secIndex++;
			scrollToPage(secIndex,'down');
			if(sections[secIndex] == 'skill') {
				showSkill();
			}
			if(sections[secIndex] == 'workEXP') {
				showWorkEXP();
			}
		});
	}

	$('#toTop,#name').click(function() {
		scrollToPage(0,'up');
	});
	$('#nav nav a').click(function() {
		var $_this_ = $(this);
		var _text = $_this_.text();
		if(_text == '个人简介') {
			scrollToPage(1);
		} else if (_text == '专业技能') {
			scrollToPage(2);
		} else if(_text == '工作经历') {
			scrollToPage(3);
		} else if(_text == '部分作品') {
			scrollToPage(4);
		} else if(_text == '联系邮箱') {
			scrollToPage(5);
		}
	});
	                    
});

$(window).resize(function() {
	winH = window.document.body.clientHeight;//获取可是区域高度
	var navH = $('#nav').height();
	$('.wrap').css('height',winH + 'px');
	$('section:not(.nav)').each(function() {
		$(this).css('height',winH + 'px');
	});
	$('section:last').css('height', (winH - navH) + 'px');

	var scrollH = $('body').scrollTop();

	var $sections = $('section:not(.nav)');
	var minNum = 9999;
	var minIndex = 0;
	$sections.each(function(idx,item) {
		var _temp = Math.abs(scrollH - $(item).offset().top);
		if(_temp < minNum) {
			minNum = _temp;
			minIndex = idx;
		}
	});
	setTimeout(function() {
		var scrollToH = $sections.eq(minIndex).offset().top;
		$('body').animate({
			'scrollTop': scrollToH + 'px'
		},500);
	},500);
	$('.myPhoto img').addClass('t-2-b');
	$('.home h1').addClass('l-2-r');
	$('.home h3').addClass('r-2-l');
	$('.home .download').addClass('b-2-t');
});
//翻转控制
function turn(elem){
	var cls = elem.className;
	var n = elem.id.split('_')[1];

	if(!/photo_center/.test(cls)){
		return rsort(n);
	}

	if(/photo_front/.test(cls)){
		cls = cls.replace(/photo_front/,' photo_back ');
		g('#nav_' + n).className += ' i_back';
	}else{
		cls = cls.replace(/photo_back/,' photo_front ');
		g('#nav_' + n).className = g('#nav_' + n).className.replace(/\s*i_back\s*/,'');
	}
	return elem.className = cls;
}
function random( range ){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);

	var diff = max - min;

	var number = Math.ceil(Math.random() * diff + min);
	return number;
}
function rsort( n ){
	var _photo = g('.photo');
	var photos = [];

	for(var s = 0;s < _photo.length; s++){
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/,' ');
		_photo[s].className += ' photo_front ';
		_photo[s].style.left = '';
		_photo[s].style.top = '';
		_photo[s].style['transform'] = _photo[s].style['-ms-transform'] = _photo[s].style['-moz-transform'] = _photo[s].style['-webkit-transform'] = 'rotate(0deg) scale(1.3)';
		photos.push( _photo[s] );
	}

	var photo_center = g('#photo_' + n);
	photo_center.className += ' photo_center ';
	photo_center = photos.splice(n,1)[0];


	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	var photos_right = photos;

	var ranges = range();

	for( s in photos_left){
		var photo = photos_left[s];
		photo.style.left=random(ranges.left.x) + 'px';
		photo.style.top=random(ranges.left.y) + 'px';
		photo.style['transform'] = photo.style['-ms-transform'] = photo.style['-moz-transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';

	}

	for( s in photos_right){
		var photo = photos_right[s];
		photo.style.left=random(ranges.right.x) + 'px';
		photo.style.top=random(ranges.right.y) + 'px';
		photo.style['transform'] = photo.style['-ms-transform'] = photo.style['-moz-transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}

	var navs = g('.i');
	for(var s = 0;s < navs.length;s++){
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ');
	}

	g('#nav_'+ n ).className += ' i_current';

}

function range(){
	var range = {
		left:{
			x:[],
			y:[]
		},
		right:{
			x:[],
			y:[]
		}
	};

	var wrap = {
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight
	}

	var photo = {
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight
	}

	range.wrap = wrap;
	range.photo = photo;

	range.left.x = [0 - photo.w , wrap.w/2 - photo.w*1.5];
	range.left.y = [0 - wrap.h , wrap.h];

	range.right.x = [wrap.w/2 + photo.w/2 , wrap.w + photo.w];
	range.right.y = range.left.y;

	return range;
}

function g(selector){
	var method = selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}


function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html = [];
	var nav = [];
	for( s in dataPhoto){
		var _html = template
							.replace(/{{index}}/,s)
							.replace(/{{img}}/,dataPhoto[s].img)
							.replace(/{{caption}}/,dataPhoto[s].caption)
							.replace(/{{caption_url}}/,dataPhoto[s].caption_url)
							.replace(/{{desc}}/,dataPhoto[s].desc);
		html.push(_html);
		nav.push('<span id="nav_'+s+'" onClick="turn(g(\'#photo_'+s+'\'));" class="i">&nbsp;</span>');
	}
	html.push('<div class="nav_i">'+nav.join('')+'</div>');
	g('#wrap').innerHTML = html.join('');

	rsort(random( [0,dataPhoto.length-1] ));
}