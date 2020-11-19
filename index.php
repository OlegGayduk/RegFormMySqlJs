<?php

if(isset($_COOKIE['id']) && isset($_COOKIE['pass'])) header('Location: php/welcome.php');

?>
<!DOCTYPE html>
<html>
<head>
	<title>Вход</title>
	<link rel='stylesheet' type='text/css' href='css/index.css'/>
    <script src="js/index.js" defer></script>
</head>
<body>

	<div class="container">
        <div class='media-progress'></div>
        <div class="error-container">
            <div class="error-log"></div>
        </div>
        <p class='come'>Sign in</p>
        <div class="main-form"> 
            <p><label class="login-text">Ваш Email: </label>
            <input class="login-field" name="login" type="email" size="40" maxlength="40" /></p> 
            <p><label class="pass-text">Ваш пароль: </label>
            <input class="pass-field" name="pass" type="password" size="40" maxlength="40" /></p> 
            <p><input class="come-btn" value="Войти" type='submit' onclick="client.signIn()"></p>
            <p><a class="recover" href='php/recovery.php'>Забыли пароль?</a></p>
            <p><a class="register" href='php/registr.php'>Регистрация</a></p>
        </div>
	</div>

</body>
</html>