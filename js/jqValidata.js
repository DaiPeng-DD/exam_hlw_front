$(function(){


    //自定义方法，完成手机号码的验证
    //name:自定义方法的名称，method：函数体, message:错误消息
    $.validator.addMethod("phone", function(value, element, param){
        //方法中又有三个参数:value:被验证的值， element:当前验证的dom对象，param:参数(多个即是数组)
        //alert(value + "," + $(element).val() + "," + param[0] + "," + param[1]);
        return new RegExp(/^1[3458]\d{9}$/).test(value);

    }, "手机号码不正确");

    //让当前表单调用validate方法，实现表单验证功能
    $("#ff").validate({
        // debug:true,	//调试模式，即使验证成功也不会跳转到目标页面
        onblur:true,//触发方式
        rules:{		//配置验证规则，key就是被验证的dom对象，value就是调用验证的方法(也是json格式)
            sname:{
                required:true,	//必填。如果验证方法不需要参数，则配置为true
                rangelength:[3,12],
                //远程验证
                remote:{
                    url: "http://localhost:8080/SpringMVC_1/validataAcc",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        sname: function() {
                                return $("#sname").val();
                            }
                        }
                    }
            },
            spass:{
                required:true,
                rangelength:[6,12]
            },
            spass2:{
                required:true,
                equalTo:'#spass' //表示和id="spass"的值相同
            },
            sphone:{
                phone:true //自定义
            },
            saddress:{
                required:true
            },
            slike:{
                required:true,
            },
            semail:{
                required:true,
                email:true
            },
            simage:{
                required:true,
                extension:'gif|jpeg|png'
            }
        },





        messages:{
            sname:{
                required:"请输入用户名",
                rangelength:$.validator.format("用户名长度在必须为：{0}-{1}之间"),
                remote:"该用户名已存在！"
            },
            spass:{
                required:"请输入密码",
                rangelength:$.validator.format("字段长度必须为：{0}-{1}之间")
            },
            spass2:{
                required:"请再次输入密码",
                equalTo:"两次密码必须一致" //表示和id="spass"的值相同
            },
            saddress:{
                required:"请选择地址"
            },
            slike:{
                required:"请选择爱好",
            },
            semail:{
                required:"请填写邮件",
                email:"邮箱格式不正确"
            },
            simage:{
                required:"请选择要上传的头像",
                extension:"文件后缀名必须为jpg,jpeg,gif,png"
            }
        }
    });







});