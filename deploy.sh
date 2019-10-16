#!/bin/bash

aws s3 sync ./build/ s3://mindthegap-visualization.orphe.us --acl public-read --delete
