# Serverless - Amazon Web service - NodeJs micro services

This purpose of this project is to show how Node.js micro services works with Amazon webservice. 
I will update this repository with a tutorial that shows 
how you are able to easily create a micro-service and setup that in Lambda and working with other services in AWS. 

#### TODO: I am going to create a very simple Angular2-cli app to just send a request to the API which I have created below, so please go to client folder and follow instruction. 

## Development Requirement
 
before any steps, make sure you are in `serverless` folder, then :
 
  1. install serverless `npm install serverless -g` 
  2. install dependencies `npm install` or alternatively use Yarn `yarn install`
  3. you need to setup AWS credentials as easy as `sls config credentials --provider aws --key [you-key] --secrect [you-secrect]`. The goal is to 
  setup key and secret key if you are happy with other ways, do it then. 
  4. `serverless invoke local -f [function name]` sls is short command of serverless you may want to use it.
  5. send your variables with event.json, for more information read [serverless documentation](https://serverless.com/framework/docs/). 
  
## Deployment 

In order to deploy the function simply run

````commandline
serverless deploy
```` 

if all goes ok then you should see API endpoint as well as other information. 

## Usage
In `serverless.yml` a function which is `comment` will have a GET endpoint to receive data from a third-party. Then it will create
all information to a file with `uuid` name and save it in /tmp/ folder in Lambda. Then, that file will be uploaded to S3 under
`brandlab-inbox` bucket which has a subfolder `comments`. 

As soon as, any file is created in `comments\*.json`, commentParse which is another Lambda function will be triggered and 
that particular file will be parsed and will be sent to CloudWatch with the following Metrics. 

### Sample Return JSON 

sample of return message after calling GET with an id=71

````json
{
    "message":"Successfully uploaded data to S3",
    "body":{  
       "postId":15,
       "id":71,
       "name":"vel pariatur perferendis vero ab aut voluptates labore",
       "email":"Lavinia@lafayette.me",
       "body":"mollitia magnam etnipsum consequatur est expeditanaut rem ut ex doloremque est vitae estncumque velit recusandae numquam libero dolor fuga fugit a"
    }
}
````

## Logs

To verify that our event was forwarded to our log-function run

````commandline
serverless logs -f comments
````

The expected result should be similar to:
````commandline
START RequestId: 6155317e-f028-11e6-b22c-51eaabd15d33 Version: $LATEST
2017-02-11 15:04:51.563 (+08:00)        6155317e-f028-11e6-b22c-51eaabd15d33    Successfully uploaded data to S3
2017-02-11 15:04:51.579 (+08:00)        6155317e-f028-11e6-b22c-51eaabd15d33    Temp File Delete
END RequestId: 6155317e-f028-11e6-b22c-51eaabd15d33
REPORT RequestId: 6155317e-f028-11e6-b22c-51eaabd15d33  Duration: 660.13 ms     Billed Duration: 700 ms         Memory Size: 1024 MB    Max Memory Used: 35 MB  
````
you can see which file name has been uploaded to S3 and then that file been deleted from /tmp/.
