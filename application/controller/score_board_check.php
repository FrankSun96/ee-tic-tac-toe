<?php
	$wsdl = "http://localhost:8080/TTTWebApplication/TTTWebService?WSDL";
	$trace = true;
	$exceptions = true;
	
	try {
		$client = new SoapClient($wsdl, array('trace' => $trace, 'exceptions' => $exceptions));

		$uId['uid'] = $_POST["uId"];
		$username = $_POST['username'];
		
		$response = $client->showAllMyGames($uId);
		$games = (string) $response->return;
		
		$date ="/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]*/";

		$error = "/ERROR/";
		if(preg_match($error, $games)) {
			echo 'ERROR';
		} else {
			$games = preg_replace($date, '', $games);
			$game = preg_split('/[\n]/', $games);
		
			$wins = 0;
			$loses = 0;
			$draws = 0;

			for($i = 0; $i < count($game); $i++) {
				$details = preg_split('/,/', $game[$i]);
				$gameId['gid'] = $details[0];
				$response = $client->getGameState($gameId);
				$gameState = (string) $response->return;
				if($gameState == 1) {
					if($details[1] == $username) {
						$wins++;
					} else if($details[2] == $username) {
						$loses++;
					}
				} else if($gameState == 2) {
					if($details[1] == $username) {
						$loses++;
					} else if($details[2] == $username) {
						$wins++;
					}
				} else if($gameState == 3) {
					$draws++;
			}
		}

		echo ($wins . "," . $loses . "," . $draws);
	}
	} catch (Exception $e) {
		echo $e->getMessage();
	}
?>