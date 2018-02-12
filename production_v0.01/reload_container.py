import os
import sys


def restart():
    # kill all running containers .. assume that gwiki is only one
    os.system('sudo docker kill $(sudo docker ps -q)')

    # remove container
    os.system('sudo docker rm gwiki')
    # build
    os.system('sudo docker build --tag gwiki-with-moin /tvaisanen/Projects/gwiki-with-moin | tee /tmp/build')
    # docker rmi $(docker images -f “dangling=true” -q)
    # print the password
    os.system('grep Password /tmp/build')

    # run the container
    os.system('sudo docker run -p 8443:443 --name gwiki gwiki-with-moin')

if __name__ == '__main__':
    while True:
        try:
            restart()
        except KeyboardInterrupt as ki:
            restart = input("restart? ")
            if restart == 'y':
                restart()
            else:
                sys.exc_info()
