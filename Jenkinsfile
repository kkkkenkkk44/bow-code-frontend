pipeline {
    
    agent any
    
    environment {
        GITHUB_REPO_URL = "https://github.com/kkkkenkkk44/bow-code-frontend"
        DEPLOY_PORT = 3000
    }
    
    stages {
        
    	stage('Clone') {
            steps {
                echo 'Cloning..'
                // sh "rm -rf ./bow-code-frontend"
                // sh "git clone $GITHUB_REPO_URL"
                // sh "ls"
            }
        }
    
        stage('Build') {
            steps {
                echo 'Building..'
                // dir("bow-code-frontend") {
                //     sh "docker build -t bow-code-frontend ."
                //     sh "docker run -p $DEPLOY_PORT:3000 -d bow-code-frontend"
                // }
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
                sh "curl http://localhost:$DEPLOY_PORT"
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

