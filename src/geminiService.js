const { exec } = require('child_process');

const analyzeSentiment = (text) => {
    return new Promise((resolve, reject) => {
        const command = `gcloud alpha gen-ai language generate-content --prompt="다음 일기 내용의 감정을 '긍정', '부정', '중립' 중 하나로 분석하고, 그에 어울리는 짧은 피드백을 한 문장으로 작성해주세요.\n\n일기 내용: ${text}\n\n분석 결과:"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = { analyzeSentiment };
