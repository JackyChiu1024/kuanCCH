var _cloudUrl = "http://www.chessdb.cn/query/?";
var _cloudBackUpUrl = 'http://www.voo0.com/yunku/?';
var _ladderUrl = "http://www.chessladder.rf.gd/?";
var _chessDbUrl = "https://pragmatic-byway-242913.appspot.com/chess.php";
var _BoardScale = [0.7, 0.85, 1, 1.2, 1.4];
var _chessboard;

var inputExample = 
"  1.炮二平五      炮８平５\n\
  2.車一進一      馬８進７\n\
  3.車一平六      車９平８\n\
  4.馬二進三      車８進６\n\
  5.車六進七      馬２進１\n\
  6.車九進一      炮２進７\n\
  7.炮八進五      馬７退８\n\
  8.炮五進四      士６進５\n\
  9.車九平六      將５平６\n\
 10.前車進一      士５退４\n\
 11.車六平四      炮５平６\n\
 12.車四進六      將６平５\n\
 13.炮八平五\n"

var placeholder = "在這輸入或貼上棋譜，例如：\n\n" + inputExample;

// should put all buttons to consoleConfig file
var persBtn = document.getElementById("personalRecordBtn");
var queryBtn = document.getElementById("queryBtn");
var queryLadderBtn = document.getElementById("queryLadderBtn");
var copyBtn = document.getElementById("copyBtn");
var copyURLBtn = document.getElementById("copyURLBtn"); 
var clearBtn = document.getElementById("clearBtn");
var infoBtn = document.getElementById("infoBtn");
var openfileBtn = document.getElementById("openfileBtn");
var openfileInput = document.getElementById("openfileInput");
var uploadBtn = document.getElementById("uploadBtn");
var downloadBtn = document.getElementById("downloadBtn");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var firstBtn = document.getElementById("firstBtn");
var endBtn = document.getElementById("endBtn");
var fenBtn = document.getElementById("fenBtn");
var cloudBtn = document.getElementById("cloudBtn");
var dpxqBtn = document.getElementById("dpxqBtn");
var verticalBtn = document.getElementById("verticalBtn");
var horizBtn = document.getElementById("horizBtn");
var scoreBtn = document.getElementById("scoreBtn");
var picBtn = document.getElementById("picBtn");
var editModeBtn = document.getElementById("editModeBtn");
var closeModal = document.getElementsByClassName("close")[0];
var modal = document.getElementById('myModal');
var fblink = document.getElementById('fblk');
var timeBtn = document.getElementById('timeBtn');
var gamenameBtn = document.getElementById('gamenameBtn');
var rednameBtn = document.getElementById('rednameBtn');
var blackBtn = document.getElementById('blackBtn');
var hideBtn = document.getElementById('hideBtn');
var enlargeBoardBtn = document.getElementById('enlargeBtn');
var shrinkBoardBtn = document.getElementById('shrinkBtn');
var	scoreChartBtn = document.getElementById('scoreChartBtn');
var	biasChartBtn = document.getElementById('biasChartBtn');

var buttonList = [
	persBtn,
	queryBtn,
	//queryLadderBtn,
	copyBtn,
	//copyURLBtn,
	clearBtn,
	infoBtn,
	downloadBtn,
	openfileBtn,
	uploadBtn,
	firstBtn,
	endBtn,
	prevBtn,
	nextBtn,
	fenBtn,
	cloudBtn,
	dpxqBtn,
	verticalBtn,
	horizBtn,
	scoreBtn,
	//picBtn,
	editModeBtn,
	hideBtn,
	enlargeBoardBtn,
	shrinkBoardBtn,
	scoreChartBtn,
	biasChartBtn,
	statChartBtn
];

var _userInfo =
{
	accountID: "",
	username: "",
	nickname: "",
	email: "",
}

var _chessInfo =
{
	accountID: "",
	pgn_str: "",
	copy_str: "",
	status_str: "",
	init_fen: "",
	move_total: 0,
	move_curr: 0,
	currNumber: 0,
	toStop: false,
	inQuety: false,
	is_complete: false,
	is_got_result: false,
	is_in_cloud_db: false,
	is_edit_mode: false,
	is_vertical_original: true,
	is_horizontal_original: true,
	is_login: false,
	is_hide: true,
	moveList: [],
	engmoveList: [],
	moveCurveList: [],
	fenList: [],
	scoreList: [],
	biasList: [],
	recommendList: [],
	badRate: [0, 0, 0, 0], //red NG, red BAD, black NG, black BAD 
    boardSizeLevel: 2, // scale = 1.0,  [0.7, 0.85, 1, 1.2, 1.4]
    chartType: 0

}

var _gameInfo = 
{
	title: "",
	date: "2020/1/1", //比賽時間
   	game_name: "", //比賽名稱
    round: 1, //比賽輪次
    play_side: 0,
	r_name: "--",
	b_name : "--",
    r_bad_rate1: 0,
	r_bad_rate2: 0,
	b_bad_rate1: 0,
	b_bad_rate2: 0,
    result: 0 //勝負結果
}

var _personInfo = [];

var _sortState = [false, false, false, false];

$(document).ready(function() {
	persBtn.addEventListener("click", persFun);
    queryBtn.addEventListener("click", queryCloudDB);
    $("#queryBtn").val($("#queryBtn").html());
    //queryLadderBtn.addEventListener("click", queryLadderDB);
    copyBtn.addEventListener("click", copyQueryResult);
	//copyURLBtn.addEventListener("click", copyUrl);
    clearBtn.addEventListener("click", clearInputText);
	infoBtn.addEventListener("click", showInfo);
	downloadBtn.addEventListener("click", onDownloadBtnClick);
	openfileInput.addEventListener('change', handleFileSelect, false);
	openfileBtn.addEventListener("click", onOpenfileBtnClick);
	uploadBtn.addEventListener('click', onUploadBtnClick);
	firstBtn.addEventListener('click', onFirstBtnClick);
	endBtn.addEventListener('click', onEndBtnClick);
	prevBtn.addEventListener('click', onPrevBtnClick);
	nextBtn.addEventListener('click', onNextBtnClick);
	fenBtn.addEventListener('click', onFenBtnClick);
	cloudBtn.addEventListener('click', onCloudBtnClick);
	dpxqBtn.addEventListener('click', onDpxqBtnClick);
	verticalBtn.addEventListener('click', onVerticalBtnClick);
	horizBtn.addEventListener('click', onHorizBtnClick);
	scoreBtn.addEventListener('click', onScoreBtnClick);
	//picBtn.addEventListener('click', onPicBtnClick);
	editModeBtn.addEventListener('click', onEditModeBtnClick);
	timeBtn.addEventListener('click', onTimeBtnClick);
	gamenameBtn.addEventListener('click', onGamenameClick);
	rednameBtn.addEventListener('click', onRednameBtnClick);
	blacknameBtn.addEventListener('click', onBlacknameBtnClick);
	hideBtn.addEventListener('click', onHideBtnClick);
	enlargeBoardBtn.addEventListener('click', onEnLargeBtnClick);
	shrinkBoardBtn.addEventListener('click', onShrinkBtnClick);
	scoreChartBtn.addEventListener('click', onScoreChartBtnClick);
	biasChartBtn.addEventListener('click', onBiasChartBtnClick);
	statChartBtn.addEventListener('click', onStatChartBtnClick);

    $("#copyEgBtn").bind("click", function() {
        //copyToClipboard("範例棋譜",inputExample);
        if(!_chessInfo.is_edit_mode)
        {
        	document.getElementById("chessBookInput").value = inputExample;	
        }
    });
	
	// When the user clicks on <span> (x), close the modal
	closeModal.onclick = function() {
	modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		}
	}
	
	document.addEventListener('paste', function (e) {
		var pastedText = undefined;
		if(!$("#chessBookInput").is(':focus'))
		{
			if (window.clipboardData && window.clipboardData.getData) { // IE
				pastedText = window.clipboardData.getData('Text');
			} else if (e.clipboardData && e.clipboardData.getData) {
				pastedText = e.clipboardData.getData('text/plain');
			}
			document.getElementById("chessBookInput").value = pastedText;
		}
		
	}); 
    addChessBoardEvt();
    initPlaceholder();

    fblink.innerHTML = '<a href="'+"https://www.facebook.com/象棋雲梯-1502149653262884"+'" target="_blank" style="color:blue">'+"粉絲專頁"+'</a>';
});

function persFun() {
	if(document.getElementById("personalresult").style.visibility == "hidden")
	{
		var header = document.getElementById("personalrecordHeader");
		document.getElementById("personalRecordBtn").innerHTML = "回主畫面";
		removePersonaRecordlTable();
		document.getElementById("personalresult").style.visibility = "visible";
   		document.getElementById("content").style.visibility = "hidden";
   		document.getElementById("moveListTable").style.visibility = "hidden";
   		hideOrShow(true);
   		drawScoreChart([]);

   		$info.css('visibility', 'hidden');
		$('#scoreBtn').html('info');

    	console.log("ID : "+_userInfo.accountID);
        
		$.get(
    	_chessDbUrl,
   		{account: _userInfo.accountID},
    	//{url: 695251003},
    	function(data) {
	   		console.log(data);
	   			if(data)
	   			{
	      			var jarr = JSON.parse(data);
	      			_personInfo = [];
	      			for(var i = 0; i < jarr.length; i++)
	      			{
	   	    			console.log(jarr[i]);
	   	    			_personInfo[i] = JSON.parse(jarr[i].info);
	   	    			_personInfo[i].url = jarr[i].url;
	   	    			addPersonalRecordRow(_personInfo[i]); 
	      			}
	   			}
		});
	}
	else
	{
		document.getElementById("personalRecordBtn").innerHTML = "個人棋局";
		document.getElementById("personalresult").style.visibility = "hidden";
		document.getElementById("content").style.visibility = "visible";
		hideOrShow(_chessInfo.is_hide);
		if(_chessInfo.move_total > 0) 
		{
			document.getElementById("moveListTable").style.visibility = "visible";
			drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
		}

	}
}

