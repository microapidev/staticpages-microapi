# File Manager(open to edit)

A dockerized micro-service for adding, updating, retrieving and deleting files

### Quick Start

### Testing

### Files

#### Create a File

* Method - POST

* URL - http://localhost:5555/v1/files/

* Sample Request

```
{
    "file": "mark.png"
}
```

* Sample Response

```
{
    "status": true,
    "message": "File Uploaded",
    "data": null
}
```

#### Get all Files

* Method - GET

* URL - http://localhost:5555/v1/files/

* Sample Response

```
{
    "status": true,
    "message": "Files Found",
    "data": [
        {
            "id": "5e6288bc8c7fec6308a1d499",
            "file": "s3://falcon-bucket/files/mark.png"
        },
        {
            "id": "5e6288bc8c7fec6308a1d498",
            "file": "s3://falcon-bucket/files/essien.gif"
        },
        {
            "id": "5e6288bc8c7fec6308a1d497",
            "file": "s3://falcon-bucket/files/seyi.jpg"
        },
        {
            "id": "5e6288bc8c7fec6308a1d496",
            "file": "s3://falcon-bucket/files/john.gif"
        }
    ]
}
```

#### Get a File

* Method - GET

* URL - http://localhost:5555/v1/files/:fileId

* Sample Response

```
{
    "status": true,
    "message": "File Found",
    "data": {
        "id": "5e6288bc8c7fec6308a1d499",
        "file": "s3://falcon-bucket/files/mark.png"
    }
}
```

#### Update a File

* Method - PUT

* URL - http://localhost:5555/v1/files/:fileId

* HEADER

* Sample Request

```
{
    "id": "5e6288bc8c7fec6308a1d499",
    "file": "s3://falcon-bucket/files/mark.png"
}
```

* Sample Response

```
{
    "status": true,
    "message": "File Updated",
    "data": null
}
```

#### Delete a File

* Method - DELETE

* URL - http://localhost:5555/v1/files/:fileId

* HEADER

* Sample Request

```
{
    "id": "5e6288bc8c7fec6308a1d499"
}
```

* Sample Response

```
{
    "status": true,
    "message": "File Deleted",
    "data": null
}
```

#### Search a File

#### Get all Files - Paging

#### File structure
```
+- config/
+----- config.env
+----- db.js
+- controllers/
+----- files.js
+- middleware/
+----- error.js
+- models/
+----- File.js
+- node_modules/
+- routes/
+----- file.js
+- utils/
+----- errorResponse.js
+- .gitignore/
+- LICENSE/
+- index.js/
+- README.md/
```
