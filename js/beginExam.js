//定义全局变量  接收返回的试卷信息
var resultMap;
//进入页面时进入
$(function () {

    var jsonData = {
        examId:location.search.substring(1)
    }
    console.log(jsonData);
    $.ajax({
        url: globalUrl + "/inputTestNumber",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            resultMap = result;
            $("h1").text(resultMap.title);
            console.log(resultMap);

            //渲染试题
            applyQuestion();
        }
    })

    //考试倒计时
    TimeDown("topLeft", 30*60*1000);

})

//定义全局变量  记录当前题号
var testNumber = 0;
//定义全局变量  存储答案
var answers = [];
//上一页
$("#up").click(function () {
    testNumber--;
    if (testNumber==-1) testNumber=0;
    applyQuestion();
})
//下一页
$("#down").click(function () {
    testNumber++;
    if (testNumber==resultMap.list.length) {
        testNumber=resultMap.list.length-1;
    }
    applyQuestion();
})

//提交试卷      //////
$("#upAndDown").on("dblclick",".begin",function () {
    submitTest();
})
//获取单选题答案
$("#mainTest_answer").on("blur","input",function () {
    answers[testNumber] = $(this).val();
    console.log(testNumber);
    console.log("hehehehe"+answers[testNumber]);
})
//获取简答题答案
$("#mainTest_answer").on("blur","textarea",function () {
    answers[testNumber] = $(this).val();
    console.log(testNumber);
    console.log("hehehehe"+answers[testNumber]);
})

function submitTest() {
    var dataArray=[];
    for (var i=0;i<resultMap.list.length;i++){
        var dataJson={};
        dataJson.examanswerTestid = resultMap.list[i].questionId;
        dataJson.examanswerPhone = localStorage.getItem("examineePhone");
        dataJson.examanswerTrueanswer = resultMap.list[i].questionAnswer;
        dataJson.examanswerExamineeanswer = answers[i];
        dataJson.examanswerScore = resultMap.list[i].questionScore;
        dataJson.examanswerQuestionid = resultMap.list[i].questionId;
        dataArray.push(dataJson);
    }
    console.log(dataArray);

    $.ajax({
        url: globalUrl + "/submitTestPaper",//地址
        type: "POST",//传输方式
        data: JSON.stringify(dataArray),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result){
                alert("交卷成功！！！")
                window.location.url="../page/examination.html"
            }
        }
    })
}

//渲染试题
function applyQuestion() {
    $(".nowQuestionNum").text(testNumber+1);
    $(".allQuestionNum").text(resultMap.list.length);
//上下页

    if (testNumber==resultMap.list.length-1) {
        $("#down").text("交 卷（双击）")
        $("#down").attr("class","begin")
    }else {
        $("#down").text("下一页")
        $("#down").attr("class","down")
    }

//单个题渲染
    if (resultMap.list[testNumber].questionType==0){
        $("#mainTest_answer").html('                <ul class="singleAnswer'+testNumber+'">\n' +
            '                    <li><input type="radio" value="A" name="single"> A、<span id="selectA"></span></li>\n' +
            '                    <li><input type="radio" value="B" name="single"> B、<span id="selectB"></span></li>\n' +
            '                    <li><input type="radio" value="C" name="single"> C、<span id="selectC"></span></li>\n' +
            '                    <li><input type="radio" value="D" name="single"> D、<span id="selectD"></span></li>\n' +
            '                </ul>')

        $("#questionType").text("单项选择题");
        $("#questionTitle").text(resultMap.list[testNumber].questionTopic);
        $("#questionScore").text(resultMap.list[testNumber].questionScore);
        // $(".singleAnswer").show();
        // $(".shortAnswer").hide();
        $("#selectA").text(resultMap.list[testNumber].singleA);
        $("#selectB").text(resultMap.list[testNumber].singleB);
        $("#selectC").text(resultMap.list[testNumber].singleC);
        $("#selectD").text(resultMap.list[testNumber].singleD);

        switch (answers[testNumber]) {
            case "A":$("#mainTest_answer input[value=A]").prop("checked",true);
                break;
            case "B":$("#mainTest_answer input[value=B]").prop("checked",true);
                break;
            case "C":$("#mainTest_answer input[value=C]").prop("checked",true);
                break;
            case "D":$("#mainTest_answer input[value=D]").prop("checked",true);
                break;
        }
    }
    if (resultMap.list[testNumber].questionType==1){
        $("#mainTest_answer").html('<textarea class="shortAnswer'+testNumber+'" cols="70" rows="14"></textarea>')
        $(".shortAnswer"+testNumber).val(answers[testNumber]);

        $("#questionType").text("简答题");
        $("#questionTitle").text(resultMap.list[testNumber].questionTopic);
        $("#questionScore").text(resultMap.list[testNumber].questionScore);
        // $(".singleAnswer").hide();
        // $(".shortAnswer").show();

    }

}

//考试倒计时
function TimeDown(id, value) {

    //倒计时的总秒数
    var totalSeconds = parseInt(value / 1000);

    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;

    hours = hours.toString().length == 1 ? '0' + hours : hours;
    minutes = minutes.toString().length == 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length == 1 ? '0' + seconds : seconds;

    //输出到页面
    document.getElementById(id).innerHTML = hours + ":" + minutes + ":" + seconds;
    //延迟一秒执行自己
    if(hours == "00" && minutes == "00" && parseInt(seconds)-1<0){
        submitTest();//时间到自动交卷
    }else{
        setTimeout(function () {
            TimeDown(id, value-1000);
        }, 1000)
    }

}