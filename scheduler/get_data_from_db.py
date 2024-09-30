import json
import etcd3


# Initialize etcd client
etcd_client = etcd3.client(host="0.0.0.0", port=2379)

# Example inventory for which data was stored
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


def list_timestamps_from_etcd(hostname):
    """Retrieve all timestamps for a given hostname from etcd."""

    key_prefix = f"state/"
    timestamps = set()  # Using a set to avoid duplicates

    # Retrieve all keys matching the prefix
    print(f"Fetching keys with prefix: {key_prefix}")
    for value, metadata in etcd_client.get_prefix(key_prefix):
        key = metadata.key.decode("utf-8")
        # Extract timestamp from the key structure: state/{timestamp}/{hostname}/lldp_neighbor
        parts = key.split("/")
        if len(parts) == 4 and parts[1].isdigit() and parts[2] == hostname:
            timestamps.add(parts[1])  # Store the timestamp part

    return sorted(timestamps)  # Sort timestamps for better readability


def get_data_from_etcd(hostname, timestamp):
    """Retrieve LLDP neighbor data for a given hostname and timestamp from etcd."""

    key = f"state/{timestamp}/{hostname}/lldp_neighbor"

    # Fetch the value from etcd
    try:
        value, metadata = etcd_client.get(key)
        return json.loads(value.decode("utf-8")) if value else None
    except Exception as e:
        print(f"Error fetching data for {hostname} at timestamp {timestamp}: {e}")
        return None


def check_lease_time(key):
    """Check the lease time for a given key in etcd."""

    try:
        # Fetch the key information
        value, metadata = etcd_client.get(key)
        if metadata:
            lease_id = metadata.lease_id
            # print(lease_id)
            if lease_id:
                lease_info = etcd_client.get_lease_info(lease_id)
                # print(lease_info)
                return [
                    lease_info.grantedTTL,
                    lease_info.TTL,
                ]  # Return the TTL of the lease in seconds
            else:
                return None  # No lease associated with this key
    except Exception as e:
        print(f"Error checking lease time for key {key}: {e}")
        return None


def main():
    """Main function to list timestamps and retrieve data from etcd."""

    # Loop through inventory and fetch timestamps
    for hostname in inventory:
        timestamps = list_timestamps_from_etcd(hostname)

        if timestamps:
            print(f"Timestamps for {hostname}: {timestamps}")
            # Let the user choose a timestamp
            selected_timestamp = input(
                f"Select a timestamp for {hostname} (or press Enter to skip): "
            )

            if selected_timestamp in timestamps:
                lldp_neighbors = get_data_from_etcd(hostname, selected_timestamp)
                if lldp_neighbors:
                    print(f"LLDP neighbors for {hostname} at {selected_timestamp}:")
                    print(json.dumps(lldp_neighbors, indent=4))

                    # Check the lease time for the selected key
                    lease_key = f"state/{selected_timestamp}/{hostname}/lldp_neighbor"
                    granted_ttl, ttl = check_lease_time(lease_key)
                    if granted_ttl is not None:
                        print(
                            f"Lease time for {lease_key}: {ttl}/{granted_ttl} seconds"
                        )
                    else:
                        print(f"No lease found for {lease_key}.")
                else:
                    print(f"No data found for {hostname} at {selected_timestamp}")
            else:
                print("Invalid timestamp selected. Skipping.")
        else:
            print(f"No timestamps found for {hostname}")


if __name__ == "__main__":
    main()
