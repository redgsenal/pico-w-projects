import json

# a Python object (dict):
x = '{"name": "John","age": 30,"city": "New York"}'

# convert into JSON:
y = json.loads(x)
print(y)
print(y["name"])