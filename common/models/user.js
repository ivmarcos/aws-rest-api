'use strict';

var LoopBackContext = require('loopback-context');

module.exports = function(User) {

    function userById() {
        return new Promise((resolve, reject) => {
            var ctx = LoopBackContext.getCurrentContext();
            var accessToken = ctx && ctx.get('accessToken');
            User.findById(accessToken.userId, {
                "where": true, "include": "lojas"
            }, function(err, user) {
                if (err) {
                    reject(err);
                } else if (!user) {
                    reject(new Error('Token inválido.'));
                }

                resolve(user.toJSON());
            })
        });
    }

    User.configuracao = async function() {
        const user = await userById();
        if (user.lojas.length === 0) {
            throw new Error('Usuário não possui nenhuma loja.');
        }
        return user;
    };

    User.remoteMethod('configuracao', {
        returns: { type: 'object', root: true }
    });
};
