<?php
/**
 * -----------------------------------------------------------------------------
 * @package     smartVISU - CamService
 * @author      Andre Kohler
 * @copyright   2022
 * @license     GPL [http://www.gnu.de]
 * -----------------------------------------------------------------------------
 */


require_once '../../../lib/includes.php';

// ************************************************
// function to get the path of the active pages
// ************************************************

function get_page_path($value)
{
	$myValue = config_pages;
	return $myValue;
}



// ************************************************
// main
// ************************************************

$command = $_GET["command"];

switch ($command)
{
    case 'get_page_path':
        $ret = get_page_path($_GET);
        break;
}

echo $ret;
?>

