<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Lignes de langue pour la validation
    |--------------------------------------------------------------------------
    |
    | Les lignes de langue suivantes contiennent les messages d'erreur par
    | défaut utilisés par la classe validatrice.
    |
    */

    'confirmed' => 'Le champ de confirmation :attribute ne correspond pas.',
    'email' => 'Le champ :attribute doit être une adresse email valide.',
    'required' => 'Le champ :attribute est obligatoire.',
    'unique' => 'La valeur du champ :attribute est déjà utilisée.',

    'min' => [
        'string' => 'Le champ :attribute doit contenir au moins :min caractères.',
    ],

    'attributes' => [
        'email' => 'adresse email',
        'password' => 'mot de passe',
        'name' => 'nom',
    ],
];