function hideOrShow(is_hide)
{
	if(is_hide)
	{
		document.getElementById("moveTb").style.visibility = "hidden";
    	document.getElementById("moveTb").style.display = "none";
    	document.getElementById("gameInfoArea").style.visibility = "hidden";
    	document.getElementById("gameInfoArea").style.display = "none";
    	document.getElementById("evaluate").style.visibility = "hidden";
    	document.getElementById("evaluate").style.display = "none";
    	document.getElementById("hideBtn").innerHTML = "完整顯示";
	}
	else
	{
		if(_chessInfo.move_total > 0) document.getElementById("moveTb").style.visibility = "visible";
    	document.getElementById("moveTb").style.display = "inline-block";
    	document.getElementById("gameInfoArea").style.visibility = "visible";
    	document.getElementById("gameInfoArea").style.display = "inline-block";
    	document.getElementById("evaluate").style.visibility = "visible";
    	document.getElementById("evaluate").style.display = "inline-block";
    	document.getElementById("hideBtn").innerHTML = "部分顯示";

    	if(window.innerHeight > window.innerWidth){
    		document.getElementById("moveTb").style.display ="block";
    		document.getElementById("gameInfoArea").style.display ="block";
    	}
	}

	if(_chessInfo.moveList.length > 0 && _chessInfo.scoreList.length > 0) 
   	{
   	   drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
   	}
}

function onHideBtnClick()
{
	_chessInfo.is_hide = !_chessInfo.is_hide;
    hideOrShow(_chessInfo.is_hide);
}

function onSignInOut(is_login)
{
    if(is_login)
    {
       document.getElementById("personalRecordBtn").style.display = "block";
       document.getElementById("gameinfo").style.display = "block";
       document.getElementById("signOut").style.visibility = "visible";
       
       var url = window.location.search;
	   var res = url.split('&').join('?').split('?')
	   var url = res[1];
	   if(url>0) getUserInfo(url);
    }
    else
    {
       document.getElementById("personalRecordBtn").style.display = "none";
       document.getElementById("gameinfo").style.display = "none";
       document.getElementById("signOut").style.visibility = "hidden";

       if(document.getElementById("personalresult").style.visibility == "visible")
       {
          document.getElementById("personalRecordBtn").innerHTML = "個人棋局";
	      document.getElementById("personalresult").style.visibility = "hidden";
	      document.getElementById("content").style.visibility = "visible";
	      if(_chessInfo.move_total > 0) document.getElementById("moveListTable").style.visibility = "visible";
       }
    }
}

function onSideRadioClick(myRadio) 
{
	console.log(myRadio.value);
	var val = parseInt(myRadio.value);
	if(val == 1) //red
	{
		_gameInfo.play_side = 1;
		document.getElementById("red_name").value = _userInfo.username;
		document.getElementById("black_name").value = "";
	}
	else if(val == 2) // black
	{
		_gameInfo.play_side = 2;
		document.getElementById("red_name").value ="";
		document.getElementById("black_name").value = _userInfo.username;
	}
	else
	{
		_gameInfo.play_side = 0;
        document.getElementById("red_name").value = "";
		document.getElementById("black_name").value = "";
	}

}

function onResultRadioClick(myRadio)
{
	var val = parseInt(myRadio.value);
    _gameInfo.result = val;
}

function onUploadBtnClick() {
    
	if(_chessInfo.move_total == 0 )
	{
		alert('搜尋後才能上傳!');
	}
	else
	{　　
		if(_chessInfo.is_login)
	    {
	    	_gameInfo.date = document.getElementById('datepicker').value;
	    	_gameInfo.game_name   = document.getElementById('game_name').value; 
	    	_gameInfo.round       = document.getElementById('round').value; 
			_gameInfo.r_name      = document.getElementById('red_name').value;
			_gameInfo.b_name      = document.getElementById('black_name').value; 
			_gameInfo.r_bad_rate1 = _chessInfo.badRate[0];
			_gameInfo.r_bad_rate2 = _chessInfo.badRate[1];
			_gameInfo.b_bad_rate1 = _chessInfo.badRate[2];
			_gameInfo.b_bad_rate2 = _chessInfo.badRate[3];

	    }

		var is_upload = false;
        if(!_chessInfo.is_complete)
		{
			if (confirm("盤面分析未完整，是否仍要上傳棋局結果?"))
			{
				uploadresult(_chessInfo, _gameInfo);
				is_upload = true;
			}
		}
		else
		{
			uploadresult(_chessInfo, _gameInfo);
			is_upload = true;
		}

		if(is_upload)
		{
        	var movestr = _chessInfo.engmoveList.join(",");
	    	var hash = hash2INT32(movestr);
    
			const el = document.createElement('textarea');
			el.value = _ladderUrl+hash;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			alert("上傳成功，已複製URL : "+ el.value);
		}
	}
}

function onOpenfileBtnClick() {
	$("#openfileInput").click();
}

function onDownloadBtnClick() {
	
	console.log($("#uploadInput").value);
	if($("#moveListTable")[0].innerText === "") {
		alert('搜尋後才能下載!');
	}
	else {

		setFilenameandDownload();
	}
}

function onFirstBtnClick()
{
	if(_chessInfo.is_edit_mode)
	{
		_chessInfo.moveList = [];
		document.getElementById("moveNumber").innerHTML = 0;
		document.getElementById("chessBookInput").value = "";
	}

	showBoardbyNum(0);
	_chessInfo.currNumber = 0;
}

function onEndBtnClick()
{
	if(_chessInfo.move_total>0)
	{
		showBoardbyNum(_chessInfo.move_total);
		_chessInfo.currNumber = _chessInfo.move_total;
	}
}

function onPrevBtnClick()
{
	if(_chessInfo.is_edit_mode)
	{
		if(_chessInfo.moveList.length>1)
		{
			_chessInfo.moveList.pop();
			_chessInfo.fenList.pop();
			document.getElementById("moveNumber").innerHTML = _chessInfo.moveList.length;
			document.getElementById("chessBookInput").value = _chessInfo.moveList.join(" ");
			//showBoardbyNum(_chessInfo.moveList.length);
			chessList = FEN_to_ChessList(_chessInfo.fenList[_chessInfo.moveList.length-1], null, true, true);
        	_chessboard = new ChessBoard(chessList, null, null, null, true, true);
    	}
    	else
    	{
    		_chessInfo.moveList.pop();
			_chessInfo.fenList.pop();
			document.getElementById("moveNumber").innerHTML = _chessInfo.moveList.length;
			document.getElementById("chessBookInput").value = _chessInfo.moveList.join(" ");
    		showBoardbyNum(0);
    	}
	}
	else
	{
		if(_chessInfo.currNumber>0)
		{
			showBoardbyNum(_chessInfo.currNumber-1);
		}
	}
}

function onNextBtnClick()
{
	if(_chessInfo.currNumber<_chessInfo.move_total)
	{
		showBoardbyNum(_chessInfo.currNumber+1);
	}
}

function onFenBtnClick()
{
	if(_chessInfo.is_edit_mode)
	{
		if(_chessInfo.fenList.length > 0)
		{
			copyToClipboard("此盤面FEN碼", _chessInfo.fenList[_chessInfo.fenList.length-1].replace("%20", " "));
		}
		else
		{
            var init_fen = prompt("請輸入盤面初始FEN", "");
            //_chessInfo.init_fen = init_fen.split(" ")[0];
		}
	}
	else
	{
		if(_chessInfo.move_total>0)
		{
			if(_chessInfo.currNumber>0)
			{
				copyToClipboard("此盤面FEN碼", _chessInfo.fenList[_chessInfo.currNumber-1].replace("%20", " "));
			}
			else
			{
				copyToClipboard("此盤面FEN碼", getDefaultFEN().replace("%20", " "));
			}
		}
		else
		{
            var init_fen = prompt("請輸入盤面初始FEN", "");
            _chessInfo.init_fen = init_fen.split(" ");

            chessList = FEN_to_ChessList(_chessInfo.init_fen[0], null, true, true);
		    _chessboard = new ChessBoard(chessList, null, null, null, true, true);
	
		}
	}
}

