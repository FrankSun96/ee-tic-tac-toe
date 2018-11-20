<?php
	$wsdl = "http://localhost:8080/TTTWebApplication/TTTWebService?WSDL";
	$trace = true;
	$exceptions = true;
	
	try {
		$client = new SoapClient($wsdl, array('trace' => $trace, 'exceptions' => $exceptions));

		$uid['uid'] = $_POST["uId"];
		
		$response = $client->newGame($uid);
		$val = (string) $response->return;
		echo $val;
		
	} catch (Exception $e) {
		echo $e->getMessage();
	}
?>