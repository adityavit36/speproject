pipeline {
    agent any
    environment {
        DOCKER_HUB_USERNAME = 'adityavit36'
        CARPRICE_IMAGE_NAME = 'carprice'
        PREDICTOR_IMAGE_NAME = 'predictor-app'
        MODEL_LOADER_IMAGE_NAME = 'model-loader'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'master', 
                url: 'https://github.com/adityavit36/speproject.git'
            }
        }
        // stage('Test') {
        //     steps {
        //         script {
        //             // sh 'pip install flake8'
        //             // sh 'flake8 .'
        //             // sh 'black --check .'
        //             // Run unit tests for the backend
        //             dir('/home/aditya/adityamin/MLOPS/mlops/src') {
        //                 sh 'python3 -m unittest discover tests'
        //             }
        //         }
        //     }
        // }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build Docker images
                    sh 'docker build -t adityavit36/carprice -f /home/aditya/adityamin/MLOPS/mlops/src/react_docker /home/aditya/adityamin/MLOPS/mlops'
                    sh 'docker build -t adityavit36/predictor-app -f /home/aditya/adityamin/MLOPS/mlops/src/predictor-app /home/aditya/adityamin/MLOPS/mlops/src'
                    sh 'docker build -t adityavit36/model-loader -f /home/aditya/adityamin/MLOPS/mlops/src/model_loader_dockerfile /home/aditya/adityamin/MLOPS/mlops/src'
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push adityavit36/carprice:latest'
                        sh 'docker push adityavit36/predictor-app:latest'
                        sh 'docker push adityavit36/model-loader:latest'
                    }
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    dir('/home/aditya/adityamin/MLOPS/mlops/src') {
                        sh '/usr/local/bin/docker-compose up -d'
                    }
                }
            }
        }
    }
}
