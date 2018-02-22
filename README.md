**Simple Node/Typescript API that acts as a Kafka producer proxy.**

It exposes two endpoints:
- Users: writes a message with a sequence counter to the 'users' partitioned topic (2 partitions)
- Message: writes a message with a sequence counter to the single partitioned 'messages' topic

To configure a topic in order to have 2 partitions, create your topics (from inside your kafka broker) as described in the following guide:

http://www.allprogrammingtutorials.com/tutorials/adding-partitions-to-topic-in-apache-kafka.

    kafka-topics.sh --create --zookeeper zookeeper:2181 --topic users --replication-factor 1 --partitions 2
    kafka-topics.sh --create --zookeeper zookeeper:2181 --topic messages --replication-factor 1 --partitions 2

This server runs against the following docker environment:

https://github.com/miguelpais/kafka

If you want to also consume these messages, look at the examples at:

https://github.com/miguelpais/kafka-consumers
