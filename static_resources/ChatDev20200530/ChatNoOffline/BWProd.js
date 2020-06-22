function makeinitESW(){
    var initESW = function(gslbBaseURL,membercode,language,brandmarket) {
        embedded_svc.settings.displayHelpButton = true; //Or false
        embedded_svc.settings.language = language; //For example, enter 'en' or 'en-US'
        embedded_svc.settings.waitingStateBackgroundImgURL = '';
        var buttonID = '';
        var agentName = '';
        var onlineAgent = '';
        var offlineAgent = '';
        var disableAgent = '';
        var loading = '';

        if(brandmarket == 'BW-CNY' ){
            
            agentName = 'BWCNYChat';
            buttonID = '5732v000000ceeh';
            onlineAgent = '开始聊天';
            offlineAgent = '联系我们';
            disableAgent = '离线代理';
            loading = '载入中';

        } else if(brandmarket == 'BW-THB' ){
            
            agentName = 'BWTHBChat';
            buttonID = '5732v000000ceej';
            onlineAgent = 'เริ่มแชท';
            offlineAgent = 'ติดต่อเรา';
            disableAgent = 'ตัวแทนออฟไลน์';
            loading = 'โหลด';

        } 
               
        embedded_svc.settings.prepopulatedPrechatFields = {		
            Member_Code__c: membercode,
            Department: brandmarket
        };		

        embedded_svc.settings.extraPrechatFormDetails = [
        {  
            "label":"Brand Market",
            "value" : brandmarket,
            "transcriptFields":[ "Brand_Market__c" ],
            "displayToAgent":true
        },
        {  
            "label":"Member Code",
            "transcriptFields":[ "Member_Code__c" ],
            "displayToAgent":true
        }
        ];

        embedded_svc.settings.extraPrechatInfo = [
            {
            "entityName": "Contact",
            "entityFieldMaps": 
            [
                {
                    "isExactMatch": false,
                    "fieldName": "LastName",
                    "doCreate": false,
                    "doFind": false,
                    "label": "Member Code"
                },
                {
                    "isExactMatch": false,
                    "fieldName": "FirstName",
                    "doCreate": false,
                    "doFind": false,
                    "label": "First Name"
                }, 
                {
                    "isExactMatch": false,
                    "fieldName": "Department",
                    "doCreate": false,
                    "doFind": false,
                    "label": "Department"
                },
                {
                    "isExactMatch": false,
                    "fieldName": "Title",
                    "doCreate": false,
                    "doFind": false,
                    "label": "Title"
                },
                {
                    "isExactMatch": true,
                    "fieldName": "Member_Code_Brand_Market__c",
                    "doCreate": false,
                    "doFind": true,
                    "label": "Member Code Brand Market"
                }							

            ]
            }, 
            {
            "entityName": "Account",
            "entityFieldMaps": 
                [
                    {
                        "isExactMatch": false,
                        "fieldName": "LastName",
                        "doCreate": false,
                        "doFind": false,
                        "label": "Member Code"
                    }
                ]
            },
            {
            "entityName": "Case",
            "saveToTranscript": "CaseId",
            "entityFieldMaps": [
                    {
                    "isExactMatch": false,
                    "fieldName": "Member_Code__c",
                    "doCreate": false,
                    "doFind": false,
                    "label": "Member Code"
                }]
            }
        ];	

        embedded_svc.settings.defaultMinimizedText = onlineAgent; //(Defaults to Chat with an Expert)
        embedded_svc.settings.offlineSupportMinimizedText = offlineAgent; //(Defaults to Contact Us)
        embedded_svc.settings.disabledMinimizedText = disableAgent; //(Defaults to Agent Offline)
        embedded_svc.settings.loadingText = loading; //(Defaults to Loading)
        //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

        // Settings for Chat        
        embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
            //Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
            //Returns a valid button ID.

            if(prechatFormData[3].value == 'BW-CNY'){
                if (prechatFormData[5].value == "" || prechatFormData[5].value == undefined){
                    buttonID = "5732v000000ceeh";           
                }else {
                    if(prechatFormData[2].value == "" || prechatFormData[2].value == undefined){
                        buttonID = "5732v000000ceeh";
                    } else if(prechatFormData[2].value == "VIP" || prechatFormData[2].value == "VVIP") {
                        buttonID = "5732v000000ceei";
                    } else {
                        buttonID = "5732v000000ceeh";   
                    }
                }
            }

            if(prechatFormData[3].value == 'BW-THB'){
                if (prechatFormData[5].value == "" || prechatFormData[5].value == undefined){
                    buttonID = "5732v000000ceej";       
                }else {
                    if(prechatFormData[2].value == "" || prechatFormData[2].value == undefined){
                        buttonID = "5732v000000ceej";   
                    } else if(prechatFormData[2].value == "VIP" || prechatFormData[2].value == "VVIP") {
                        buttonID = "5732v000000ceek";
                    } else {
                        buttonID = "5732v000000ceej";
                    }
                }
            }
            
            return buttonID;
        };
 
          //Sets the auto-population of pre-chat form fields
        embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
        //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

        embedded_svc.settings.enabledFeatures = ['LiveAgent'];
        embedded_svc.settings.entryFeature = 'LiveAgent';

        embedded_svc.init(
			'https://gb2bc--authtest.my.salesforce.com',
			'https://authtest-gb2bc.cs75.force.com',
			gslbBaseURL,
			'00D0w0000008glW',
			agentName,
			{
				baseLiveAgentContentURL: 'https://c.la1-c1cs-hnd.salesforceliveagent.com/content',
				deploymentId: '5722v000000ccyR',
				buttonId: buttonID,
				baseLiveAgentURL: 'https://d.la1-c1cs-hnd.salesforceliveagent.com/chat',
				eswLiveAgentDevName: agentName,
				isOfflineSupportEnabled: false
			}
		);
    };
    return initESW;
}