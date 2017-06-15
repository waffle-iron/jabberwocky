#!/bin/bash

echo -n "Enter object name and press [ENTER]: "
read name
echo -n "Enter the changes and press [ENTER]: "
read msg
echo -n "Enter the issue # and press [ENTER]: "
read issue
echo

if [ "$issue" == "" ]; then
	git commit -a -m "[$name] $msg"
else
	git commit -a -m "[$name] $msg (#$issue)"
fi
echo
