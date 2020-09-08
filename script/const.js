// 一階段的時間 (高一 50 秒 / 高二 50 秒 / 高三 50 秒)
var stageTime = 50;


// 各行為及對應參數

const action_par = [
    {class:'subject', do:'Langugage', option:'A', KnowledgeType: {SocialLanguage: 20, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 8, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 3.5, strength: -4, social: , time: -4}
                                                  
                                                                
    }
]


// 每做一件事情，就會扣除或增加其對應的時間
function timeVar(have, number)
{
    return (have + number)
}



console.log(action_par[0].TechnologyType.BasicSkill;
