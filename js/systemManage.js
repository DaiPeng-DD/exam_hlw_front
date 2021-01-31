$(function () {
    load();
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#myTable').bootstrapTable('refresh');
}
//添加菜单
function addMenu() {
    var menuName=prompt("请输入菜单名称");
    var menuLevel=prompt("请输入菜单等级（数字）","1");
    var menuUp;
    if (menuLevel>1){
        menuUp=prompt("请输入上级菜单名称");
    }else {
        menuUp = null;
    }

    if (menuName!=null && menuName!==""){
        var jsonData = {
            menuName:menuName,
            menuLevel:menuLevel,
            menuUp:menuUp
        }
        console.log(jsonData);
        $.ajax({
            url: globalUrl + "/insertMenu",//地址
            type: "POST",//传输方式
            data: JSON.stringify(jsonData),//将json格式转换为字符串并进行传送
            contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
            dataType: "json",//传入后端的数据格式也是json
            success: function (result) {
                console.log(result);
                if (result){
                    alert("添加成功！！！");
                    location.reload();
                }else {
                    alert("添加失败！！！");
                }
            }
        })
    }
}

//bootstrap-table表格
function load() {
    let url = globalUrl+"/queryUsers";

    $("#myTable").bootstrapTable({
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
                title:'用户名',
                align:"center",
                halign:"center",
                field:"userName",
            },
            {
                title:'账号',
                align:"center",
                halign:"center",
                field:"userAcc",
            },
            {
                title:'手机号',
                align:"center",
                halign:"center",
                field:"userPhone",
            },
            {
                title:'状态',
                align:"center",
                halign:"center",
                field:"userIsdelete",
                formatter:function (value,row,index) {
                    if (value==1) return "启用中";
                    if (value==0) return "禁用中";
                }
            },
            {
                title: "管理",
                align:"center",
                field:"userId",
                formatter:function (value,row,index) {
                    let open = '<a href="javascript:void(0)" onclick="openUser(\''+value+'\')">启用 </a>'
                    let close = '<a href="javascript:void(0)" onclick="closeUser(\''+value+'\')">禁用</a>'

                    return open+close;
                }
            }
        ]
    })
}

//打开用户权限
function openUser(value) {
    var jsonData = {
        userId:value
    }
    $.ajax({
        url: globalUrl + "/insertUsers",//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result){
                alert("启用成功！！！");
                reLoad();
            }else {
                alert("启用失败！！！");
            }
        }
    })
}

//关闭用户权限
function closeUser(value) {
    var jsonData = {
        userId:value
    }
    $.ajax({
        url: globalUrl + "/deleteUsers",//地址
        type: "POST",//传输方式
        data: jsonData,//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//接收后端传回的数据格式是json
        dataType: "json",//传入后端的数据格式也是json
        success: function (result) {
            console.log(result);
            if (result){
                alert("禁用成功！！！");
                reLoad();
            }else {
                alert("禁用失败！！！");
            }
        }
    })
}

//菜单管理 layer弹出层
function menuManage() {
    layer.open({
        type:2,
        title:"菜单管理",
        maxmin:false,
        shadeClose:false,//默认false 即只能点击x按钮关闭，改成true 则点击背景区域实现关闭
        area:['80%','80%'],//弹出层的宽高
        content:'../page/menuManage.html'
    })
}

