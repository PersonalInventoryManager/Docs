<?php
    session_start();
    if(isset($_SESSION['rcstate']) && $_SESSION['rcstate'] == '2')
        $_SESSION['rcstate'] = '3';
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Personal Inventory Manager</title>
        <script type="text/javascript" src="jquery-1.6.2.js"></script>
        <script type="text/javascript" src="jquery-ui-1.8.16.custom.min.js"></script>
        <link type="text/css" rel="stylesheet" href="jquery-ui-1.8.16.custom.css" />
        <script type="text/javascript" src="autocomplete.js"></script>
        <script type="text/javascript" src="validate.js"></script>
        <script type="text/javascript">
            function changeToTextFieldTitle(sp, id, ce)
            {
                if(!sp || typeof sp == "undefined")
                    return;
                if(!id || typeof id == "undefined" || id == null || id == "")
                    return;
                var txt = sp.innerHTML+"";
                txt = myEscape2(txt);
                var mt = txt.match('<input');
                if(!(!mt || typeof mt == "undefined" || mt == null))
                    return;
                var onblurstr = "this.parentNode.innerHTML = this.value+''; if(this.value != '"+myEscape(txt)+"') { showSaveSpan(); document.getElementById('crtmod').innerHTML = 'Created: 29/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 6/10/2011 2:45 pm'; }";
                if(ce)
                    onblurstr = "if(this.value != '') { "+onblurstr+" } else { this.parentNode.innerHTML = '"+myEscape(txt)+"'; }";
                sp.innerHTML = '<input type="text" style="font-size:40px;" size="50" id="'+id+'" value="'+txt+'" onblur="'+onblurstr+'" />';
                document.getElementById(id+"").focus();
            }
            function changeToTextField(sp, id, ce)
            {
                if(!sp || typeof sp == "undefined")
                    return;
                if(!id || typeof id == "undefined" || id == null || id == "")
                    return;
                var txt = sp.innerHTML+"";
                txt = myEscape2(txt);
                var mt = txt.match('<input');
                if(!(!mt || typeof mt == "undefined" || mt == null))
                    return;
                var onblurstr = "this.parentNode.innerHTML = this.value+''; if(this.value != '"+myEscape(txt)+"') { showSaveSpan(); document.getElementById('crtmod').innerHTML = 'Created: 29/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 6/10/2011 2:45 pm'; }";
                if(ce)
                    onblurstr = "if(this.value != '') { "+onblurstr+" } else { this.parentNode.innerHTML = '"+myEscape(txt)+"'; }";
                sp.innerHTML = '<input type="text" style="font-size:20px;" size="50" id="'+id+'" value="'+txt+'" onblur="'+onblurstr+'" />';
                document.getElementById(id+"").focus();
            }
            function changeToTextArea(sp, id, ce)
            {
                if(!sp || typeof sp == "undefined")
                    return;
                if(!id || typeof id == "undefined" || id == null || id == "")
                    return;
                var txt = sp.innerHTML+"";
                txt = myEscape2(txt);
                var mt = txt.match('<textarea');
                if(!(!mt || typeof mt == "undefined" || mt == null))
                    return;
                var onblurstr = "this.parentNode.innerHTML = (this.value+'').replace(/\\n/g, '<br />'); if(this.value != '"+myEscape(txt)+"') { showSaveSpan(); document.getElementById('crtmod').innerHTML = 'Created: 29/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 6/10/2011 2:45 pm'; }";
                if(ce)
                    onblurstr = "if(this.value != '') { "+onblurstr+" } else { this.parentNode.innerHTML = '"+myEscape(txt)+"'; }";
                sp.innerHTML = '<textarea rows="5" cols="50" style="font-size:20px;" id="'+id+'" onblur="'+onblurstr+'">'+txt.replace(/<br \/>/g, '\n').replace(/<br>/g, '\n')+'</textarea>';
                document.getElementById(id+"").focus();
            }
            function changeToAutocompleteTextField(sp, lst, id, ce)
            {
                if(!sp || typeof sp == "undefined")
                    return;
                if(!lst || typeof lst == "undefined" || lst.length <= 0)
                    return;
                if(!id || typeof id == "undefined" || id == null || id == "")
                    return;
                var txt = sp.innerHTML+"";
                txt = myEscape2(txt);
                var mt = txt.match('<input');
                if(!(!mt || typeof mt == "undefined" || mt == null))
                    return;
                var onblurstr = "this.parentNode.innerHTML = this.value+''; if(this.value != '"+myEscape(txt)+"') { showSaveSpan(); document.getElementById('crtmod').innerHTML = 'Created: 29/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 6/10/2011 2:45 pm'; }";
                if(ce)
                    onblurstr = "if(this.value != '') { "+onblurstr+" } else { this.parentNode.innerHTML = '"+myEscape(txt)+"'; }";
                sp.innerHTML = '<input type="text" style="font-size:20px;" size="50" id="'+id+'" value="'+txt+'" onblur="'+onblurstr+'" />';
                setupAutocomplete(id+"", lst);
                document.getElementById(id+"").focus();
            }
            function myEscape(str)
            {
                str = str.replace(/\\/g, '\\\\');
                str = str.replace(/\'/g, '\\\'');
                str = str.replace(/\"/g, '\\"');
                str = str.replace(/&apos;/g, '\\\'');
                //str = str.replace(/&quot;/g, '\\"');
                //str = str.replace(/\'/g, '&apos;');
                //str = str.replace(/\"/g, '&quot;');
                str = str.replace(/\0/g, '\\0');
                return str;
            }
            function myEscape2(str)
            {
                str = str.replace(/\'/g, '&apos;');
                str = str.replace(/\"/g, '&quot;');
                return str;
            }
            
            function showSaveSpan()
            {
                $("#changedspan").show().delay(1000).fadeOut(2000);
            }

            var keylist = ["Size", "Speed", "Manufacturer"];
        </script>
    </head>
    <body style="padding-left:225px;padding-top:200px;font-size:20px;">
        <?php
            require 'links.php';
        ?>
        <div style="position:absolute;left:0px;top:0px;width:100%;height:200px;padding:0;overflow:hidden;text-align:center;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100px;overflow:hidden;padding-left:100px;text-align:center;font-size:75px;">Item Details</div>
            <div style="position:absolute;left:0;top:100;width:100%;overflow:hidden;padding-left:100px;padding-top:10px;padding-bottom:10px;text-align:center;font-size:40px;"><span style="background-color:#DDDDDD;padding:10px;display:inline-block;" onclick="changeToTextFieldTitle(this, 'nme', true);">2GB DDR3 RAM for Dell Inspiron 1520 laptop</span></div>
        </div>
        <div style="text-align:center;margin-right:25px;height:30px;">
            <span id="changedspan" style="display:none;font-size:20px;color:lightgreen;background-color:teal;">
                Change Saved
            </span>
        </div>
        <div id="crtmod" style="font-size:18px;">Created: 29/9/2011 3:20 pm</div><br />
        <div style="font-size:20px;">UPC: <span style="background-color:#DDDDDD;padding:10px;" onclick="changeToTextField(this, 'upc', true);">912837465555</span></div><br />
        <div style="font-size:20px;">Location: <span style="background-color:#DDDDDD;padding:10px;" onclick="changeToTextField(this, 'upc');">Box 4 in the Basement</span></div><br />
        <div style="font-size:20px;">Category: <span style="padding:10px;">RAM</span></div><br />
        <div style="font-size:20px;"><span style="background-color:#DDDDDD;padding:10px;" onclick="changeToAutocompleteTextField(this, keylist, 'k0', true);">Size</span> : <span style="background-color:#DDDDDD;padding:10px;" onclick="changeToTextField(this, 'v0');">2GB</span></div><br /><br />
        <div style="font-size:20px;"><span style="background-color:#DDDDDD;padding:10px;" onclick="changeToAutocompleteTextField(this, keylist, 'k1', true);">Manufacturer</span> : <span style="background-color:#DDDDDD;padding:10px;" onclick="changeToTextField(this, 'v1');">Dell</span></div><br /><br />
        <div style="font-size:20px;">Notes:<br /><br /><span style="background-color:#DDDDDD;padding:10px;display:block;min-height:130px;width:620px;" onclick="changeToTextArea(this, 'notes');"></span></div>
    </body>
</html>