'use strict';

module.exports = function(Venda_produto) {

  Venda_produto.teste = function(filter, cb) {
      Venda_produto.find(filter, function(err, arr) {
        const g = arr.groupBy('desc_prod', ['qtd_it', 'total_bruto_it']);
        var data = {
          top10_qtd :   g.top('qtd_it', 10),
          top10_bruto : g.top('total_bruto_it', 10),
          
          bottom10_qtd :   g.bottom('qtd_it', 10),
          bottom10_bruto : g.bottom('total_bruto_it', 10),
        }
        cb(null, data);
      });
  }

  Venda_produto.remoteMethod(
      'teste', {
        http: { path: '/teste', verb: 'get' },
        accepts: {arg: 'filter', type: 'object' },
        returns: { type: 'object', root: true }
      }
  );
};
