<?php
    session_start();
    if(isset($_POST['state']) && $_POST['state'] == 'added')
    {
        $_SESSION['rcstate'] = '2';
        header('Location: index?state=added');
    }
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
            var validator;
            $(function()
            {
               setupAutocomplete("category", ["External Hard Drive", "Internal Hard Drive", "RAM", "Uncategorized"]);
               validator = new ValidationManager();
               validator.interpretForm(document.getElementById("mainform"));
               addField();
            });
            var fldind = 0;
            
            var fncfail = function(params)
            {
                alert("You are missing the required "+params.Item.id+" field.  Please fill it in before submitting.");
            }
            
            var bdata = Array();
            
            function addField()
            {
                var cnt = document.getElementById("cont");
                if(!cnt || typeof cnt == "undefined")
                    return;
                var tmpin = document.createElement("input");
                cnt.appendChild(tmpin);
                tmpin.type = "text";
                tmpin.id = "fld"+fldind;
                tmpin.style.fontSize = "20px";
                bdata[tmpin.id+""] = false;
                tmpin.onblur = function()
                {
                    if(this.value != "" && !bdata[this.id+""])
                        addField();
                    bdata[this.id+""] = true;
                }
                var tmpsp = document.createElement("span");
                cnt.appendChild(tmpsp);
                tmpsp.innerHTML = "&nbsp;&nbsp;:&nbsp;&nbsp;";
                tmpsp.style.fontSize = "20px;"
                tmpin = document.createElement("input");
                cnt.appendChild(tmpin);
                tmpin.type = "text";
                tmpin.style.fontSize = "20px";
                cnt.appendChild(document.createElement("br"));
                cnt.appendChild(document.createElement("br"));
                setupAutocomplete("fld"+fldind, keylist);
                fldind++;
            }
            var keylist = ["Size", "Speed"];
        </script>
    </head>
    <body style="padding-left:225px;padding-top:125px;font-size:20px;">
        <?php
            require 'links.php';
        ?>
        <div style="position:absolute;left:0px;top:0px;width:100%;height:100px;padding:0;overflow:hidden;text-align:center;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100px;overflow:hidden;padding-left:100px;text-align:center;font-size:75px;">Add Item</div>
        </div>
        <form action="add" method="post" id="mainform" onsubmit="return validator.failFastValidate(fncfail, null);">
            <input type="hidden" name="state" value="added" />
            Name<span style="color:#FF0000;">*</span>: <input style="font-size:20px;" type="text" name="nme" isrequired="Name" /><br /><br />
            UPC<span style="color:#FF0000;">*</span>: <input style="font-size:20px;" type="text" name="upc" isrequired="UPC" /><br /><br />
            Location: <input style="font-size:20px;" type="text" /><br /><br />
            Category: <input style="font-size:20px;" type="text" id="category" /><br /><br />
            <div id="cont"></div>
            Notes:<br /><br />
            <textarea style="font-size:20px;" rows="5" cols="50"></textarea><br /><br />
            <input style="font-size:20px;" type="submit" value="Add" /><br /><br /><br />
            <span style="color:#FF0000;">*</span> Required field
        </form>
    </body>
</html>