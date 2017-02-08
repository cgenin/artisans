#!/usr/bin/env bash

export LOG=logs/out.log
nohup java -server -jar server-1.0-SNAPSHOT-fat.jar > $LOG 2>&1 &
echo $! > RUNNING_PID

