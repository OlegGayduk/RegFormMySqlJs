<?php 

require_once("db.php");

if(isset($_POST['login']) && isset($_POST['pass']) && isset($_POST['alias'])) {

	$login = htmlspecialchars($_POST['login']);
	$login = $db->real_escape_string($login);

	$res = $db->query("SELECT login FROM users_list WHERE login='$login'");

	if($res->num_rows > 0) exit("This login is already taken! <a href='registr.php'>Please come up with new login, return to registration page and try again!</a>");
			
	$pass = htmlspecialchars($_POST['pass']);
	$pass = $db->real_escape_string($pass);

	$alias = htmlspecialchars($_POST['alias']);
	$alias = $db->real_escape_string($alias);

	$options = ['cost' => 12,];

	$pass = password_hash($pass,PASSWORD_BCRYPT,$options);

    $res = $db->query("INSERT INTO users_list(login,pass,alias) VALUES ('$login','$pass','$alias')");

    if($res != false) {
        $res = $db->query("SELECT id FROM users_list WHERE login='$login' AND pass='$pass'");

        if($res->num_rows > 0) {
        	$row = $res->fetch_assoc();

        	setcookie("id", $row['id'], time() + 50000);
        	setcookie("pass", $pass, time() + 50000);

        	echo 1;
        } else {
        	echo "Something went wrong...";
        }
    } else {
    	echo "An error occurred while writing to the database! Please, try again later!";
    }
} else {
	echo "Data wasn't sent! Try again!";
}

?>