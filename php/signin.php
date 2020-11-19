<?php

require_once("db.php");

if(isset($_POST['login']) && isset($_POST['pass'])) {

	$login = htmlspecialchars($_POST['login']);
	$login = $db->real_escape_string($login);

	$pass = htmlspecialchars($_POST['pass']);

	$res = $db->query("SELECT id,pass FROM users_list WHERE login='$login'");

	if($res->num_rows > 0) {

		$row = $res->fetch_assoc();

		if(password_verify($pass, $row['pass'])) {

			$id = $row['id'];

			$options = ['cost' => 12,];

	        $pass = password_hash($pass,PASSWORD_BCRYPT,$options);
            
            $res = $db->query("UPDATE users_list SET pass='$pass' WHERE id='$id'");

            if($res != false) {

                setcookie("id", $id, time() + 50000);
                setcookie("pass", $pass, time() + 50000);
    
		        //header("Location:welcome.php");
		        echo 1;
		    } else {
		    	echo "Something went wrong...";
		    }
		} else {
			echo "No such user found!";
		}
	} else {
		echo "No such user found!";
	}
} else {
	echo "Data wasn't sent! Try again!";
}

?>