async function onCloudBtnClick()
{
	if(_chessInfo.is_edit_mode)
	{
		if(_chessInfo.fenList.length > 0)
		{
			console.log(_cloudUrl+_chessInfo.fenList[_chessInfo.fenList.length-1]);
			//var data = await httpGet(_cloudUrl+_chessInfo.fenList[_chessInfo.fenList.length-1]);
			//if(data == "网站正在备案中，暂时不能打开")
			{
				window.open(_cloudBackUpUrl+_chessInfo.fenList[_chessInfo.fenList.length-1], "_blank");
			}
			//else
			{
				//window.open(_cloudUrl+_chessInfo.fenList[_chessInfo.fenList.length-1], "_blank");
			}
		}
	}
	else
	{
		if(_chessInfo.move_total>0)
		{
			if(_chessInfo.currNumber>0)
			{
				//var data = await httpGet(_cloudUrl+_chessInfo.fenList[_chessInfo.currNumber-1]);
				//if(data == "网站正在备案中，暂时不能打开")
				{
					window.open(_cloudBackUpUrl+_chessInfo.fenList[_chessInfo.currNumber-1], "_blank");
				}
				//else
				{
					//window.open(_cloudUrl+_chessInfo.fenList[_chessInfo.currNumber-1], "_blank");
				}
			}
			else
			{
				//var data = await httpGet(_cloudUrl+getDefaultFEN());
				//if(data == "网站正在备案中，暂时不能打开")
				{
					window.open(_cloudBackUpUrl+getDefaultFEN(), "_blank");
				}
				//else
				{
					//window.open(_cloudUrl+getDefaultFEN(), "_blank");
				}
			}
		}
	}
}

function onDpxqBtnClick()
{
	if(_chessInfo.is_edit_mode)
	{
		if(_chessInfo.fenList.length > 0)
		{
			var board = FEN_to_Board(_chessInfo.fenList[_chessInfo.fenList.length-1]);
			var dpxq = convertBoard2dpxq(board);
			var dpxq_url = "http://www.dpxq.com/hldcg/search/?site=www.dpxq.com&owner=%B6%A5%BC%E2%B6%D4%BE%D6&e=&p=" + dpxq +
				           "tree&red=&black=&result=&title=&date=&class=&event=&open=&order=&page=1"; 
			window.open(dpxq_url, "_blank");
		}
	}
	else
	{
		if(_chessInfo.move_total>0)
		{
			if(_chessInfo.currNumber>0)
			{
				var board = FEN_to_Board(_chessInfo.fenList[_chessInfo.currNumber-1]);
				//console.log(board);
				var dpxq = convertBoard2dpxq(board);
				//console.log(dpxq);
				var dpxq_url = "http://www.dpxq.com/hldcg/search/?site=www.dpxq.com&owner=%B6%A5%BC%E2%B6%D4%BE%D6&e=&p=" + dpxq +
				               "tree&red=&black=&result=&title=&date=&class=&event=&open=&order=&page=1"; 
				window.open(dpxq_url, "_blank");
			}
		}
	}
}

function onVerticalBtnClick()
{
	_chessInfo.is_vertical_original = ! _chessInfo.is_vertical_original;
	_chessInfo.is_horizontal_original = ! _chessInfo.is_horizontal_original;
	showBoardbyNum(_chessInfo.currNumber);
	
}

function onHorizBtnClick()
{
	_chessInfo.is_horizontal_original = ! _chessInfo.is_horizontal_original;
	showBoardbyNum(_chessInfo.currNumber);
}

function onEnLargeBtnClick()
{
   if(_chessInfo.boardSizeLevel < 4)
   {
   	  _chessInfo.boardSizeLevel++;
   	  var html = document.getElementsByTagName('body')[0];
   	  html.style.setProperty("--chessboard_scale", _BoardScale[_chessInfo.boardSizeLevel]);
   	  if(_chessInfo.moveList.length > 0 && _chessInfo.scoreList.length > 0) 
   	  {
   	  	 drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
   	  }
   }
}

function onShrinkBtnClick()
{
   if(_chessInfo.boardSizeLevel > 0)
   {
   	  _chessInfo.boardSizeLevel--;
      var html = document.getElementsByTagName('body')[0];
      html.style.setProperty("--chessboard_scale", _BoardScale[_chessInfo.boardSizeLevel]);
      if(_chessInfo.moveList.length > 0 && _chessInfo.scoreList.length > 0) 
   	  {
   	  	 drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
   	  }
   }
}

function onScoreBtnClick()
{
	$info= $('#chess-info');
	if($info.css("visibility") == "hidden") 
	{
		$info.css('visibility', 'visible');
		$('#scoreBtn').html('hide');
	}
	else 
	{
		$info.css('visibility', 'hidden');
		$('#scoreBtn').html('info');
	}
    
}

function onPicBtnClick()
{
	$("#myBoard").empty();
	html2canvas(document.querySelector("#chessboardPic")).then(function (canvas) {
                        var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);
                        $('#myBoard').html(img);
                        img.setAttribute('width', $("#chessboardPic").css( "width" ));
                        img.setAttribute('height', $("#chessboardPic").css( "height" ));
                    });
	document.getElementById('myModal').style.display = "block";				
}

function onScoreChartBtnClick()
{
   _chessInfo.chartType = 0;
   drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
}

function onBiasChartBtnClick()
{
   _chessInfo.chartType = 1;
   drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
}

function onStatChartBtnClick()
{
   _chessInfo.chartType = 2;
   drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
}

function setEditMode(is_edit_mode)
{
	if(is_edit_mode)
	{
		clearInputText();
		document.getElementById("editModeBtn").innerHTML = "觀棋模式";
		document.getElementById("horizBtn").disabled = true;
		document.getElementById("verticalBtn").disabled = true;
		document.getElementById("endBtn").disabled = true;
		document.getElementById("nextBtn").disabled = true;
		document.getElementById("scoreBtn").disabled = true;
		document.getElementById("firstBtn").innerHTML = "初始";
		document.getElementById("prevBtn").innerHTML = "back";
	}
	else
	{
		document.getElementById("editModeBtn").innerHTML = "手動打譜";
		document.getElementById("horizBtn").disabled = false;
		document.getElementById("verticalBtn").disabled = false;
		document.getElementById("endBtn").disabled = false;
		document.getElementById("nextBtn").disabled = false;
		document.getElementById("scoreBtn").disabled = false;
		document.getElementById("firstBtn").innerHTML = "|<";
		document.getElementById("prevBtn").innerHTML = "<";
	}
}

function onEditModeBtnClick()
{
	if(_chessInfo.move_total > 0 && !_chessInfo.is_edit_mode) 
	{
		if (confirm("進入打譜模式會清除當前棋局，是否繼續?"))
		{
			_chessInfo.is_edit_mode = true;
			setEditMode(true);
			resetChessInfo();	
			removeDisplayTable();
			resetBadRate();
			showBoardbyNum(0);
			$('.chartArea').removeClass('opacity9');
			$('.chartArea').html('');
		}
	}
	else
	{
		_chessInfo.is_edit_mode = !_chessInfo.is_edit_mode;
		setEditMode(_chessInfo.is_edit_mode);
		if(_chessInfo.is_edit_mode)
		{
			resetChessInfo();	
			removeDisplayTable();
			resetBadRate();
			showBoardbyNum(0);
			$('.chartArea').removeClass('opacity9');
		}
		else
		{
			_chessInfo.move_total = _chessInfo.moveList.length;
		}
	}
}

function onTimeBtnClick()
{
	document.getElementById("personalrecordBody").innerHTML = "";
	_sortState[0] = !_sortState[0];
	console.log("time sort:"+_personInfo.sort(sort_by({name:'date', primer: String, reverse: _sortState[0]}, {name:'round', primer: String, reverse: _sortState[0]})));

    for(var i = 0; i<_personInfo.length; i++)
	{
		console.log(_personInfo[i]);
		addPersonalRecordRow(_personInfo[i]);
	}
}

function onGamenameClick()
{
	document.getElementById("personalrecordBody").innerHTML = "";
	_sortState[1] = !_sortState[1];
	console.log("game sort:"+_personInfo.sort(sort_by({name:'game_name', primer: String, reverse: _sortState[1]}, {name:'round', primer: String, reverse: _sortState[0]})));
    for(var i = 0; i<_personInfo.length; i++)
	{
		console.log(_personInfo[i]);
		addPersonalRecordRow(_personInfo[i]);
	}
}

function onRednameBtnClick()
{
	document.getElementById("personalrecordBody").innerHTML = "";
	_sortState[2] = !_sortState[2];
	console.log("red sort:"+_personInfo.sort(sort_by({name:'r_name', primer: String, reverse: _sortState[2]}, {name:'round', primer: String, reverse: _sortState[0]})));
    for(var i = 0; i<_personInfo.length; i++)
	{
		console.log(_personInfo[i]);
		addPersonalRecordRow(_personInfo[i]);
	}
}

function onBlacknameBtnClick()
{
	document.getElementById("personalrecordBody").innerHTML = "";
	_sortState[3] = !_sortState[3];
	console.log("black sort:"+_personInfo.sort(sort_by({name:'b_name', primer: String, reverse: _sortState[3]}, {name:'round', primer: String, reverse: _sortState[0]})));
    for(var i = 0; i<_personInfo.length; i++)
	{
		console.log(_personInfo[i]);
		addPersonalRecordRow(_personInfo[i]);
	}
}

