$ (document).ready(function(){
    $(".backLayer").fadeTo(0, 0.4);

    /*5억 이상 체크박스 최초 셋팅*/
    $(".pre_set").css("display", "none");


    /* IE구버전 경고문 팝업  */

    $(".closeBtn2").on("click",function(){
        $(".warning_area").css({"display":"none"}); 
        $(".backLayer").width("0px"); 
    });
    
    $(".keepBtn").on("click",function(){
        $(".warning_area").css({"display":"none"}); 
        $(".backLayer").width("0px"); 
    });


    /* 주택 형태 설명 div 팝업  */

    $("div.helper").on("click",function(){
        $("div.helper_area").addClass("popup");
        var popupHeight = $(".popup").innerHeight();
        console.log("popup height"+popupHeight);
        parent.resizeIframe(popupHeight);
        //$("div.helper_area").slideDown("popup");
    });

    $("div.helper_closeBtn").on("click",function(){
        //$("div.helper_area").slideUp();
        $("div.helper_area").removeClass("popup");
        var bodyHeight = $("#s_form").height();
        console.log("afert popup body height",bodyHeight);
        parent.resizeIframe(bodyHeight);
    });


    /* 주택 형태 설명 div 팝업  */

    $("p.yesBtn").on("click",function(){
        $("div.loan_area").addClass("loan_area_block");	
    });

    $("p.noBtn").on("click",function(){
        $("div.loan_area").removeClass("loan_area_block");	
    });


    /* 채권최고액 설명 div 팝업  */

    $("div.helper_3").on("click",function(){
        $("div.example").addClass("example_block");	
    });

    $("div.helper_closeBtn2").on("click",function(){
        $("div.example").removeClass("example_block");	
    });



    //yes/No radio button
        $( "#radio" ).buttonset();

 // For support IE 8, label tag
     $("#direct_put_label").on('click', function(){

        if (!$('input[type=checkbox][name=check_over5]').prop("checked")) {

            $('input[type=checkbox][name=check_over5]').prop("checked", true);
            $(".slider_body").css("display", "none");
            $("input#amount").css("visibility", "hidden");
            $(".pre_set").css("display", "block");
            $("#direct_put_label").css("border", "1px solid #ffae3c");
            $("#direct_put_label").css("background", "#fff");
            $("#direct_put_label").css("font-weight", "700");
            $("#direct_put_label").css("color", "#eb8f00");

        }else{
          $('input[type=checkbox][name=check_over5]').prop("checked", false);
            $(".slider_body").css("display", "block");
            $("input#amount").css("visibility", "visible");
            $(".pre_set").css("display", "none");
            $("#direct_put_label").css("border", "1px solid #d5d5d5");
            $("#direct_put_label").css("background", "#f6f6f6");
            $("#direct_put_label").css("font-weight", "400");
            $("#direct_put_label").css("color", "#a6a6a6");
        }
     });

    /*click Event - after page load*/
        $('input[type=radio][name=radio1]').change(function() {
            if (this.value == 'yesBtn') {
                $("div.loan_area").addClass("loan_area_block");
            }
            else if (this.value == 'noBtn') {
                $("div.loan_area").removeClass("loan_area_block");
            }        
        });


/*result 펼치기 접기*/
    $("p.moreBtn").on("click",function(){
         $(this).next().slideToggle();	
    });


    $("li#slideup").click(function(){
         $(this).parent().slideToggle();
    });

    

    /* 가구형태 설명 팝업 닫기 버튼  */
    $("div.slideup_2").click(function(){
        //$("div.helper_area").stop().slideUp();
        $("div.helper_area").removeClass("popup");
        
    });

    /*q1 - radio button 다가구 click 시*/
         $(".radio_label").on('click', function(){
            if ($(this).attr("for") != "") {
              $("#" + $(this).attr("for")).attr("checked", "checked");
            }
          if ($(this).attr("for") == "lot_solithouse") {
               $("div.loan_area").addClass("loan_area_block");
              $("div.loan_area").css("visibility","visible");
               var bodyHeight = $("body").innerHeight();
               parent.resizeIframe(bodyHeight);
          }else{
            $("div.loan_area").removeClass("loan_area_block");
            var bodyHeight = $("body").innerHeight();
               parent.resizeIframe(bodyHeight);
          }
         });

});


//q1.html - 숫자만 입력받게 하기

