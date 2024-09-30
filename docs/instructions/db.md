# ONVP Database

Use etcd as the database to save network device lldp state


## Test
put the data
```
curl -X POST http://0.0.0.0:2379/v3/kv/put -d '{"key": "Zm9v", "value": "YmFy"}' -vvv
```
get the data
```
curl -X POST http://localhost:2379/v3/kv/range -d '{"key": "Zm9v"}'
```


the key and value needs encoded in base64
echo -n 'testkey' | base64
echo 'dGVzdGtleQ==' | base64 --decode

Test etcd endpoint
```
curl http://localhost:2379/version
```
