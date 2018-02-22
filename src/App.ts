import * as express from 'express'

var url = require('url')
var kafka = require('kafka-node');

const HOST_ZOOKEEPER = '192.168.99.100:2181';

class App {
  public express: any

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    var HighLevelProducer = kafka.HighLevelProducer;
    var KeyedMessage = kafka.KeyedMessage;

    const partitionerTypes = kafka.HighLevelProducer.PARTITIONER_TYPES;
    const partitionerType = partitionerTypes.keyed;

    var Client = kafka.Client;
    const clientForSinglePartitionTopic = new Client(HOST_ZOOKEEPER);
    const clientForPartitionedTopic = new Client(HOST_ZOOKEEPER);

    const producerForPartitionedTopic = new HighLevelProducer(clientForPartitionedTopic, {partitionerType: 2});
    const producerForSinglePartitionTopic = new HighLevelProducer(clientForSinglePartitionTopic);

  
    var partitionedTopic = 'users';
    var topic = 'messages';
    let i = 0;
    let k = 0;

    router.get('/users', (req, res) => {
      console.log('about to send message');
      
      producerForPartitionedTopic.send([
        { topic: partitionedTopic, messages: [`{"User Name": Random Name "${i++}"}'`], partition: (i % 2) }
      ], function (err: any, result: any) {
        console.log(err)
        res.send(result)
      });
    })

    router.get('/messages', (req, res) => {
      console.log('about to send message');
      
      producerForSinglePartitionTopic.send([
        { topic: topic, messages: [`{"Message": "Message number ${k++}"}'`] }
      ], function (err: any, result: any) {
        console.log(err)
        res.send(result)
      });
    })

    this.express.use('/', router)
  }
}

export default new App().express