function addInputHandler(conditions){
    var $input = conditions.input;
    var dataType = conditions.dataType;
    var eventType = conditions.eventType;
    if ((!$input) || (!dataType)) {
        throw {error:"NotEnoughArguments", errorMsg:"required argument is missing " +((!$input)?" target input element":" dataType")}
        return;
    }
    if ($input[0].tagName != "INPUT") {
        throw {error:"IlregalTargetElement", errorMsg:"target element is not input"};
        return;
    }
    if ((!eventType)) {
        eventType = "keyup";
    }
    var handlerFunc = conditions.handler;
    if ((!handlerFunc)) {
        handlerFunc = function(event){
            $("#divKeyCode").empty().html("<span> event key code = "+event.keyCode+"</span>");
            var regEx = null;
            if (dataType == "N") {
                regEx = /[^0-9]/gi;
            } else if (dataType == "AP") {
                regEx = /[^a-z]/gi;
            }else if (dataType == "AN") {
                regEx = /[^a-z0-9]/gi;
            }else if (dataType == "HA") {
                regEx = /[a-z0-9]/gi;
                
            }else{
                throw {error:"IlregalDataType", errorMsg:"dataType("+dataType+") is incorrect"}     
            }
            remainOnlyTargetValue(regEx, $input,event);
            //return true;
        };  // end of handlerFunc
    } // end of if to check handlerFunc
    $input.on(eventType,handlerFunc);
    
    if (conditions.maxlength) {
        $input.attr("maxlength",conditions.maxlength);
    }

    
}

function remainOnlyTargetValue(regEx, $input,event) {
    if ((!(event.keyCode >=34 && event.keyCode<=40)) && event.keyCode != 16) {
        var inputVal = $input.val();
        if (regEx.test(inputVal)) {
            $input.val(inputVal.replace(regEx,''));
        }
    }
}

//result Page
//콤마찍기
function comma(str) {
    str = String(str);
    str =  str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return str;
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}
//USE <input type="text" onkeyup="inputNumberFormat(this)" />
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}


/*send SNS*/

$ (document).ready(function(){

    if(getInternetExplorerVersion()>7 || getInternetExplorerVersion()==-1){ //ie가 아니거나 ie-version 8이상이거나
    var mainurl="http://news.khan.co.kr/kh_storytelling/2016/realestate";

        /*Kakao.init('781828985e58d6be52fcda98e793f111');

        Kakao.Link.createTalkLinkButton({
                container: '#kakao-link-btn',
                label: "보증금을 지켜라! 초보 전월세 계약자를 위한 진단테스트",
                image: {
                    src : 'http://img.khan.co.kr/spko/storytelling/2016/realestate/profile.jpg',
                    width: '350',
                    height: '200'
                    },
                webButton: {
                    text: "테스트 바로가기",
                    url: mainurl
                },
                fail: function(){
                    alert('지원되지 않는 기기입니다!');
                }
            });
            */
    }

    var filter = "win16|win32|win64|mac";
 
        if(navigator.platform){
            if(0 > filter.indexOf(navigator.platform.toLowerCase())){
                $("#logo_id").attr("href", "http://m.khan.co.kr/")
            }else{
                $("#logo_id").attr("href", "http://www.khan.co.kr/")
            }
        }
});

function sendSns(sns)
{

  var mainurl="http://news.khan.co.kr/kh_storytelling/2016/realestate";

  var url = encodeURIComponent(mainurl);
  var txt = encodeURIComponent("[경향신문] 아차 하면 떼인다... 보증금을 지켜라! 초보 세입자를 위한 전월세 계약  진단 테스트");

    var is_mobile = false;
    var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileInfo){
        if (navigator.userAgent.match(mobileInfo[info]) != null){
            is_mobile = true;
            break;
        }
    }
 
    switch(sns)
    {
      case 'facebook':
        window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
          break;

      case 'twitter':
          window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
          break;

      case 'naverblog':
          window.open('http://blog.naver.com/openapi/share?url=' + url + '&title' + txt);
          break;

      case 'kakaostory':
          url = decodeURIComponent(url);
          txt = decodeURIComponent(txt);
          if(is_mobile){
            Kakao.Story.open({
            url: url,
            text: txt
          });
          } else {
            Kakao.Story.share({
            url: url,
            text: txt
          });
        }
        break;

      case 'naverband':
            if(is_mobile){
                var o = {
                    param:'create/post?text=' + txt + encodeURIComponent('\r\n') + url,
                    a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                    g_store:'market://details?id=com.nhn.android.band',
                    a_proto:'bandapp://',
                    g_proto:'scheme=bandapp;package=com.nhn.android.band'
                };
                web2app(o);
            }
            else{
          window.open('http://band.us/plugin/share?body=' + txt + encodeURIComponent('\r\n') + url);
            }            
            break;

      case 'googleplus':
        window.open('https://plus.google.com/share?url=' + url + '&t=' + txt);
        break;
  }

  function web2app(o){
        if(navigator.userAgent.match(/android/i))
            {
                // Android
                setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
            }
            else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i))
            {
                // Apple
                setTimeout(function(){ location.href = o.a_store; }, 200);          
                setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
            }
            else
            {
                alert('모바일에서만 지원됩니다!');
                return false;
            }
    }
}//end sendSNS

function getInternetExplorerVersion() {    
         var rv = -1; // Return value assumes failure.    
         if (navigator.appName == 'Microsoft Internet Explorer') {        
              var ua = navigator.userAgent;        
              var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
              if (re.exec(ua) != null)            
                  rv = parseFloat(RegExp.$1);    
             }    
         return rv; 
    } 
