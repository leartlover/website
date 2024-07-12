<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "youremail@example.com"; // E-Mail-Adresse des Shop-Betreibers
    $subject = $_POST['betreff'];
    $message = $_POST['nachricht'];
    $headers = "From: " . $_POST['email'];

    mail($to, $subject, $message, $headers);
    echo "Vielen Dank für Ihre Nachricht!";
}
?>
