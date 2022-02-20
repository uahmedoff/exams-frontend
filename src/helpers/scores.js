export const maxScore = (level_id) => {
    let maxSpeakingScore, maxWritingScore;
    switch(level_id){
        case 1:{
            maxSpeakingScore = 50;
            maxWritingScore = 0;
        }
        break;
        default:{
            maxSpeakingScore = 25;
            maxWritingScore = 25;
        }
        break;
    }
    return {
        maxSpeakingScore,
        maxWritingScore
    }
}