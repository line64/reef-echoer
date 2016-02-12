import { ReefService, SqsBrokerFacade } from 'reef-service';

import echoDataResolver from './resolvers/echoDataResolver';

async function start() {

  let brokerFacade = new SqsBrokerFacade({
    region: 'sa-east-1',
    accessKeyId: 'AKIAIZ4ONXIKT5EUBQDA',
    secretAccessKey: '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',
    serviceDomain: 'service-mock',
    serviceLane: 'shared',
    clientDomain: 'stress-tester',
    clientLane: 'instance001'
  });

  let service = new ReefService(brokerFacade);
  service.addResolver('echo-data', echoDataResolver);

  console.log('setting up service');
  await service.setup();

  console.log('starting up service');
  await service.start();

  console.log('listening');

}

try {
  start();
} catch (err) {
  console.log(err);
}
