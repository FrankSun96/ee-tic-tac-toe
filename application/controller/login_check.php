<?php
	$wsdl = "http://localhost:8080/TTTWebApplication/TTTWebService?WSDL";
	$trace = true;
	$exceptions = true;
	
	try {
		$client = new SoapClient($wsdl, array('trace' => $trace, 'exceptions' => $exceptions));
		

		$username = $_POST["username"];
		$password = $_POST["password"];

		$user['username'] = $username;
		$user['password'] = $password;
		
		$response = $client->login($user);
		$val = (string) $response->return;
		echo $val;
		
	} catch (Exception $e) {
		echo $e->getMessage();
	}
?>