function setFilenameandDownload()
{
	var t = new Date();
	var date = t.getFullYear() + "-" + ('0' + (t.getMonth() + 1)).slice(-2) + "-" + ('0' + t.getDate()).slice(-2);
	var time = ('0' + t.getHours()).slice(-2) + ":" + ('0' + t.getMinutes()).slice(-2) + ":" + ('0' + t.getSeconds()).slice(-2);
	//var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
	//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var datetimestr = date+'_'+time;
	var outFileName = prompt("請輸入下載檔名", "chessladder_"+datetimestr);
    
	if(outFileName == null)
	{
		return;
	}
	else
	{
		if(outFileName == "")	
			outFileName = 'chess_file.pgn'
		else
			outFileName += ".pgn";
			
		var encoded = new TextEncoder("gb18030",{ NONSTANDARD_allowLegacyEncoding: true }).encode(_chessInfo.pgn_str);
		download(encoded,outFileName);
	}
}

function download (content, filename, contentType) {
    if(!contentType) contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // use the 1st file from the list
    f = files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function() {
        return function(e) {
          $( '#chessBookInput' ).val( e.target.result );
        };
    })(f);
	reader.readAsText(f,"gbk");
}

function stopQuery() {
	_chessInfo.toStop = true;
}

function evaluateChess(is_red_first, scoreList, biasList) {

var red_total   = [0, 0, 0];
var black_total = [0, 0, 0];

//[b15_ng, a15_ng, tot_ng], [b15_bad, a15_bad, tot_bad], [b15_bias, a15_bias, tot_bias]
var red_cnt     = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var black_cnt   = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var red_value   = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var black_value = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var red_max     = [0, 0, 0];
var black_max   = [0, 0 ,0];

var red_filter   = [0, 0];
var black_filter = [0, 0];

if(biasList.length > 0)
{
	var is_red = false;
	var is_b15 = false;
	var bad_idx = 0;

    for(var i = 0; i < biasList.length; i++)
    {
    	if(biasList[i] == undefined || Number.isNaN(biasList[i])) 
    	{
    		break;
    	}

    	if((is_red_first && (i%2 == 0)) || (!is_red_first && (i%2 == 1)))
    	{ //red score
    	   is_red = true;
    	}
    	else
    	{ //black score
    	   is_red = false;
    	}

    	if(i/2 < 15) 
    	   is_b15 = true;
    	else 
    	   is_b15 = false;

    	if(biasList[i] >= 200) bad_idx = 2;
    	else if(biasList[i] >= 50) bad_idx = 1;
    	else bad_idx = 0;

    	if(is_red)
    	{
    	   if(is_b15)
    	   {
    	      red_total[0]++;
    	      if(bad_idx == 1)
    	      {
                 red_cnt[0][0]++;//r b15 ng
                 red_cnt[0][2]++;//r tot ng
    	      }
    	      else if(bad_idx == 2)
    	      {
    	      	 red_cnt[0][0]++;//r b15 ng
    	      	 red_cnt[1][0]++;//r b15 bad
    	      	 red_cnt[0][2]++;//r tot ng
    	      	 red_cnt[1][2]++;//r tot bad
    	      }
    	      red_cnt[2][0] += biasList[i];//r b15 bias
    	      red_max[0] = Math.max(red_max[0], biasList[i]);
    	   }
    	   else
    	   { 
    	   	  red_total[1]++;
    	   	  if(bad_idx == 1)
    	      {
                 red_cnt[0][1]++;//r a15 ng
                 red_cnt[0][2]++;//r tot ng
    	      }
    	      else if(bad_idx == 2)
    	      {
    	      	 red_cnt[0][1]++;//r a15 ng
    	      	 red_cnt[1][1]++;//r a15 bad
    	      	 red_cnt[0][2]++;//r tot ng
    	      	 red_cnt[1][2]++;//r tot bad
    	      }
    	      red_cnt[2][1] += biasList[i];//r a15 bias
    	      red_max[1] = Math.max(red_max[1], biasList[i]);
    	   }

    	   red_total[2]++;
    	   red_cnt[2][2] += biasList[i];//r tot bias
    	   red_max[2] = Math.max(red_max[2], biasList[i]);
    	}
    	else
    	{
    	   if(is_b15)
    	   {
    	      black_total[0]++;
    	      if(bad_idx == 1)
    	      {
                 black_cnt[0][0]++;//b b15 ng
                 black_cnt[0][2]++;//b tot ng
    	      }
    	      else if(bad_idx == 2)
    	      {
    	      	 black_cnt[0][0]++;//b b15 ng
    	      	 black_cnt[1][0]++;//b b15 bad
    	      	 black_cnt[0][2]++;//b tot ng
    	      	 black_cnt[1][2]++;//b tot bad
    	      }
    	      black_cnt[2][0] += biasList[i];//b b15 bias
    	      black_max[0] = Math.max(black_max[0], biasList[i]);	
    	   }
    	   else
    	   { 
    	   	  black_total[1]++;
    	   	  if(bad_idx == 1)
    	      {
                 black_cnt[0][1]++;//b a15 ng
                 black_cnt[0][2]++;//b tot ng
    	      }
    	      else if(bad_idx == 2)
    	      {
    	      	 black_cnt[0][1]++;//b a15 ng
    	      	 black_cnt[1][1]++;//b a15 bad
    	      	 black_cnt[0][2]++;//b tot ng
    	      	 black_cnt[1][2]++;//b tot bad
    	      }
    	      black_cnt[2][1] += biasList[i];//b a15 bias
    	      black_max[1] = Math.max(black_max[1], biasList[i]);
    	   }

    	   black_total[2]++;
    	   black_cnt[2][2] += biasList[i];//b tot bias
    	   black_max[2] = Math.max(black_max[2], biasList[i]);
    	}
    }
    
    /* ng rate */
    red_value[0][0]   = 100*red_cnt[0][0]/red_total[0];
    red_value[0][1]   = 100*red_cnt[0][1]/red_total[1];
    red_value[0][2]   = 100*red_cnt[0][2]/red_total[2];
    black_value[0][0] = 100*black_cnt[0][0]/black_total[0];
    black_value[0][1] = 100*black_cnt[0][1]/black_total[1];
    black_value[0][2] = 100*black_cnt[0][2]/black_total[2];
    /* bad rate */
    red_value[1][0]   = 100*red_cnt[1][0]/red_total[0];
    red_value[1][1]   = 100*red_cnt[1][1]/red_total[1];
    red_value[1][2]   = 100*red_cnt[1][2]/red_total[2];
    black_value[1][0] = 100*black_cnt[1][0]/black_total[0];
    black_value[1][1] = 100*black_cnt[1][1]/black_total[1];
    black_value[1][2] = 100*black_cnt[1][2]/black_total[2];
    /* bias */
    red_value[2][0]   = red_cnt[2][0]/red_total[0];
    red_value[2][1]   = red_cnt[2][1]/red_total[1];
    red_value[2][2]   = red_cnt[2][2]/red_total[2];
    black_value[2][0] = black_cnt[2][0]/black_total[0];
    black_value[2][1] = black_cnt[2][1]/black_total[1];
    black_value[2][2] = black_cnt[2][2]/black_total[2];

	document.getElementById("red_b15_ng").innerHTML      =parseFloat(red_value[0][0]).toFixed(1);
	document.getElementById("red_a15_ng").innerHTML      =parseFloat(red_value[0][1]).toFixed(1);
	document.getElementById("red_ng").innerHTML          =parseFloat(red_value[0][2]).toFixed(1);
	document.getElementById("red_b15_bad").innerHTML     =parseFloat(red_value[1][0]).toFixed(1);
	document.getElementById("red_a15_bad").innerHTML     =parseFloat(red_value[1][1]).toFixed(1);
	document.getElementById("red_bad").innerHTML         =parseFloat(red_value[1][2]).toFixed(1);
	document.getElementById("red_b15_bias").innerHTML    =parseFloat(red_value[2][0]).toFixed(0);
	document.getElementById("red_a15_bias").innerHTML    =parseFloat(red_value[2][1]).toFixed(0);
	document.getElementById("red_bias").innerHTML        =parseFloat(red_value[2][2]).toFixed(0);
	document.getElementById("red_b15_maxbias").innerHTML =parseFloat(red_max[0]).toFixed(0);
	document.getElementById("red_a15_maxbias").innerHTML =parseFloat(red_max[1]).toFixed(0);
	document.getElementById("red_maxbias").innerHTML     =parseFloat(red_max[2]).toFixed(0);
	document.getElementById("red_b15_class").innerHTML   ="";
	document.getElementById("red_a15_class").innerHTML   ="";
	document.getElementById("red_class").innerHTML       ="";

	document.getElementById("black_b15_ng").innerHTML    =parseFloat(black_value[0][0]).toFixed(1);
	document.getElementById("black_a15_ng").innerHTML    =parseFloat(black_value[0][1]).toFixed(1);
	document.getElementById("black_ng").innerHTML        =parseFloat(black_value[0][2]).toFixed(1);
	document.getElementById("black_b15_bad").innerHTML   =parseFloat(black_value[1][0]).toFixed(1);
	document.getElementById("black_a15_bad").innerHTML   =parseFloat(black_value[1][1]).toFixed(1);
	document.getElementById("black_bad").innerHTML       =parseFloat(black_value[1][2]).toFixed(1);
	document.getElementById("black_b15_bias").innerHTML  =parseFloat(black_value[2][0]).toFixed(0);
	document.getElementById("black_a15_bias").innerHTML  =parseFloat(black_value[2][1]).toFixed(0);
	document.getElementById("black_bias").innerHTML      =parseFloat(black_value[2][2]).toFixed(0);
	document.getElementById("black_b15_maxbias").innerHTML =parseFloat(black_max[0]).toFixed(0);
	document.getElementById("black_a15_maxbias").innerHTML =parseFloat(black_max[1]).toFixed(0);
	document.getElementById("black_maxbias").innerHTML     =parseFloat(black_max[2]).toFixed(0);
	document.getElementById("black_b15_class").innerHTML ="";
	document.getElementById("black_a15_class").innerHTML ="";
	document.getElementById("black_class").innerHTML     ="";
    
    
    /* ng */
    /*
	if(red_value[0][0] > 14) document.getElementById("red_b15_ng").classList.add('bad_color');
	else if(red_value[0][0] > 0) document.getElementById("red_b15_ng").classList.add('normal_color');
	else document.getElementById("red_b15_ng").classList.add('good_color');
	if(black_value[0][0] > 14) document.getElementById("black_b15_ng").classList.add('bad_color');
	else if(black_value[0][0] > 0) document.getElementById("black_b15_ng").classList.add('normal_color');
	else document.getElementById("black_b15_ng").classList.add('good_color');

	if(red_value[0][1] >= 40) document.getElementById("red_a15_ng").classList.add('bad_color');
	else if(red_value[0][1] >= 20) document.getElementById("red_a15_ng").classList.add('normal_color');
	else document.getElementById("red_a15_ng").classList.add('good_color');
	if(black_value[0][1] >= 40) document.getElementById("black_a15_ng").classList.add('bad_color');
	else if(black_value[0][1] >= 20) document.getElementById("black_a15_ng").classList.add('normal_color');
	else document.getElementById("black_a15_ng").classList.add('good_color');
    */
	if(red_value[0][2] >= 40) document.getElementById("red_ng").classList.add('bad_color');
	else if(red_value[0][2] >= 25) document.getElementById("red_ng").classList.add('normal_color');
	else document.getElementById("red_ng").classList.add('good_color');
	if(black_value[0][2] >= 40) document.getElementById("black_ng").classList.add('bad_color');
	else if(black_value[0][2] >= 25) document.getElementById("black_ng").classList.add('normal_color');
	else document.getElementById("black_ng").classList.add('good_color');
    
    /* bad */
	/*
	if(red_value[1][0] > 0) document.getElementById("red_b15_bad").classList.add('bad_color');
	else document.getElementById("red_b15_bad").classList.add('good_color');
	if(black_value[1][0] > 0) document.getElementById("black_b15_bad").classList.add('bad_color');
	else document.getElementById("black_b15_bad").classList.add('good_color');

	if(red_value[1][1] >= 15) document.getElementById("red_a15_bad").classList.add('bad_color');
	else if(red_value[1][1] >= 7) document.getElementById("red_a15_bad").classList.add('normal_color');
	else document.getElementById("red_a15_bad").classList.add('good_color');
	if(black_value[1][1] >= 15) document.getElementById("black_a15_bad").classList.add('bad_color');
	else if(black_value[1][1] >= 7) document.getElementById("black_a15_bad").classList.add('normal_color');
	else document.getElementById("black_a15_bad").classList.add('good_color');
	*/

	if(red_value[1][2] >= 15) document.getElementById("red_bad").classList.add('bad_color');
	else if(red_value[1][2] >= 7) document.getElementById("red_bad").classList.add('normal_color');
	else document.getElementById("red_bad").classList.add('good_color');
	if(black_value[1][2] >= 15) document.getElementById("black_bad").classList.add('bad_color');
	else if(black_value[1][2] >= 7) document.getElementById("black_bad").classList.add('normal_color');
	else document.getElementById("black_bad").classList.add('good_color');

	/* bias */
	/*
	if(red_value[2][0] >= 30) document.getElementById("red_b15_bias").classList.add('bad_color');
	else if(red_value[2][0] >= 15) document.getElementById("red_b15_bias").classList.add('normal_color');
	else document.getElementById("red_b15_bias").classList.add('good_color');
    if(black_value[2][0] >= 30) document.getElementById("black_b15_bias").classList.add('bad_color');
	else if(black_value[2][0] >= 15) document.getElementById("black_b15_bias").classList.add('normal_color');
	else document.getElementById("black_b15_bias").classList.add('good_color');

	if(red_value[2][1] >= 60) document.getElementById("red_a15_bias").classList.add('bad_color');
	else if(red_value[2][1] >= 40) document.getElementById("red_a15_bias").classList.add('normal_color');
	else document.getElementById("red_a15_bias").classList.add('good_color');
	if(black_value[2][1] >= 60) document.getElementById("black_a15_bias").classList.add('bad_color');
	else if(black_value[2][1] >= 40) document.getElementById("black_a15_bias").classList.add('normal_color');
	else document.getElementById("black_a15_bias").classList.add('good_color');
	*/

	if(red_value[2][2] >= 100) document.getElementById("red_bias").classList.add('bad_color');
	else if(red_value[2][2] >= 40) document.getElementById("red_bias").classList.add('normal_color');
	else document.getElementById("red_bias").classList.add('good_color');
	if(black_value[2][2] >= 100) document.getElementById("black_bias").classList.add('bad_color');
	else if(black_value[2][2] >= 40) document.getElementById("black_bias").classList.add('normal_color');
	else document.getElementById("black_bias").classList.add('good_color');

	if(red_max[2] >= 1000) document.getElementById("red_maxbias").classList.add('bad_color');
	else if(red_max[2] >= 400) document.getElementById("red_maxbias").classList.add('normal_color');
	else document.getElementById("red_maxbias").classList.add('good_color');
	if(black_max[2] >= 1000) document.getElementById("black_maxbias").classList.add('bad_color');
	else if(black_max[2] >= 400) document.getElementById("black_maxbias").classList.add('normal_color');
	else document.getElementById("black_maxbias").classList.add('good_color');

	/* class */
	if(red_cnt[2][0] < 150) document.getElementById("red_b15_class").innerHTML       = "S";
	else if(red_cnt[2][0] < 300) document.getElementById("red_b15_class").innerHTML  = "A";
	else if(red_cnt[2][0] < 500) document.getElementById("red_b15_class").innerHTML  = "B";
	else if(red_cnt[2][0] < 1000) document.getElementById("red_b15_class").innerHTML = "C";
	else document.getElementById("red_b15_class").innerHTML = "D";
	if(black_cnt[2][0] < 150) document.getElementById("black_b15_class").innerHTML       = "S";
	else if(black_cnt[2][0] < 300) document.getElementById("black_b15_class").innerHTML  = "A";
	else if(black_cnt[2][0] < 500) document.getElementById("black_b15_class").innerHTML  = "B";
	else if(black_cnt[2][0] < 1000) document.getElementById("black_b15_class").innerHTML = "C";
	else document.getElementById("black_b15_class").innerHTML = "D";
    
    {
    if(red_value[2][1] < 20) document.getElementById("red_a15_class").innerHTML       = "S";
	else if(red_value[2][1] < 40) document.getElementById("red_a15_class").innerHTML  = "A";
	else if(red_value[2][1] < 80) document.getElementById("red_a15_class").innerHTML  = "B";
	else if(red_value[2][1] < 150) document.getElementById("red_a15_class").innerHTML = "C";
	else document.getElementById("red_a15_class").innerHTML = "D";
	if(black_value[2][1] < 20) document.getElementById("black_a15_class").innerHTML       = "S";
	else if(black_value[2][1] < 40) document.getElementById("black_a15_class").innerHTML  = "A";
	else if(black_value[2][1] < 80) document.getElementById("black_a15_class").innerHTML  = "B";
	else if(black_value[2][1] < 150) document.getElementById("black_a15_class").innerHTML = "C";
	else document.getElementById("black_a15_class").innerHTML = "D";
    }

	if(red_value[2][2] < 20 && red_max[2] < 100) document.getElementById("red_class").innerHTML = "S+";
	else if(red_value[2][2] < 20 && red_max[2] < 200) document.getElementById("red_class").innerHTML = "S";
	else if(red_value[2][2] < 40 && red_max[2] < 500) document.getElementById("red_class").innerHTML  = "A";
	else if(red_value[2][2] < 80 || red_value[1][2] < 20) document.getElementById("red_class").innerHTML  = "B";
	else if(red_value[2][2] < 150 || red_value[1][2] < 30) document.getElementById("red_class").innerHTML = "C";
	else document.getElementById("red_class").innerHTML = "D";

	if(black_value[2][2] < 20 && black_max[2] < 100) document.getElementById("black_class").innerHTML = "S+";
	else if(black_value[2][2] < 20 && black_max[2] < 200) document.getElementById("black_class").innerHTML = "S";
	else if(black_value[2][2] < 40 && black_max[2] < 500) document.getElementById("black_class").innerHTML  = "A";
	else if(black_value[2][2] < 80 || black_value[0][2] < 20) document.getElementById("black_class").innerHTML  = "B";
	else if(black_value[2][2] < 150 || black_value[0][2] < 30) document.getElementById("black_class").innerHTML = "C";
	else document.getElementById("black_class").innerHTML = "D";

}

}

