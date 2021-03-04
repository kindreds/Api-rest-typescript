"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventType = exports.auth = void 0;
exports.auth = {
    email: {
        param: 'email',
        used: 'Este correo esta siendo usado',
        notUsed: 'Este correo no existe en la DB',
        empty: 'El correo es un campo obligatorio',
        invalid: 'El correo debe tener un formato correcto',
    },
    name: {
        param: 'name',
        empty: 'El nombre es un campo obligatorio',
        invalid: 'El nombre debe tener mas de 3 letras',
    },
    password: {
        param: 'password',
        empty: 'La contraseña es un campo obligatorio',
        invalid: 'La contraseña debe tener al menos una letra, un numero y ser mayor a 8 caracteres',
        notEqual: 'La contraseña invalida',
    },
    password2: {
        param: 'password2',
        empty: 'La confirmacion de contraseña es un campo obligatorio',
        invalid: 'La confirmacion de contraseña debe ser igual a la contraseña ingresada',
    },
};
exports.eventType = {
    title: {
        empty: 'El campo TITLE es obligatorio',
    },
    important: {
        empty: 'El campo IMPORTANT es obligatorio',
        invalid: 'El campo IMPORTANT debe ser de tipo booleano',
    },
    complete: {
        empty: 'El campo COMPLETE es obligatorio',
        invalid: 'El campo COMPLETE debe ser de tipo booleano',
    },
};
