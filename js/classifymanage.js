$(function () {
    load();
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#middle_table').bootstrapTable('refresh');
}

//bootstrap-table表格
function load() {
    let url = globalUrl+"/queryClassify";

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
                title:'分类名称',
                align:"center",
                halign:"center",
                field:"classifyName",
                // formatter:function (value,row,index) {
                //     console.log(row)
                //
                //     return value;
                // }
            },
            {
                title:'添加时间',
                align:"center",
                halign:"center",
                field:"classifyCreatetime",
                formatter:function (value,row,index) {

                    return value.year+"-"+value.monthValue+"-"+value.dayOfYear+" "+value.hour+":"+value.minute+":"+value.second;
                }
            },
            {
                title: "管理",
                align:"center",
                field:"classifyId",
                formatter:function (value,row,index) {
                    let delerow = '<a href="javascript:void(0)" onclick="deleteClassify(\''+value+'\')">删除</a>'

                    let updarow = '<a href="javascript:void(0)" onclick="updataClassify(\''+row.classifyId+'\',\''+row.classifyName+'\',\''+row.classifyAcc+'\')">修改 </a>'

                    return updarow+delerow;
                }
            }
        ]
    })
}

//添加分类
$("#middle_btn").click(function () {
    var jsonData = {
        classifyName:$("#middle_ipt").val(),
        classifyAcc:localStorage.getItem("userAcc")
    }
    $.ajax({
        url: globalUrl + "/addClassify",//地址
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
            } else {
                //添加失败
                alert("添加失败！ ")
            }
        }
    })
})

//删除分类
function deleteClassify(value) {
    var jsonData = {
        id:value
    }
    $.ajax({
        url: globalUrl + "/deleteClassify",//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
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

//修改分类
function updataClassify(id,name,acc) {

    var update = prompt("修改分类",name)
    if (update!=null && update!=""){
        var jsonData = {
            id:id,
            name:update,
            acc:acc
        }
        $.ajax({
            url: globalUrl + "/updateClassify",//地址
            type: "POST",//传输方式
            data: jsonData,//将json格式转换为字符串并进行传送
            // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
            dataType: "json",//传入后端的数据格式也是json
            success: function (result) {
                console.log(result);
                if (result) {
                    //添加成功
                    alert("修改成功！");
                    reLoad();
                } else {
                    //添加失败
                    alert("修改失败！ ")
                }
            }
        })
    }else {
        alert("修改失败！！！")
    }
}