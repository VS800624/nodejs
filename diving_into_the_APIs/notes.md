# difference between js object vs json:

Here’s a clear and easy explanation of the difference between JavaScript Object and JSON (JavaScript Object Notation):

1. Definition

JavaScript Object: A real data structure used in JavaScript to store key–value pairs.

JSON : A text-based data format used to represent structured data — mainly for data exchange between a client and server.

2. Syntax Difference

JavaScript Object Example:
const person = {
  name: "Vishal",
  age: 22,
  isStudent: true
};

JSON Example:
{
  "name": "Vishal",
  "age": 22,
  "isStudent": true
}

Notice:

In JSON, keys must be in double quotes " ".
In JS Object, keys can be without quotes.
JSON can only contain data — no functions or methods.

# difference between put and patch:

In RESTful API design, both PUT and PATCH are HTTP methods used to update resources, but they differ in their approach to modifying data: 
PUT Method: 

• Purpose: PUT is used to replace an entire resource or create a new resource if one does not exist at the specified URI. 
• Data Handling: The request body for a PUT request must contain the complete, updated representation of the resource. Any fields not included in the request body will be overwritten with null or default values on the server. [1]  
• Idempotency: PUT is an idempotent method, meaning that making the same PUT request multiple times will have the same effect as making it once. The resource will consistently reflect the state provided in the request body. 
• Use Cases: Ideal for scenarios where a resource needs to be fully replaced or when creating a new resource at a specific, known URI. 

PATCH Method: 

• Purpose: PATCH is used to apply partial modifications to an existing resource. It updates only the specified fields without affecting or modifying the remaining ones. 
• Data Handling: The request body for a PATCH request contains only the fields or data that need to be updated. This makes it more efficient for small, incremental changes. 
• Idempotency: PATCH is generally not considered idempotent, as applying the same PATCH request multiple times might lead to different results depending on the resource's current state. For example, a PATCH request to increment a counter would have a different effect each time it's applied. 
• Use Cases: Suitable for situations where only a few specific fields of a resource need to be modified, such as updating a user's email address or changing the status of an order. [2]  

Summary of Key Differences: 

| Feature           | PUT                                   | PATCH  
| ---               | ---                                   | 
| Purpose           | Replaces or creates entire resource   | Applies partial modifications  
| Data Handling     | Requires full resource representation | Requires only changed fields (delta)  
| Idempotency       | Idempotent                            | Not inherently idempotent  
| Efficiency        | Less efficient for partial updates    | More efficient for partial updates  
| Resource Creation | Can create a new resource             | Typically used for existing resources  

AI responses may include mistakes.

[1] https://www.geeksforgeeks.org/java/what-is-the-difference-between-put-post-and-patch-in-restful-api/
[2] https://success.outsystems.com/documentation/11/integration_with_external_systems/rest/expose_rest_apis/patch_method_on_exposed_rest_services/

