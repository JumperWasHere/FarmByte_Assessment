# FarmByte_Assessment
# REST API  User Management

<!-- This is a bare-bones example of a Sinatra application providing a REST
API to a DataMapper-backed model.

The entire application is contained within the `app.rb` file.

`config.ru` is a minimal Rack configuration for unicorn.

`run-tests.sh` runs a simplistic test and generates the API
documentation below.

It uses `run-curl-tests.rb` which runs each command defined in
`commands.yml`. -->
### DB using MongoDb Cloud 

    const uri = process.env.CONNECTION_STRING;
    
example set `CONNECTION_STRING` at `.env` file like:

    CONNECTION_STRING="mongodb+srv://<user>:<Password>@atlascluster.jgifr0r.mongodb.net/?retryWrites=true&w=majority"

Replace `<password>` with the password for the  `<user>` with user.


## Install

    npm install

## Run the app

    npm start

## Default port

    Default port :3000 

# REST API

The REST API to the example app is described below.

## Get list of Users

### Request

`GET /users/`

      http://localhost:3000/users/

### Response

    HTTP/1.1 200 OK
    Date: Fri, 01 Dec 2023 15:05:54 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 561

    {
        "message": "Success get Users",
        "error": false,
        "code": 200,
        "results": {
            "data": [
                {
                    "_id": "656891e6cd2a07512e835e5f",
                    "firstname": "MOHD ATIFF",
                    "lastName": "NAJIUDDIN",
                    "emailAddress": "ariffnaj3@gmail.com",
                    "password": "abcd1234",
                    "homeAddress": "no 1 jln bayan, 70400 seremban, Negeri Sembilan",
                    "roleId": "1",
                    "title": "TUAN",
                    "__v": 0
                }
            ]
        }
    }

## Create a new User

### Request

`POST /users/`

    Content-Type: application/json' Accept:*/*  http://localhost:3000/users

    {
        "firstname":"MOHD MOS",                                             //required
        "lastName":"NAJIUDDIN",                                             //required
        "emailAddress":"mosnaj5@gmail.com",                                 //required
        "password":"abcd1234",                                              //required
        "homeAddress":"no 1 jln bayan, 70400 seremban, Negeri Sembilan",    //Optional
        "roleId":"1",                                                       //Optional
        "title":"TUAN"                                                      //Optional
    }

### Response

    HTTP/1.1 201 Created
    Date: Sat, 02 Dec 2023 02:23:57 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 318

    {
        "message": "Success insert user",
        "error": false,
        "code": 201,
        "results": {
            "data": {
                "firstname": "MOHD MOS",
                "lastName": "NAJIUDDIN",
                "emailAddress": "mosnaj5@gmail.com",
                "password": "abcd1234",
                "homeAddress": "no 1 jln bayan, 70400 seremban, Negeri Sembilan",
                "roleId": "1",
                "title": "TUAN",
                "_id": "656a953d3b74b3e6851da0ea",
                "__v": 0
            }
        }
    }

## Update a User by id

### Request

`PUT /users/:id`

    'Accept: application/json' http://localhost:3000/users/:id

    {
       "firstname":"MOHD AKIF",                                             //required
        "lastName":"NAJIUDDIN",                                             //required
        "emailAddress":"akifffnaj@gmail.com",                               //required
        "password":"abcd1234",                                              //required
        "homeAddress":"no 1 jln bayan, 70400 seremban, Negeri Sembilan",    //Optional
        "roleId":"1",                                                       //Optional
        "title":"TUAN"                                                      //Optional
    }

### Response

    HTTP/1.1 200 OK
    Date: Sat, 02 Dec 2023 02:21:42 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 320

    {
    "message": "Success Updated user",
    "error": false,
    "code": 200,
    "results": {
        "data": {
            "_id": "6569f76839a2d96bfd09ded4",
            "firstname": "MOHD ARIFF",
            "lastName": "NAJIUDDIN",
            "emailAddress": "ariffnaj5@gmail.com",
            "password": "abcd1234",
            "homeAddress": "no 1 jln bayan, 70400 seremban, Negeri Sembilan",
            "roleId": "1",
            "title": "TUAN",
            "__v": 0
        }
    }
}