function resetChessInfo() {
	_chessInfo.copy_str = "";
	_chessInfo.status_str = "";
	_chessInfo.move_total = 0;
	_chessInfo.move_curr = 0;
	_chessInfo.currNumber = 0;
	_chessInfo.toStop = false;
	_chessInfo.inQuety = false;
	_chessInfo.is_complete = false;
	_chessInfo.is_got_result = false;
	_chessInfo.is_in_cloud_db = false;
	_chessInfo.is_vertical_original = true;
	_chessInfo.is_horizontal_original = true;
	_chessInfo.engmoveList = [];
	_chessInfo.moveList = [];
	_chessInfo.moveCurveList = [];
	_chessInfo.scoreList = [];
	_chessInfo.biasList = [];
	_chessInfo.fenList = [];
	_chessInfo.recommendList = [];
	_chessInfo.badRate = [0, 0, 0, 0];
}

async function queryLadderDB() {
	var hash;
	var mytext   = document.getElementById("chessBookInput").value;	
	_chessInfo.is_edit_mode = false;
	setEditMode(_chessInfo.is_edit_mode);
	resetChessInfo();
	disableButtons();
	removeDisplayTable();
	resetBadRate();
	$('.chartArea').removeClass('opacity9');

	if (mytext == "" || mytext ===  placeholder)
	{
		alert("請輸入棋譜!");
	}
	else
	{
	    var res      = check_text_valid(mytext);
		var result   = res[0];
		var list_num = res[1];
	    
		if (result)
		{
			var list = parsing_text(mytext);
			var move_list = list[1];
			var eng_move_list = convert2engmovelist(move_list);
			var movestr = eng_move_list.join(",");
	        var hash = hash2INT32(movestr);
			getParameterHandler(hash); 
		}
		else
		{
			alert("輸入格式有誤!");
		}
	}
	
	enableButtons();
}

