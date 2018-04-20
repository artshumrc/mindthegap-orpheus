#!/bin/bash

aws s3 sync ./build/ s3://mindthegap.orphe.us --acl public-read --delete
