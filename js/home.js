//定义一个全局的变量  判断添加试题与修改试题界面的不同
var flag = 0;
//定义一个全局变量 接收修改试题时的试题信息
var questionGlobal;

//定义变量 接收数据库中的菜单数据
var resultMenu;

$(function () {
    //首次进入  右侧界面始终是首页
    $("#right_title").text("> 系统首页");
    $("#right_content").load("testIndex.html");
    //添加用户名
    $("#user_name").text(localStorage.getItem("userAcc"));
    //拿到数据库中的菜单信息

    //管理员界面
    if (localStorage.getItem("loginState")==1){
        //<!--    系统管理界面-->
        $("#right_title").text("> 系统管理");
        $("#right_content").load("systemManage.html");
    }

    $.ajax({
        url: globalUrl + "/queryMenu",//地址
        type: "POST",//传输方式
        // data: JSON.stringify(dataArray),//将json格式转换为字符串并进行传送
        // contentType: "application/json;charset=UTF-8",//传入后端传回的数据格式是json
        dataType: "json",//返回后端的数据格式也是json
        success: function (result) {
            console.log(result);
            resultMenu = result;

            //动态创建导航栏
            for (var i=0;i<resultMenu.list1.length;i++){
                $("#home_lefts").append('<div class="home_menu1">'+resultMenu.list1[i].menuName+'</div>');
                for (var j=0;j<resultMenu.list2.length;j++){
                    if (resultMenu.list1[i].menuName===resultMenu.list2[j].menuUp)
                    {
                        $("#home_lefts>.home_menu1").eq(i).after('<div class="home_menu2">'+resultMenu.list2[j].menuName+'</div>');
                    }
                }
            }
        }
    })
})

//导航栏
if (localStorage.getItem("loginState")==0){

    $("#home_lefts").on("click",".home_menu1",function () {
        switch ($(this).text()) {
            case "系统首页":
                $("#right_content").load("testIndex.html");
                $("#right_title").text("> "+$(this).text());
                break;
            case "题库管理":
                $("#right_content").load("questionbank.html");
                $("#right_title").text("> "+$(this).text());
                break;
            case "试卷管理":
                $("#right_content").load("TestPaperModule.html");
                $("#right_title").text("> "+$(this).text());
                break;
            default:console.log("出错了！！！");break;
        }
    })
}