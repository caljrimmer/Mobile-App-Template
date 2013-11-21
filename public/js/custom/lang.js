define(['underscore','jquery','registry'], function(_,$,registry){
	var Lang = {
		setLang : function(lang){
			localStorage.lang = lang;
			registry.lang = lang;
		},
		getLang : function(){ 
			return this[registry.lang];
		},  
		en : {
			Template : {
				nav : {
					hellasTx : 'Hellas Direct',
					homeTx : 'Home',
					locationTx : 'Location',
					detailsTx : 'Your Details',
					assistanceTx : 'Assistance',
					feedbackTx : 'Feedback'
				},
				footer : {
					selectTx : 'Select Language',
					greekTx : 'Greek(EL)',
					englishTx : 'English(EN)',
				},
				home : {
					ieWarningTx : 'Hellas Direct is design to work on modern browsers. Your browsing experience may be decremented.',
					introTx : 'Lorem ipsum ad qui amet dolore, vitae cetero quaerendum mel ea. Facilis fastidii duo no. Viris partiendo ius no, alia animal nam at. Feugait imperdiet ius an, no quis facer lucilius vis. Aliquam saperet contentiones ex pro, id idque offendit ius. Fugit suavitate ad eam, ut essent debitis cum. Cu duo iudico instructior.',
					primaryTx : 'next',
					secondaryTx : 'prev',
					findingTx : 'Finding where you are',
					foundTx : 'Found your location. You are <b>here</b>',
					notOnlineTx : 'You are not online!'
				},
				location : {
					noConnectionTx : 'No Internet Connection'
				},
				details : {
					policyNumberTx : 'Enter your Hellas Direct insurance policy number',
					policyPlaceholderNumberTx : 'e.g. M12345678',
					policyNameTx : 'Enter your name',
					policyPlaceholderNameTx : 'e.g. John Smith',
					policyRegTx : 'Enter your car registration',
					policyPlaceholderRegTx : 'e.g. PET1234',
					policyMobileTx : 'Enter your mobile phone number',
					policyPlaceholderMobileTx : 'e.g. 447919411405',
					getTx : 'Save Details'
				},
				assistance : {
					accidentTx : 'Have you been in an accident? Click below to alert us',
					accidentButTx : 'I\'ve been in an accident',
					helpTx : 'Has something happened to your car? Click below to alert us',
					helpButTx : 'I need help with my car',
					callTx : 'Do you need to contact our customer support team with something else?',
					callButTx : 'Call our emergency line'
				},
				request : {
					nameTx : 'Name',
					mobileTx : 'Mobile Number',
					policyTx : 'Policy Number',
					regTx : 'Car Registration',
					locationTx : 'Location',
					noConnectionTx : 'No Internet Connection',
					requestButTx : 'Request Assistance',
					latTx : 'Lat',
					longTx : 'Long',
					successHeaderTx : 'We have successfully processed your request',
					successBodyTx : 'Lorem ipsum ad qui amet dolore, vitae cetero quaerendum mel ea. Facilis fastidii duo no. Viris partiendo ius no, alia animal nam at. Feugait imperdiet ius an, no quis facer lucilius vis. Aliquam saperet contentiones ex pro, id idque offendit ius. Fugit suavitate ad eam, ut essent debitis cum. Cu duo iudico instructior. Sea te choro perfecto, per eu meis nonumy percipit. Ut mea sint constituam, cu pro impedit constituam.' 
				},
				validation : {
					mobile : 'Your mobile number is wrong',
					policy : 'Your policy number is wrong',
					name : 'Your name is wrong',
					reg : 'Your car registration is wrong',
					serviceCheck : 'Your policy number doesn\'t match your car registration',
					serviceError : 'This has been a problem submitting your request. Please try again.'
				}
			}
		},
		el : {
			Template : {
				nav : {
					hellasTx : 'Hellas Direct',
					homeTx : 'Home',
					locationTx : 'Location',
					detailsTx : 'Your Details',
					assistanceTx : 'Assistance',
					feedbackTx : 'Feedback'
				},
				footer : {
					selectTx : 'Select Language',
					greekTx : 'Greek(EL)',
					englishTx : 'English(EN)',
				},
				home : {
					ieWarningTx : 'Hellas Direct is design to work on modern browsers. Your browsing experience may be decremented.',
					introTx : 'GR Lorem ipsum ad qui amet dolore, vitae cetero quaerendum mel ea. Facilis fastidii duo no. Viris partiendo ius no, alia animal nam at. Feugait imperdiet ius an, no quis facer lucilius vis. Aliquam saperet contentiones ex pro, id idque offendit ius. Fugit suavitate ad eam, ut essent debitis cum. Cu duo iudico instructior.',
					primaryTx : 'next',
					secondaryTx : 'prev',
					findingTx : 'Finding where you are',
					foundTx : 'Found your location. You are <b>here</b>',
					notOnlineTx : 'You are not online!'
				},
				location : {
					noConnectionTx : 'No Internet Connection'
				},
				details : {
					policyNumberTx : 'Enter your Hellas Direct insurance policy number',
					policyPlaceholderNumberTx : 'e.g. M12345678',
					policyNameTx : 'Enter your name',
					policyPlaceholderNameTx : 'e.g. John Smith',
					policyRegTx : 'Enter your car registration',
					policyPlaceholderRegTx : 'e.g. PET1234',
					policyMobileTx : 'Enter your mobile phone number',
					policyPlaceholderMobileTx : 'e.g. 447919411405',
					getTx : 'Save Details'
				},
				assistance : {
					accidentTx : 'Have you been in an accident? Click below to alert us',
					accidentButTx : 'I\'ve been in an accident',
					helpTx : 'Has something happened to your car? Click below to alert us',
					helpButTx : 'I need help with my car',
					callTx : 'Do you need to contact our customer support team with something else?',
					callButTx : 'Call our emergency line'
				},
				request : {
					nameTx : 'Name',
					mobileTx : 'Mobile Number',
					policyTx : 'Policy Number',
					regTx : 'Car Registration',
					locationTx : 'Location',
					noConnectionTx : 'No Internet Connection',
					requestButTx : 'Request Assistance',
					latTx : 'Lat',
					longTx : 'Long',
					successHeaderTx : 'We have successfully processed your request',
					successBodyTx : 'Lorem ipsum ad qui amet dolore, vitae cetero quaerendum mel ea. Facilis fastidii duo no. Viris partiendo ius no, alia animal nam at. Feugait imperdiet ius an, no quis facer lucilius vis. Aliquam saperet contentiones ex pro, id idque offendit ius. Fugit suavitate ad eam, ut essent debitis cum. Cu duo iudico instructior. Sea te choro perfecto, per eu meis nonumy percipit. Ut mea sint constituam, cu pro impedit constituam.' 
				},
				validation : {
					mobile : 'Your mobile number is wrong',
					policy : 'Your policy number is wrong',
					name : 'Your name is wrong',
					reg : 'Your car registration is wrong',
					serviceCheck : 'Your policy number doesn\'t match your car registration',
					serviceError : 'This has been a problem submitting your request. Please try again.'
				}
			}
		}
	};

	return Lang;

});
