$(function () {

    //定义一个全局变量  存放本页面的url
    var urls;
    var globalId;
    //页面加载时 动态创建select中的option
    var jsonData = {
        acc: localStorage.getItem("userAcc")
    }
    $.ajax({
        url: globalUrl + "/queryClassifys",//地址
        type: "POST",//传输方式
        async: false,//false同步  true异步
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log("aaa" + result)
            $(".select").children().remove();
            for (var i = 0; i < result.length; i++) {
                $("#left_sele").append("<option>" + result[i].classifyName + "</option>");
                $("#right_sele").append("<option>" + result[i].classifyName + "</option>");
            }
        }
    })

    if (flag == 1) {
        $("h3").text("修改试题");

        if (questionGlobal.questionType == 0) {//单选题
            $("#l1").css("background-color", "darkgray");
            $("#l2").css("background-color", "white")
            $("#right_right").hide();
            $("#left_table").show();

            $("#left_table .area").eq(0).val(questionGlobal.questionTopic);
            $("#left_table .area").eq(1).val(questionGlobal.singleA);
            $("#left_table .area").eq(2).val(questionGlobal.singleB);
            $("#left_table .area").eq(3).val(questionGlobal.singleC);
            $("#left_table .area").eq(4).val(questionGlobal.singleD);
            switch (questionGlobal.questionAnswer) {
                case "A":
                    $("[name=anser]").eq(0).prop("checked", true);
                    break;
                case "B":
                    $("[name=anser]").eq(1).prop("checked", true);
                    break;
                case "C":
                    $("[name=anser]").eq(2).prop("checked", true);
                    break;
                case "D":
                    $("[name=anser]").eq(3).prop("checked", true);
                    break;
            }
            $(".t2").eq(7).children().val(questionGlobal.questionScore);
            $("#left_opt").text(questionGlobal.questionClassify);
        } else {
            $("#l2").css("background-color", "darkgray");
            $("#l1").css("background-color", "white")
            $("#right_right").show();
            $("#left_table").hide();

            $("#right_right .area").eq(0).val(questionGlobal.questionTopic);
            $("#right_right .area").eq(1).val(questionGlobal.questionAnswer);
            $(".t2").eq(14).children().val(questionGlobal.questionScore);
            $("#right_opt").text(questionGlobal.questionClassify);
        }
    }

    if (flag == 0) {//添加试题的时候才能点击
        $("h3").text("添加试题");
        //单选题
        $("#l1").click(function () {
            $("#inner").css("height", "900px");
            $("#addTest_main").css("height", "900px");
            $(this).css("background-color", "darkgray");
            $("#l2").css("background-color", "white")
            $("#right_right").hide();
            $("#left_table").show();
        })
        //简答题
        $("#l2").click(function () {
            $("#inner").css("height", "560px");
            $("#addTest_main").css("height", "560px");
            $(this).css("background-color", "darkgray");
            $("#l1").css("background-color", "white")
            $("#right_right").show();
            $("#left_table").hide();
        })
    }

    if(flag == 0){//添加试题
        urls = globalUrl + "/addQuestion";
        globalId = " "
    }
    if(flag == 1){//修改试题
        urls = globalUrl + "/updateQuestion";
        globalId = questionGlobal.questionId;
    }

    //单选题提交
    $("#left_but").click(function () {

        //拿到正确答案
        var anser_true = null;
        for (var i = 0; i < $("[name=anser]").length; i++) {
            if ($("[name=anser]").eq(i).prop("checked")) {
                anser_true = $("[name=anser]").eq(i).val();
            }
        }
        var jsonData = {
            questionType: 0,
            questionId:globalId,
            questionAcc: localStorage.getItem("userAcc"),
            questionTopic: $("#left_table .area").eq(0).val(),
            singleA: $("#left_table .area").eq(1).val(),
            singleB: $("#left_table .area").eq(2).val(),
            singleC: $("#left_table .area").eq(3).val(),
            singleD: $("#left_table .area").eq(4).val(),
            questionAnswer: anser_true,
            questionScore: Number($(".t2").eq(7).children().val()),
            questionClassify: $(".t2").eq(8).children().val(),
            // id:hideId,
            // changeTestFlag:flag
        }
        $.ajax({
            url: urls,//地址
            type: "POST",//传输方式
            data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
            contentType: "application/json",//接收后端传回的数据格式是json
            dataType: "json",//传入后端的数据格式也是json
            success: function (result) {
                console.log(result);
                if (result) {
                    if (flag == 0) alert("添加成功！");
                    else alert("修改成功！");
                    $("#right_content").load("questionbank.html");
                } else {
                    if (flag == 0) alert("添加失败！ ");
                    else alert("修改失败！ ");
                }
            }
        })
    })
    //简答题提交
    $("#right_but").click(function () {
        var jsonData = {
            questionType: 1,
            questionId:globalId,
            questionAcc: localStorage.getItem("userAcc"),
            questionTopic: $("#right_right .area").eq(0).val(),
            questionAnswer: $("#right_right .area").eq(1).val(),
            questionScore: Number($(".t2").eq(14).children().val()),
            questionClassify: $(".t2").eq(15).children().val(),
            // changeTest:flag
        }
        console.log(jsonData.data);
        $.ajax({
            url: urls,//地址
            type: "POST",//传输方式
            data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
            contentType: "application/json",//接收后端传回的数据格式是json
            dataType: "json",//传入后端的数据格式也是json
            success: function (result) {
                console.log(result);
                if (result) {
                    if (flag == 0) alert("添加成功！");
                    else alert("修改成功！");
                    $("#right_content").load("questionbank.html");
                } else {
                    if (flag == 0) alert("添加失败！ ");
                    else alert("修改失败！ ");
                }
            }
        })
    })
})