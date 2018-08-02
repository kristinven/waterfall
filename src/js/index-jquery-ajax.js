var oLi = document.getElementsByTagName('li');
	page = 1;
	flag =true;

function ajaxFun(){
	if(flag){
		flag = false;
		// ajax('get', '/waterfall/getPics.php', getData, 'cpage=' + page, true);
		
		$.ajax({
			 type: 'GET',
			 // url: '/waterfall/getPics.php',
			 // url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=dg&cb=dg',
			 url: 'https://api.douban.com/v2/movie/search',
			 data: 'q=xm',
			 dataType: 'jsonp',
			 success: showData,
			 error: function(data){
			 	console.log(data);
			 },
			 context: window
		});

		page++;	
	}
}
// function dg(data){
// 	console.log(data);
// }
function showData(data){
	console.log(data);
	console.log(this);
}
ajaxFun();
function getData(data){
	var value = JSON.parse(data);
	if(value.length > 0){
		value.forEach(function(ele, index) {
			var minIndex = minListIndex(oLi);
			var oDiv = document.createElement('div'),
				oP = document.createElement('p'),
				oImg = new Image();
			
			oP.innerHTML = ele.title;
			oImg.src = ele.preview;
			oImg.height = ele.height / ele.width * 200;
			oDiv.className = 'item';
			
			oDiv.appendChild(oImg);
			oDiv.appendChild(oP);
			oLi[minIndex].appendChild(oDiv);
		});
		flag = true;
	}
}

function minListIndex(dom){
	var min = dom[0].offsetHeight,
		minIndex = 0,
		len = dom.length;
	for(var i = 0; i < len; i ++){
		if(dom[i].offsetHeight < min){
			min = dom[i].offsetHeight;
			minIndex = i;
		}
	}
	return minIndex;
}

window.onscroll = function (){
	var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop,
		clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if(scrollHeight + clientHeight >= oLi[minListIndex(oLi)].offsetHeight){
		ajaxFun();
	}
}