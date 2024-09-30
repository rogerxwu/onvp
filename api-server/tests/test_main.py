# test_main.py

from fastapi.testclient import TestClient
from fastapi_app.main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}


def test_read_item():
    # Test without query parameter
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1, "q": None}

    # Test with query parameter
    response = client.get("/items/1?q=test")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1, "q": "test"}
