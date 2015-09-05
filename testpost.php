<?php
require_once('base.php');

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}
$data = json_decode(file_get_contents('php://input'));
$title = $data->{'title'};
$done  = '9';

$obj = new Database();
$obj->query("INSERT INTO attr (title, done) VALUES ('$title','$done')");
$obj->execute();
//$rows = $obj->resultset();