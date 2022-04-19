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
// function to get the settings for the cams
// ************************************************

function get_cam_settings($value)
{
   $myFile = file_get_contents(const_path.'pages/'.config_pages.'/camservice.cfg');
   if ($myFile  != false)
	   {
  		return ($myFile);
	   }
  else
  {
	  //$myFile="{'const_path':'".const_path."','config_pages':'".config_pages."'}";
	  $myFile='{}';
  }
  return ($myFile);
}

// ************************************************
// function to store the settings for the cams
// ************************************************

function store_cam_settings($value)
{
  $content = $value["data"];
  file_put_contents(const_path.'pages/'.config_pages.'/camservice.cfg', $content);
	return ('OK');
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
    case 'get_cam_settings':
        $ret = get_cam_settings($_GET);
        break;        
    case 'store_cam_settings':
        $ret = store_cam_settings($_GET);
        break;        
}
echo $ret;
?>

