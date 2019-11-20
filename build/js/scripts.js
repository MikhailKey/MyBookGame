"use strict";function Loader(a){loader?$(a).fadeIn(500):$(a).fadeOut(250)}function bookTemplate(a){var t=a.id,e=a.pageCount,o=a.linePerPageCount,n=a.name,r=a.author,i=a.yearPublishing,l=a.img;return"<div data-id=".concat(t,' data-pageCount="').concat(e,'" data-linesCount="').concat(o,'" class="slide-item">\n      <h1>').concat(n,"</h1>\n      <h2>").concat(r,"</h2>\n      <span>").concat(i,'</span>\n      <img src="').concat(l,'" alt="">\n    </div>')}function makeBooksList(a,t){var e="";a.map(function(a){e+=bookTemplate(a)}),$(t).html(e)}function modalItemTamplate(a){return'<div class="modal-bar__item">'.concat(a,"</div>")}function changeSelect(a,t){for(var e=Number($(a).attr("data-pagecount")),o=Number($(a).attr("data-linescount")),n="",r="",i=1;e>i&&o>i;)i++,e>i&&(n+=modalItemTamplate(i)),o>i&&(r+=modalItemTamplate(i));$(t).eq(0).html(n),$(t).eq(1).html(r),Number($(selectedOption).eq(0).attr("value"))>e&&($(selectedOption).eq(0).val(e),$(selectedOption).eq(0).attr("value",e)),Number($(selectedOption).eq(1).attr("value")>o)&&($(selectedOption).eq(1).val(o),$(selectedOption).eq(1).attr("value",o))}function inputChange(a,t){$(a).each(function(a,e){$(e).on("input",function(a){var e=Number($(t).attr("data-pagecount")),o=Number($(t).attr("data-linescount"));$(this).siblings(modalBar).hasClass("select-page")?$(this).val()>e&&$(this).val(e):$(this).val()>o&&$(this).val(o),this.value=a.target.value,$(this).attr("value",a.target.value),$(this).val(a.target.value)})})}function ajaxLiveLoad(a){Loader(".lds-ripple"),$.ajax({url:a,type:"GET",success:function(a){loader=!1,Loader(".lds-ripple"),$(chooseWindow).fadeIn(500),a.length>0&&""!=a&&(makeBooksList(a,".modal-slider"),dataArray=a,$(".modal-slider").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,prevArrow:$(".slider-arrow__left"),nextArrow:$(".slider-arrow__right")}),inputChange(".modal-bar__current",".slick-active"),changeSelect(".slick-active",modalBar))},error:function(){loader=!1,Loader(".lds-ripple"),$(chooseWindow).fadeIn(500);var a='<div class="modal-error">Произошла ошибка. <br> Пожалуйста, воспользуйтесь сервисом позднее</div>';$(chooseWindow).html(a)}})}function showSelect(){function a(a){var t=30*$(modalBar).eq(a).children().length;modalBar.eq(a).css(t>=210?{"max-height":"210px","overflow-y":"auto"}:{overflow:"visible",height:"".concat(t,"px")})}var t=$(".modal-bar__current");$(t).on("click",function(){a($(this).siblings(modalBar).hasClass("select-page")?0:1)})}function hideSelect(){$(document).mouseup(function(a){$(modalBar).is(a.target)||0!==modalBar.has(a.target).length||modalBar.css({"max-height":"0",overflow:"hidden"})}),$(document).on("keypress",function(a){13==a.which&&($(modalBar).is(a.target)||0!==modalBar.has(a.target).length||modalBar.css({"max-height":"0",overflow:"hidden"}))})}function chooseOption(){modalBar.on("click",".modal-bar__item",function(){var a=$(this).text(),t=$(".modal-bar__current");$(this).closest(modalBar).hasClass("select-page")?($(t).eq(0).val(a),$(t).eq(0).attr("value",a)):($(t).eq(1).val(a),$(t).eq(1).attr("value",a)),$(this).closest(modalBar).css({"max-height":"0",overflow:"hidden"})})}function changeImage(a){var t=$(".modal-book__text");$(t).attr("src",a)}function sendResult(a){var t=$(".slick-current").attr("data-id"),e=Number($(selectedOption).eq(0).attr("value")),o=Number($(selectedOption).eq(1).attr("value")),n="";if(a){var r=dataArray[Math.floor(Math.random()*dataArray.length)];t=r.id,e=Math.floor(Math.random()*r.pageCount+1),o=Math.floor(Math.random()*r.linePerPageCount+1),n="http://moya-kniga.ru/ajax/game.php?id=".concat(t,"&pageNumber=").concat(e,"&linePerPageNumber=").concat(o)}else n="http://moya-kniga.ru/ajax/game.php?id=".concat(t,"&pageNumber=").concat(e,"&linePerPageNumber=").concat(o);$(resultWindow).fadeIn(500),changeImage(n)}function sharing(a,t,e,o,n){function r(){i=encodeURIComponent("http://moya-kniga.ru/#game"),c=encodeURIComponent($(n).find(".modal-book__text").attr("src"))}var i="",l="game",c="",s="";$(n).on("click",a,function(a){a.preventDefault(),r(this);var t="https://vkontakte.ru/share.php?url="+i+"&title="+l+"&description="+s+"&image="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",t,function(a){a.preventDefault(),r(this);var t="https://twitter.com/share?url="+c+"&text="+l;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",e,function(a){a.preventDefault(),r(this);var t="https://www.facebook.com/sharer/sharer.php?u="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")}),$(n).on("click",o,function(a){a.preventDefault(),r(this);var t="https://connect.ok.ru/offer?url="+c;window.open(t,"Поделиться","toolbar=0,status=0,width=626,height=436")})}var selectedOption=$(".modal-bar__current"),chooseWindow=$(".modal-preview"),resultWindow=$(".modal-book"),modalEventSelector=$(".modal-slider"),modalBar=$(".modal-bar__select"),resultButton=$(".modal-button"),randomButton=$(".modal-button__newrandom"),againButton=$(".modal-again"),loader=!0,dataArray=[];$(document).ready(function(){modalEventSelector.on("afterChange",function(){return changeSelect(".slick-active",modalBar)}),ajaxLiveLoad("https://cors-anywhere.herokuapp.com/moya-kniga.ru/ajax/game.php"),showSelect(),hideSelect(),chooseOption(),$(resultButton).on("click",function(){$(chooseWindow).hide(),sendResult()}),$(randomResultButton).on("click",function(){$(chooseWindow).hide(),sendResult(!0)}),$(randomButton).on("click",function(){sendResult(!0)}),$(againButton).on("click",function(){$(chooseWindow).fadeIn(500),$(resultWindow).hide()}),sharing(".social-vk-share",".social-twitter-share",".social-facebook-share",".social-odnoklassniki-share",".modal-book")});