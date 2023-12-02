terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "ap-southeast-1"
   access_key = "access_key"
  secret_key = "secret_key"
}

# RSA key of size 4096 bits
//generate private key
resource "tls_private_key" "rsa-4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

variable "key_name" {
    description = "Name of the SSH key pair"
}
//create key pair for connecting EC2 via SSH
resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa-4096.public_key_openssh
}
//Save PEM file locally
resource "local_file" "private_key"{
    content = tls_private_key.rsa-4096.private_key_pem
    filename = var.key_name
}

resource "aws_instance" "public_instance" {
  ami           = "ami-078c1149d8ad719a7"
  instance_type = "t2.micro"
key_name = aws_key_pair.key_pair.key_name
  tags = {
    Name = "public_instance"
  }
}