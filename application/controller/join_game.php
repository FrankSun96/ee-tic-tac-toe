<?php
	$wsdl = "http://localhost:8080/TTTWebApplication/TTTWebService?WSDL";
	$trace = true;
	$exceptions = true;
	
	try {
		$client = new SoapClient($wsdl, array('trace' => $trace, 'exceptions' => $exceptions));
		
		$uId = $_POST["uId"];
		$gId = $_POST["gId"];

		$game['uid'] = $uId;
		$game['gid'] = $gId;

		$response = $client->joinGame($game);
		$val = (string) $response->return;
		echo $val + $game;
		
	} catch (Exception $e) {
		echo $e->getMessage();
	}
?>
