"use strict";function _classCallCheck(a,t){if(!(a instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(a,n.key,n)}}function _createClass(a,t,e){return t&&_defineProperties(a.prototype,t),e&&_defineProperties(a,e),a}var OldCalc=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"operations",value:function(a,t,e){switch(e){case"add":return a+t;case"sub":return a-t;default:return 0/0}}}]),a}();$(document).ready(function(){function a(){m?$(".lds-ripple").fadeIn(500):$(".lds-ripple").fadeOut(250)}function t(a){var t="";a.map(function(a){var e=a.pageCount,n=a.linePerPageCount;t+="\n      <div data-id=".concat(a.id,' data-pageCount="').concat(e,'" data-linesCount="').concat(n,'" class="slide-item">\n        <h1>').concat(a.name,"</h1>\n        <h2>").concat(a.author,"</h2>\n        <span>").concat(a.yearPublishing,'</span>\n        <img src="').concat(a.img,'" alt="">\n      </div>\n      ')}),$(".modal-slider").html(t)}function e(){for(var a=Number($(".slick-active").attr("data-pagecount")),t=Number($(".slick-active").attr("data-linescount")),e="",n="",o=1;a+1>o;o++)e+='<div class="modal-bar__item">'.concat(o,"</div>");for(var r=1;t+1>r;r++)n+='<div class="modal-bar__item">'.concat(r,"</div>");$(h).eq(0).html(e),$(h).eq(1).html(n),Number($(d).eq(0).attr("value"))>a&&($(d).eq(0).val(a),$(d).eq(0).attr("value",a)),Number($(d).eq(1).attr("value")>t)&&($(d).eq(1).val(t),$(d).eq(1).attr("value",t))}function n(n){var r=$(".button-play");$(r).on("click",function(){m=!0,a(),$(".modal-start").fadeOut(250),m===!0&&$.ajax({url:n,type:"GET",success:function(n){m=!1,a(),$(f).fadeIn(500),n.length>0&&""!=n&&(t(n),p=n,$(".modal-slider").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,prevArrow:$(".slider-arrow__left"),nextArrow:$(".slider-arrow__right")}),o(),e())},error:function(){m=!1,a(),$(f).fadeIn(500);var t='<div class="modal-error">Произошла ошибка. <br> Пожалуйста, воспользуйтесь сервисом позднее</div>';$(f).html(t)}})})}function o(){var a=$(".modal-bar__current");$(a).each(function(a,t){$(t).on("input",function(a){var t=Number($(".slick-active").attr("data-pagecount")),e=Number($(".slick-active").attr("data-linescount"));$(this).siblings($(".modal-bar__select")).hasClass("select-page")?$(this).val()>t&&$(this).val(t):$(this).val()>e&&$(this).val(e),$(this).attr("value",a.target.value),$(this).val(a.target.value)})})}function r(){function a(a){var t=30*$(".modal-bar__select").eq(a).children().length;$(".modal-bar__select").eq(a).css(t>=210?{"max-height":"210px","overflow-y":"auto"}:{overflow:"visible",height:"".concat(t,"px")})}var t=$(".modal-bar__current");$(t).on("click",function(){a($(this).siblings($(".modal-bar__select")).hasClass("select-page")?0:1)})}function i(){$(document).mouseup(function(a){$(".modal-bar__select").is(a.target)||0!==$(".modal-bar__select").has(a.target).length||$(".modal-bar__select").css({"max-height":"0",overflow:"hidden"})})}function c(){$(".modal-bar__select").on("click",".modal-bar__item",function(){var a=$(this).text(),t=$(".modal-bar__current");$(this).closest($(".modal-bar__select")).hasClass("select-page")?($(t).eq(0).val(a),$(t).eq(0).attr("value",a)):($(t).eq(1).val(a),$(t).eq(1).attr("value",a)),$(this).closest(".modal-bar__select").css({"max-height":"0",overflow:"hidden"})})}function l(a){var t=$(".slick-current").attr("data-id"),e=Number($(d).eq(0).attr("value")),n=Number($(d).eq(1).attr("value")),o="";if(a){var r=p[Math.floor(Math.random()*p.length)];t=r.id,e=Math.floor(Math.random()*r.pageCount+1),n=Math.floor(Math.random()*r.linePerPageCount+1),o="http://moya-kniga.ru/ajax/game.php?id=".concat(t,"&pageNumber=").concat(e,"&linePerPageNumber=").concat(n)}else o="http://moya-kniga.ru/ajax/game.php?id=".concat(t,"&pageNumber=").concat(e,"&linePerPageNumber=").concat(n);$(v).fadeIn(500),s(o)}function s(a){var t=$(".modal-book__text");$(t).attr("src",a)}function u(a,t,e,n,o){function r(){i=encodeURIComponent("http://moya-kniga.ru/#game"),l=encodeURIComponent($(o).find(".modal-book__text").attr("src"))}var i="",c="game",l="",s="";$(o).on("click",a,function(a){a.preventDefault(),r(this);var t="https://vkontakte.ru/share.php?url="+i+"&title="+c+"&description="+s+"&image="+l;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(o).on("click",t,function(a){a.preventDefault(),r(this);var t="https://twitter.com/share?url="+l+"&text="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(o).on("click",e,function(a){a.preventDefault(),r(this);var t="https://www.facebook.com/sharer/sharer.php?u="+l;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(o).on("click",n,function(a){a.preventDefault(),r(this);var t="https://connect.ok.ru/offer?url="+l;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")})}var d=$(".modal-bar__current"),h=$(".modal-bar__select"),m=!1,f=$(".modal-preview"),v=$(".modal-book"),p=[];$(".modal-slider").on("afterChange",function(){return e()}),n("https://cors-anywhere.herokuapp.com/moya-kniga.ru/ajax/game.php"),r(),i(),c();var b=$(".modal-button");$(b).on("click",function(){$(f).hide(),l()});var _=$(".modal-button__random");$(_).on("click",function(){$(f).hide(),l(!0)});var g=$(".modal-button__newrandom");$(g).on("click",function(){l(!0)});var k=$(".modal-again");$(k).on("click",function(){$(f).fadeIn(500),$(v).hide()}),u(".social-vk-share",".social-twitter-share",".social-facebook-share",".social-odnoklassniki-share",".modal-book")});