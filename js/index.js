class Client {

    constructor() {

    	this.xhr = this.getXhrType();
    }

    getXhrType() {

        let x;
    
        try {
            x = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                x = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                x = 0;
            }
        }
    
        if(!x && typeof XMLHttpRequest != 'undefined') x = new XMLHttpRequest();
    
        return x;
    }

    sanitize(text) {
        return text.replace(/<script>|[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gim, "");
    }

    signIn() {

        document.getElementsByClassName('error-log')[0].innerHTML = "";

        let login = this.sanitize(document.getElementsByClassName('login-field')[0].value);
        let pass = this.sanitize(document.getElementsByClassName('pass-field')[0].value);

        if((login.length > 0 && login.length <= 40) && (pass.length > 0 && pass.length <= 40)) { 

            const xhr = this.xhr;
    
            xhr.onload = xhr.onerror = function() {

                document.getElementsByClassName('media-progress')[0].style.width = "0px";

                if(this.status == 200) {
                        
                    if(this.response == 1) {
                        location.href = 'php/welcome.php';
                    } else {
                        document.getElementsByClassName('error-log')[0].innerHTML = this.responseText;
                    }
                } else {
                    document.getElementsByClassName('error-log')[0].innerHTML = "Request is not successful! Please, try again!";
                }
            };
    
            xhr.onprogress = function(event) {
                document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
            };
      
            xhr.open('POST', "http://localhost:81/lab2MySqlJs/php/signin.php", true);

            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
            xhr.send("login="+encodeURIComponent(login)+"&pass="+encodeURIComponent(pass));
        } else {
            document.getElementsByClassName('error-log')[0].innerHTML = "Invalid data length! Please, try again!";
        }
    }

    registr() {

        document.getElementsByClassName('error-log')[0].innerHTML = "";

        let login = this.sanitize(document.getElementsByClassName('login-field')[0].value);

        const re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

        if(re.test(login) != false) {

            let pass = this.sanitize(document.getElementsByClassName('registr-pass-field')[0].value);
            let alias = this.sanitize(document.getElementsByClassName('alias-field')[0].value);
    
            if(login.length > 0 && login.length <= 40) { 
                if(pass.length >= 8 && pass.length <= 40) {
                    if(alias.length > 0 && alias.length <= 12) {
    
                        const xhr = this.xhr;
            
                        xhr.onload = xhr.onerror = function() {
        
                            document.getElementsByClassName('media-progress')[0].style.width = "0px";
        
                            if(this.status == 200) {
                                    
                                if(this.response == 1) {
                                    location.href = 'php/welcome.php';
                                } else {
                                    document.getElementsByClassName('error-log')[0].innerHTML = this.responseText;
                                }
                            } else {
                                document.getElementsByClassName('error-log')[0].innerHTML = "Request is not successful! Please, try again!";
                            }
                        };
            
                        xhr.onprogress = function(event) {
                            document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
                        };
              
                        xhr.open('POST', "http://localhost:81/lab2MySqlJs/php/registration.php", true);
        
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              
                        xhr.send("login="+encodeURIComponent(login)+"&pass="+encodeURIComponent(pass)+"&alias="+encodeURIComponent(alias));
                    } else {
                        document.getElementsByClassName('alias-field')[0].focus();
                        document.getElementsByClassName('error-log')[0].innerHTML = "Alias length is incorrect! Please, try again!";
                    }
                } else {
                    document.getElementsByClassName('registr-pass-field')[0].focus();
                    document.getElementsByClassName('error-log')[0].innerHTML = "Password length is incorrect! Please, try again!";
                }
            } else {
                document.getElementsByClassName('login-field')[0].focus();
                document.getElementsByClassName('error-log')[0].innerHTML = "Email length is incorrect! Please, try again!";
            }
        } else {
            document.getElementsByClassName('error-log')[0].innerHTML = "Email format is incorrect! Please, try again!";
        }
    }

    recovery() {

        document.getElementsByClassName('error-log')[0].innerHTML = "";

        let login = this.sanitize(document.getElementsByClassName('login-field')[0].value);

        const re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

        if(re.test(login) != false) {

            if(login.length > 0 && login.length <= 40) { 

                const xhr = this.xhr;
    
                xhr.onload = xhr.onerror = function() {

                    document.getElementsByClassName('media-progress')[0].style.width = "0px";

                    if(this.status == 200) {
                            
                        if(this.response == 1) {
                            document.getElementsByClassName('error-log')[0].innerHTML = "A letter has been sent to the mailbox!";
                        } else {
                            document.getElementsByClassName('error-log')[0].innerHTML = this.responseText;
                        }
                    } else {
                        document.getElementsByClassName('error-log')[0].innerHTML = "Request is not successful! Please, try again!";
                    }
                };
    
                xhr.onprogress = function(event) {
                    document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
                };
      
                xhr.open('POST', "http://localhost:81/lab2MySqlJs/php/restoration.php", true);

                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
                xhr.send("login="+encodeURIComponent(login));
            } else {
                document.getElementsByClassName('error-log')[0].innerHTML = "Email length is incorrect! Please, try again!";
            }
        } else {
            document.getElementsByClassName('error-log')[0].innerHTML = "Email format is incorrect! Please, try again!";
        }
    }

    passRestor() {

        document.getElementsByClassName('error-log')[0].innerHTML = "";

        let pass = this.sanitize(document.getElementsByClassName('pass-field-recovery')[0].value);
        let passRepeat = this.sanitize(document.getElementsByClassName('pass-field-recovery-repeat')[0].value);

        if((pass.length >= 8 && pass.length <= 40) && (passRepeat.length >= 8 && passRepeat.length <= 40)) { 

            if(pass == passRepeat) {

                const xhr = this.xhr;
        
                xhr.onload = xhr.onerror = function() {
    
                    document.getElementsByClassName('media-progress')[0].style.width = "0px";
    
                    if(this.status == 200) {
                            
                        if(this.response == 1) {
                            location.href = 'php/welcome.php';
                        } else if(this.response == 0) {
                            location.href = 'php/recovery.php';
                        } else {
                            document.getElementsByClassName('error-log')[0].innerHTML = this.responseText;
                        }
                    } else {
                        document.getElementsByClassName('error-log')[0].innerHTML = "Request is not successful! Please, try again!";
                    }
                };
        
                xhr.onprogress = function(event) {
                    document.getElementsByClassName('media-progress')[0].style.width = Math.round((event.loaded * 100) / event.total) + "%";
                };
          
                xhr.open('POST', "http://localhost:81/lab2MySqlJs/php/restoration_pass.php", true);
    
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          
                xhr.send("pass="+encodeURIComponent(pass));
            } else {
                document.getElementsByClassName('error-log')[0].innerHTML = "Passwords do not match! Please, try again!";
            }
        } else {
            document.getElementsByClassName('error-log')[0].innerHTML = "Data length is incorrect! Please, try again!";
        }
    }
}

client = new Client();
