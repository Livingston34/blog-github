"use strict";function hideSidePanelScrollBar(){var e=$("<div>").css({visibility:"hidden",width:100,overflow:"scroll"}).appendTo("body"),t=$("<div>").css({width:"100%"}).appendTo(e).outerWidth();e.remove();var n=100-t;$(".side-panel .inner").css("margin-right",-n)}$(function(){hideSidePanelScrollBar(),initPlugins(),setTocToggle(),setAsideToggle(),loadSvg(),setSearchBoard()});var initPlugins=function(){$(".tab").click(function(e){window.location.href=$(this).find("a").prop("href")}),$(".modal").modal()},loadSvg=function(){var e=window.origin+"/svg/icon.svg";$('<div style="display:none"></div>').appendTo($("body")).load(e)},loadLunrDB=function(){var e=null;return function(){if(e)return e;var t=window.origin+"/index.json";return e=$.getJSON(t).then(function(e){return{pageMap:e.reduce(function(e,t){return e[t.uri]=t,e},Object.create(null)),index:lunr(function(){var t=this;this.field("title",{boost:10}),this.field("tags",{boost:5}),this.field("content"),this.ref("uri"),e.forEach(function(e){return t.add(e)})})}}).fail(function(t,n,o){console.error("Error getting Hugo index flie:",n+", "+o),e=null})}}(),search=function(e){return loadLunrDB().then(function(t){return t.index.search(e).map(function(e){return t.pageMap[e.ref]})})},setSearchBoard=function(){var e=$("#in-search"),t=$("#out-search"),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"No Result...";return t.empty().append('<span class="collection-item text-grey">'+e+"</span>")};n();var o=function(e){e&&e.length?($.isArray(e)||(e=[e]),t.empty().append(e.map(function(e){return'<a href="'+e.uri+'" class="collection-item nowrap"><i class="material-icons">description</i>'+e.title+"</a>"}))):n()};e.keyup(function(){var t=e.val().trim();t.length<2?n():(n("Searching..."),search(t).then(function(e){return o(e)}).fail(function(){return n("Fail to execute search, Please check your network.")}))})},setTocToggle=function(){function e(){return a.map(function(e){return Math.floor($(e.getAttribute("href")).offset().top-d)})}function t(e,t){var n=e.href?$(e.getAttribute("href")):$(e);$("html, body").animate({scrollTop:n.offset().top-d+1},400,t)}var n=!0,o=$(".toc-panel nav"),i=($("footer.page-footer"),$(".post .card")),r=$("nav.navbar"),a=[].slice.call(o.find("li a")),s=o.outerHeight(),l=i.offset(),c=r.height(),d=c+20,u=e();if(0!==o.length){o.on("click","a",function(e){var i=this;e.preventDefault(),e.stopPropagation(),n=!1,o.find("a").removeClass("active"),t(this,function(){n=!0,$(i).addClass("active")})});var f=function(){if(u){var e=i.height(),t=$("html").scrollTop()||$("body").scrollTop(),r=!1;if(t+c>=l.top&&(o.removeClass("absolute").addClass("fixed").css("top",c),r=!0),t+c+s>=l.top+e&&(o.removeClass("fixed").addClass("absolute").css({top:e-s}),r=!0),r||o.removeClass("fixed").removeClass("absolute").css({top:"initial"}),n){for(var d,f=0,p=u.length-1;f<p;)u[d=f+p+1>>1]===t?f=p=d:u[d]<t?f=d:p=d-1;$(a).removeClass("active").eq(f).addClass("active")}}};$(window).resize(function(){u=e(),l=i.offset(),s=o.outerHeight(),c=r.height(),d=c+20,n=!0,f()}),$(window).scroll(function(){return f()}),f()}},setAsideToggle=function(){var e=$("aside.side-panel"),t=$("body"),n=$(".button-collapse"),o=$("i.material-icons",n),i=$('<div id="js-cover"></div>').appendTo(t),r=function(){e.hasClass("open")?(e.removeClass("open"),i.fadeOut(400),t.removeClass("covered"),o.text("menu")):(e.addClass("open"),i.fadeIn(400),t.addClass("covered"),o.text("close"))};i.click(function(e){e.stopPropagation(),e.preventDefault(),r()}),n.click(r)};