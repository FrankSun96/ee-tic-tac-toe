<?php
	$wsdl = "http://localhost:8080/TTTWebApplication/TTTWebService?WSDL";
	$trace = true;
	$exceptions = true;
	
	try {
		$client = new SoapClient($wsdl, array('trace' => $trace, 'exceptions' => $exceptions));
		

		$username = $_POST["username"];
		$password = $_POST["password"];
		$name = $_POST["name"];
		$surname = $_POST["surname"];

		$user['username'] = $username;
		$user['password'] = $password;
		$user['name'] = $name;
		$user['surname'] = $surname;
		
		$response = $client->register($user);
		$val = (string) $response->return;
		echo $val;
		
	} catch (Exception $e) {
		echo $e->getMessage();
	}
?>