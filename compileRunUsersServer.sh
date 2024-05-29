#!/bin/bash


sigint_handler() {
    echo "Exiting..."
    sleep 1
    exit
}


# Main Commands to be executed on the new shell

compileCommand="cd tasker-server; mvn clean package"
serverCommand="cd target; java -jar TaskerServer-1.0-SNAPSHOT.jar"

# KILL Shell on SIG_INT
trapCommand="$(declare -f sigint_handler); trap sigint_handler SIGINT"


gnome-terminal -- sh -c "bash -c '${trapCommand}; ${compileCommand}; ${serverCommand}; exec bash'"


