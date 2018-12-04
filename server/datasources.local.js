// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = {
    pallas: {
      connector: 'mysql',
      hostname: process.env.RDS_HOSTNAME || 'localhost',
      port:     process.env.RDS_PORT     || 3306,
      user:     process.env.RDS_USERNAME || 'root',
      password: process.env.RDS_PASSWORD || 'P$f130',
      database: 'sispallas',
    }
  };