async function queryCloudDB() {
	
	if(_chessInfo.inQuety)
	{
		_chessInfo.inQuety = false;
		stopQuery();
		return;
	}
	resetChessInfo();
	_chessInfo.is_edit_mode = false;
	setEditMode(_chessInfo.is_edit_mode);

    var mytext = document.getElementById("chessBookInput").value;	
	disableButtons();
	
	removeDisplayTable();
	resetBadRate();

	$('.chartArea').removeClass('opacity9');
    $("#copyEgBtn").attr("disabled", true);
	
	if (mytext == "" || mytext === placeholder)
	{
		alert("請輸入棋譜!");
	}
	else
	{
		var list      = check_text_valid(mytext);
		var result    = list[0];
		var list_num  = list[1];
	    var parse_res = parsing_text(mytext);
        var fen       = parse_res[0];

		if (result)
		{
			var query_result = [];
			_chessInfo.inQuety = true;
			_chessInfo.is_got_result = true;
			_chessInfo.status_str = "" + 0 + "/" + list_num;
			showResult();
			query_result = await queryByMoveList(mytext);
			_chessInfo.init_fen = fen;
			_chessInfo.moveList  = query_result.move_list;
			_chessInfo.move_total = query_result.move_list.length;
			_chessInfo.engmoveList = convert2engmovelist(_chessInfo.moveList);
			_chessInfo.scoreList = query_result.red_score_list;
			_chessInfo.biasList = query_result.score_bias_list;
			_chessInfo.recommendList = query_result.first_recommend_list;
			_chessInfo.fenList = query_result.fen_list;
			_chessInfo.moveCurveList = query_result.curve_list; 
			_chessInfo.copy_str = createCopyStr([_chessInfo.fenList, _chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, query_result.recommend_str_list]);       
			_chessInfo.pgn_str = generate_pgn_file(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.recommendList);
		    
		    if(_chessInfo.scoreList.length == _chessInfo.move_total)
			   _chessInfo.is_complete = true;
		}
		else
		{
			alert("輸入格式有誤!");
		}
	}
	if(_chessInfo.is_got_result)
	{
		showResult();  
		showBoardbyNum(0);
		updateBadRate(calBadRate(_chessInfo.biasList));
		$('.chartArea').addClass('opacity9');
		drawScoreChart(_chessInfo.moveList, _chessInfo.scoreList, _chessInfo.biasList, _chessInfo.chartType);
        evaluateChess(true, _chessInfo.scoreList, _chessInfo.biasList);

        var eng_move_list_str = _chessInfo.engmoveList.join(",");
	    var hash = hash2INT32(eng_move_list_str);
		_chessInfo.is_in_cloud_db = checkUrlExist(hash);
        
        if(_chessInfo.is_complete)
        {
			if(_chessInfo.is_login && 
			   document.getElementById('datepicker').value != "" &&
			   document.getElementById('game_name').value != "")
		    {
		    	_gameInfo.date        = document.getElementById('datepicker').value;
		    	_gameInfo.game_name   = document.getElementById('game_name').value; 
		    	_gameInfo.round       = document.getElementById('round').value; 
				_gameInfo.r_name      = document.getElementById('red_name').value;
				_gameInfo.b_name      = document.getElementById('black_name').value; 
				_gameInfo.r_bad_rate1 = _chessInfo.badRate[0];
				_gameInfo.r_bad_rate2 = _chessInfo.badRate[1];
				_gameInfo.b_bad_rate1 = _chessInfo.badRate[2];
				_gameInfo.b_bad_rate2 = _chessInfo.badRate[3];

		        insert2mysqlwithAccoutInfo(_chessInfo, _gameInfo);
		    }
		    else
		    {
		    	insert2mysql(_chessInfo);
		    }
		}
	}
	enableButtons();
	_chessInfo.inQuety = false;
	
    $("#copyEgBtn").attr("disabled", false);
    $("#queryBtn").html($("#queryBtn").val());
}

function copyQueryResult() {
	
	const el = document.createElement('textarea');
    el.value = document.getElementById("badRate").innerHTML+"\n"+_chessInfo.copy_str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
	
	if(_chessInfo.copy_str != "")		
		alert("複製成功!");
	else
		alert("沒有可複製的文字!");
	
}

function copyUrl() {
	var movestr = _chessInfo.engmoveList.join(",");
	var hash = hash2INT32(movestr);
    
    if(_chessInfo.moveList.length == 0)
	{
		alert("沒有有效的URL可以複製!");
		return;
	}
	else
	{
		if(_chessInfo.is_in_cloud_db == true)
		{
			const el = document.createElement('textarea');
		    el.value = _ladderUrl+hash;
		    document.body.appendChild(el);
		    el.select();
		    document.execCommand('copy');
		    document.body.removeChild(el);
		    alert("已複製URL : "+ el.value);
		}
		else
		{
			alert("需先上傳雲梯後才能分享棋局");
		}
	}
}

function clearInputText() {

    document.getElementById("datepicker").value = "";
	document.getElementById("game_name").value = "";
	document.getElementById("round").value = "";
	document.getElementById("red_name").value = "";
	document.getElementById("black_name").value = "";
    
    document.getElementById("red_turn").checked = false;
    document.getElementById("black_turn").checked = false;
    document.getElementById("unknown_turn").checked = false;

    document.getElementById("red_win").checked = false;
    document.getElementById("draw").checked = false;
    document.getElementById("black_win").checked = false;
    document.getElementById("unknown_win").checked = false;

	document.getElementById("chessBookInput").value = "";
	if(_chessInfo.is_edit_mode)
	{
		_chessInfo.moveList = [];
		_chessInfo.currNumber = 0;
		document.getElementById("moveNumber").innerHTML = 0;
		showBoardbyNum(0);
	}
}

function showInfo() {
	/*
	alert("操作步驟:\
	     \n\t1. 從象棋橋或是東萍匯出文字棋譜。\
	     \n\t2. 將文字棋譜貼至本網頁上，然後按下'逐步查詢'。\
		 \n\t3. 建議使用Chrome瀏覽器。\
	     \n\t4. 可至粉絲專頁獲取更多使用資訊。\
		 \n輸出說明:\
		 \n\t1. 盤面分數正分代表紅優，負分則為黑優。\
		 \n\t2. 分數偏差是指和雲庫最佳應著之間的偏差絕對值。\
		 \n\t3. 分數偏差大於50記為緩著，大於200記為失著。\
		 \n\t4. NaN代表雲庫查無資料，建議按下'逐步查詢'重新查詢。");
		 */
    if (window.Worker) 
    {
	   const myWorker = new Worker("./js/console/worker.js");
       myWorker.postMessage(0);
	   console.log('Message posted to worker');
    } else {
	  console.log('Your browser doesn\'t support web workers.')
    }

}

function initPlaceholder() {
    
    $('#chessBookInput').val(placeholder);

    $('#chessBookInput').focus(function(){
        if($(this).val() === placeholder){
            $(this).val('');
        }
    });

    $('#chessBookInput').blur(function(){
        if($(this).val() ===''){
            $(this).val(placeholder);
        }    
    });
}

function copyToClipboard(infoString, copiedContent ) {
    // Create a "hidden" input
	var aux = document.createElement("input");

	// Assign it the value of the specified element
	aux.setAttribute("value", copiedContent);

	// Append it to the body
	document.body.appendChild(aux);
	
	if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
 
        // convert to editable with readonly to stop iOS keyboard opening
        aux.contentEditable = true;
        aux.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(aux);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        aux.setSelectionRange(0, 999999);
	} else {
		aux.select();
	}
    
    // Copy the highlighted text
    document.execCommand("copy");
  
    // Remove it from the body
    document.body.removeChild(aux);

    alert("已複製"+infoString+"至你的剪貼本: \n" + copiedContent);
}

function showResult(){
    if(_chessInfo.status_str == "") _status_str = $("#queryBtn").val();
    document.getElementById("queryBtn").innerHTML = _chessInfo.status_str;
}

