<?php
    session_start();
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Personal Inventory Manager</title>
        <script type="text/javascript">
            function checkFields(obj)
            {
                if(!obj || typeof obj == "undefined")
                    return;
                var cnt = document.getElementById("cont");
                if(!cnt || typeof cnt == "undefined")
                    return;
                if(obj.selectedIndex == 3)
                    cnt.innerHTML = 'Size: <input style="font-size:20px;" type="text" /><br /><br />Speed: <input style="font-size:20px;" type="text" /><br /><br /><?php if(isset($_SESSION['rcstate']) && $_SESSION['rcstate'] >= 1) { echo 'Manufacturer: <input style="font-size:20px;" type="text" /><br /><br />'; } ?>'
                else
                    cnt.innerHTML = "";
            }
        </script>
    </head>
    <body style="padding-left:225px;padding-top:125px;font-size:20px;">
        <?php
            require 'links.php';
        ?>
        <div style="position:absolute;left:0px;top:0px;width:100%;height:100px;padding:0;overflow:hidden;text-align:center;">
            <div style="position:absolute;left:0;top:0;width:100%;height:100px;overflow:hidden;padding-left:100px;text-align:center;font-size:75px;">Advanced Search</div>
        </div>
        <form action="search" method="post">
            <input type="hidden" name="state" value="searched" />
            Name: <input style="font-size:20px;" type="text"<?php if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'basic') { echo ' value="2GB DDR3"'; } ?> /><br /><br />
            UPC: <input style="font-size:20px;" type="text" /><br /><br />
            Location: <input style="font-size:20px;" type="text" /><br /><br />
            Category: <select style="font-size:20px;" onchange="checkFields(this);">
                <option>&nbsp;</option>
                <option>External Hard Drive</option>
                <option>Internal Hard Drive</option>
                <option<?php if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'searched') { echo ' selected="selected"'; } ?>>RAM</option>
                <option>Uncategorized</option>
            </select><br /><br />
            <div id="cont">
<?php
    if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'searched')
    {
?>
                Size: <input style="font-size:20px;" type="text" /><br /><br />
                Speed: <input style="font-size:20px;" type="text" /><br /><br />
<?php
        if(isset($_SESSION['rcstate']) && $_SESSION['rcstate'] >= 1)
        {
?>
                Manufacturer: <input style="font-size:20px;" type="text" /><br /><br />
<?php
        }
    }
?>
            </div>
            Notes:<br />
            <textarea rows="5" cols="50"></textarea><br /><br />
            <input style="font-size:20px;" type="submit" value="Search" />
        </form>
        <div>
            <div style="font-size:50px;">Search Results
                <span style="font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sort By:
<?php
    $sflds = array('name'=>'Name', 'upc'=>'UPC', 'created'=>'Recently Created', 'modified'=>'Recently Modified');
    $cnt = 0;
    foreach($sflds as $key => $value)
    {
        if((isset($_GET['sort']) && $_GET['sort'] == $key) || (!isset($_GET['sort']) && $cnt == 0))
            echo ' <span style="font-weight:bold">'.$value.'</span>';
        else
            echo ' <a href="search?state='.$_REQUEST['state'].'&sort='.$key.'" style="color:#0000FF;cursor:pointer;">'.$value.'</a>';
        $cnt++;
        if($cnt < count($sflds))
            echo ' |';
    }
?>
                </span>
            </div><br /><br />
<?php
    if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'basic' && (!isset($_GET['sort']) || $_GET['sort'] == '' || $_GET['sort'] == 'name' || $_GET['sort'] == 'created' || $_GET['sort'] == 'modified'))
    {
?>
            <div style="font-size:20px;">
                Search Results Found: 2
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 29/9/2011 3:20 pm</div>
                <div style="font-size:20px;">
                    UPC: 912837465555<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Manufacturer: Dell
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:45 pm</div>
                <div style="font-size:20px;">
                    UPC: 123456789999<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Speed: DDR3
                </div>
            </div><br />
<?php
    }
    else if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'basic' && isset($_GET['sort']) && $_GET['sort'] == 'upc')
    {
?>
            <div style="font-size:20px;">
                Search Results Found: 2
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:45 pm</div>
                <div style="font-size:20px;">
                    UPC: 123456789999<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Speed: DDR3
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 29/9/2011 3:20 pm</div>
                <div style="font-size:20px;">
                    UPC: 912837465555<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Manufacturer: Dell
                </div>
            </div><br />
<?php
    }
    else if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'searched' && isset($_GET['sort']) && $_GET['sort'] == 'modified')
    {
?>
            <div style="font-size:20px;">
                Search Results Found: 3
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 29/9/2011 3:20 pm</div>
                <div style="font-size:20px;">
                    UPC: 912837465555<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Manufacturer: Dell
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">4GB DDR2 RAM for HP EliteBook 8530w laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 23/9/2011 3:50 pm</div>
                <div style="font-size:20px;">
                    UPC: 012345678999<br />
                    Category: RAM<br />
                    Size: 4GB<br />
                    Speed: DDR2
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:45 pm</div>
                <div style="font-size:20px;">
                    UPC: 123456789999<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Speed: DDR3
                </div>
            </div><br />
<?php
    }
    else if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'searched' && (!isset($_GET['sort']) || $_GET['sort'] == '' || $_GET['sort'] == 'name' || $_GET['sort'] == 'created'))
    {
?>
            <div style="font-size:20px;">
                Search Results Found: 3
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 29/9/2011 3:20 pm</div>
                <div style="font-size:20px;">
                    UPC: 912837465555<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Manufacturer: Dell
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:45 pm</div>
                <div style="font-size:20px;">
                    UPC: 123456789999<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Speed: DDR3
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">4GB DDR2 RAM for HP EliteBook 8530w laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 23/9/2011 3:50 pm</div>
                <div style="font-size:20px;">
                    UPC: 012345678999<br />
                    Category: RAM<br />
                    Size: 4GB<br />
                    Speed: DDR2
                </div>
            </div><br />
<?php
    }
    else if(isset($_REQUEST['state']) && $_REQUEST['state'] == 'searched' && isset($_GET['sort']) && $_GET['sort'] == 'upc')
    {
?>
            <div style="font-size:20px;">
                Search Results Found: 3
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">4GB DDR2 RAM for HP EliteBook 8530w laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:20 pm&nbsp;&nbsp;&nbsp;&nbsp;Modified: 23/9/2011 3:50 pm</div>
                <div style="font-size:20px;">
                    UPC: 012345678999<br />
                    Category: RAM<br />
                    Size: 4GB<br />
                    Speed: DDR2
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 23/9/2011 3:45 pm</div>
                <div style="font-size:20px;">
                    UPC: 123456789999<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Speed: DDR3
                </div>
            </div><br />
            <div style="padding:10px;background-color:#BBBBBB;border: 5px solid #000000;">
                <div style="font-size:35px;"><a href="details" style="color:#0000FF;cursor:pointer;">2GB DDR3 RAM for Dell Inspiron 1520 laptop</a></div>
                <div style="font-size:18px;">Created: 29/9/2011 3:20 pm</div>
                <div style="font-size:20px;">
                    UPC: 912837465555<br />
                    Category: RAM<br />
                    Size: 2GB<br />
                    Manufacturer: Dell
                </div>
            </div><br />
<?php
    }
?>
        </div>
    </body>
</html>