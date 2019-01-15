'use strict';

module.exports = function(Venda_produto) {

    Venda_produto.teste = function(filter, cb) {
        console.log(filter);

        Venda_produto.find(filter, function(err, dog) { 
          let gg = dog.groupBy('desc_prod', ['qtd_it', 'total_bruto_it']).top('qtd_it', 10);

          cb(null, gg);
        });
    }


    Venda_produto.remoteMethod('teste', {
        accepts: {arg: 'filter', type: 'object'},
        returns: { type: 'object', root: true }
    });
};
