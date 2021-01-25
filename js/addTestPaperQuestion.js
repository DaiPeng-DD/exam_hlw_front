$(function () {
    load();
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#middle_table').bootstrapTable('refresh');
}

var acc=localStorage.getItem("userACC");

//bootstrap-table表格   查询试题
function load() {
    let url = globalUrl+"/queryTestQuestion";

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
                acc:acc,
                id:localStorage.getItem("testPaperId"),
                subject:"-1",
                select:"-1"
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
                title:'试题名称',
                align:"center",
                halign:"center",
                field:"groupName",
                // formatter:function (value,row,index) {
                //     console.log(row)
                //
                //     return value;
                // }
            },
            {
                title: "选择",
                align:"center",
                field:"GroupId",
                formatter:function (value,row,index) {
                    let uprow = '<input type="checkbox" name="select" value="\''+value+'\'">'

                    return uprow;
                }
            }
        ]
    })
}

//当选择改变时
$("#subject").change(function (){
    function load() {
        let url = globalUrl+"/queryTestQuestion";
        let sub= $('#subject').val();
        let sel=$("input[name='select']:checked").val();

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
                    acc:acc,
                    id:localStorage.getItem("testPaperId"),
                    subject:sub,
                    select:sel
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
                    title:'试题名称',
                    align:"center",
                    halign:"center",
                    field:"groupName",
                    // formatter:function (value,row,index) {
                    //     console.log(row)
                    //
                    //     return value;
                    // }
                },
                {
                    title: "选择",
                    align:"center",
                    field:"GroupId",
                    formatter:function (value,row,index) {
                        let uprow = '<input type="checkbox" name="select" value="\''+value+'\'">'

                        return uprow;
                    }
                }
            ]
        })
    }
})

$("input[name='select']").change(function () {
    function load() {
        let url = globalUrl+"/queryTestQuestion";
        let sub= $('#subject').val();
        let sel=$("input[name='select']:checked").val();

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
                    acc:acc,
                    id:localStorage.getItem("testPaperId"),
                    subject:sub,
                    select:sel
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
                    title:'试题名称',
                    align:"center",
                    halign:"center",
                    field:"groupName",
                    // formatter:function (value,row,index) {
                    //     console.log(row)
                    //
                    //     return value;
                    // }
                },
                {
                    title: "选择",
                    align:"center",
                    field:"GroupId",
                    formatter:function (value,row,index) {
                        let uprow = '<input type="checkbox" name="select" value="\''+value+'\'">'

                        return uprow;
                    }
                }
            ]
        })
    }
})

//提交选中的试题
$("#submit").click(function () {

    //拿选中的试题id
    var obj = document.getElementsByName("select");
    var ulist = [];
    for(i in obj) {
    if(obj[i].checked)
        ulist.push(obj[i].value);
}
    var jsonData = {}
    jsonData.ulist=ulist;
    jsonData.questionAcc=acc;
    jsonData.questionId=localStorage.getItem("testPaperId");

    $.ajax({
        url: globalUrl + "/addTestQuestion",//地址
        type: "POST",//传输方式
        data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
        contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result.testId!=null) {
                //添加成功
                alert("添加成功！");
                reLoad();
            } else {
                //添加失败
                alert("添加失败！ ")
            }
        }
    })
})

$.ajax({
    url: globalUrl + "/queryClassify",//地址
    type: "POST",//传输方式
    //将json格式转换为字符串并进行传送
    // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
    dataType: "json",//传入后端的数据格式也是json
    success: function (result) {
        console.log(result);
        if (result!=null) {
            for (i in result){
                $("#subject").append(
                    "<option value='\""+i.classifyName+"\"'>i.classifyName</option>"
                )
            }

        } else {
            //添加失败
            alert("科目加载失败！ ");
        }
    }
})
$("input[name='select']").change(function () {
    console.log($("input[name='select']:checked").val())
})
