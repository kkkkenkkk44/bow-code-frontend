pipeline {
    
    agent any
    
    environment {
        GITHUB_REPO_URL = "https://github.com/kkkkenkkk44/bow-code-frontend"
        DEPLOY_PORT = 3000
    }
    
    stages {
        stage('shutdown') {
            steps {
                sh "docker stop bow-code-frontend || true && docker rm bow-code-frontend || true"
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                dir("./") {
                    sh "docker build -t bow-code-frontend ."
                    sh "docker run -p $DEPLOY_PORT:3000 --name bow-code-frontend -d bow-code-frontend"
                }
            }
        }
            
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
            
        stage('Deploy') {
            steps {
                echo 'Deploying..'
            }
        }

        stage('Healthy Check') {
            steps {
                sleep(time:3)
                sh "curl https://bow-code.ntu.im/"
            }
        }
    }
    
    post {
        
        always {
            echo "Finished"
        }
        
        success {
            discordSend(
                description: "main - success",
                link: currentBuild.absoluteUrl,
                result: currentBuild.currentResult,
                successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'),
                title: currentBuild.fullDisplayName,
                webhookURL: "${env.DISCORD_WEBHOOK_URL}"
            )
        }
        
        failure {
            discordSend(
                description: "main - failed",
                link: currentBuild.absoluteUrl,
                result: currentBuild.currentResult,
                successful: currentBuild.resultIsBetterOrEqualTo('SUCCESS'),
                title: currentBuild.fullDisplayName,
                webhookURL: "${env.DISCORD_WEBHOOK_URL}"
            )
        }
    }
}

