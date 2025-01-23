module.exports.handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        nomeCompleto: '',
        username: '',
        email: '',
        imagem: '',
        telefone: '',
        tipo: '',
        password: ''
    };

    // erro de duplicação
    if (err.code === 11000) {
        errors.nomeCompleto = 'Esse usuario já foi registrado';
        errors.username = 'Esse usuario já foi registrado';
        return errors;
    }

    // validação de erros
    if(err.message.includes('Users validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    //username Incorreto
    if(err.message === 'username Incorreto'){
        errors.username = 'Usuario não registrado';
    }

    //Password Incorreta
    if(err.message === 'password Incorreta'){
        errors.password = 'Password Errada';
    }

    return errors;
}