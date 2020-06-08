# File Manager(open to edit)

a dockerized micro-service for adding, updating, retrieving and deleting files

### Quick Start

### Testing

### Files

#### Create a File

* Method - POST

* URL - http://localhost:3000/api/v1/files/file/upload

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
    "message": "File Uploaded"
}
```

#### Get all Files

* Method - GET

* URL - http://localhost:3000/api/v1/files/file/uploads

* Sample Response

```
{
    "status": true,
    "message": "Files Found",
    "files": [
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
        },
        {
            "id": "5e6288bc8c7fec6308a1d495",
            "file": "s3://falcon-bucket/files/doe.jpeg"
        }
    ]
}
```

#### Get a File

* Method - GET

* URL - http://localhost:3000/api/v1/files/file/uploads/:id

* Sample Response

```
{
    "status": true,
    "message": "File Found",
    "file": {
        "id": "5e6288bc8c7fec6308a1d499",
        "file": "s3://falcon-bucket/files/mark.png"
    }
}
```

#### Update a File

* Method - PUT

* URL - http://localhost:3000/api/v1/files/file/:id/update

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
    "message": "File Updated"
}
```

#### Delete a File

* Method - DELETE

* URL - http://localhost:3000/api/v1/files/file/:id/delete

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
    "message": "File Deleted"
}
```

#### Search a File

#### Get all Files - Paging

#### File structure
+- falconmicroservices/ - name of the project folder.
+--- config/ - main folder of the API.
+--------- config.env - file used for common settings or variables.
+--------- db.js - file used for db connectivity.
+--- controllers/ - main folder of the API.
+--------- files.js - file that houses getFiles(), getFile(), createFile(), updateFile(), deleteFile().
+--- middleware/ - main folder of the API.
+--------- async.js - handles asyncHandler().
+--------- error.js - handles errorHandler().
+--- models/ - main folder of the API.
+--------- File.js - FileSchema.
+--- node_modules/ - main folder of the API.
+--- routes/ - main folder of the API.
+--------- file.js - router.
+--- utils/ - main folder of the API.
+--------- errorResponse.js - ErrorResponse class.
+--- .gitignore/ - main folder of the API.
+--- LICENSE/ - main folder of the API.
+--- index.js/ - main folder of the API.
+--- README.md/ - main folder of the API.