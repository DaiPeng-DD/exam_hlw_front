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
    let url = globalUrl+"/queryMenuAll";

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
                title:'菜单名称',
                align:"center",
                halign:"center",
                field:"menuName",
                // formatter:function (value,row,index) {
                //     console.log(row)
                //
                //     return value;
                // }
            },
            {
                title:'上级菜单',
                align:"center",
                halign:"center",
                field:"menuUp",
                formatter:function (value,row,index) {
                    if (value==null || value==="") return "-";
                    else return value;
                }
            },
            {
                title:'菜单等级',
                align:"center",
                halign:"center",
                field:"menuLevel",
            },
            {
                title: "管理",
                align:"center",
                field:"menuId",
                formatter:function (value,row,index) {
                    let delerow = '<a href="javascript:void(0)" onclick="deleteMenu(\''+value+'\')">删除</a>'

                    let updarow = '<a href="javascript:void(0)" onclick="updataClassify(\''+value+'\')">修改 </a>'

                    return updarow+delerow;
                }
            }
        ]
    })
}

//删除菜单
function deleteMenu(value) {
    var jsonData = {
        menuId:value
    }
    $.ajax({
        url: globalUrl + "/deleteMenu",//地址
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

//修改菜单
function updataClassify(value) {

    var update = prompt("请输入新的菜单名称")
    if (update!=null && update!==""){
        var jsonData = {
            menuId:value,
            menuName:update,
        }
        $.ajax({
            url: globalUrl + "/updateMenu",//地址
            type: "POST",//传输方式
            data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
            contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
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