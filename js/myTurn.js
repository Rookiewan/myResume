/*
    turn
 */
/**
 *  author: Rookie_wan
 *  time: 2016-3-8
 */
;
(function($) {
    var TurnObj = function(ele, opt) {
        this.$element = ele;
        this._pages;
        this._isBookOpen;
        this._currPageIndex;
        this._coverFront;
        this._coverBack;
        this._lastDir = 'next';
        this._nextPageAniClass = 'turn-page-next';
        this._prevPageAniClass = 'turn-page-prev';
        this._dir = 'next';
        this._turnPageClass;
        this._isPageturnFinished = true;
        this.defaults = {
            transitionTime: 500,
            afterTurn: function() {},
            beforeTurn: function() {}
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    TurnObj.prototype = {
        /**
         * init
         */
        init: function() {
            var _this = this;
            _this.isBookOpen = false;
            _this._currPageIndex = 0;

            _this._pages = _this.$element.find('.page');
            _this._coverFront = _this.$element.find('.cover-front');
            _this._coverBack = _this.$element.find('.cover-back');

            _this._coverFront.css({ 'z-index': 1002});

            var pageZIndex = _this._pages.length + 5;
            var turnZ = 20;
            _this._pages.each(function() {
                var _this_ = $(this);
                _this_.css({
                    'z-index': pageZIndex,
                    '-webkit-transform': 'translateZ(' + turnZ + 'px)',
                    'transform': 'translateZ(' + turnZ + 'px)'
                });
                pageZIndex--;
                turnZ = turnZ + 15;
            });
        },
        openBook: function() {
            var _this = this;
            var dtd = $.Deferred();
            if (_this._isBookOpen) {
                dtd.reject();
                return dtd.promise();
            }


            winW = $(window).width();
            if (winW < 1366) {
                winW = 1366;
            }


            var wrapW = $('.book-wrap').height();
            var w = winW / 1.5;
            var h = w * (9 / 7) / 2;
            var t = (wrapW - h) / 2;


            _this.$element.css({
                'width': w,
                'height': h,
                'top': t,
                '-webkit-transform': 'rotateY(0) translateX(' + w / 2 + 'px)',
                'transform': 'rotateY(0) translateX(' + w / 2 + 'px)',
                'transition': 'all ' + _this.options.transitionTime + 'ms'
            });

            _this._pages.css({ '-webkit-transform': 'rotateY(0) translateZ(0)','transform': 'rotateY(0) translateZ(0)' });

            setTimeout(function() {
                _this._coverFront.css({ '-webkit-transform': 'rotateY(180deg) translateZ(0)', 'transform': 'rotateY(180deg) translateZ(0)', 'z-index': 100 });
                _this._pages.each(function() {
                    var _this_ = $(this);
                    if(_this_.index() != 1) {
                        _this_.hide();
                    }
                });
               
                setTimeout(function() {
                    _this._isBookOpen = true;
                    dtd.resolve(_this._pages, _this._currPageIndex);
                }, 700);

            }, 200);
            return dtd.promise();
        },
        closeBook: function() {
            var dtd = $.Deferred();
            var _this = this;
            if (!_this._isBookOpen) {
                dtd.reject();
                return dtd.promise();
            }
            
            _this._coverFront.css({ 'z-index': 1002});
            var pageZIndex = _this._pages.length + 5;
            _this._pages.each(function() {
                var _this_ = $(this);
                if(_this_.index() == 1) {
                    _this_.css({
                        'z-index': 50,
                        '-webkit-transform': 'rotateY(0)',
                        'transform': 'rotateY(0)',
                        'display': 'block'
                    });
                } else {
                    _this_.css({
                        'z-index': pageZIndex,
                        '-webkit-transform': 'rotateY(0)',
                        'transform': 'rotateY(0)',
                        'display': 'block'
                    });
                    pageZIndex--;
                }
                
            });

            setTimeout(function() {
                _this._coverFront.css({
                    "-webkit-transform": "rotateY(360deg)",
                    "transform": "rotateY(360deg)"
                });

                _this._pages.attr('class', 'page');

                setTimeout(function() {
                    _this.$element.css({
                        "width": "65%",
                        "height": "67%",
                        "top": "17%",
                        "-webkit-transform": "rotateY(-25deg) translateX(35%)",
                        "transform": "rotateY(-25deg) translateX(35%)"
                    });

                    _this._coverFront.css({
                        "-webkit-transform": "translateZ(80px)",
                        "transform": "translateZ(80px)"
                    });
                    _this._isBookOpen = false;

                    //init
                    _this._currPageIndex = 0;
                    //_this._coverFront.css({ 'z-index': 1002});

                    
                    var turnZ = 20;
                    _this._pages.each(function() {
                        var _this_ = $(this);
                        _this_.css({
                            '-webkit-transform': 'rotateY(0) translateZ(' + turnZ + 'px)',
                            'transform': 'rotateY(0) translateZ(' + turnZ + 'px)'
                        });
                        pageZIndex--;
                        turnZ = turnZ + 15;
                    });

                    dtd.resolve();
                }, 300);

            }, 600);
            return dtd.promise();
        },
        turnPage: function() {
            var _this = this;
            var dtd = $.Deferred();
            switch (_this._dir) {
                case 'next':

                    _this._isPageturnFinished = false;

                    var currPage = $(_this._pages[_this._currPageIndex]),
                        prePage = $(_this._pages[_this._currPageIndex - 1]),
                        nextPage = $(_this._pages[_this._currPageIndex + 1]);

                    _this._pages.removeClass('curr-page-prev');

                    prePage.css({
                        'z-index': 900
                    });
                    currPage.css({'z-index': 1000});
                    nextPage.show();

                    setTimeout(function() {
                        nextPage.css({'z-index': 1000});
                        currPage.css({
                            '-webkit-transform': 'rotateY(-180deg) translateZ(0px)',
                            'transform': 'rotateY(-180deg) translateZ(0px)',
                            'z-index': 1000
                        });

                       setTimeout(function() {
                            prePage.hide();
                            _this._currPageIndex++;
                            currPage.css({'z-index': 1000})
                            dtd.resolve();
                       }, 600); 
                   }, 200);
                    

                    break;
                case 'prev':

                    _this._isPageturnFinished = false;
                    var currPage = $(_this._pages[_this._currPageIndex - 1]);
                    var prePage = $(_this._pages[_this._currPageIndex - 2]);
                    var nextPage = $(_this._pages[_this._currPageIndex]);

                    _this._pages.removeClass('curr-page-prev');

                    nextPage.css({
                        'z-index': 900
                    });
                    currPage.css({'z-index': 1000});
                    prePage.show();
                    setTimeout(function() {
                        currPage.css({
                            '-webkit-transform': 'rotateY(0) translateZ(0px)',
                            'transform': 'rotateY(0) translateZ(0px)'
                        });
                        setTimeout(function() {
                            nextPage.hide();
                            _this._currPageIndex--;
                            dtd.resolve();
                        }, 600);
                    }, 200);
                    

                    
                    break;
                default:
                    dtd.reject();
            }
            return dtd.promise();
        },
        nextPage: function() {
            var _this = this;
            var dtd = $.Deferred();
            var canTurn = true;
            if (!_this._isBookOpen) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (!_this._isPageturnFinished) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (_this._currPageIndex > _this._pages.length - 1) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (canTurn) {
                _this.options.beforeTurn(_this.pages);
                _this._turnPageClass = _this._nextPageAniClass;
                _this._dir = 'next';
                _this.turnPage().then(function() {
                    _this._isPageturnFinished = true;
                    $(_this._pages[_this._currPageIndex]).siblings('.page').attr('class', 'page');
                    dtd.resolve(_this._pages, _this._currPageIndex);
                });
            }

            return dtd.promise();
        },
        prevPage: function() {
            var _this = this;
            var dtd = $.Deferred();
            var canTurn = true;
            if (!_this._isBookOpen) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (!_this._isPageturnFinished) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (_this._currPageIndex < 1) {
                canTurn = false;
                dtd.reject();
                return dtd.promise();
            }
            if (canTurn) {
                _this.options.beforeTurn(_this.pages);
                _this._turnPageClass = _this._prevPageAniClass;
                _this._dir = 'prev';
                _this.turnPage().then(function() {
                    _this._isPageturnFinished = true;
                    $(_this._pages[_this._currPageIndex]).siblings('.page').attr('class', 'page');
                    dtd.resolve(_this._pages, _this._currPageIndex);
                });
            }

            return dtd.promise();
        },
        /**
         * turn to which page
         * @param  {[int]} toPageIndex [page Index]
         */
        turnToPage: function(toPageIndex) {

            var _this = this;
            var dtd = $.Deferred();
            var _toPageIndex = toPageIndex - 1;

            if(_toPageIndex == _this._currPageIndex) {
                dtd.reject();
                return dtd.promise();
            }
            if(_toPageIndex > _this._currPageIndex && _toPageIndex < _this._pages.length + 1) {
                var turnPageCounts = _toPageIndex - _this._currPageIndex;

                var counter = setInterval(function() {
                    _this.nextPage().then(function() {
                        turnPageCounts--;
                        if(turnPageCounts < 1) {
                            clearInterval(counter);
                            dtd.resolve();
                        }
                    });
                }, 10);
                
            } else if(_toPageIndex < _this._currPageIndex && _toPageIndex > -1){

                var turnPageCounts = _this._currPageIndex - _toPageIndex;

                var counter = setInterval(function() {
                    _this.prevPage().then(function() {
                        turnPageCounts--;
                        if(turnPageCounts < 1) {
                            
                            clearInterval(counter);
                            dtd.resolve(_this._pages, _this._currPageIndex)
                        }
                    });
                }, 10);
            }
            return dtd.promise();
        }
    };
    $.fn.myTurn = function(options) {
        var turn = new TurnObj(this, options);
        turn.init();
        return turn;
    }
})(jQuery);