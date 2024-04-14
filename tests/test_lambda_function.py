import json
from unittest.mock import MagicMock
from lambda_function import lambda_handler

def test_lambda_handler():
    # Mocking DynamoDB table
    mock_table = MagicMock()
    mock_table.get_item.return_value = {'Item': {'record_count': 5}}
    mock_table.put_item.return_value = {}

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
    assert response == "Records added successfully!"
    mock_table.get_item.assert_called_once_with(Key={'record_id': '0'})
    mock_table.put_item.assert_called_once_with(Item={'record_id': '0', 'record_count': 6})

