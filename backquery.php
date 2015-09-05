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

$obj = new Database();
$obj->query('SELECT title, done FROM attr');
$obj->execute();
$rows = $obj->resultset();
//var_dump($rows);
echo json_encode(new ArrayValue($rows), JSON_PRETTY_PRINT);





