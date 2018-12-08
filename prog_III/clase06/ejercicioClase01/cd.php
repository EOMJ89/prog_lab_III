<?php
class cd {
    public $titel;
    public $interpret;
    public $jahr;
    public $id;

    public function Mostrar() {
        return "{$this->id} - {$this->titel} - {$this->interpret} - {$this->jahr}";
    }
}
?>