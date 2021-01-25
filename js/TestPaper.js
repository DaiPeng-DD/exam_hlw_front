$(function () {
    TestPaperView();
})

$("#title").text(localStorage.getItem("testPaperName"));


$("#add").click(
    function () {
        layer.open({
            type:2,
            title:"添加试题",
            maxmin:false,
            shadeClose:false,//默认false 即只能点击x按钮关闭，改成true 则点击背景区域实现关闭
            area:['80%','80%'],//弹出层的宽高
            content:'../page/addTestPaperQuestion.html'
        })
    }
)



function TestPaperView(){
    var jsonDataX = {
        testAcc:localStorage.getItem("userAcc"),
        testId:localStorage.getItem("testPaperId")
    }

    $.ajax({
        url: globalUrl + "/queryTestQuestion",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonDataX),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result.length!=null) {
                for (var i=0;i<result.length;i++){
                    if (result.list[i].questionType==0){
                        $("#content").append(
                            "题目：<div>"+result.list[i].questionTopic+"</div>" +
                            "A:<div>"+result.list[i].singleA+"</div>" +
                            "B:<div>"+result.list[i].singleB+"</div>" +
                            "C:<div>"+result.list[i].singleC+"</div>" +
                            "D:<div>"+result.list[i].singleD+"</div>" +
                            "<div>答案: <span>"+result.list[i].questionAnswer+"</span> 分值:<span>"+result.list[i].questionScore+"</span></div>" +
                            "<button onclick='deleteQuestion(\""+result.list[i].questionId+"\")'>删除</button>"
                        )
                    }else {
                        $("#content").append(
                            "题目：<div>"+result.list[i].questionTopic+"</div>" +
                            "<div>答案: <span>"+result.list[i].questionAnswer+"</span> 分值:<span>"+result.list[i].questionScore+"</span></div>" +
                            "<button onclick='deleteQuestion(\""+result.list[i].questionId+"\")'>删除</button>"
                        )
                    }

                }

            } else {
                //添加失败
                alert("失败！ ");
            }
        }
    })
}


$("#tiem").change(function () {

    jsonData={}
    jsonData.questionTime=$("#tiem").val();

    $.ajax({
        url: globalUrl,//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success:function (result) {
            if (result){
                alert("修改考试时长成功");
            }
            else {
                alert("修改考试时长失败");
            }
        }
    })
})



//删除试卷中的试题
function deleteQuestion(id){
    var jsonData = {
        questionId:id
    }
    $.ajax({
        url: globalUrl + "/deleteTestQuestion",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
                if (result){
                    TestPaperView();
                    window.location.reload();//刷新当前页面
                }else {

                }
        }
    })
}