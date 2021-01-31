$(function () {
    load();
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#testPaperTable').bootstrapTable('refresh');
}




//bootstrap-table表格   //查询试卷
function load() {
    let url = globalUrl+"/queryTestPaper";

    $("#testPaperTable").bootstrapTable({
        url:url,
        method:'POST',//
        dataType:'JSON',//服务器返回的数据类型
        striped:true,//设置表格隔行换色`
        pageNumber:1,//初始化加载第一页
        pagination:true,//是否分页
        sidePagination: 'server',//server(分页) clien(不分页)
        pageSize:20,//单页记录数  告知前端使用者  每页显示多少个
        //查询时携带的参数  data:JSON.stringify()
        queryParams:function(params){//上传服务器的参数
            var temp = {
                offset:params.offset,//SQL语句起使索引
                pageNumber: params.limit,//每页显示数量
                acc:localStorage.getItem("userAcc")
            }
            return JSON.stringify(temp);
        },
        columns:[
            {
                title: "序号",
                align:"center",
                halign:"center",
                formatter:function (value,row,index) {
                    return index + 1;
                }
            },
            {
                title:'试卷分类',
                align:"center",
                halign:"center",
                field:"testGroup",
            },
            {
                title:'试卷题目',
                align:"center",
                halign:"center",
                field:"testTitle",

            },
            {
                title:'考试码',
                align:"center",
                halign:"center",
                field:"testUrl",

            },
            {
                title:'添加时间',
                align:"center",
                halign:"center",
                field:"testCreatetime",
                // formatter:function (value,row,index) {
                //
                //     return value.year+"-"+value.monthValue+"-"+value.dayOfYear+" "+value.hour+":"+value.minute+":"+value.second;
                // }
            },
            {
                title: "管理",
                align:"center",
                field:"testId",
                formatter:function (value,row,index) {
                    let action ='<a href="javascript:void(0)" onclick="actionTestpaper(\''+value+'\')">开启考试 </a>'
                    let unaction = '<a href="javascript:void(0)" onclick="unactionTestpaper(\''+value+'\')">关闭考试 </a>'

                    let delerow = '<a href="javascript:void(0)" onclick="deleteTestpaper(\''+value+'\')">删除 </a>'

                    let queryrow = '<a href="javascript:void(0)" onclick="queryTestPaper(\''+value+'\',\''+row.testTitle+'\')">添加试题</a>'

                    return action+unaction+delerow+queryrow;
                }
            }
        ]
    })
}

//查看试卷详情
function queryTestPaper(id,name){
    localStorage.setItem("testPaperId",id);
    localStorage.setItem("testPaperName",name);
    // console.log(localStorage.getItem("testPaperId"));
    // console.log(localStorage.getItem("testPaperName"));
    window.location="TestPaper.html";
    // $("#right_content").load("TestPaper.html");
}


//删除试卷
function deleteTestpaper(value) {
    var jsonData = {
        testId:value
    }
    $.ajax({
        url: globalUrl + "/deleteTestPaper",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result) {
                //添加成功
                alert("删除成功！");
                reLoad();
            } else {
                //添加失败
                alert("删除失败！ ")
            }
        }
    })
}
//开启考试
function actionTestpaper(id){
    jsonData={}
    jsonData.questionId=id;
    //开启考试  1开始
    josnData.

    $.ajax({
        url: globalUrl ,//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result) {
                //添加成功
                alert("已开始");
            } else {
                //添加失败
                alert("开启失败 ")
            }
        }
    })
}
//关闭考试
function unactionTestpaper(id){
    jsonData={}
    jsonData.questionId=id;
    //开启考试  0关闭
    josnData.

    $.ajax({
        url: globalUrl ,//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result) {
                //添加成功
                alert("已关闭！");
                reLoad();
            } else {
                //添加失败
                alert("关闭失败 ")
            }
        }
    })
}



//分组管理 layer弹出层
function addTestPaper(){
    layer.open({
        type:2,
        title:"添加试卷",
        maxmin:false,
        shadeClose:false,//默认false 即只能点击x按钮关闭，改成true 则点击背景区域实现关闭
        area:['80%','80%'],//弹出层的宽高
        content:'../page/addTestPaper.html'
    })
}

function Groups(){
    layer.open({
        type:2,
        title:"分组管理",
        maxmin:false,
        shadeClose:false,//默认false 即只能点击x按钮关闭，改成true 则点击背景区域实现关闭
        area:['80%','80%'],//弹出层的宽高
        content:'../page/TestPaperGroups.html'
    })
}



