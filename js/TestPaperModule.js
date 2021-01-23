$(function () {
    load();
})

//刷新表格
function reLoad(){
    //bt表格会自动搞定刷新数据
    $('#myTable').bootstrapTable('refresh');
}

//bootstrap-table表格
function load() {
    let url = globalUrl+"/queryQuestion";

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
                title:'题目类型',
                align:"center",
                halign:"center",
                field:"questionType",
                formatter:function (value,row,index) {
                    if (value==0) return "单选题";
                    if (value==1) return "简答题";
                }
            },
            {
                title:'试题分类',
                align:"center",
                halign:"center",
                field:"questionClassify",
                // formatter:function (value,row,index) {
                //
                //     return row;
                // }
            },
            {
                title:'试题内容',
                align:"center",
                halign:"center",
                field:"questionTopic",
                // formatter:function (value,row,index) {
                //
                //     return row;
                // }
            },
            {
                title:'添加时间',
                align:"center",
                halign:"center",
                field:"questionCreatetime",
                formatter:function (value,row,index) {

                    return value.year+"-"+value.monthValue+"-"+value.dayOfYear+" "+value.hour+":"+value.minute+":"+value.second;
                }
            },
            {
                title: "管理",
                align:"center",
                field:"questionId",
                formatter:function (value,row,index) {
                    let delerow = '<a href="javascript:void(0)" onclick="deleteQuestion(\''+value+'\')">删除 </a>'

                    let updarow = '<a href="javascript:void(0)" onclick="updataQuestion(\''+encodeURI(JSON.stringify(row))+'\')">修改 </a>'

                    let queryrow = '<a href="javascript:void(0)" onclick="queryQuestion(\''+encodeURI(JSON.stringify(row))+'\')">详情</a>'

                    return updarow+delerow+queryrow;
                }
            }
        ]
    })
}

//添加试题
function addQuestion() {
    flag = 0;
    $("#right_content").load("addquestion.html");
}

//修改试题
function updataQuestion(row) {
    flag = 1;

    row = decodeURI(row);//加码
    questionGlobal = eval("("+row+")");//解码  固定格式  我也不知到为啥

    $("#right_content").load("addquestion.html");
}

//查看试题
function queryQuestion(row) {
    flag = 1;

    row = decodeURI(row);//加码
    row = eval("("+row+")");//解码  固定格式  我也不知到为啥

    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'查看试题',
        maxmin:false,
        shadeClose:true,
        area:['20%','50%'],//弹出层的宽高
        content:'../page/queryquestion.html',//设置弹出层打开的页面
        //弹出层页面成功打开后的设置  加载子页面 渲染子页面 load后端数据 弹出 success 展示成功
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象  固定方法
            //js  dom对象
            let childBody= layer.getChildFrame('body',index);

            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            if (row.questionType==0){//单选题
                $(childBody).find('ul[id=singleQuestion]').show();
                $(childBody).find('ul[id=shortAnswer]').hide();

                $(childBody).find('span[class=singleType]').text("[单选题]");
                $(childBody).find('span[class=singleClassify]').text(row.questionClassify);
                $(childBody).find('span[class=singleTopic]').text(row.questionTopic);
                $(childBody).find('span[class=singleA]').text(row.singleA);
                $(childBody).find('span[class=singleB]').text(row.singleB);
                $(childBody).find('span[class=singleC]').text(row.singleC);
                $(childBody).find('span[class=singleD]').text(row.singleD);
                $(childBody).find('span[class=singleAnswer]').text(row.questionAnswer);
                $(childBody).find('span[class=singleScore]').text(row.questionScore);
            }
            if (row.questionType==1){//简答题
                $(childBody).find('ul[id=singleQuestion]').hide();
                $(childBody).find('ul[id=shortAnswer]').show();

                $(childBody).find('span[class=shortType]').text("[简答题]");
                $(childBody).find('span[class=shortClassify]').text(row.questionClassify);
                $(childBody).find('span[class=shortTopic]').text(row.questionTopic);
                $(childBody).find('span[class=shortAnswer]').text(row.questionAnswer);
                $(childBody).find('span[class=shortScore]').text(row.questionScore);
            }
        }
    });

}

//删除试题
function deleteQuestion(value) {
    var jsonData = {
        id:value
    }
    $.ajax({
        url: globalUrl + "/deleteQuestion",//地址
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

//分组管理 layer弹出层
function classifyManage() {
    layer.open({
        type:2,
        title:"分类管理",
        maxmin:false,
        shadeClose:false,//默认false 即只能点击x按钮关闭，改成true 则点击背景区域实现关闭
        area:['80%','80%'],//弹出层的宽高
        content:'../page/TestPaperGroups.html'
    })
}

