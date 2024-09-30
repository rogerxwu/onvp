# /usr/bin/python

# pull device name and lldp data from netbox
import json
import etcd3
import time


# Initialize etcd client
etcd_client = etcd3.client(host="0.0.0.0", port=2379)
lease = etcd_client.lease(1200)  # ttl 24hrs

# Get the current timestamp
current_timestamp = int(time.time())

inventory = [
    "leaf-1",
    "leaf-2",
    "leaf-3",
    "leaf-4",
    "spine-1",
    "spine-2",
    "border-router-1",
    "border-router-2",
    "provider-edge-1",
    "provider-edge-2",
]


def get_device_lldp_data(hostname):
    """Read LLDP neighbor data from a local file."""
    with open("lldp_neighbors.json", "r") as file:
        return json.load(file)[hostname]


def save_to_etcd(hostname, lldp_neighbors, ts):
    """Save LLDP neighbor data to etcd."""
    # Construct a key for etcd
    for neighbor in lldp_neighbors:
        key = f"state/{ts}/{hostname}/lldp_neighbor"
        value = lldp_neighbors[neighbor]
        print(hostname)
        print(key)
        print(value)
        # Save the neighbor data to etcd as a JSON string
        etcd_client.put(key, json.dumps(value), lease=lease)


def main():
    """Main function to read data and save to etcd."""
    # Read LLDP neighbor data from the local file
    for hostname in inventory:
        lldp_data = get_device_lldp_data(hostname)
        save_to_etcd(hostname=hostname, lldp_neighbors=lldp_data, ts=current_timestamp)

    print("LLDP neighbor data saved to etcd successfully.")


if __name__ == "__main__":
    main()
