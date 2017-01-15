/*
1. actionType에 만약(if) "add"를 받으면 일을 추가한다, "remove"를 받으면 일을 삭제한다

2. todoORNumber에..
	1- "add"일때, ol 제일 하단에 입력받은 "문자열"을 추가한다
	(+ li중 같은 "문자열"이 있다면 .message에서 적당한 메세지(color:red)를 3초 동안 표시한다)

	2- "remove"일때, ol 의 자식중 입력받은 "숫자"번째의 항목을 삭제한다
	(+ li중 지울려는 "숫자"가 없다면 .message에서 적당한 메세지(color:red)를 3초 동안 표시한다)

3. 목록은 변동사항이 있을때마다 정렬이된다 (문자열이 가장 긴 항목이 최하위 항목이 된다)
*/

function liCount() { //ol내부의 li의 개수를 센다
	var getOL = document.querySelector("ol");
	var getLIall = getOL.querySelectorAll("li");
	return getLIall.length;
}

function executeItemNode(actionType, todoORnumber)  {

	if(actionType === "add"){ // 2-1 "add"일때, ol 제일 하단에 입력받은 "문자열"을 추가한다

		for(var i=0; i<liCount(); i++){ //(+ li중 같은 "문자열"이 있다면 .message에서 적당한 메세지(color:red)를 3초 동안 표시한다)
			if(todoORnumber === document.getElementsByTagName("li")[i].textContent){
				document.getElementsByClassName("message")[0].innerHTML = "같은 항목이 존재합니다!";
				setTimeout(function(){document.getElementsByClassName("message")[0].innerHTML = ""},3000);
				return 0;
			}
			else continue;
		}
		var getOL = document.querySelector("ol");

		var makeLI = document.createElement("LI");
		var textnode = document.createTextNode(todoORnumber);

		makeLI.appendChild(textnode);
		getOL.appendChild(makeLI);
	}

	else if(actionType === "remove"){// 2-2 "remove"일때, ol 의 자식중 입력받은 "숫자"번째의 항목을 삭제한다
		
		if(todoORnumber > liCount() ){//(+ li중 지울려는 "숫자"가 없다면 .message에서 적당한 메세지(color:red)를 3초 동안 표시한다)
			document.getElementsByClassName("message")[0].innerHTML = "지울 수 없는 항목입니다!";
			setTimeout(function(){document.getElementsByClassName("message")[0].innerHTML = ""},3000);
			return 0;
		}
		else{
			var getOL = document.querySelector("ol");

			var getLI = getOL.querySelector("li:nth-of-type("+todoORnumber+")");

			getOL.removeChild(getLI);
		}
	}

	//3. 목록은 변동사항이 있을때마다 정렬이된다 (문자열이 가장 긴 항목이 최하위 항목이 된다)
	var getLIcontent = [];

	for(var i=0; i<liCount(); i++) {
		getLIcontent[i] = document.getElementsByTagName("li")[i].textContent;
	}

	getLIcontent.sort(function(a, b){ return a.length - b.length; });

	for(var i=0; i<liCount(); i++) {
		document.getElementsByTagName("li")[i].innerHTML = getLIcontent[i];
	}
}


/* 
 * 3번문제는 여기에 자세히 설명을 넣으시면 됩니다.
 * 
 *    ヽ(๑╹◡╹๑)ノ
 * 
 */

var controller = document.querySelector(".controller");

controller.addEventListener("click", function(evt) {
  var btn = evt.target;
  if(btn.tagName !== "BUTTON") return;
  var inputValue = btn.previousElementSibling.value;
  var actionType = btn.className;
  executeItemNode(actionType, inputValue);
});

