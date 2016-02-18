import dotenv from 'dotenv';
import { ReefService, SqsBrokerFacade } from 'reef-service';

import echoDataResolver from './resolvers/echoDataResolver';

async function start() {

  let brokerFacade = new SqsBrokerFacade({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
  dotenv.load();
  start();
} catch (err) {
  console.log(err);
}
