# app/main.py

from fastapi import FastAPI, HTTPException
from prometheus_fastapi_instrumentator import Instrumentator
import etcd3
import logging

app = FastAPI()

# Initialize monitoring
Instrumentator().instrument(app).expose(app)
# Initialize the logger
# logging.basicConfig(level=logging.INFO)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


# Connect to etcd instance
etcd = etcd3.client(host="etcd", port=2379)


@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.get("/get-key/foo")
async def get_foo():
    try:
        logger.info("Attempting to retrieve key 'foo' from etcd")
        # Retrieve the value of the key 'foo'
        value, metadata = etcd.get("foo")

        if value is None:
            logger.warning("Key 'foo' not found")
            raise HTTPException(status_code=404, detail="Key 'foo' not found")

        # Decode the value (if it's in bytes)
        logger.info(
            f"Successfully retrieved key 'foo' with value: {value.decode('utf-8')}"
        )
        return {"key": "foo", "value": value.decode("utf-8")}

    except Exception as e:
        logger.error(f"Error retrieving key 'foo': {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve key: {str(e)}")


# get-lldp-from-device/device-id?, use scheduler to run it every 5mins
# get-lldp-from-db/device-id?
