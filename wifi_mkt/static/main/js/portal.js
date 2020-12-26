$(document).ready(function(){
    $('#login-btn').on('click', function(e){
        e.preventDefault()
        $('#register-arlert').html('')
        let login_username = $('#login-username').val();
        let login_password = $('#login-password').val();
        let sta = $('#hidden-sta').val();
        let ap = $('#hidden-ap').val();
        let ssid = $('#hidden-ssid').val();
        if (login_password != '' && login_username != ''){
            $.ajax({
                url: '/guest/login/',
                dataType: 'json',
                method: 'get',
                data: {
                    'login_username': login_username,
                    'login_password': login_password,
                    'sta': sta,
                    'ap': ap,
                    'ssid': ssid
                },
                success: function(data){
                    if (data.status == 'OK'){
                        $('#login-arlert').html(
                            '<div class="alert alert-success">'+ 
                                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                                '<strong>Thông báo:</strong> '+ data.message +'</div>'
                        )
                        setTimeout(function(){
                            window.location.replace("https://google.com");
                        },2000)
                                          
                    }
                    else{
                        $('#login-arlert').html(
                            '<div class="alert alert-warning">'+ 
                                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                                '<strong>Thông báo:</strong> '+ data.message +'</div>'
                        ) 
                    }
                }
            })
        }
        else{
            $('#login-arlert').html(
                '<div class="alert alert-warning">'+ 
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                    '<strong>Thông báo:</strong> Vui lòng nhập tên đăng nhập và mật khẩu</div>'
            )
        }
    })


    $('#register-btn').on('click', function(e){
        e.preventDefault()
        $('#register-arlert').html('')
        let register_username = $('#register-username').val();
        let register_phone_number = $('#register-phone-number').val();
        let register_password = $('#register-password').val();
        let register_repeat_password = $('#register-repeat-password').val();
        if (register_password != register_repeat_password || register_password.length <=5){
            $('#register-arlert').html(
                '<div class="alert alert-warning">'+ 
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                    '<strong>Thông báo:</strong> Mật khẩu không hợp lệ</div>'
            )
        }
        else {
            $.ajax({
                dataType:'json',
                data: {
                    'register_username': register_username,
                    'register_phone_number': register_phone_number,
                    'register_password': register_password
                },
                url: '/guest/register/',
                success: function(data){
                    if (data.status == 'OK'){
                        $('#register-arlert').html(
                            '<div class="alert alert-success">'+ 
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                            '<strong>Thông báo:</strong> Đăng ký thành công</div>'
                        )
                    }
                    else{
                        $('#register-arlert').html(
                            '<div class="alert alert-warning">'+ 
                                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
                                '<strong>Thông báo:</strong> Tên đăng nhập đã tồn tại</div>'
                        )   
                    }
                }
            })
        }
    })
})