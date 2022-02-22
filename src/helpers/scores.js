export const maxScore = (level_id) => {
    let maxSpeakingScore, maxWritingScore;
    switch(level_id){
        case 1:{
            maxSpeakingScore = 5;
            maxWritingScore = 0;
        }
        break;
        default:{
            maxSpeakingScore = 3.125;
            maxWritingScore = 25;
        }
        break;
    }
    return {
        maxSpeakingScore,
        maxWritingScore
    }
}