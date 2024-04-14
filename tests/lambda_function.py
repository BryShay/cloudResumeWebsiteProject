import json
import boto3

# Initialize DynamoDB resource and table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('website_vistors_table')

# Handler function for the Lambda function
def lambda_handler(event, context):
    # Debugging: Print a message to indicate that the function has started
    print("Debugging: Starting lambda handler")

    # Retrieve item from DynamoDB table
    response = table.get_item(Key={'record_id': '0'})
    record_count = response['Item']['record_count']

    # Debugging: Print the current record count
    print("Debugging: Current record count:", record_count)

    # Increment record count
    record_count += 1

    # Debugging: Print the incremented record count
    print("Debugging: Incremented record count:", record_count)

    # Update item in DynamoDB table
    table.put_item(Item={'record_id': '0', 'record_count': record_count})

    # Debugging: Print a message to indicate that the function has finished
    print("Debugging: lambda handler finished")

    # Return success message
    return "Records added successfully!"





