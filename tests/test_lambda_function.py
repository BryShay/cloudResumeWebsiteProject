import json
from unittest.mock import MagicMock
from .lambda_function import lambda_handler

def test_lambda_handler():
    # Mocking DynamoDB table
    mock_table = MagicMock()
    mock_table.put_item.return_value = {}  # Mocking put_item method

    # Mocking DynamoDB resource
    mock_dynamodb = MagicMock()
    mock_dynamodb.Table.return_value = mock_table

    # Injecting mocked DynamoDB resource
    lambda_handler.table = mock_table
    lambda_handler.dynamodb = mock_dynamodb

    # Mocking event and context
    event = {}
    context = None

    # Running lambda_handler
    response = lambda_handler(event, context)

    # Assertions
    assert response == "Records added successfully!"  # Check if the response is as expected

    # Check if put_item was called with the correct arguments
    mock_table.put_item.assert_called_once()

    # Add more assertions as needed to verify the behavior of the lambda handler
