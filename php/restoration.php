<?php

require_once("db.php");

if(isset($_POST['login'])) {

	$login = htmlspecialchars($_POST['login']);
	$login = $db->real_escape_string($login);

	$res = $db->query("SELECT login FROM users_list WHERE login='$login'");

	if($res->num_rows > 0) {

		if(isset($_COOKIE['recovery_code']) && isset($_COOKIE['email'])) exit("Letter has already been sent to this email! Please, try again later!");

		$code = '';

        $arr = array(
        	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
        	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
        	'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
        	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        );
  
	    for ($i = 0; $i < 16; $i++) {
	    	$code .= $arr[random_int(0, count($arr) - 1)];
	    }

	    $res = mail($_POST['login'], "Password recovery request", "To recover your password, follow the link localhost:81/lab2MySql/php/restoration_check.php?code=$code");

	    if($res != false) {

	       setcookie("email", $_POST['login'], time() + 3600);
	       setcookie("recovery_code", $code, time() + 3600);

	       echo 1;
	    } else {
	    	echo "There was an error sending your email!";
	    }
	} else {
		echo "No such user found!";
	}
} else {
	echo "Data wasn't sent! Try again!";
}

?>