function disableButtons(){
	for(var i=0; i<buttonList.length; ++i) {
		if(buttonList[i]!=queryBtn)
			buttonList[i].disabled = true;
	}
}

function enableButtons() {
	for(var i=0; i<buttonList.length; ++i) {
		buttonList[i].disabled = false;
	}
}

function addCopyStr(newstr) {

	_chessInfo.copy_str  += newstr + "\n";
}	

function showDisplayHeader(){
	var table = document.getElementById("moveListTable");
	var th_num = document.getElementById("th_num");
	var th_move = document.getElementById("th_move");
	var th_score = document.getElementById("th_score");
	var th_bias = document.getElementById("th_bias");
	var th_recom = document.getElementById("th_recom");
	th_num.classList.add("wid_100");
	th_move.classList.add("wid_150");
	th_score.classList.add("wid_120");
	th_bias.classList.add("wid_120");
	th_recom.classList.add("wid_180");
	table.classList.add("outputTable");	
	table.style.visibility = "visible";
}

function addDisplayRow(info_list) {
    var table = document.getElementById("moveListTable");
	
	var tbody = document.getElementById("moveListTableBody");
    tbody.classList.add("TableRow");	
	var row = tbody.insertRow(-1);
	
    var cell_round = row.insertCell(0);
    var cell_move = row.insertCell(1);
	var cell_score = row.insertCell(2);
	var cell_bias = row.insertCell(3);
	var cell_recommend = row.insertCell(4);

	var move_str = info_list[1];
    var result = move_str.link(_cloudUrl+info_list[5]);
    
	if(info_list[5]!="")
	{
		cell_round.innerHTML = "<Button id = 'infoList" + info_list[0] + "' >" + info_list[0] + "</Button>";
		$('#infoList'+info_list[0]).addClass("TableNum");
		$('#infoList'+info_list[0]).addClass("chessBoardBtn"); 
		$('#infoList'+info_list[0]).addClass("boardBtn3");
		$('#infoList'+info_list[0]).bind("click", function() {
			 showBoardbyNum(info_list[0]); 
		});
		
		if(info_list[6] == true)
			cell_move.innerHTML = '<a href="'+_cloudUrl+info_list[5]+'" target="_blank" style="color:red">'+move_str+'</a>';
		else
			cell_move.innerHTML = '<a href="'+_cloudUrl+info_list[5]+'" target="_blank" style="color:blue">'+move_str+'</a>';

		$('#infoList'+info_list[0]).bind("click", function() {
			 showBoardbyNum(info_list[0]); 
		});
		
	}
	else
	{
		cell_move.innerHTML = move_str;
		cell_round.innerHTML = info_list[0];
	}
	cell_score.innerHTML = info_list[2];
	cell_bias.innerHTML = info_list[3];
	cell_recommend.innerHTML = info_list[4];
	
	cell_round.classList.add("wid_100");
	cell_move.classList.add("wid_150");
	cell_score.classList.add("wid_120");
	cell_bias.classList.add("wid_120");
	cell_recommend.classList.add("wid_180");
}

function showPersonalHeader(){

	var th_time = document.getElementById("th_TIME");
	var th_game = document.getElementById("th_GAME");
	var th_num = document.getElementById("th_NUM");
	var th_red = document.getElementById("th_RED");
	var th_black = document.getElementById("th_BLACK");
	var th_res = document.getElementById("th_RES");
	var th_r_bad = document.getElementById("th_R_BAD");
	var th_b_bad = document.getElementById("th_B_BAD");
	var th_url = document.getElementById("th_URL");
	var th_del = document.getElementById("th_DEL");

	th_time.classList.add("m_wid_8");
	th_game.classList.add("m_wid_8");
	th_num.classList.add("m_wid_6");
	th_red.classList.add("m_wid_15");
	th_black.classList.add("m_wid_15");
	th_res.classList.add("m_wid_6");
	th_r_bad.classList.add("m_wid_10");
	th_b_bad.classList.add("m_wid_10");
	th_url.classList.add("m_wid_12");
	th_del.classList.add("m_wid_6");
}

function removeDisplayTable() {
	document.getElementById("moveListTable").style.visibility = "hidden";
	document.getElementById("moveListTableBody").innerHTML = "";
}

function addPersonalRecordRow(jobj) {
    var table = document.getElementById("personalrecordTable");
	var tbody = document.getElementById("personalrecordBody");	
	//tbody.classList.add("TableBody");
	var row = tbody.insertRow(0);
    
    var cell_date       = row.insertCell(0);
    var cell_game       = row.insertCell(1);
	var cell_round      = row.insertCell(2);
	var cell_red_name   = row.insertCell(3); 
	var cell_black_name = row.insertCell(4);
	var cell_result     = row.insertCell(5); //1 red win, 2 draw, 3 black win, 0 unknown
	var cell_r_badrate  = row.insertCell(6);
	var cell_b_badrate  = row.insertCell(7);
	var cell_url        = row.insertCell(8);
	var cell_delete     = row.insertCell(9);
	var result, side;
	//var jinfo = JSON.parse(jobj.info);

	cell_date.classList.add("m_wid_8");
	cell_game.classList.add("m_wid_8");
	cell_round.classList.add("m_wid_6");
	cell_red_name.classList.add("m_wid_15");
	cell_black_name.classList.add("m_wid_15");
	cell_result.classList.add("m_wid_6");
	cell_r_badrate.classList.add("m_wid_10");
	cell_b_badrate.classList.add("m_wid_10");
	cell_url.classList.add("m_wid_12");
	cell_delete.classList.add("m_wid_6");

	cell_url.innerHTML = '<a href="'+_ladderUrl+jobj.url+'" target="_blank">'+jobj.url+'</a>';
	if(jobj.date) cell_date.innerHTML = jobj.date;
	if(jobj.game_name) cell_game.innerHTML = jobj.game_name;
	if(jobj.round) cell_round.innerHTML = jobj.round;
	switch(parseInt(jobj.result))
	{
		case 1:
			result = '紅勝';
			break;
		case 2:
			result = '和棋';
			break;
		case 3:
			result = '黑勝';
			break;
		default:
			result = '--';
			break;
	}
	cell_result.innerHTML = result;

	switch(parseInt(jobj.play_side))
	{
		case 1:
			side = '執紅';
			break;
		case 2:
			side = '執黑';
			break;
		default:
			side = '--';
			break;
	}
 
	if(jobj.r_name != undefined) cell_red_name.innerHTML = jobj.r_name;
	if(jobj.b_name != undefined) cell_black_name.innerHTML = jobj.b_name;
	if(jobj.r_bad_rate1 != undefined) cell_r_badrate.innerHTML = jobj.r_bad_rate1+" / ";
	if(jobj.r_bad_rate2 != undefined) cell_r_badrate.innerHTML += jobj.r_bad_rate2+"%";
	if(jobj.b_bad_rate1 != undefined) cell_b_badrate.innerHTML = jobj.b_bad_rate1+" / ";
	if(jobj.b_bad_rate2 != undefined) cell_b_badrate.innerHTML += jobj.b_bad_rate2+"%";

	cell_delete.innerHTML = "<Button id = 'recordList" + jobj.url + "' >" + "X" + "</Button>";
		$('#recordList'+jobj.url).addClass("TableNum");
		$('#recordList'+jobj.url).bind("click", function() {
			if (confirm("確定要把 URL:"+jobj.url+" 從個人棋局中移除嗎?"))
			{
			   deleteRecord(jobj.url, _chessInfo.accountID); 
			}
		});
}

function removePersonaRecordlTable() {
    document.getElementById("personalresult").style.visibility = "hidden";
    document.getElementById("personalrecordBody").innerHTML = "";
}

function updateBadRate(badrate) {
	//var badratetext = document.getElementById("badRate");
	//badratetext.classList.add("rateArea");
	//badratetext.innerHTML = "紅方 緩著率："+_chessInfo.badRate[0]+"%， 失著率："+_chessInfo.badRate[1]+"% \n"+
	//                        "黑方 緩著率："+_chessInfo.badRate[2]+"%， 失著率："+_chessInfo.badRate[3]+"%";
}

function resetBadRate()
{
	//var badratetext = document.getElementById("badRate");
	//badratetext.innerHTML = "";
}

function calBadRate(score_bias)
{
	_chessInfo.badRate = [NaN,NaN,NaN,NaN];
	var badRateCount = [0,0,0,0,0,0];
	var not_good = 50;
	var bad = 200;
	var offset = 0;
	
	for(var i = 0; i<score_bias.length; i++)
	{
		offset = (i%2)*3;
		if(!Number.isNaN(score_bias[i]))
		{
			badRateCount[0+offset]++;
			if(Math.abs(score_bias[i]) >= not_good)
			{
				badRateCount[1+offset]++;
				if(Math.abs(score_bias[i]) >= bad)
					badRateCount[2+offset]++;
			}
		}
	}

	if(badRateCount[0]>0)
	{
		_chessInfo.badRate[0] = parseInt(100*badRateCount[1]/badRateCount[0]);
		_chessInfo.badRate[1] = parseInt(100*badRateCount[2]/badRateCount[0]);
	}
		
	if(badRateCount[3]>0)
	{
		_chessInfo.badRate[2] = parseInt(100*badRateCount[4]/badRateCount[3]);
		_chessInfo.badRate[3] = parseInt(100*badRateCount[5]/badRateCount[3]);
	}
}

