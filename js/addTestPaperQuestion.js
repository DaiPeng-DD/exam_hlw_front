$(function () {
    load();

    //页面加载时 动态创建select中的option
    var jsonData = {
        acc: localStorage.getItem("userAcc")
    }

    $.ajax({
        url: globalUrl + "/queryClassifys",//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        //将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result!=null) {
                for (var i = 0; i < result.length; i++){
                    $("#subject").append("<option value=" + result[i].classifyName +">" + result[i].classifyName + "</option>")
                }
            } else {
                //添加失败
                alert("科目加载失败！ ");
            }
        }
    })
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#middle_table').bootstrapTable('refresh');
}

// var acc=localStorage.getItem("userAcc");

//bootstrap-table表格   查询试题
function load() {
    let url = globalUrl+"/queryTestPaperQuestion";
    // let sub= $('#subject').val();
    // let sel= $("input[name='select']:checked").val();

    $("#middle_table").bootstrapTable({
        url:url,
        method:'POST',//
        // data:JSON.stringify(jsonData),
        // contentType: "application/json",
        dataType:'JSON',//服务器返回的数据类型
        striped:true,//设置表格隔行换色`
        pageNumber:1,//初始化加载第一页
        pagination:true,//是否分页
        sidePagination: 'server',//server(分页) clien(不分页)
        pageSize:10,//单页记录数  告知前端使用者  每页显示多少个
        //查询时携带的参数  data:JSON.stringify()
        queryParams:function(params){//上传服务器的参数
            var temp = {
                offset:params.offset,//SQL语句起使索引
                pageNumber: params.limit,//每页显示数量
                acc:localStorage.getItem("userAcc"),
                id:localStorage.getItem("testPaperId"),
                subject:$('#subject').val(),
                select:parseInt($("input[name='select']:checked").val())
                // subject:"-1",
                // select:-1
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
                title:'试题分类',
                align:"center",
                halign:"center",
                field:"questionClassify",
                // formatter:function (value,row,index) {
                //     console.log(row)
                //
                //     return value;
                // }
            },
            {
                title:'试题类型',
                align:"center",
                halign:"center",
                field:"questionType",
                formatter:function (value,row,index) {
                    if (value==0) return "单选题";
                    if (value==1) return "简答题";
                }
            },
            {
                title:'试题名称',
                align:"center",
                halign:"center",
                field:"questionTopic",
                // formatter:function (value,row,index) {
                //     console.log(row)
                //
                //     return value;
                // }
            },
            {
                title: "选择",
                align:"center",
                field:"questionId",
                formatter:function (value,row,index) {
                    let uprow = '<input type="checkbox" name="select1" value='+value+'>'

                    return uprow;
                }
            }
        ]
    })
}

//提交选中的试题
$("#submit").click(function () {
    //拿选中的试题id
    var obj = document.getElementsByName("select1");
    var ulist = [];
    for(i in obj) {
        if(obj[i].checked)
            ulist.push(obj[i].value);
    }

    var jsonData = {}
    jsonData.ulist=ulist;
    jsonData.questionAcc=localStorage.getItem("userAcc");
    jsonData.questionId=localStorage.getItem("testPaperId");

    $.ajax({
        url: globalUrl + "/addTestPaperQuestion",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result) {
                //添加成功
                alert("添加成功！");
                reLoad();
                window.parent.location.reload();//刷新父页面
            } else {
                //添加失败
                alert("添加失败！ ")
            }
        }
    })
})

//当选择改变时
// $("#subject").change(function (){
//     function load() {
//         let url = globalUrl+"/queryTestPaperQuestion";
//         let sub= $('#subject').val();
//         let sel=$("input[name='select']:checked").val();
//
//         $("#middle_table").bootstrapTable({
//             url:url,
//             method:'POST',//
//             // data:JSON.stringify(jsonData),
//             // contentType: "application/json",
//             dataType:'JSON',//服务器返回的数据类型
//             striped:true,//设置表格隔行换色`
//             pageNumber:1,//初始化加载第一页
//             pagination:true,//是否分页
//             sidePagination: 'server',//server(分页) clien(不分页)
//             pageSize:10,//单页记录数  告知前端使用者  每页显示多少个
//             //查询时携带的参数  data:JSON.stringify()
//             queryParams:function(params){//上传服务器的参数
//                 var temp = {
//                     offset:params.offset,//SQL语句起使索引
//                     pageNumber: params.limit,//每页显示数量
//                     acc:localStorage.getItem("userAcc"),
//                     id:localStorage.getItem("testPaperId"),
//                     subject:sub,
//                     select:sel
//                 }
//                 return JSON.stringify(temp);
//             },
//             columns:[
//                 {
//                     title: "序号",
//                     align:"center",
//                     halign:"center",
//                     formatter:function (value,row,index) {
//                         return index + 1;
//                     }
//                 },
//                 {
//                     title:'试题名称',
//                     align:"center",
//                     halign:"center",
//                     field:"questionTopic",
//                     // formatter:function (value,row,index) {
//                     //     console.log(row)
//                     //
//                     //     return value;
//                     // }
//                 },
//                 {
//                     title: "选择",
//                     align:"center",
//                     field:"questionId",
//                     formatter:function (value,row,index) {
//                         let uprow = '<input type="checkbox" name="select" value="\''+value+'\'">'
//
//                         return uprow;
//                     }
//                 }
//             ]
//         })
//     }
// })
//
// $("input[name='select']").change(function () {
//     function load() {
//         let url = globalUrl+"/queryTestPaperQuestion";
//         let sub= $('#subject').val();
//         let sel=$("input[name='select']:checked").val();
//
//         $("#middle_table").bootstrapTable({
//             url:url,
//             method:'POST',//
//             // data:JSON.stringify(jsonData),
//             // contentType: "application/json",
//             dataType:'JSON',//服务器返回的数据类型
//             striped:true,//设置表格隔行换色`
//             pageNumber:1,//初始化加载第一页
//             pagination:true,//是否分页
//             sidePagination: 'server',//server(分页) clien(不分页)
//             pageSize:10,//单页记录数  告知前端使用者  每页显示多少个
//             //查询时携带的参数  data:JSON.stringify()
//             queryParams:function(params){//上传服务器的参数
//                 var temp = {
//                     offset:params.offset,//SQL语句起使索引
//                     pageNumber: params.limit,//每页显示数量
//                     acc:localStorage.getItem("userAcc"),
//                     id:localStorage.getItem("testPaperId"),
//                     subject:sub,
//                     select:sel
//                 }
//                 return JSON.stringify(temp);
//             },
//             columns:[
//                 {
//                     title: "序号",
//                     align:"center",
//                     halign:"center",
//                     formatter:function (value,row,index) {
//                         return index + 1;
//                     }
//                 },
//                 {
//                     title:'试题名称',
//                     align:"center",
//                     halign:"center",
//                     field:"questionTopic",
//                     // formatter:function (value,row,index) {
//                     //     console.log(row)
//                     //
//                     //     return value;
//                     // }
//                 },
//                 {
//                     title: "选择",
//                     align:"center",
//                     field:"questionId",
//                     formatter:function (value,row,index) {
//                         let uprow = '<input type="checkbox" name="select" value="\''+value+'\'">'
//
//                         return uprow;
//                     }
//                 }
//             ]
//         })
//     }
// })



$("input[name='select']").change(function () {
    console.log($("input[name='select']:checked").val());
    load();
    reLoad();
})

//当选择改变时
$("#subject").change(function (){
    console.log($('#subject').val());
    load();
    reLoad();
})
