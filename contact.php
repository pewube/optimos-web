<?php $mailToSend="pewubeeu@pewube.eu"; if ($_SERVER["REQUEST_METHOD"]==="POST"){ $email=$_POST["email"]; $title=$_POST["title"]; $message=$_POST["message"]; $antiSpam=$_POST["robo"]; $errors=[];$return=[]; if (empty($antiSpam)){ if (!filter_var($email, FILTER_VALIDATE_EMAIL)){ array_push($errors, "email");} if (empty($title)){ array_push($errors, "name");} if (empty($message)){ array_push($errors, "message");} if (count($errors) >0){ $return["errors"]=$errors;} else{ $headers="MIME-Version:1.0" . "\r\n"; $headers .="Content-type:text/html; charset=UTF-8". "\r\n"; $headers .="From:".$email."\r\n"; $headers .="Reply-to:".$email; $message=" <html><head><meta charset=\"utf-8\"></head><body><div><strong>E-mail:</strong></div><div>$email</div><hr><div><strong>Tytuł:</strong></div><div>$title</div><hr><div><strong>Treść:</strong></div><div>$message</div></body></html>"; if (mail($mailToSend, "Wiadomość z optimos.pewube.eu | " . date("d-m-Y"), $message, $headers)){ $return["status"]="ok";} else{ $return["status"]="error";}}} else{ $return["status"]="ok";} header("Content-Type:application/json"); echo json_encode($return);} ?>