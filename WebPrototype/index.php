<?php
    session_start();
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Personal Inventory Manager</title>
    </head>
    <body style="padding-left:225px;padding-top:125px;font-size:20px;">
        <?php
            require 'links.php';
        ?>
        <div style="position:absolute;left:0px;top:0px;width:100%;height:100px;padding:0;overflow:hidden;text-align:center;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100px;overflow:hidden;padding-left:100px;text-align:center;font-size:75px;">Personal Inventory Manager</div>
        </div>
        <?php
            require 'searchbar.php';
            require 'recent_changes'.$_SESSION['rcstate'].'.php';
        ?>
    </body>
</html>