#!/bin/bash


sigint_handler() {
    echo "Exiting..."
    sleep 1
    exit
}


run() {
        if [[ ! -d target ]]; then
                echo "No 'target' directory found. Please compile first with the -c flag"
        elif [[ ! -f target/TaskerServer-1.0-SNAPSHOT.jar ]]; then
                echo "No JAR file found in the 'target' directory. Please compile first with the -c flag"
        else
                cd target
		echo
		echo
		echo Executing server...
		echo
                java -jar "TaskerServer-1.0-SNAPSHOT.jar"
        fi
}

# Add compilation commands if it there is the compilation flag
compileCommand=""
if [[ "$*" == *-c* ]]; then
        compileCommand="echo Compiling server... && echo && mvn clean package"
else
        compileCommand="echo Skiping compilation..."
fi


# Main Commands to be executed on the new shell
sourceCommand="export PATH='$HOME/.sdkman/candidates/java/current/bin:$HOME/.sdkman/candidates/maven/current/bin:$PATH'"
runCommand="$(declare -f run); run"
trapCommand="$(declare -f sigint_handler); trap sigint_handler SIGINT"

# Execute the commands in a new gnome-terminal window
gnome-terminal -- sh -c "bash -c '${trapCommand}; ${sourceCommand}; ${compileCommand}; ${runCommand}; exec bash'"
