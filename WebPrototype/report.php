<?php
    session_start();
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Personal Inventory Manager</title>
        <script type="text/javascript">
            function checkType(obj)
            {
                if(!obj || typeof obj == "undefined")
                    return;
                if(obj.selectedIndex == 1)
                {
                    document.getElementById('cont').innerHTML = '';
                    document.getElementById('subbtn').disabled = false;
                }
                else if(obj.selectedIndex == 2)
                {
                    document.getElementById('cont').innerHTML = 'Category: <select style="font-size:15px;" onchange="if(this.selectedIndex > 0) { document.getElementById(\'subbtn\').disabled = false; } else { document.getElementById(\'subbtn\').disabled = true; }"><option>&nbsp;</option><option>External Hard Drive</option><option>Internal Hard Drive</option><option>RAM</option><option>Uncategorized</option></select>';
                    document.getElementById('subbtn').disabled = true;
                }
                else
                {
                    document.getElementById('cont').innerHTML = '';
                    document.getElementById('subbtn').disabled = true;
                }
            }
        </script>
    </head>
    <body style="padding-left:225px;padding-top:125px;font-size:20px;">
        <?php
            require 'links.php';
        ?>
        <div style="position:absolute;left:0px;top:0px;width:100%;height:100px;padding:0;overflow:hidden;text-align:center;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100px;overflow:hidden;padding-left:100px;text-align:center;font-size:75px;">Generate Report</div>
        </div>
        <form action="report" method="post">
            <input type="hidden" name="state" value="reporting" />
            Report Type: <select style="font-size:15px;" onchange="checkType(this);">
                <option>&nbsp;</option>
                <option>Master</option>
                <option<?php if(isset($_POST['state']) && $_POST['state'] == 'reporting') { echo ' selected="selected"'; } ?>>Category</option>
            </select><br /><br />
            <div id="cont">
<?php
    if(isset($_POST['state']) && $_POST['state'] == 'reporting')
        echo 'Category: <select style="font-size:15px;" onchange="if(this.selectedIndex > 0) { document.getElementById(\'subbtn\').disabled = false; } else { document.getElementById(\'subbtn\').disabled = true; }"><option>&nbsp;</option><option>External Hard Drive</option><option>Internal Hard Drive</option><option selected="selected">RAM</option><option>Uncategorized</option></select>';
?>
            </div><br />
            <input type="submit" style="font-size:15px;" id="subbtn" value="Generate"<?php if(!isset($_POST['state']) || $_POST['state'] != 'reporting') { ?> disabled="disabled"<?php } ?> />
        </form><br /><br />
<?php
    if(isset($_POST['state']) && $_POST['state'] == 'reporting')
    {
?>
        <div>
            Number of items in category RAM: 3<br />
            Oldest item in category RAM:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;2GB DDR3 RAM for Dell Inspiron 1520 laptop (UPC: 123456789999; Created: 23/9/2011 3:45 pm)<br />
            Newest item in category RAM:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;2GB DDR3 RAM for Dell Inspiron 1520 laptop (UPC: 912837465555; Created: 29/9/2011 3:20 pm)<br /><br />
            Attribute Statistics:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Size:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2GB: 2 items<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4GB: 1 item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Speed:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DDR2: 1 item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DDR3: 2 items<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Manufacturer:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dell: 1 item<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Not specified: 2 items
        </div>
<?php
    }
?>
    </body>
</html>