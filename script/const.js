// 一階段的時間 (高一 50 秒 / 高二 50 秒 / 高三 50 秒)
var stageTime = 50;


// 各行為及對應參數
const action_par = [
    // 語文
    {    
        class:'subject',            // 類別：課業學科 or 課外活動
        do:'Langugage',             // 子類別
        option:'A',                 // 選項 ID
        KnowledgeType: {            // 知識型
            SocialLanguage: 20,         // 社會語文
            Mathematical: 0,            // 數理
            InfoKnowledge: 0,           // 資訊知識
            Art: 0,                     // 美術
            ExploreCampus: 0,           // 校內探索
            ExploreOutside: 0,          // 校外探索
            PhysicalEdu: 0              // 體育
        }, 
        TechnologyType: {           // 技術型
            BasicSkill: 8,              // Basic Skills
            ComplexProblem: 0,          // Complex Problem Solving Skills
            ResourceManagement: 0,      // Resource Management Skills
            SocialSkill: 0,             // Social Skills
            SystemsSkill:0 ,            // Systems Skills
            TechnicalSkill: 0           // Technical Skills
        }, 
        OtherType: {                // 其它
            lazy: 0,                    // 惰性
            pressure: 3.5,              // 壓力
            strength: -4,               // 體力
            social: 0,                  // 人際支持
            time: -4                    // 時間
        }                                                        
    },
    {
        class:'subject', 
        do:'Langugage', 
        option:'B', 
        KnowledgeType: {
            SocialLanguage: 15, 
            Mathematical: 0, 
            InfoKnowledge: 0, 
            Art: 0, 
            ExploreCampus: 0, 
            ExploreOutside: 0, 
            PhysicalEdu: 0
        }, 
        TechnologyType: {
            BasicSkill: 6, 
            ComplexProblem: 0, 
            ResourceManagement: 0, 
            SocialSkill: 0, 
            SystemsSkill:0 , 
            TechnicalSkill: 0
        }, 
        OtherType: {
            lazy: 0, 
            pressure: 2.5, 
            strength: -3, 
            social: 0, 
            time: -3
        },
    },
    {
        class:'subject', 
        do:'Langugage', 
        option:'C', 
        KnowledgeType: {
            SocialLanguage: 10, 
            Mathematical: 0, 
            InfoKnowledge: 0, 
            Art: 0, 
            ExploreCampus: 0, 
            ExploreOutside: 0, 
            PhysicalEdu: 0
        }, 
        TechnologyType: {
            BasicSkill: 4, 
            ComplexProblem: 0, 
            ResourceManagement: 0, 
            SocialSkill: 0, 
            SystemsSkill:0 , 
            TechnicalSkill: 0
        }, 
        OtherType: {
            lazy: 0, 
            pressure: 1.5, 
            strength: -2, 
            social: 0, 
            time: -2
        },
    },
    {
        class:'subject', 
        do:'Langugage', 
        option:'D', 
        KnowledgeType: {
            SocialLanguage: 5, 
            Mathematical: 0, 
            InfoKnowledge: 0, 
            Art: 0, 
            ExploreCampus: 0, 
            ExploreOutside: 0, 
            PhysicalEdu: 0
        }, 
        TechnologyType: {
            BasicSkill: 2, 
            ComplexProblem: 0, 
            ResourceManagement: 0, 
            SocialSkill: 0, 
            SystemsSkill:0 , 
            TechnicalSkill: 0
        }, 
        OtherType: {
            lazy: 0, 
            pressure: 0.5, 
            strength: -1, 
            social: 0, 
            time: -1
        },
    },
    
    // 社會
    {class:'subject', do:'Social', option:'A', KnowledgeType: {SocialLanguage: 20, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                               TechnologyType: {BasicSkill: 8, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                               OtherType: {lazy: 0, pressure: 3.5, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Social', option:'B', KnowledgeType: {SocialLanguage: 15, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                               TechnologyType: {BasicSkill: 6, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                               OtherType: {lazy: 0, pressure: 2.5, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Social', option:'C', KnowledgeType: {SocialLanguage: 10, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                               TechnologyType: {BasicSkill: 4, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                               OtherType: {lazy: 0, pressure: 1.5, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Social', option:'D', KnowledgeType: {SocialLanguage: 5, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                               TechnologyType: {BasicSkill: 2, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                               OtherType: {lazy: 0, pressure: 0.5, strength: -1, social: 0, time: -1},
    },
    // 數學
    {class:'subject', do:'Math', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 20, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 8, ComplexProblem: 5, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 3.5, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Math', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 15, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 6, ComplexProblem: 4, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 2.5, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Math', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 10, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 4, ComplexProblem: 3, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1.5, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Math', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 5, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 2, ComplexProblem: 2, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 0.5, strength: -1, social: 0, time: -1},
    },
    
    // 自然科學
    {class:'subject', do:'Science', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 20, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 8, ComplexProblem: 5, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 3.5, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Science', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 15, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 6, ComplexProblem: 4, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 2.5, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Science', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 10, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 4, ComplexProblem: 3, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1.5, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Science', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 5, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 2, ComplexProblem: 2, ResourceManagement: 0, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 0.5, strength: -1, social: 0, time: -1},
    },
    
    // 科技
    {class:'subject', do:'Technology', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 20, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 1, ComplexProblem: 0, ResourceManagement: 4, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Technology', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 10, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 1, ComplexProblem: 0, ResourceManagement: 3, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Technology', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 10, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 1, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Technology', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 5, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 1, ComplexProblem: 0, ResourceManagement: 1, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -1, social: 0, time: -1},
    },
    // 藝術
    {class:'subject', do:'Art', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 20, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 0, ComplexProblem: 0, ResourceManagement: 4, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Art', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 15, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 0, ComplexProblem: 0, ResourceManagement: 3, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Art', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 10, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 0, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Art', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 5, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 0, ComplexProblem: 0, ResourceManagement: 1, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -1, social: 0, time: -1},
    },
    
    
    // 綜合活動
    {class:'subject', do:'Integrative', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 20, ExploreOutside: 20, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 8, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Integrative', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 15, ExploreOutside: 15, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 6, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Integrative', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 10, ExploreOutside: 10, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 4, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Integrative', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 5, ExploreOutside: 5, PhysicalEdu: 0}, 
                                                  TechnologyType: {BasicSkill: 2, ComplexProblem: 0, ResourceManagement: 2, SocialSkill: 0, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -1, social: 0, time: -1},
    },
    
    
    // 健康與體育
    {class:'subject', do:'Integrative', option:'A', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 20}, 
                                                  TechnologyType: {BasicSkill: 8, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 5, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -4, social: 0, time: -4}                                                        
    },
    {class:'subject', do:'Integrative', option:'B', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 15}, 
                                                  TechnologyType: {BasicSkill: 6, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 4, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -3, social: 0, time: -3},
    },
    {class:'subject', do:'Integrative', option:'C', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 10}, 
                                                  TechnologyType: {BasicSkill: 4, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 3, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -2, social: 0, time: -2},
    },
    {class:'subject', do:'Integrative', option:'D', KnowledgeType: {SocialLanguage: 0, Mathematical: 0, InfoKnowledge: 0, Art: 0, ExploreCampus: 0, ExploreOutside: 0, PhysicalEdu: 5}, 
                                                  TechnologyType: {BasicSkill: 2, ComplexProblem: 0, ResourceManagement: 0, SocialSkill: 2, SystemsSkill:0 , TechnicalSkill: 0}, 
                                                  OtherType: {lazy: 0, pressure: 1, strength: -1, social: 0, time: -1},
    },
]


// 每做一件事情，就會扣除或增加其對應的時間
function timeVar(have, number)
{
    return (have + number)
}



console.log(action_par[0].TechnologyType.BasicSkill);
