var ReefClient = require('reef-service').ReefService;
var SqsBrokerFacade = require('reef-service').SqsBrokerFacade;
var AWS = require('aws-sdk');

AWS.config.update({
  region: 'sa-east-1',
  accessKeyId: 'AKIAIZ4ONXIKT5EUBQDA',
  secretAccessKey: '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'
});

var brokerFacade = new SqsBrokerFacade({
  sqs: new AWS.SQS(),
  serviceDomain: 'sabre-gateway',
  serviceLane: 'shared',
  clientDomain: 'content-api',
  clientLane: 'instance001'
});

var sabreService = new ReefClient(brokerFacade);

sabreService.addResolver('flight-availability', (params) => {

  return new Promise((resolve, reject) => {

    console.log('flight-availability request');

    setTimeout(function () {
      console.log('timeout done');
      resolve([{ name: 'flight1' }, { name: 'flight2' }]);
    }, 2000);

  });

});

sabreService
  .setup()
  .then(function () {
    console.log('starting up service');
    return sabreService.start();
  })
  .then(function () {
    console.log('listening');
  })
  .catch(function (err) {
    console.log('error on test pipeline');
    console.log(err.toString());
    process.exit(1);
  });
