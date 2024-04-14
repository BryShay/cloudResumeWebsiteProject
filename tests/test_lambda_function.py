import json
from unittest.mock import MagicMock, patch
from .lambda_function import lambda_handler

def test_lambda_handler_success():
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

def test_lambda_handler_dynamodb_failure():
    # Mocking DynamoDB table
    mock_table = MagicMock()
    mock_table.get_item.side_effect = Exception("DynamoDB error")
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
    assert response == "Failed to add records: DynamoDB error"
    mock_table.get_item.assert_called_once_with(Key={'record_id': '0'})
    mock_table.put_item.assert_not_called()

def test_lambda_handler_invalid_event():
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
    event = None
    context = None

    # Running lambda_handler
    response = lambda_handler(event, context)

    # Assertions
    assert response == "Failed to add records: Invalid event data"
    mock_table.get_item.assert_not_called()
    mock_table.put_item.assert_not_called()

