"use strict";$(document).ready(function(){function a(a){m?$(a).fadeIn(500):$(a).fadeOut(250)}function t(a){var t="";a.map(function(a){var e=a.pageCount,o=a.linePerPageCount;t+="\n      <div data-id=".concat(a.id,' data-pageCount="').concat(e,'" data-url="').concat(a.url,'" data-linesCount="').concat(o,'" class="slide-item">\n        <h1>').concat(a.name,"</h1>\n        <h2>").concat(a.author,"</h2>\n        <span>").concat(a.yearPublishing,'</span>\n        <img src="').concat(a.img,'" alt="">\n      </div>\n      ')}),$(".modal-slider").html(t)}function e(){for(var a=Number($(".slick-active").attr("data-pagecount")),t=Number($(".slick-active").attr("data-linescount")),e="",o="",n=1;a+1>n;n++)e+='<div class="modal-bar__item">'.concat(n,"</div>");for(var r=1;t+1>r;r++)o+='<div class="modal-bar__item">'.concat(r,"</div>");$(h).eq(0).html(e),$(h).eq(1).html(o),Number($(u).eq(0).attr("value"))>a&&($(u).eq(0).val(a),$(u).eq(0).attr("value",a)),Number($(u).eq(1).attr("value")>t)&&($(u).eq(1).val(t),$(u).eq(1).attr("value",t))}function o(o){a(".lds-ripple"),$.ajax({url:o,type:"GET",success:function(o){m=!1,a(".lds-ripple"),$(v).fadeIn(500),o.length>0&&""!=o&&(t(o),f=o,$(".modal-slider").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,prevArrow:$(".slider-arrow__left"),nextArrow:$(".slider-arrow__right")}),n(),e())},error:function(){m=!1,a(".lds-ripple"),$(v).fadeIn(500);var t='<div class="modal-error">Произошла ошибка. <br> Пожалуйста, воспользуйтесь сервисом позднее</div>';$(v).html(t)}})}function n(){var a=$(".modal-bar__current");$(a).each(function(a,t){$(t).on("input",function(a){var t=Number($(".slick-active").attr("data-pagecount")),e=Number($(".slick-active").attr("data-linescount"));$(this).siblings($(".modal-bar__select")).hasClass("select-page")?$(this).val()>t&&$(this).val(t):$(this).val()>e&&$(this).val(e),$(this).attr("value",a.target.value),$(this).val(a.target.value)})})}function r(){function a(a){var t=30*$(".modal-bar__select").eq(a).children().length;$(".modal-bar__select").eq(a).css(t>=210?{"max-height":"210px","overflow-y":"auto"}:{overflow:"visible",height:"".concat(t,"px")})}var t=$(".modal-bar__current");$(t).on("click",function(){a($(this).siblings($(".modal-bar__select")).hasClass("select-page")?0:1)})}function l(){$(document).mouseup(function(a){$(".modal-bar__select").is(a.target)||0!==$(".modal-bar__select").has(a.target).length||$(".modal-bar__select").css({"max-height":"0",overflow:"hidden"})}),$(document).on("keypress",function(a){13==a.which&&($(".modal-bar__select").is(a.target)||0!==$(".modal-bar__select").has(a.target).length||$(".modal-bar__select").css({"max-height":"0",overflow:"hidden"}))})}function i(){$(".modal-bar__select").on("click",".modal-bar__item",function(){var a=$(this).text(),t=$(".modal-bar__current");$(this).closest($(".modal-bar__select")).hasClass("select-page")?($(t).eq(0).val(a),$(t).eq(0).attr("value",a)):($(t).eq(1).val(a),$(t).eq(1).attr("value",a)),$(this).closest(".modal-bar__select").css({"max-height":"0",overflow:"hidden"})})}function c(t){var e=$(".modal-book__text")[0];m=!0,a(".modal-book__loader"),e.onload=function(){m=!1,a(".modal-book__loader")},e.onerror=function(){$(".modal-book__loader").html('<p class="modal-book__error">Произошла ошибка <br> Пожалуйста, воспользуйтесь сервисом позднее</p>')};var o=$(".slick-current").attr("data-id"),n=Number($(u).eq(0).attr("value")),r=Number($(u).eq(1).attr("value")),l="",i=$(".slick-active").attr("data-url");if(console.log(i),t){var c=f[Math.floor(Math.random()*f.length)];o=c.id,i=c.url,n=Math.floor(Math.random()*c.pageCount+1),r=Math.floor(Math.random()*c.linePerPageCount+1),l="http://moya-kniga.ru/ajax/game.php?id=".concat(o,"&pageNumber=").concat(n,"&linePerPageNumber=").concat(r)}else l="http://moya-kniga.ru/ajax/game.php?id=".concat(o,"&pageNumber=").concat(n,"&linePerPageNumber=").concat(r);$(".modal-buy__link").attr("href",i),$(_).fadeIn(500),s(l)}function s(a){var t=$(".modal-book__text");$(t).attr("src",a)}function d(a,t,e,o,n){function r(){l=encodeURIComponent("http://moya-kniga.ru/#game"),c=encodeURIComponent($(n).find(".modal-book__text").attr("src"))}var l="",i="game",c="",s="";$(n).on("click",a,function(a){a.preventDefault(),r(this);var t="https://vkontakte.ru/share.php?url="+l+"&title="+i+"&description="+s+"&image="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",t,function(a){a.preventDefault(),r(this);var t="https://twitter.com/share?url="+c+"&text="+i;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",e,function(a){a.preventDefault(),r(this);var t="https://www.facebook.com/sharer/sharer.php?u="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",o,function(a){a.preventDefault(),r(this);var t="https://connect.ok.ru/offer?url="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")})}var u=$(".modal-bar__current"),h=$(".modal-bar__select"),m=!0,v=$(".modal-preview"),_=$(".modal-book"),f=[];$(".modal-slider").on("afterChange",function(){return e()}),o("https://cors-anywhere.herokuapp.com/moya-kniga.ru/ajax/game.php"),r(),l(),i();var p=$(".modal-button");$(p).on("click",function(){$(v).hide(),c()});var b=$(".modal-button__random");$(b).on("click",function(){$(v).hide(),c(!0)});var g=$(".modal-button__newrandom");$(g).on("click",function(){c(!0)});var k=$(".modal-again");$(k).on("click",function(){$(v).fadeIn(500),$(_).hide()}),d(".social-vk-share",".social-twitter-share",".social-facebook-share",".social-odnoklassniki-share",".modal-book")});