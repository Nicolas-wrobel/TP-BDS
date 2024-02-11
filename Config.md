# mongodb-sharding-docker

This repo contains a docker-compose to play with MongoDB Sharding. It has been created following the MongoDB official documentation guide to [convert a replica set to a replicated shard cluster](https://docs.mongodb.com/manual/tutorial/convert-replica-set-to-replicated-shard-cluster/).

The docker-compose allows you to setup and run a replicated shard cluster composed by 2 or 3 replicated shards (each replica set composed by 3 data-bearing members) and a replicated config server (composed by 3 config servers). Finally a mongos container as entry point of our shard cluster.

## Setup first Replica Set

Run the following docker-compose command to start the 3 data bearing nodes of the rs-sh1 replica set.

```sh
docker-compose up -d rs-sh1-01 rs-sh1-02 rs-sh1-03
```

Now, we have to initialize the replica set rs-sh1.

### Attach shell to rs-sh1-01

```
docker exec -it rs-sh1-01 /bin/bash
```

### Log in mongo shell

```sh
mongo --port 27011
```

### Initialize replica set

Run the following command to initialize the replica set

```javascript
rs.initiate(
  {
    _id : 'rs-sh1',
    members: [
      { _id : 0, host : "rs-sh1-01:27011" },
      { _id : 1, host : "rs-sh1-02:27012" },
      { _id : 2, host : "rs-sh1-03:27013" }
    ]
  }
)
```

## Setup config Replica Set

Run the following docker-compose command to start the 3 config servers of the rs-config replica set.

```sh
docker-compose up -d rs-config-01 rs-config-02 rs-config-03
```

Now, we have to initialize the replica set rs-config.

### Attach shell to rs-config-01

```sh
docker exec -it rs-config-01 /bin/bash
```

### Log in mongo shell

```sh
mongo --port 27017
```

### Initialize replica set

Run the following command to initialize the replica set

```javascript
rs.initiate(
  {
    _id : 'rs-config',
    configsvr: true,
    members: [
      { _id : 0, host : "rs-config-01:27017" },
      { _id : 1, host : "rs-config-02:27018" },
      { _id : 2, host : "rs-config-03:27019" }
    ]
  }
)
```

## Run mongos

Run the following docker-compose command to start the container running the mongos process.

```sh
docker-compose up -d rs-mongos
```

### Attach shell to rs-mongos

```sh
docker exec -it rs-mongos /bin/bash
```

### Log in mongo shell

```sh
mongo --port 27020
```

## Add rs-sh1 to the shard cluster

Inside the mongos shell run the following command

```javascript
use admin
sh.addShard("rs-sh1/rs-sh1-01:27011,rs-sh1-02:27012,rs-sh1-03:27013");
```