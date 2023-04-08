import pytest
from holdmytableapi.helpers import camel_case_to_snake_case, snake_case_to_camel_case_single, snake_case_to_camel_case_many

@pytest.fixture
def example_request():
    """sample request.data"""

    return {
      "userId": 1,
      "firstName": "Justin",
      "lastName": "Ferwerda",
    }

@pytest.fixture
def example_response_object():
    """single object to be returned to FE"""

    return {
    "user_id": 1,
    "first_name": "Justin",
    "last_name": "Ferwerda",
    }

@pytest.fixture
def example_response_list():
    """list response to be returned to FE"""

    return [
      {
        "user_id": 1,
        "first_name": "Justin",
        "last_name": "Ferwerda",
      },
      {
        "user_id": 2,
        "first_name": "Bobby",
        "last_name": "Rush",
      }
    ]

def test_camel_case_to_snake_case(example_request):
    """changes camelCase request keys to snake case"""

    assert camel_case_to_snake_case(example_request) == {
        "user_id": 1,
        "first_name": "Justin",
        "last_name": "Ferwerda"
      }

def test_snake_case_to_camel_case_single(example_response_object):
    """tests snake case to camel case single object to be returned to FE"""

    assert snake_case_to_camel_case_single(example_response_object) == {
        "userId": 1,
        "firstName": "Justin",
        "lastName": "Ferwerda", 
      }

def test_snake_case_to_camel_case_many(example_response_list):
    """tests snake case to camel case for response list to FE"""
    assert snake_case_to_camel_case_many(example_response_list) == [
     {
        "userId": 1,
        "firstName": "Justin",
        "lastName": "Ferwerda",
      },
      {
        "userId": 2,
        "firstName": "Bobby",
        "lastName": "Rush",
      }
    ]
    