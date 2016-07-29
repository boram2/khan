
  $(function() {
    $( "#slider1" ).slider({
	  range:"min",
      value:0,
      min: 0,
      max: 500000000,
      step: 5000000,
      slide: function( event, ui ) {
		price = ui.value;
		//price = Number(price).toLocaleString('en');
		$( "#price" ).val( price);
		price = setWon(price);
        $( "#amount" ).val( price + "원");
	  }
    });
    $( "#amount" ).val($( "#slider1" ).slider( "value" ) + "원" );
  });

$(function() {
    $( "#slider2" ).slider({
	  range:"min",
      value:0,
      min: 0,
      max: 1000000000,
      step: 5000000,
      slide: function( event, ui ) {
		price = ui.value;
		//price = Number(price).toLocaleString('en');
		$( "#price" ).val( price);
		price = setWon(price);
        $( "#amount_q2" ).val( price + "원");
	  }
    });
    $( "#amount_q2" ).val($( "#slider2" ).slider( "value" ) + "원" );
  });

  function setWon(pWon) {
    var won  = (pWon+"").replace(/,/g, "");
    var arrWon  = ["원", "만", "억 ", "조", "경", "해", "자", "양", "구", "간", "정"];
    var changeWon = "";
    var pattern = /(-?[0-9]+)([0-9]{4})/;
    while(pattern.test(won)) {						
        won = won.replace(pattern,"$1,$2");
    }
    var arrCnt = won.split(",").length-1;
    for(var ii=0; ii<won.split(",").length; ii++) {
        if(arrWon[arrCnt] == undefined) {
            alert("값의 수가 너무 큽니다.");
            break;
        }
  var tmpwon=0;
  for(i=0;i<won.split(",")[ii].length;i++){
   var num1 = won.split(",")[ii].substring(i,i+1);
   tmpwon = tmpwon+Number(num1);
  }
  if(tmpwon > 0){
    changeWon += won.split(",")[ii]+arrWon[arrCnt]; //55억0000만0000원 이런 형태 방지 0000 다 짤라 버린다
  }
        arrCnt--;
    }

	if(changeWon.indexOf("0500")){ //3자리 단위에 앞에 0 제거(500단위 기준)
		changeWon = changeWon.replace('0500', '500');
	}
	
	
	//console.log("length"+changeWon.length);
	//console.log(changeWon.charAt(3));

	if(changeWon.length>=8){
		if(changeWon.charAt(3)==0){
			var str = changeWon.substring(0,3);
			var tmp = changeWon.substring(4,changeWon.length);
			str += tmp;
			changeWon = str;
			//console.log("check"+str);
		}
	}
	

	if(changeWon==""){
		changeWon = 0; //값이 0일 때 제거된 0에 0삽입
	}
 return changeWon;
}