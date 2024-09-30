import etcd3

etcd = etcd3.client(host="127.0.0.1", port=2379)

value, metadata = etcd.get("foo")

print(value, metadata)
print(value.decode("utf-8"))  # expect to see 'bar'