function showBoardbyNum(num)
{
	var chessList, fen, curve;
	var moveNumbertext = document.getElementById("moveNumber");
	if(_chessInfo.fenList.length >= num && num > 0) 
	{
		fen = _chessInfo.fenList[num-1];
		curve = _chessInfo.moveCurveList[num-1];
	}
	else 
	{
		if(_chessInfo.init_fen != "")
		{
           fen = _chessInfo.init_fen;
		}
		else
		{
		   fen = getDefaultFEN();
		}
		curve = null;
	}
	chessList = FEN_to_ChessList(fen, curve, _chessInfo.is_horizontal_original , _chessInfo.is_vertical_original);

	_chessInfo.currNumber = num;
	moveNumbertext.innerHTML = _chessInfo.currNumber+"/"+_chessInfo.move_total;
	if(num == 0)
	{
		$('#scoreBtn').html('info');
		_chessboard = new ChessBoard(chessList, null, null, null, _chessInfo.is_horizontal_original, _chessInfo.is_vertical_original);
	}
	else
	{
		if(num>3 && _chessInfo.biasList[num-1]>=200) $('#scoreBtn').html('×');
		else if(num>3 && _chessInfo.biasList[num-1]>=50) $('#scoreBtn').html('▲');
		else $('#scoreBtn').html('info');
		_chessboard = new ChessBoard(chessList, _chessInfo.scoreList[num-1], _chessInfo.biasList[num-1], _chessInfo.recommendList[num-1], _chessInfo.is_horizontal_original, _chessInfo.is_vertical_original);
	}
	
	if($('#chess-info').css("visibility") != "hidden") 
	{
		$('#scoreBtn').html('hide');
	}
}

function showInitBoard()
{   
	var searchStr = window.location.search;
    if(searchStr != "" && searchStr.indexOf("?fbclid") == -1)
	{
		var url = window.location.search;
		var res = url.split('&').join('?').split('?')
		//var res = url.split("?");
		if(res[1]>0)
		{
			getParameterHandler(res[1]);
			_chessInfo.is_hide = true;
			hideOrShow(_chessInfo.is_hide);
		}
		else
		{
			alert("網址有誤!");
		}
	}
    else		
	{
		var chessList;
		$('#scoreBtn').html('info');
		fen = getDefaultFEN();
		chessList = FEN_to_ChessList(fen, null, true, true);
		_chessboard = new ChessBoard(chessList, null, null, null, true, true);
	
		if($('#chess-info').css("visibility") != "hidden") 
		{
			$('#scoreBtn').html('hide');
		}
	}		

	onSignInOut(false);
}

function addChessBoardEvt() {
	$list = $('#chessboard');
	var bodyStyles = window.getComputedStyle(document.body); 
	var preTd = parseInt(bodyStyles.getPropertyValue('--grid'));
    var dotsize = parseInt(bodyStyles.getPropertyValue('--dot'));

	for (var i=0; i<10; i++) {
		for (var j=0; j<9; j++) {
			var eventLayer = $('<div class="event-layer">');
			//eventLayer.html("口");
			eventLayer.css({
				width: dotsize,
				height: dotsize,
				left: j*preTd-dotsize/2,
				top: i*preTd-dotsize/2,
			});
			eventLayer.attr({
				'data-x': i,
				'data-y': j
			});
			eventLayer.addClass('class-'+i+'-'+j);
			$list.append(eventLayer);
		}
	}

	$(document).on('click', '.chesspieceBlack', function(e){
		//console.log(e);
		//console.log(this);
		//if(!_chessInfo.is_edit_mode) return;

		if(_chessboard.selectedChess)
		{
			var chess = _chessboard.selectedChess.data('chess');
    		var x_bef = _chessboard.selectedChess.data('x');
    		var y_bef = _chessboard.selectedChess.data('y');
    		var x_aft = $(this).data('x');
    		var y_aft = $(this).data('y');
			if(isChessRed(chess)) _chessboard.selectedChess.removeClass('red-active');
    		else _chessboard.selectedChess.removeClass('black-active');
			
			if(isChessRed(chess))
			{
				console.log(chess+":("+x_bef+","+y_bef+")->("+x_aft+","+y_aft+")");
				var chessidx = _chessboard.getChessPieceIdx(x_bef, y_bef); 
				//var movestr  = ""
				_chessboard.selectedChess = null;
				_chessboard.removeChess(x_aft, y_aft);
			    if(_chessInfo.is_edit_mode) _chessInfo.moveList.push(_chessboard.getMoveStr(chessidx, x_aft, y_aft));
				_chessboard.moveChess(chessidx, x_aft, y_aft);
				if(_chessInfo.is_edit_mode) _chessInfo.fenList.push(Board_Chess_to_FEN(_chessboard.board, isChessRed(chess)));

				if(_chessInfo.is_edit_mode)
				{
                	document.getElementById("moveNumber").innerHTML = _chessInfo.moveList.length;  
					document.getElementById("chessBookInput").value = _chessInfo.moveList.join(" ");
				}
			}
			else
			{
				if(x_bef == x_aft && y_bef == y_aft)
				{
					_chessboard.selectedChess = null;
				}
				else
				{
					$(this).addClass('black-active');
					_chessboard.selectedChess = $(this);
				}
			}
		}
		else
		{
			if(_chessboard.lastmove != BLACK_MOVE)
			{
				$(this).addClass('black-active');
				_chessboard.selectedChess = $(this);
			}
		}
	});
	$(document).on('click', '.chesspieceRed', function(e){
		//console.log(e);
		//console.log(this);
		//if(!_chessInfo.is_edit_mode) return;

		if(_chessboard.selectedChess)
		{
			var chess = _chessboard.selectedChess.data('chess');
    		var x_bef = _chessboard.selectedChess.data('x');
    		var y_bef = _chessboard.selectedChess.data('y');
    		var x_aft = $(this).data('x');
    		var y_aft = $(this).data('y');
    		
    		if(isChessRed(chess)) _chessboard.selectedChess.removeClass('red-active');
    		else _chessboard.selectedChess.removeClass('black-active');
			
			if(!isChessRed(chess))
			{
				console.log(chess+":("+x_bef+","+y_bef+")->("+x_aft+","+y_aft+")");
				var chessidx = _chessboard.getChessPieceIdx(x_bef, y_bef); 
				//var movestr  = ""
				_chessboard.selectedChess = null;
				_chessboard.removeChess(x_aft, y_aft);
			    if(_chessInfo.is_edit_mode) _chessInfo.moveList.push(_chessboard.getMoveStr(chessidx, x_aft, y_aft));
				_chessboard.moveChess(chessidx, x_aft, y_aft);
				if(_chessInfo.is_edit_mode) _chessInfo.fenList.push(Board_Chess_to_FEN(_chessboard.board, isChessRed(chess)));

				if(_chessInfo.is_edit_mode)
				{
                	document.getElementById("moveNumber").innerHTML = _chessInfo.moveList.length;  
					document.getElementById("chessBookInput").value = _chessInfo.moveList.join(" ");
				}
			}
			else
			{
				if(x_bef == x_aft && y_bef == y_aft)
				{
					_chessboard.selectedChess = null;
				}
				else
				{
					$(this).addClass('red-active');
					_chessboard.selectedChess = $(this);
				}	
			}
		}
		else
		{
			if(_chessboard.lastmove != RED_MOVE)
			{
				$(this).addClass('red-active');
				_chessboard.selectedChess = $(this);
			}
		}
	});
    $(document).on('click', '.event-layer', function(e){
    	//if(!_chessInfo.is_edit_mode) return;

    	if(_chessboard.selectedChess) //if(checkmove(chess, x_bef, y_bef, x_aft, y_aft))
    	{
    		var chess = _chessboard.selectedChess.data('chess');
    		var x_bef = _chessboard.selectedChess.data('x');
    		var y_bef = _chessboard.selectedChess.data('y');
    		var x_aft = $(this).data('x');
    		var y_aft = $(this).data('y');
    		var chessidx = _chessboard.getChessPieceIdx(x_bef, y_bef); 
			//var movestr  = ""
  
            console.log(chess+":("+x_bef+","+y_bef+")->("+x_aft+","+y_aft+")");

    		_chessboard.selectedChess.removeClass();
    		_chessboard.selectedChess = null;
			if(_chessInfo.is_edit_mode) _chessInfo.moveList.push(_chessboard.getMoveStr(chessidx, x_aft, y_aft));
			_chessboard.moveChess(chessidx, x_aft, y_aft);
			if(_chessInfo.is_edit_mode) _chessInfo.fenList.push(Board_Chess_to_FEN(_chessboard.board, isChessRed(chess)));

			if(_chessInfo.is_edit_mode)
			{
				document.getElementById("moveNumber").innerHTML = _chessInfo.moveList.length;
				document.getElementById("chessBookInput").value = _chessInfo.moveList.join(" ");
			}
    	}
    	else
		{

		}
	});
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
	   console.log('User signed out.');
	   _chessInfo.is_login = false;
	   //_chessInfo.accountID = "";
	   onSignInOut(false);
	});

	auth2.disconnect();
}

window.onload = showInitBoard;
window.onorientationchange = function() { 
		setTimeout(function () {showBoardbyNum(_chessInfo.currNumber);}, 500);
    };