## Delete a Users by id

### Request

`DELETE /users/:id`

     'Accept: application/json' http://localhost:3000/users/:id

### Response

    HTTP/1.1 200 OK
    Date: Sat, 02 Dec 2023 02:26:40 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 315

    {
        "message": "Success delete User",
        "error": false,
        "code": 200,
        "results": {
            "data": {
                "_id": "656a953d3b74b3e6851da0ea",
                "firstname": "MOHD MOS",
                "lastName": "NAJIUDDIN",
                "emailAddress": "mosnaj5@gmail.com",
                "password": "abcd1234",
                "homeAddress": "no 1 jln bayan, 70400 seremban, Negeri Sembilan",
                "roleId": "1",
                "title": "TUAN",
                "__v": 0
            }
        }
    }

# Terraform Script to Create Server instance
Terraform main.tf URL :https://github.com/JumperWasHere/FarmByte_Assessment/blob/main/terraform/main.tf

## Step 1. Run this command to - changes required by the current configuration

    terraform plan

## Step 2. Run this command to - Create or update infrastructure

    terraform apply         

## Terraform Script desciption    
### AWS Provider

    terraform { 
        required_providers {
            aws = {
              source  = "hashicorp/aws"
              version = "~> 5.0"
            }
        }
    }


### Configure the AWS Provider
  
    provider "aws" {
        region = "ap-southeast-1" 
        access_key = "ACCESS_KEY_USER_IAM"
        secret_key = "SECRET_KEY_USER_IAM"
    }


on `region` key state your region,  `ACCESS_KEY_USER_IAM` and `SECRET_KEY_USER_IAM` replace this with your IAM access_key and secret_key<br />
more details option visit https://registry.terraform.io/providers/hashicorp/aws/latest/docs<br />

### RSA key of size 4096 bits
# generate a private key
  
    resource "tls_private_key" "rsa-4096" {
    algorithm = "RSA"
    rsa_bits  = 4096
    }

`algorithm` - (Required) Name of the algorithm to use when generating the private key. Currently supported values are `RSA`, `ECDSA`, `ED25519`<br />
`rsa_bits`  - (Optional) When the algorithm is RSA, the size of the generated RSA key, in bits (default: `2048`).<br />
For more details option visit https://registry.terraform.io/providers/hashicorp/tls/latest/docs/resources/private_key#required

### Create a variable for the key name

    variable "key_name" {
    description = "Name of the SSH key pair"
    }

### Create a key pair for connecting EC2 via SSH

    resource "aws_key_pair" "key_pair" {
    key_name   = var.key_name
    public_key = tls_private_key.rsa-4096.public_key_openssh
    }

`key_name` -(Optional) The name for the key pair. If neither `key_name` nor `key_name_prefix` is provided, <br />
Terraform will create a unique key name using the prefix `terraform-`<br />
`public_key` - (Required) The public key material.<br />
For more details option visit  https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair<br />

### Save the PEM file locally

    resource "local_file" "private_key"{
    content = tls_private_key.rsa-4096.private_key_pem
    filename = var.key_name
    }


### aws_instance

    resource "aws_instance" "public_instance" {
    ami           = "ami-078c1149d8ad719a7"
    instance_type = "t2.micro"
    key_name = aws_key_pair.key_pair.key_name
        tags = {
        Name = "public_instance"
        }
    }

`ami`- (Required) The AMI to use for the instance, for this example `ami-078c1149d8ad719a7` is ami for ubuntu for `ap-southeast-1` region.<br />
`tags` - (Optional) A mapping of tags to assign to the resource.<br />
`key_name` - (Optional) The key name of the Key Pair to use for the instance; which can be managed using the `aws_key_pair` resource.<br />
`instance_type` - (Required) The type of instance to start. Updates to this field will trigger a stop/start of the EC2 instance.<br />
For more details option visit https://registry.terraform.io/providers/hashicorp/aws/2.36.0/docs/resources/instance<br />


