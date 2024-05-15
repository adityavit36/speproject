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
        stage('Test') {
            steps {
                script {
                    // sh 'pip install flake8'
                    // sh 'flake8 .'
                    // sh 'black --check .'
                    // Run unit tests for the backend
                    dir('/home/aditya/adityamin/MLOPS/mlops/src') {
                        sh 'python3 -m unittest discover tests'
                    }
                }
            }
        }
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build Docker images
                    sh 'docker build -t carprice -f /home/aditya/adityamin/MLOPS/mlops/src/react_docker /home/aditya/adityamin/MLOPS/mlops'
                    sh 'docker build -t predictor-app -f /home/aditya/adityamin/MLOPS/mlops/src/predictor-app /home/aditya/adityamin/MLOPS/mlops/src'
                    sh 'docker build -t model-loader -f /home/aditya/adityamin/MLOPS/mlops/src/model_loader_dockerfile /home/aditya/adityamin/MLOPS/mlops/src'
        
                    // Tag and push Docker images
                    docker.withRegistry('', 'docker-hub-credentials') {
                        docker.image('carprice').push('adityavit36/carprice:latest')
                        docker.image('predictor-app').push('adityavit36/predictor-app:latest')
                        docker.image('model-loader').push('adityavit36/model-loader:latest')
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
