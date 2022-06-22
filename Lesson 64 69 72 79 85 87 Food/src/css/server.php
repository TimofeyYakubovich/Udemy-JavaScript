<?php
// php не умеет работать с форматом данных JSON
// $_POST = json_decode(file_get_contents("php://input"), true);// всё что приходит с клиента будет докодироваться из джейсона
echo var_dump($_POST);