
	//Methods To Validate Forms
    var nameCheck=0;
    var phoneCheck=0;
    var messageCheck=0;
    
    //Regex Phases
    var nameRegex = /^[A-Za-zÀ-ú ]{2,20}$/;
    var messageRegex = /^[A-Za-zÀ-ú0-9 \!\?\.\~\^\,\;\:\-\ª\º\'\(\)\$\€\n]{1,50}$/;
    var phoneRegex = /^(91|92|93|96)[0-9]{7}$/;


    $('#inputUser').keyup(function(){
        var value = $(this).val();
        if(value == ''){
            $('#fUser').removeClass('has-error');
        }
        else{
            if(value.match(nameRegex)){
                $('#fUser').removeClass('has-error');
                $('#fUser').addClass('has-success');
                nameCheck=1;
            }
            else{
                $('#fUser').removeClass('has-success');
                $('#fUser').addClass('has-error');
                nameCheck=0;
            }
            testSend();
        }
    });

    $('#inputPhone').keyup(function(){
        var value = $(this).val();
        if(value == ''){
            $('#fPhone').removeClass('has-error');
        }
        else{
            if(value.match(phoneRegex)){
                $('#fPhone').removeClass('has-error');
                $('#fPhone').addClass('has-success');
                phoneCheck=1;
            }
            else{
                $('#fPhone').removeClass('has-success');
                $('#fPhone').addClass('has-error');
                phoneCheck=0;
            }
            testSend();
        }
    });

    $('#inputMessage').keyup(function(){
        var value = $(this).val();
        if(value == ''){
            $('#fMessage').removeClass('has-error');
        }
        else{
            if(value.match(messageRegex)){
                $('#fMessage').removeClass('has-error');
                $('#fMessage').addClass('has-success');
                messageCheck=1;
            }
            else{
                $('#fMessage').removeClass('has-success');
                $('#fMessage').addClass('has-error');
                messageCheck=0;
            }
            testSend();
        }
    });

    function testSend(){
        if(phoneCheck==1 && nameCheck==1 && messageCheck==1)
            $('#btn_send').removeAttr('disabled');
        else
            $('#btn_send').attr('disabled','');
    }