$("#login").click(function () {

    $("#loginView").hide();
    $("#examNumber").show();
    $("input[name='examNum']").css("margin-top","60px");

    localStorage.setItem("examineePhone",$("input[name=phone]").val());

    var jsonData = {
        examineeName:$("input[name=name]").val(),
        examineePhone:$("input[name=phone]").val()
    }
    console.log(jsonData);
    $.ajax({
        url: globalUrl + "/insertExaminee",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result){
                alert("登录成功！！！")
            }
        }
    })
})

var examId;

$("#insert").click(function () {

    $("#examNumber").hide();
    $("#examExplain").show();
    $("#testMain").css("width","600px");
    $("#actionExam").css("margin-left","145px");
    $("#examImg").css("margin-left","250px");

    examId = $("input[name=examNum]").val();

    var jsonData = {
        examId:$("input[name=examNum]").val()
    }
    console.log(jsonData);
    $.ajax({
        url: globalUrl + "/inputTestNumber",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            var manfen = 0;
            if (result!=null){

                for (var i=0;i<result.list.length;i++){
                    manfen+=result.list.questionScore;
                }
                $("#manfen").text(manfen);
                $("#jige").text(manfen*0.6);
            //    预留倒计时
            }
        }
    })
})

$("#actionExam").click(function () {
    window.location.href="../page/beginExam.html?"+examId;
})