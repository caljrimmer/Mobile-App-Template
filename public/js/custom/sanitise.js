define(['underscore','jquery','registry'], function(_,$,registry){ 
	
	var coerceToString =  function(input) {
		var inputType;

		if (input===null || input===undefined) {
			return "";
		}

		inputType=typeof input;

		switch(inputType) {
		case "object":        
		case "number":
		case "boolean": return input.toString();
		case "string": return input;
		}

		return ""; // Default is empty string
	};
	
	var collapseSymbols = function(inputString) {
		var sanitisedString;

		sanitisedString= $.trim(coerceToString(inputString));
		if (sanitisedString==="") { // If blank then don't waste time
			return "";
		}

		// Collapse multiple consecutive repeated symbols and punctuation into a single occurrence
		sanitisedString = sanitisedString.replace(/([!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~ ]){1,1}\1+/g,"$1");
		    
		return sanitisedString;    
	};
	
	var generalString = function(inputString){

		var sanitisedString = coerceToString(inputString);	
		if (sanitisedString && typeof sanitisedString == "string") {
			$.trim(sanitisedString);
		}
		if (sanitisedString==="") { // If blank then don't waste time
			return "";
		}

		// Sanitise string
		// 1. Remove any character that is generally not accepted
		sanitisedString=sanitisedString.replace(/[^\u0020-\u007e\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03a3-\u03ce]/g, "");
		// 2. Collapse multiple consecutive repeated symbols and punctuation into a single occurrence
		sanitisedString = collapseSymbols(sanitisedString);
		// 3. Trim string /
		sanitisedString = $.trim(sanitisedString);

		return sanitisedString;  

	};

	var Sanitise = {

		/* ****************************************************************************
		 ** COMMON FUNCTIONS ********************************************************
		 **************************************************************************** */

		/* ****************************************************************************
		 ** carRegistration *********************************************************
		 **************************************************************************** */	
		carRegistration: {
			
			/*
		   Takes a string entered by the user and attempts to:
		   1. Parse it as a Greek car registration number
		   2. Re-format as the back-end expects to receive it

		   Does not attempt to validate the string
		   @returns:
		    If can extract a string in the expected format: The string correctly formatted in the backend format, or
			If CANNOT extract a string in the expected: A string as close as possible to the correct display format (but possibly invalid)
			 */
			sanitise: function(inputString) {
				var i,sanitisedString, matchRegex=[
				                                   /[AaΑαάΆ]/g,  // 6 variations
				                                   /[BbΒβ]/g, // 4 
				                                   /[EeΕεΈέ]/g, // 6
				                                   /[ZzΖζ]/g,  // 4
				                                   /[HhΗηΉή]/g,  // 6
				                                   /[IiΙιίΊϊΪΐ]/g, // 9
				                                   /[KkΚκ]/g, // 4
				                                   /[MmΜμ]/g, // 4
				                                   /[NnΝν]/g, // 4
				                                   /[OoΟοΌό]/g, // 6
				                                   /[PpΡρΠπ]/g, // 6
				                                   /[TtΤτ]/g, // 4
				                                   /[YyΥυΎύΫϋΰ]/g, //9    
				                                   /[XxΧχ]/g, // 4
				                                   /[^ABEZHIKMNOPTYX0-9]/g // MUST BE LAST!!
				                                   ],
				                                   replaceWith=['A','B','E','Z','H','I','K','M','N','O','P','T','Y','X',''];

				// Force to string
				sanitisedString=coerceToString(inputString);
				if (sanitisedString==="") { // If blank then don't waste time
					return "";
				}

				// Apply all transformations
				for (i=0;i<matchRegex.length;i++) {
					sanitisedString=sanitisedString.replace(matchRegex[i],replaceWith[i]);
				}

				// Now just pick first 3 letters and first 4 numbers present and re-format
				sanitisedString=$.trim(sanitisedString.replace(/^((?:.*)??)([ABEZHIKMNOPTYX]{0,3})([^0-9]*)([0-9]{0,4})((?:.*)??)$/,"$2$4"));

				return sanitisedString;
			},

			// Takes a car registration value (in backend format) and re-formats it for display
			formatForDisplay: function(backendFormat) {
				var displayString;
				displayString=coerceToString(backendFormat);
				if (displayString==="") { // If blank then don't waste time
					return "";
				}
				if (displayString.search(/^[ABEZHIKMNOPTYX]{3}[0-9]{4}$/)!==-1) { // Only attempt to re-format if string is in expected format
					displayString=displayString.replace(/(^[ABEZHIKMNOPTYX]{3})([0-9]{4})$/,"$1 $2");
				}
				return displayString;
			}
		},

		/* ****************************************************************************
		 ** generalString ***********************************************************
		 **************************************************************************** */		
		generalString: {
			
			/*
		   Takes a string entered by the user and:
		   1. Removes prohibited characters;
		   2. Collapses repeated sequences of symbols, punctuation and spaces;
		   3. Trims it.

		   @returns The sanitised string
			 */	
			sanitise: function(inputString) {
				generalString(inputString)
			},
			formatForDisplay: function(backendFormat) {
				return backendFormat; // No special format
			}
		},

		/* ****************************************************************************
		 ** integer *****************************************************************
		 **************************************************************************** */	
		integer: {
			
			/*
		   Takes a string entered by the user and:
		   1. Removes all non-decimal digits		   
			 */		
			sanitise: function sanitiseInteger(inputString) {
				var sanitisedString;

				sanitisedString=$.trim(coerceToString(inputString));
				if (sanitisedString==="") { // If blank then don't waste time
					return "";
				}

				// Sanitise string
				// 1. Remove anything that's not a number
				sanitisedString=sanitisedString.replace(/[^0-9]{1,}/g, "");

				return sanitisedString;
			},
			formatForDisplay: function(backendFormat) {
				return backendFormat; // No special format
			}
		},

		/* ****************************************************************************
		 ** personName **************************************************************
		 **************************************************************************** */	
		personName: {
			/*
		   Takes a string entered by the user and:
		   1. Removes prohibited characters;
		   2. Collapses repeated sequences of symbols, punctuation and spaces;
		   3. Trims it.

		   @returns The sanitised string
			 */	
			sanitise: function(inputString) {
				var sanitisedString;

				// First perform general string sanitisation
				sanitisedString=generalString(inputString);
				if (sanitisedString==="") { // If blank then don't waste time
					return "";
				}

				// Perform PersonName-specific sanitisations
				// 1. Remove anything that's not allowed
				sanitisedString=sanitisedString.replace(/[^A-Za-z\u0386\u0388-\u038A\u038C\u038e-\u03a1\u03a3-\u03ce '\-]{1,}/g, "");
				// 2. Collapse symbols again as above replacement could have created duplicate sequences
				sanitisedString=collapseSymbols(sanitisedString);
				// 3. Trim
				sanitisedString=$.trim(sanitisedString);

				return sanitisedString;
			},
			formatForDisplay: function(backendFormat) {
				return backendFormat; // No special format
			}
		},
		
		/* ****************************************************************************
		 ** policy number **************************************************************
		 **************************************************************************** */	
		policyNumber: {
			sanitise: function(inputString) {
				return inputString;
			},
			formatForDisplay: function(backendFormat) {
				return backendFormat; // No special format
			}
		},

		/* ****************************************************************************
		 ** emailAddress ************************************************************
		 **************************************************************************** */		
		emailAddress: {
			
			/*
		   Takes a string entered by the user and:
		   1. Replaces characters that are identical in both Greek and English with the English equivalents;
		   2. Trims it.

		   @returns The sanitised string
			 */		
			sanitise: function(inputString) {
				var i,sanitisedString,
				matchRegex=[
				            /[Α]/g,  // Greek A
				            /[Β]/g, // Greek B
				            /[Ε]/g, // Greek E
				            /[Ζ]/g,  // Greek Z
				            /[Η]/g,  // Greek H
				            /[Ι]/g, // Greek I
				            /[Κ]/g, // Greek K
				            /[Μ]/g, // Greek M
				            /[Ν]/g, // Greek N
				            /[Οο]/g, // Greek O upper and lower case
				            /[Ρ]/g, // Greek P
				            /[Τ]/g, // Greek T
				            /[Υ]/g, // Greek Y
				            /[Χ]/g // Greek X
				            ],
				            replaceWith=['A','B','E','Z','H','I','K','M','N','O','P','T','Y','X'];

				// Force to string
				sanitisedString=coerceToString(inputString);
				if (sanitisedString==="") { // If blank then don't waste time
					return "";
				}

				// 1. Apply all transformations for greek characters that are easy to confuse with English characters (replace with English equivalents)
				for (i=0;i<matchRegex.length;i++) {
					sanitisedString=sanitisedString.replace(matchRegex[i],replaceWith[i]);
				}

				// 2. Trim and convert to lower case
				sanitisedString=$.trim(sanitisedString.toLowerCase());

				// **NOTE: We do not perform any replacements of characters not allowed as user may have accidentally typed an invalid character
				//         while trying to type a valid one.  By flagging an error user will have to revise e-mail.  By just removing and flagging
				//         as valid, there's little chance user will notice error and correct it

				return sanitisedString;
			},
			formatForDisplay: function(backendFormat) {
				return backendFormat; // No special format
			}
		} 	
	}
	
	return Sanitise;

});