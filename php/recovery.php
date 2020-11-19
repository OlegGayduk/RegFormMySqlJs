<?php

if(isset($_COOKIE['id']) && isset($_COOKIE['pass'])) header('Location: welcome.php');

?>

<!DOCTYPE html>
<html>
<head>
	<title>Восстановление</title>
	<link rel='stylesheet' type='text/css' href='../css/index.css'/>
    <script src="../js/index.js" defer></script>
</head>
<body>

	<div class="recover-container">
        <div class='media-progress'></div>
        <div class="error-container">
            <div class="error-log"></div>
        </div>
        <p class='come'>Recovery</p>
        <div class="main-form"> 
            <p><label class="login-text">Ваш Email: </label>
            <input class="login-field" name="login" type="email" size="40" maxlength="40" /></p> 
            <p><input class="recover-btn" type="submit" value="Выслать новый пароль" onclick='client.recovery()'></p> 
            <p><a class="recover-index" href='../index.php'>На главную</a></p>
        </div>
	</div>

</body>
</html>