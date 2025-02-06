pipeline {

    agent { label 'deploy' }

    stages {
        stage('Code') {
            steps {
                echo 'Getting the Code on the server'
                git url: 'https://github.com/sahu-sujal/Containerizing-a-Spring-Boot-Application.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t sujaldev2004/piratesbackend:latest PiratesBackend/.'
                sh 'docker build -t sujaldev2004/piratesfrontend:latest piratesfront/.'
            }
        }
        stage('Push') {
            steps {
                echo "Pushing Docker Images"
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                     sh 'docker login -u $USERNAME -p $PASSWORD'
                     sh 'docker push sujaldev2004/piratesbackend:latest'
                     sh 'docker push sujaldev2004/piratesfrontend:latest'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'deploy using docker compose'
                sh 'docker compose build --no-cache -d'
            }
        }
    }
}
