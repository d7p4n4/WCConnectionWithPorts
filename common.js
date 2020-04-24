class Ac4yStringHandler {

    getPersonalNamePart(aName){

            var vName = String(aName);
            var vResult = new Array(); 
            vResult = vName.split(".");
            var vResultSize = vResult.length;

            if ( vResult.length == 0 )
                    return vName;
            else
                    return vResult[vResult.length-1];

    } // getPersonalNamePart

    getFirstNamePart(aName){

            var vName = String(aName);
            var vResult = new Array(); 
            vResult = vName.split(".");
            vResultSize = vResult.length;

            if ( vResult.length == 0 )
                    return vName;
            else
                    return vResult[0];

    } // getFirstNamePart


    getLength(aString){return aString.length;}
    
    upperCase(aString){return aString.toUpperCase();}

    getFirstCharUpperCase(aString){
        
        if (aString)
            return this.upperCase(aString.charAt(0)) + aString.substring(1, this.getLength(aString));
        else
            return "";
        
    } // getFirstCharUpperCase

    replaceAll(aString, aFind, aReplace) {
        
        if (aString)
            while( aString.indexOf(aFind) > -1) {
                  aString = aString.replace(aFind, aReplace);
            } 
        
        return aString;
              
    } // replaceAll

    camelCase(aInput) { 

        if (aInput) {
            
            var vInput = this.replaceAll(aInput, ' ', '-');

            return vInput.toLowerCase().replace(/-(.)/g, function(match, group1) {
                    return group1.toUpperCase();
            });
            
        }
        
    } // camelCase

    concatSmart(aFirst, aSecond, aSeparator) { 

            if (aFirst)
                return aFirst + aSeparator + aSecond;
            else
                return aSecond;

    } // concatSmart

    
    padLeft(aValue, aPadder, aLength){return (aPadder+aValue).slice(-aLength);}

    padNumber(aNumber, aLength){return ("0"+aNumber).slice(-aLength);}

    getValueFromKeyValuePairByKey(aPair, aSeparator, aKey){
        
        var vValue = null;
        
        if (aPair) {
            
            var vKeyValueInArray=aPair.split(aSeparator);
			
            if (vKeyValueInArray.length==2)
                vValue = vKeyValueInArray[1];
            
        }

        return vValue;

    } // getValueFromKeyValuePairByKey

    getValueFromKeyValuePair(aPair, aSeparator){
        
        var vResult = null;
        
        if (aPair) {
            
            var vKeyValueInArray=aPair.split(aSeparator);
			
            if (vKeyValueInArray.length==2)
                vResult = vKeyValueInArray[1];
            
        }

        return vResult;

    } // getValueFromKeyValuePair

    getKeyFromKeyValuePair(aPair, aSeparator){
        
        var vResult = null;
        
        if (aPair) {
            
            var vKeyValueInArray=aPair.split(aSeparator);
			
            if (vKeyValueInArray.length==2)
                vResult = vKeyValueInArray[0];
            
        }

        return vResult;

    } // getKeyFromKeyValuePair
    
    getKeyValueFromSeries(aStorage, aKeyValueSeparator, aValueSeparator, aKey){
        
        var vValue = null;
        
        if (aStorage) {
            
            var vKeyValueSet = aStorage.split(aKeyValueSeparator);
            
            var vKeyValue=vKeyValueSet.map(
                    function(aElement){
                        return aElement.trim().split(aValueSeparator);
                    }).filter(
                            function(aElement){
                                return aElement[0]===aKey;
                            }
                );

                if (vKeyValue.length>0)
                    vValue = vKeyValue[0][1];
            
        }
        
        return vValue;
        
    } // getKeyValueFromSeries
    
    getSimpled (text) {

        const 	accentForm 			= "ĂˇĂ­Ĺ±Ĺ‘ĂĽĂ¶ĂşĂłĂ©Ă�ĂŤĹ°Ĺ�ĂśĂ–ĂšĂ“Ă‰";
        const 	withoutAccentForm 	= "aiuououoeAIUOUOUOE";

        var	oneChar;
        var 	converted	= "";
        var		conversionIndex = 0;

        for ( var index = 0; index < text.length; index++ ) {

            oneChar = text.charAt ( index );

            conversionIndex = accentForm.indexOf ( oneChar );

            if	( conversionIndex != -1 )
                oneChar = withoutAccentForm.charAt ( conversionIndex );

            if 	(  
                    (oneChar == '.') ||
                    ((oneChar >= 'a') && (oneChar <= 'z')) ||
                    ((oneChar >= '0') && (oneChar <= '9')) ||
                    ((oneChar >= 'A') && (oneChar <= 'Z'))
            )
                converted = converted + oneChar;

        }

        return converted.toUpperCase();

    } // getSimpled
    
} // Ac4yStringHandler
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Ac4yGUIDHandler(){

    this.getUUID = function(){

        var chars = '0123456789abcdef'.split('');

        var uuid = [], rnd = Math.random, r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4'; // version 4

        for (var i = 0; i < 36; i++)
        {
           if (!uuid[i])
           {
              r = 0 | rnd()*16;

              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
           }
        }

        return uuid.join('');

    } // getUUID 

    this.getGUID = function() { return this.getUUID(); }
    
} // Ac4yGUIDHandler
class Ac4yObjectHandler {

    getObjectPropertiesAsVerticalTable(aObject, aDocument, aOwner){
        
        var vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(

                function (aValue, aIndex, aArray) {

                    var vRow = vTable.insertRow(-1);

                    vRow.insertCell(-1).innerHTML = aValue;
                    vRow.insertCell(-1).innerHTML = aObject[aValue];

                }

            );

        return vTable;
        
    } // getObjectPropertiesAsVerticalTable

    getObjectPropertiesAsHorizontalTable(aObject, aDocument, aOwner){
        
        var vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

        var vRow = vTable.insertRow(-1);
        
        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(
                function (aValue, aIndex, aArray) {

                    vRow.insertCell(-1).innerHTML = aValue;

                }

            );

        var vRow = vTable.insertRow(-1);

        if (aObject)
            Object.getOwnPropertyNames(aObject).forEach(

                function (aValue, aIndex, aArray) {

                    vRow.insertCell(-1).innerHTML = aObject[aValue];

                }

            );

        return vTable;
        
    } // getObjectPropertiesAsHorizontalTable
    
    getArrayAsVerticalTable(aObject, aDocument, aOwner){
        
        var vTable = null;
        
        if (aObject)
            if (aObject.length)
                if (aObject.length>0) {

                    vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

                    var vRow = vTable.insertRow(-1);

                    if (aObject && aObject[0])
                        Object.getOwnPropertyNames(aObject[0]).forEach(
                            function (aKey, aIndex, aArray) {
                                vRow.insertCell(-1).innerHTML = aKey;
                            }
                        );

                    for (var vIndex = 0; vIndex < aObject.length; vIndex++) { 
                        
                        var vRow = vTable.insertRow(-1);

                        if (aObject && aObject[vIndex])
                            Object.getOwnPropertyNames(aObject[vIndex]).forEach(
                                function (aKey, aIndex, aArray) {
                                    vRow.insertCell(-1).innerHTML = aObject[vIndex][aKey];
                                }
                            );
                    
                    }
                    
        } // if
        
        return vTable;
        
    } // getArrayAsVerticalTable

    getArrayAsHorizontalTable(aObject, aDocument, aOwner){

        var vTable = null;

        if (
                aObject 
                && aObject.length 
                && aObject.length>0 
                && Object.getOwnPropertyNames(aObject[0]) 
                && Object.getOwnPropertyNames(aObject[0]).length
            ) {
        
                var vRowCount = Object.getOwnPropertyNames(aObject[0]).length;
                var vColumnCount = aObject.length;

                vTable = new Ac4yDOMHandler().getCreatedTable(aDocument, aOwner);

                var vRow = vTable.insertRow(-1);

                for (var vRowIndex = 0; vRowIndex < vRowCount; vRowIndex++) {

                    var vRow = vTable.insertRow(-1);

                    vRow.insertCell(-1).innerHTML = Object.getOwnPropertyNames(aObject[0])[vRowIndex];

                    for (var vColumnIndex = 0; vColumnIndex < vColumnCount; vColumnIndex++) {

                        vRow.insertCell(-1).innerHTML = aObject[vColumnIndex][(Object.getOwnPropertyNames(aObject[0])[vRowIndex])];

                    } // for columns

                } // for rows
                
        } // if

        return vTable;

    } // getArrayAsHorizontalTable

    doesExist(aObject){return (aObject ? true : false);}
    
    isThisNothing(aObject){return (aObject ? false : true);}
    
    isCorrect(aObject){return (aObject ? true : false);}
    
    isFunction(aObject){return (((aObject) && (typeof aObject === 'function')) ? true : false );}
    
    default(aValue, aDefaultValue){

        if (!this.isThisNothing(aValue))            
            return aValue;
        else
            return aDefaultValue;
            
    } // default

    getClassNameOfTheObject(aObject){return aObject.constructor.name;};

} // Ac4yObjectHandler
class Ac4yBase64Handler {
    
    //encode(aString){return atob(aString);};
    //decode(aString){return btoa(aString);};
    
    //b64EncodeUnicode(aString) {
    encode(aString) {
        
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
        return btoa(encodeURIComponent(aString).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
        
    } // b64EncodeUnicode
    
    //b64DecodeUnicode(str) {
    decode(aString) {
        
    // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(aString).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
    } // b64DecodeUnicode
    
} // Ac4yBase64Handler
class Ac4yFunctionHandler {
    
    understandable(aSource){
        
        try{
            
            var functionOnTheFly = eval(aSource);
            
            return true;
            
        } catch(exception){
            console.log(exception);
            console.log(aSource); 
            return false;
            
        }
        
    } // understandable
    
    compiled(aSource){
        return eval(aSource);
    };
    
} // Ac4yFunctionHandler
class Ac4yDateTimeHandler {
    
    getSystemTime(){return new Date().getTime();}
  
    getSystemTimeInExternalFormat(){return this.getSystemTime();}
    
    getDateExternalFormat(aDate) {
        
      var vYear = aDate.getFullYear();
      var vMonth = aDate.getMonth()+1;
      var vDay = aDate.getDate();
      
      return new Ac4yStringHandler().padNumber(vYear,4)+"-"
              +new Ac4yStringHandler().padNumber(vMonth,2)+"-"
              +new Ac4yStringHandler().padNumber(vDay,2);
      
    } // getTimeExternalFormat
    
    getTimeExternalFormat(aDatetime) {
        
      var vHour = aDatetime.getHours();
      var vMinute = aDatetime.getMinutes();
      var vSecond = aDatetime.getSeconds();
      
      return new Ac4yStringHandler().padNumber(vHour,2)
              +":"+new Ac4yStringHandler().padNumber(vMinute,2)
              +":"+new Ac4yStringHandler().padNumber(vSecond,2);
      
    } // getTimeExternalFormat
    
    getDateTimeExternalFormat(aDatetime) {
        
        return aDatetime.toJSON();
      
    } // getDateTimeExternalFormat
    
    
    shiftDay(date, shift){

        return new Date(new Date(date).setDate(new Date(date).getDate() + shift ));

    } // shiftDay

    getMillisecondVsSecond(){return 1000;}
    getSecondVsMinute(){return 60;}
    getMinuteVsHour(){return 60;}
    getHourVsDay(){return 24;}
    
    getMillisecondInSecond(aMillisecond){return Math.round(aMillisecond / this.getMillisecondVsSecond());}
    getMillisecondInMinute(aMillisecond){return Math.round(this.getMillisecondInSecond(aMillisecond) / this.getSecondVsMinute());}
    getMillisecondInHour(aMillisecond){return Math.round(this.getMillisecondInMinute(aMillisecond) / this.getMinuteVsHour());}
    getMillisecondInDay(aMillisecond){return Math.round(this.getMillisecondInHour(aMillisecond) / this.getHourVsDay());}

    //getSecondInMillisecond(aSecond){return aSecond * this.getMillisecondVsSecond();}
    getMinuteInMillisecond(aMinute){return this.getSecondInMillisecond(aSecond) * this.getSecondVsMinute();}
    getHourInMillisecond(aHour){return this.getSecondInMinute(aSecond) * this.getMinuteVsHour();}
    getDayInMillisecond(aDay){return this.getSecondInHour(aSecond) * this.getHourVsDay();}
    
    getSecondInMillisecond(aSecond){return aSecond * this.getMillisecondVsSecond();}
    getSecondInMinute(aSecond){return this.getSecondInMillisecond(aSecond) * this.getSecondVsMinute();}
    getSecondInHour(aSecond){return this.getSecondInMinute(aSecond) * this.getMinuteVsHour();}
    getSecondInDay(aSecond){return this.getSecondInHour(aSecond) * this.getHourVsDay();}
    /*
    getMinuteInMillisecond(aMinute){return aMinute * this.getMillisecondVsSecond();}
    getMinuteInSecond(aMinute){return this.getMinuteInMillisecond(aMinute) * this.getSecondVsMinute();}
    getMinuteInHour(aMinute){return this.getMinuteInSecond(aMinute) * this.getMinuteVsHour();}
    getMinuteInDay(aMinute){return this.getMinuteInHour(aMinute) * this.getHourVsDay();}
    */
} // Ac4yDateTimeHandler
class Ac4yHTMLElementHandler {

    element(aID){
        return document.getElementById(aID);
    }
    
    buildComboBoxFromString( aSelectElement, aSelectelementsInStringList) {

	vStringArray = aSelectelementsInStringList.split(',');

	for ( var vIndex = 0; vIndex < vStringArray.length; vIndex++) {
		aSelectElement.options[aSelectElement.options.length] = new Option(vStringArray[vIndex], vStringArray[vIndex]);
	}

    } // buildComboBoxFromString

    setSelectedIndexByValue(aSelectElement, aValue) {

	for ( var vIndex = 0; vIndex < aSelectElement.options.length; vIndex++) {
		if (aSelectElement.options[vIndex].value == aValue)
			aSelectElement.selectedIndex = vIndex;
	} // for

    } // setSelectedIndexByValue

    setupComboBox(aComboBox, aSource, aSelected) {

	buildComboBoxFromString (aComboBox, aSource);
	setSelectedIndexByValue(aComboBox, aSelected);

    } // setupComboBox

    changeComboBoxInSearchForm(aComboBox, aFilterField, aActionField, aActionValue) {
	
	aFilterField.value = aComboBox.options[aComboBox.selectedIndex].value;
	aActionField.value = aActionValue;
	aComboBox.form.submit();

    } // changeComboBoxInSearchForm

    getNewInputElement(aID) {

        var vInput = document.createElement("input");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%");

        return vInput;

    } // getNewInputElement

    getNewTextAreaElement(aID) {

        var vInput = document.createElement("textarea");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%;height:100%;");

        return vInput;

    } // getNewTextAreaElement
    
    genCellOnRow(aRow, aIndex){
        
        var vCell = aRow.insertCell(-1);
        
        //vCell.innerHTML = "aaaaaaaaaaa";
        var vInput = this.getNewTextAreaElement(aRow.id+"."+aIndex.toString());
        vCell.appendChild(vInput);

        return vCell;
        
    } // genCellOnRow

    genTableContent(aID){
        
        var vTable = document.getElementById(aID);
        
        for (var vIndex = 0; vIndex < 20; vIndex++) { 
            
            var vRow = vTable.insertRow(-1);
            
            vRow.id = vIndex.toString();
            
            this.genCellOnRow(vRow, 1);
            this.genCellOnRow(vRow, 2);
            this.genCellOnRow(vRow, 3);
            
        } // for
        
    } // genTableContent

    getCreatedElement(aDocument, aOwner, aTagName){
        
        var vElement = aDocument.createElement(aTagName);
        
        aOwner.appendChild(vElement);
        
        return vElement;
        
    } // getCreatedElement

    getCreatedTable(aDocument, aOwner){
        
        var vTable = aDocument.createElement("table");
        
        aOwner.appendChild(vTable);
        
        return vTable;
        
    } // getCreatedTable

    getCreatedButton(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "button");}
    
    getCreatedDiv(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "div");}

    deleteAllChildElement(aOwner){
        
        if (aOwner)
            if (aOwner.hasChildNodes())
                while(aOwner.firstChild) {aOwner.removeChild(aOwner.firstChild);}
            
    } // deleteAllChildElement

    getURLParams() {
        
        var result = {};
        var tmp = [];

        location.search
            .substr (1)
            .split ("&")
            .forEach (function (item) 
            {
                tmp = item.split ("=");
                result [tmp[0]] = decodeURIComponent (tmp[1]);
            });

        return result;
    } // getURLParams

    getURLParam(aName){return this.getURLParams()[aName];}
    
    hasURLParam(aName){return this.getURLParam(aName) ? true : false;}
    
} // Ac4yHTMLElementHandler
/*
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}
*/
class Ac4yJSONHandler {
    
    isValid(aJSONString){

        try {
            
            var vObject = JSON.parse(aJSONString);
            
            return true;
            
        } catch(exception){return false;}        
        
    } // isValid
    
    serialized(aObject){return JSON.stringify(JSON.decycle(aObject));}
    
    deserialized(aJSONString){return JSON.parse(aJSONString);};
    
    tryDeserialize(aJSONString){
        
        if (this.isValid(aJSONString))
            return JSON.parse(aJSONString);
        else
            return {warning: "Ă©rvĂ©nytelen objektum"};
    
    }; // tryDeserialize
    
} // Ac4yJSONHandler
/*
            function stringify(obj, replacer, spaces, cycleReplacer) {
              return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
            }

            function serializer(replacer, cycleReplacer) {
              var stack = [], keys = []

              if (cycleReplacer == null) cycleReplacer = function(key, value) {
                if (stack[0] === value) return "[Circular ~]"
                return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
              }

              return function(key, value) {
                if (stack.length > 0) {
                  var thisPos = stack.indexOf(this)
                  ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
                  ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
                  if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
                }
                else stack.push(value)

                return replacer == null ? value : replacer.call(this, key, value)
              }
            } 
*/
class Ac4yDOMHandler {

    element(aID){
        return document.getElementById(aID);
    }
    
    buildComboBoxFromString( aSelectElement, aSelectelementsInStringList) {

	vStringArray = aSelectelementsInStringList.split(',');

	for ( var vIndex = 0; vIndex < vStringArray.length; vIndex++) {
		aSelectElement.options[aSelectElement.options.length] = new Option(vStringArray[vIndex], vStringArray[vIndex]);
	}

    } // buildComboBoxFromString

    setSelectedIndexByValue(aSelectElement, aValue) {

	for ( var vIndex = 0; vIndex < aSelectElement.options.length; vIndex++) {
		if (aSelectElement.options[vIndex].value == aValue)
			aSelectElement.selectedIndex = vIndex;
	} // for

    } // setSelectedIndexByValue

    setupComboBox(aComboBox, aSource, aSelected) {

	buildComboBoxFromString (aComboBox, aSource);
	setSelectedIndexByValue(aComboBox, aSelected);

    } // setupComboBox

    changeComboBoxInSearchForm(aComboBox, aFilterField, aActionField, aActionValue) {
	
	aFilterField.value = aComboBox.options[aComboBox.selectedIndex].value;
	aActionField.value = aActionValue;
	aComboBox.form.submit();

    } // changeComboBoxInSearchForm

    getNewInputElement(aID) {

        var vInput = document.createElement("input");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%");

        return vInput;

    } // getNewInputElement

    getNewTextAreaElement(aID) {

        var vInput = document.createElement("textarea");

        vInput.id 		= aID;

        vInput.setAttribute("style","width:100%;height:100%;");

        return vInput;

    } // getNewTextAreaElement
    
    genCellOnRow(aRow, aIndex){
        
        var vCell = aRow.insertCell(-1);
        
        //vCell.innerHTML = "aaaaaaaaaaa";
        var vInput = this.getNewTextAreaElement(aRow.id+"."+aIndex.toString());
        vCell.appendChild(vInput);

        return vCell;
        
    } // genCellOnRow

    genTableContent(aID){
        
        var vTable = document.getElementById(aID);
        
        for (var vIndex = 0; vIndex < 20; vIndex++) { 
            
            var vRow = vTable.insertRow(-1);
            
            vRow.id = vIndex.toString();
            
            this.genCellOnRow(vRow, 1);
            this.genCellOnRow(vRow, 2);
            this.genCellOnRow(vRow, 3);
            
        } // for
        
    } // genTableContent

    getCreatedElement(aDocument, aOwner, aTagName){
        
        var vElement = aDocument.createElement(aTagName);
        
        aOwner.appendChild(vElement);
        
        return vElement;
        
    } // getCreatedElement

    getCreatedTable(aDocument, aOwner){
        
        var vTable = aDocument.createElement("table");
        
        aOwner.appendChild(vTable);
        
        return vTable;
        
    } // getCreatedTable

    getCreatedButton(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "button");}
    
    getCreatedDiv(aDocument, aOwner){return this.getCreatedElement(aDocument, aOwner, "div");}

    deleteAllChildElement(aOwner){
        
        if (aOwner)
            if (aOwner.hasChildNodes())
                while(aOwner.firstChild) {aOwner.removeChild(aOwner.firstChild);}
            
    } // deleteAllChildElement

    getURLParams() {
        
        var result = {};
        var tmp = [];

        location.search
            .substr (1)
            .split ("&")
            .forEach (function (item) 
            {
                tmp = item.split ("=");
                result [tmp[0]] = decodeURIComponent (tmp[1]);
            });

        return result;
    } // getURLParams

    getURLParam(aName){return this.getURLParams()[aName];}
    
    hasURLParam(aName){return this.getURLParam(aName) ? true : false;}
    
    activateWidget(aWidget){aWidget.disabled=false;}
    inactivateWidget(aWidget){aWidget.disabled=true;}
    
    showWidget(aWidget){aWidget.hidden=0;}
    hideWidget(aWidget){aWidget.hidden=1;}
    
    setID(aWidget, aID){aWidget.id=aID;}
    getID(aWidget){return aWidget.id;}
    
} // Ac4yDOMHandler
class Ac4yVideoUtility{

    setLocalCamera(aVideoElement){

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then( ( aStream => {
                aVideoElement.src = window.URL.createObjectURL(aStream); 
            }))
            .catch( ( aReason => {
                console.error("ERROR in startup",new String(aReason));
            }));

    } // setLocalCamera
    
} // Ac4yVideoUtility

        
/*
    cycle.js
    2017-02-07

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

// The file uses the WeakMap feature of ES6.

/*jslint es6, eval */

/*property
    $ref, decycle, forEach, get, indexOf, isArray, keys, length, push,
    retrocycle, set, stringify, test
*/

if (typeof JSON.decycle !== "function") {
    JSON.decycle = function decycle(object, replacer) {
        "use strict";

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form

//      {"$ref": PATH}

// where the PATH is a JSONPath string that locates the first occurance.

// So,

//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));

// produces the string '[{"$ref":"$"}]'.

// If a replacer function is provided, then it will be called for each value.
// A replacer function receives a value and returns a replacement value.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child element or
// property.

        var objects = new WeakMap();     // object to path mappings

        return (function derez(value, path) {

// The derez function recurses through the object, producing the deep copy.

            var old_path;   // The path of an earlier occurance of value
            var nu;         // The new object or array

// If a replacer function was provided, then call it to get a replacement value.

            if (replacer !== undefined) {
                value = replacer(value);
            }

// typeof null === "object", so go on if this value is really an object but not
// one of the weird builtin objects.

            if (
                typeof value === "object" && value !== null &&
                !(value instanceof Boolean) &&
                !(value instanceof Date) &&
                !(value instanceof Number) &&
                !(value instanceof RegExp) &&
                !(value instanceof String)
            ) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a {"$ref":PATH} object. This uses an
// ES6 WeakMap.

                old_path = objects.get(value);
                if (old_path !== undefined) {
                    return {$ref: old_path};
                }

// Otherwise, accumulate the unique value and its path.

                objects.set(value, path);

// If it is an array, replicate the array.

                if (Array.isArray(value)) {
                    nu = [];
                    value.forEach(function (element, i) {
                        nu[i] = derez(element, path + "[" + i + "]");
                    });
                } else {

// If it is an object, replicate the object.

                    nu = {};
                    Object.keys(value).forEach(function (name) {
                        nu[name] = derez(
                            value[name],
                            path + "[" + JSON.stringify(name) + "]"
                        );
                    });
                }
                return nu;
            }
            return value;
        }(object, "$"));
    };
}


if (typeof JSON.retrocycle !== "function") {
    JSON.retrocycle = function retrocycle($) {
        "use strict";

// Restore an object that was reduced by decycle. Members whose values are
// objects of the form
//      {$ref: PATH}
// are replaced with references to the value found by the PATH. This will
// restore cycles. The object will be mutated.

// The eval function is used to locate the values described by a PATH. The
// root object is kept in a $ variable. A regular expression is used to
// assure that the PATH is extremely well formed. The regexp contains nested
// * quantifiers. That has been known to have extremely bad performance
// problems on some browsers for very long strings. A PATH is expected to be
// reasonably short. A PATH is allowed to belong to a very restricted subset of
// Goessner's JSONPath.

// So,
//      var s = '[{"$ref":"$"}]';
//      return JSON.retrocycle(JSON.parse(s));
// produces an array containing a single element which is the array itself.

        var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\([\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

        (function rez(value) {

// The rez function walks recursively through the object looking for $ref
// properties. When it finds one that has a value that is a path, then it
// replaces the $ref object with a reference to the value that is found by
// the path.

            if (value && typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (element, i) {
                        if (typeof element === "object" && element !== null) {
                            var path = element.$ref;
                            if (typeof path === "string" && px.test(path)) {
                                value[i] = eval(path);
                            } else {
                                rez(element);
                            }
                        }
                    });
                } else {
                    Object.keys(value).forEach(function (name) {
                        var item = value[name];
                        if (typeof item === "object" && item !== null) {
                            var path = item.$ref;
                            if (typeof path === "string" && px.test(path)) {
                                value[name] = eval(path);
                            } else {
                                rez(item);
                            }
                        }
                    });
                }
            }
        }($));
        return $;
    };
}


class Ac4yObjectAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yObjectAlgebra();

    } // createSelf

    setAc4yIdentification(aAc4yIdentification) {
        this.ac4yIdentification = aAc4yIdentification;
    }
    getAc4yIdentification() {
        return this.ac4yIdentification;
    }
    createAc4yIdentification() {
        this.ac4yIdentification = new Ac4yIdentification();
    }
    hasAc4yIdentification() {
        return this.ac4yIdentification != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.ac4yIdentification != undefined) aTarget.setAc4yIdentification(new Ac4yIdentification(aObject.ac4yIdentification));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yObjectAlgebra
class Ac4yObject extends Ac4yObjectAlgebra {
    
    constructor(aObject) {
        
        super(aObject);
        
        if (!this.hasAc4yIdentification())
            this.setAc4yIdentification(new Ac4yIdentification());
        
    } // constructor

    setAc4yIdentification(aAc4yIdentification){this.ac4yIdentification = aAc4yIdentification;}
    getAc4yIdentification(){return this.ac4yIdentification;}    
    
} // Ac4yObject
class Ac4yIdentificationBaseAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yIdentificationBaseAlgebra();

    } // createSelf

    setGUID(aGUID) {
        this.GUID = aGUID;
    }
    getGUID() {
        return this.GUID;
    }
    hasGUID() {
        return this.GUID != undefined;
    }

    setHumanID(aHumanID) {
        this.humanID = aHumanID;
    }
    getHumanID() {
        return this.humanID;
    }
    hasHumanID() {
        return this.humanID != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.GUID != undefined) aTarget.setGUID(aObject.GUID);
            if (aObject.humanID != undefined) aTarget.setHumanID(aObject.humanID);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yIdentificationBaseAlgebra
class Ac4yIdentificationBase extends Ac4yIdentificationBaseAlgebra {
    
    constructor(aObject) {
        
        super(aObject);
        
        if (!this.hasGUID()) 
            this.setGUID(new Ac4yGUIDHandler().getGUID());
        
    } // constructor

} // Ac4yIdentificationBase
class Ac4yIdentificationAlgebra extends Ac4yIdentificationBase {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yIdentificationAlgebra();

    } // createSelf

    setTemplate(aTemplate) {
        this.template = aTemplate;
    }
    getTemplate() {
        return this.template;
    }
    createTemplate() {
        this.template = new Ac4yIdentificationBase();
    }
    hasTemplate() {
        return this.template != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.template != undefined) aTarget.setTemplate(new Ac4yIdentificationBase(aObject.template));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yIdentificationAlgebra
class Ac4yIdentification extends Ac4yIdentificationAlgebra {
   
    constructor(aObject) {
        
        super(aObject);
        
        //this.createTemplate(new Ac4yIdentificationBase());
        if (!this.createTemplate()) this.createTemplate();
        
    } // constructor

} // Ac4yIdentification

class Ac4yAlgebra extends Ac4yObject {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yAlgebra();

    } // createSelf


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {


        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yAlgebra
class Ac4y extends Ac4yAlgebra {

    getGUID(){return this.getAc4yIdentification().getGUID();};
    setGUID(aGUID){return this.getAc4yIdentification().setGUID(aGUID);};
    
    getHumanID(){return this.getAc4yIdentification().getGUID();};
    setHumanID(aHumanID){return this.getAc4yIdentification().setHumanID(aHumanID);};
    
} // Ac4y
        
class Ac4yNamedContainer {

    constructor(){
        
        this.container          = [];
        this.nameContainer      = [];
        this.objectContainer    = [];
        
    }
    
    add(aName, aObject){

        this.container.push ( new Ac4yNamedObject ( aName, aObject ) );
        this.objectContainer.push ( aObject );
        this.nameContainer.push ( aName );
		
    } // add
    
    aggregate(aName, aObject){

		//console.log(this);
	
		if (this.doesExist(aName)){
			
			var vObject = this.getObject(aName);
			
			vObject = vObject + aObject;
			
			this.setObject(aName, vObject);
			
		}
		else
			this.add(aName, aObject);
		
		//console.log(this);
		
    } // aggregate
    
    set(aName, aObject){

		if (!this.doesExist(aName))
			this.add(aName, aObject);
		
    } // set

    getContainer () {
        return this.container;
    }

    getObjectContainer() {
        return this.objectContainer;
    }

    setObjectContainer ( aContainer ) {
        this.objectContainer = aContainer;
    }

    getNameContainer() {
        return this.nameContainer;
    }

    getLength() {
        return this.container.length;
    }
    
    getIndex(aName) {
		// name in target ? target[name] : 37;
                
		var vFound = false;
		var vIndex = 0;
		
		while ( ( vIndex < this.container.length ) && !vFound ) {
			
            var vAc4yNamedObject = this.container[vIndex];
			var vName		 = vAc4yNamedObject.getName();

			if 	(vAc4yNamedObject)
				if 	(vAc4yNamedObject instanceof Ac4yNamedObject)
					if ( vName === aName )
					vFound = true;

            if  (!vFound)
                vIndex++;
				
		} // while

        if  ( vFound )
    		return vIndex;
        else
            return -1;               

	} // getIndex

    doesExist (aName) {
        return this.getIndex ( aName ) != -1;
    }

    getObject ( aName ) {
        
        if  ( this.doesExist ( aName ) )
            return  this.container [ this.getIndex ( aName ) ].getObject();
        else            
            return null;
        
    } // getObject        

    get(aName){
        
        if  ( this.doesExist ( aName ) )
            return  this.container [ this.getIndex ( aName ) ].getObject();
        else            
            return null;
        
    } // getObject        

    setObject (aName, aObject) {
        
        if  (this.doesExist (aName))
            this.container [ this.getIndex (aName) ].setObject(aObject);
        
    } // setObject        

    getObjectByIndex ( aIndex ) {
        
        if ( aIndex <= this.getLength() )
            return  this.container [ aIndex ].getObject();
        else            
            return null;

	} // getObjectByIndex

    getNameByIndex ( aIndex ) {
        
        if ( aIndex <= this.getLength() )
            return  this.container [ aIndex ].getName();
        else            
            return null;

	} // getNameByIndex

    sort() {

        this.nameContainer.sort();
        
    } // sort

    getIndexFromKey ( aKey ) {

        var vTempArray = [];
        vTempArray = aKey.split ( "@" );

        return parseFloat ( vTempArray [1] );

    } // getIndexFromKey
    
    rebuildObjectContainer() {

        this.objectContainer = [];
    
        for ( var vIndex = 0; vIndex < this.getLength(); vIndex++ ) {
            
            vKey = this.nameContainer [ vIndex ];

            vOrderNumber = this.getIndexFromKey ( vKey );
            
            this.objectContainer.push ( this.getObjectByIndex ( vOrderNumber ) );
    
        } // for
        
    } // rebuildObjectContainer
	
    deleteByIndex(aIndex){

        this.container.slice(aIndex, 1);
        this.objectContainer.slice(aIndex, 1);
        this.nameContainer.slice(aIndex, 1);

    } // deleteByIndex

    deleteByName(aName){

            if 	(this.doesExist(aName))
                    this.deleteByIndex(this.getIndex(aName));			

    } // deleteByName

    empty(){

            this.container 			= [];
    this.objectContainer 	= [];
    this.nameContainer 		= [];

    } // empty

    getAggregationByAc4yNamedContainerFromInstanceSet(aInstanceSet, aAggregator, aContext){

            var vContainer  = new Ac4yNamedContainer();

            aInstanceSet.forEach(function(vInstance) {

                    aAggregator(vContainer, vInstance, aContext);

            });

            return vContainer;

    } // getAggregationByAc4yNamedContainerFromInstanceSet

    getArrayFromInstanceSet(aInstanceSet, aTransformer, aContext){

            var vArray = [];

            aInstanceSet.forEach(function(vInstance) {

                    aTransformer(vArray, vInstance, aContext);

            });

            return vArray;

    } // getArrayFromInstanceSet

    getArrayFromAc4yNamedContainer(aContainer, aTransformer, aContext){

            var vArray = [];

            aContainer.getContainer().forEach(function(vAc4yNamedObject) {

                    aTransformer(vArray, vAc4yNamedObject, aContext);

            });

            return vArray;

    } // getArrayFromAc4yNamedContainer

    nameTransformer(aArray, aAc4yNamedObject){aArray.push(aAc4yNamedObject.getName());}
	
} // Ac4yNamedContainer
class Ac4yListNodeAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yListNodeAlgebra();

    } // createSelf

    setElement(aElement) {
        this.element = aElement;
    }
    getElement() {
        return this.element;
    }
    createElement() {
        this.element = new Array();
    }
    hasElement() {
        return this.element != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.element != undefined) aTarget.setElement(new Array(aObject.element));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yListNodeAlgebra
class Ac4yListNode extends Ac4yListNodeAlgebra {

    constructor(aObject) {
        
        super(aObject);

        if (!this.hasElement())
            this.create();

    } // constructor 

    set(aElement){this.element = aElement;}
    get(){return this.element;}
    create(){this.set([]);};
    has(){return this.element ? true : false;}
    
    addElement(aElement){this.get().push(aElement);}
    
    delete(aIndex){
        delete this.get()[aIndex]; 
        this.set(this.getCleaned());
    } //delete

    getLength(){return this.element.length;}

    isEmpty(){return this.element.length===0 ? true : false;}
    
    getByIndex(aIndex){return this.get()[aIndex];}
    
    getElement(aElement){return this.getByIndex(this.getIndex(aElement));}
    
    getByName(aName){return this.getByIndex(this.getIndexByName(aName));}

    getFirstIndex(){return 0;}

    getLastIndex(){return this.element.length-1;}

    getFirst(){return this.get()[this.getFirstIndex()];}
    
    getLast(){return this.get()[this.getLastIndex()];}    

    doesExistByName(aName){return this.getIndexByName(aName)!==-1;}

    getIndex(aElement){

        return this.get().findIndex(
                                function(vElement){
                                    return vElement===aElement;
                                }
                            );
        
    } // getIndex

    getIndexByName(aName){

        return this.get().findIndex(
                                function(aElement){
                                    return aElement.getName()===aName;
                                }
                            );
        
    } // getIndexByName

    getIndexByGUID(aGUID){

        return this.get().findIndex(
                                function(aElement){
                                    //return aElement.getAc4yIdentification().getGUID()===aGUID;
                                    return aElement.ac4yIdentification.GUID===aGUID;
                                }
                            );
        
    } // getIndexByGUID

    getIndexByHumanID(aHumanID){

        return this.get().findIndex(
                                function(aElement){
                                    return aElement.getAc4yIdentification().getHumanID()===aHumanID;
                                }
                            );
        
    } // getIndexByName

    doesExistByGUID(aGUID){return this.getIndexByGUID(aGUID)!==-1;}

    getByGUID(aGUID){return this.getByIndex(this.getIndexByGUID(aGUID));}
    
    deleteByGUID(aGUID){return this.delete(this.getIndexByGUID(aGUID));}

    doesExistByHumanID(aHumanID){return this.getIndexByHumanID(aHumanID)!==-1;}

    getByHumanID(aHumanID){return this.getByIndex(this.getIndexByHumanID(aHumanID));}

    getOppositeIndex(aIndex){return aIndex === 0 ? 1 : 0;}

    getCleaned(){return this.get().filter(function (aElement) {return (aElement);});}

    forEach(aProcess){this.get().forEach(aProcess)};

} // Ac4yListNode

class Ac4yEcosystemMemberConstant {
    
    constructor() {

        this.MESSENGER = "messsenger";
        this.PARAMETER = "parameter";
        this.ENVIRONMENT = "environment";
        this.UI = "UI";
        this.LOG = "log";
        this.LOGIC = "logic";
        this.COMMANDER = "commander";
        this.SERVICE = "service";
        this.API = "api";
        this.HIBERNATOR = "hibernator";
        this.PERSISTOR = "persistor";
        this.SESSION = "session";
        this.CONDUCTOR = "conductor";
        this.INFORMATOR = "informator";

    } // constructor
    
} // Ac4yEcosystemMemberConstant
class Ac4yEcosystemAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yEcosystemAlgebra();

    } // createSelf

    setMember(aMember) {
        this.member = aMember;
    }
    getMember() {
        return this.member;
    }
    createMember() {
        this.member = new Ac4yEcosystemMemberSet();
    }
    hasMember() {
        return this.member != undefined;
    }

    setName(aName) {
        this.name = aName;
    }
    getName() {
        return this.name;
    }
    hasName() {
        return this.name != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.member != undefined) aTarget.setMember(new Ac4yEcosystemMemberSet(aObject.member));
            if (aObject.name != undefined) aTarget.setName(aObject.name);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yEcosystemAlgebra
class Ac4yEcosystem extends Ac4yEcosystemAlgebra {
    
    constructor(){
        
        super();

        if (!this.hasMember()) this.createMember();
        
    } // constructor

    createSelf(object) {return new Ac4yEcosystem(object);}

    messenger(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().MESSENGER);};
    log(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().LOG);};
    UI(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().UI);};
    logic(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().LOGIC);};
    commander(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().COMMANDER);};
    service(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().SERVICE);};
    api(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().API);};
    parameter(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().PARAMETER);};
    hibernator(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().HIBERNATOR);};
    persistor(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().PERSISTOR);};
    environment(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().ENVIRONMENT);};
    session(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().SESSION);};
    conductor(){return this.getMember().getService(new Ac4yEcosystemMemberConstant().CONDUCTOR);};

    setEcosystemInMembers(){
        
        this.getMember().get().forEach( (aElement) => {
            
            aElement.setEcosystem(this);
            
        })
    
    }; // setEcosystemInMembers
    
    addMember(aMember){this.getMember().addElement(aMember);}
    addService(aClassID, aService){this.getMember().addService(aClassID, aService);}
    addInstance(aClassID, aObjectID, aInstance){this.getMember().addInstance(aClassID, aObjectID, aInstance);}
    
} // Ac4yEcosystem
class Ac4yEcosystemMemberAlgebra extends Ac4y {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf(object) {
        return new Ac4yEcosystemMemberAlgebra(object);

    } // createSelf

    setEcosystem(aEcosystem) {
        this.ecosystem = aEcosystem;
    }
    getEcosystem() {
        return this.ecosystem;
    }
    createEcosystem() {
        this.ecosystem = new Ac4yEcosystem();
    }
    hasEcosystem() {
        return this.ecosystem != undefined;
    }

    setParent(aParent) {
        this.parent = aParent;
    }
    getParent() {
        return this.parent;
    }
    createParent() {
        this.parent = new Object();
    }
    hasParent() {
        return this.parent != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.ecosystem != undefined) aTarget.setEcosystem(new Ac4yEcosystem(aObject.ecosystem));
            if (aObject.parent != undefined) aTarget.setParent(new Object(aObject.parent));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yEcosystemMemberAlgebra
class Ac4yEcosystemMember extends Ac4yEcosystemMemberAlgebra {
    
    constructor(aObject){
        
        super(aObject);
        /*
        this.createInformator();
        this.getInformator().setupScheduler(this);
      */  
    } // constructor
    
    getStarGate(){return this.getEcosystem();};
    getWormhole(){return this.getEcosystem();}; // rosen bridge
    getPassageway4OtherUniverse(){return this.getEcosystem();}; //gateway
    getInterstellarGateway(){return this.getEcosystem();}; //gateway
    getRehibernator(){};
    
    informator(){return this.getInformator();}
    bigbrother(){return this.informator();}
    
    //getInformationObject(){return this;}
    
    lightweight(){
        
        var lightweight = this.getNewFromObject(this);
        
        lightweight.setEcosystem(undefined);
        
        return lightweight;
        
    } // lightweight
        
} // Ac4yEcosystemMember
class Ac4yEcosystemMemberSet extends Ac4yListNode {
    
    constructor(){

        super();
        
    } // constructor
    
    getName(aClassID, aObjectID){
        return new Ac4yObjectHandler().default(aObjectID,"singleton service")+"@"+aClassID;
    }
        
    addService(aClassID, aService){
        aService.setHumanID(this.getName(aClassID, new Ac4yEcosystemMemberConstant().SERVICE));
        this.addElement(aService);
    }
    
    getService(aClassID){
        return this.getByHumanID(this.getName(aClassID, new Ac4yEcosystemMemberConstant().SERVICE));
    }
    
    doesExistService(aClassID){
        return this.doesExistByHumanID(this.doesExistByHumanID(aClassID, new Ac4yEcosystemMemberConstant().SERVICE));
    }

    addInstance(aClassID, aObjectID, aInstance){
        this.addElement(this.getName(aClassID, aObjectID), aInstance);
    }
    
    getInstance(aClassID, aObjectID){
        return this.getByHumanID(this.getName(aClassID, aObjectID));
    }
    
    doesExistInstance(aClassID, aObjectID){
        return this.doesExistByHumanID(this.getName(aClassID, aObjectID))
    }
    
} // Ac4yEcosystemMemberSet
       
class Ac4yBulbConstant {
    
    constructor() {

        this.ON = 1;
        this.OFF = 0;
        this.UNDEFINED = -1;

    } // constructor
    
} // Ac4yBulbConstant
class Ac4yBulbAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yBulbAlgebra();

    } // createSelf

    setBulb(aBulb) {
        this.bulb = aBulb;
    }
    getBulb() {
        return this.bulb;
    }
    hasBulb() {
        return this.bulb != undefined;
    }
    isBulb() {
        return this.bulb;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.bulb != undefined) aTarget.setBulb(aObject.bulb);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yBulbAlgebra
class Ac4yBulb extends Ac4yBulbAlgebra {

    constructor(aObject){
        
        super(aObject);
        
        if (!this.hasBulb()) this.reset();
    
    } // constructor

    createSelf() {return new Ac4yBulb();}
    
    set(aValue){
        this.bulb = aValue;}
    get(){return this.bulb;}
    
    switch(){
        
        if (!this.isUndefined()) {
            
            if (this.on())
                this.switchOff();
            else
                this.switchOn();

        } // if
        
    } // switch
    
    switchOn(){
        this.bulb=new Ac4yBulbConstant().ON;}
    switchOff(){
        this.bulb=new Ac4yBulbConstant().OFF;}

    isUndefined(){return this.bulb==new Ac4yBulbConstant().UNDEFINED;}
    
    on(){return this.bulb==new Ac4yBulbConstant().ON;}
    off(){return this.bulb==new Ac4yBulbConstant().OFF;}

    is(){return this.on();}


    light(){return this.on();}
    dark(){return this.off();}
    
    reset(){this.bulb = new Ac4yBulbConstant().UNDEFINED;}

} // Ac4yBulb
                
class Ac4yStateMachineAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yStateMachineAlgebra();

    } // createSelf

    setState(aState) {
        this.state = aState;
    }
    getState() {
        return this.state;
    }
    hasState() {
        return this.state != undefined;
    }

    setStateSetList(aStateSetList) {
        this.stateSetList = aStateSetList;
    }
    getStateSetList() {
        return this.stateSetList;
    }
    createStateSetList() {
        this.stateSetList = new Ac4yStateSetList();
    }
    hasStateSetList() {
        return this.stateSetList != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.state != undefined) aTarget.setState(aObject.state);
            if (aObject.stateSetList != undefined) aTarget.setStateSetList(new Ac4yStateSetList(aObject.stateSetList));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yStateMachineAlgebra
class Ac4yStateSetList extends Ac4yListNode {
    
    constructor(aSet) {
        
        super(aSet);
        
        //if (aSet) this.set(aSet);
        
    } // constructor
    
    addStateSet(aState){this.addElement(new Ac4yStateSet().getNew(aState, new Ac4yDateTimeHandler().getSystemTime()));}
    
    getStateFiltered(aState){
        
        return this.get().filter(
                        function (aStateSet) {
                            return (aStateSet.getState()===aState)
                        }                    
                    );
            
    } // getFiltered
    
    getSortedByState(){
        
        return this.get().sort(
                        function(aStateSetOne, aStateSetOtherOne){
                            return aStateSetOne.getState()>aStateSetOtherOne.getState()
                        }
                ); 
        
    } // getSortedByState

    getReverseSortedByState(){
        
        return this.get().sort(
                        function(aStateSetOne, aStateSetOtherOne){
                            return aStateSetOne.getState()<aStateSetOtherOne.getState()
                        }
                ); 
        
    } // getReverseSortedByState

    getSortedByTimestamp(){
        
        return this.get().sort(
                        function(aStateSetOne, aStateSetOtherOne){
                            return aStateSetOne.getTimestamp()-aStateSetOtherOne.getTimestamp()
                        }
                ); 
        
    } // getSortedByTimestamp

    getReverseSortedByTimestamp(){
        
        return this.get().sort(
                        function(aStateSetOne, aStateSetOtherOne){
                            return aStateSetOtherOne.getTimestamp()-aStateSetOne.getTimestamp()
                        }
                ); 
        
    } // getReverseSortedByTimestamp
    
    getTheYoungest(){return new Ac4yStateSetList(this.getSortedByTimestamp()).getFirst();}
    
    getTheOldest(){return new Ac4yStateSetList(this.getSortedByTimestamp()).getLast();}    
   
    hasOccurenceOfThisState(aState){return !new Ac4yStateSetList(this.getStateFiltered(aState)).isEmpty();}
    
    hasReachedThisState(aState){return this.hasOccurenceOfThisState(aState);}
    
    getTheYoungestOfThisState(aState){
        
        return new Ac4yStateSetList(
                    new Ac4yStateSetList(
                        this.getStateFiltered(aState)
                    ).getSortedByTimestamp()
               ).getLast();
        
    } // getTheYoungestOfThisState
    
    getTheOldestOfThisState(aState){
        
        return new Ac4yStateSetList(
                    new Ac4yStateSetList(
                        this.getStateFiltered(aState)
                    ).getSortedByTimestamp()
               ).getFirst();
        
    } // getTheOldestOfThisState
    
    getTimestampOfTheYoungestOfThisState(aState){return this.getTheYoungestOfThisState(aState).getTimestamp();}

    getTimestampOfTheOldestOfThisState(aState){return this.getTheOldestOfThisState(aState).getTimestamp();}
    
    //console.log(vAc4yStateMachine.getStateSetList().get().sort(function(a, b){return a.timestamp-b.timestamp})); 
    
} // Ac4yStateSetList
class Ac4yStateMachine extends Ac4yStateMachineAlgebra {
    
    constructor(aObject) {

        super(aObject);

        //this.createTransitionList();
        
        if (!this.hasStateSetList()) this.createStateSetList();
        
        if (!this.hasState()) this.born();
        
    } // constructor
    
    createSelf() {
        return new Ac4yStateMachine();

    } // createSelf
    
    setState(aState){ 
        
        super.setState(aState);
        
        if (!this.getStateSetList()) this.createStateSetList();
        
        this.getStateSetList().addStateSet(aState);
    
    } // setState 
    born(){this.setState(new Ac4yStateMachineConstant().BORN);}
    death(){this.setState(new Ac4yStateMachineConstant().DEATH);}
    
    isLive(){return this.getState()!=new Ac4yStateMachineConstant().DEATH;}
    
    recreateStateSetList(){this.clearStateSetList(); this.createStateSetList();}
    
    hasReachedThisState(aState){return this.getStateSetList().hasReachedThisState(aState);}
    
    getShortInformationObjectOfStateSetList(){
        
        return this.getStateSetList().get().map(
                 function(aStateSet){
                     return new Ac4yStateSet().getNewFromObject(aStateSet).getShortInformationObject();
                 }
         ); 
 
    } // getShortInformationObjectOfStateSetList
    
} // Ac4yStateMachine
class Ac4yStateSet {
    
    getNew(aState, aTimestamp, aOrigin) {
        
        var vObject = new Ac4yStateSet();

        if (aState) vObject.setState(aState);
        if (aTimestamp) vObject.setTimestamp(aTimestamp);
        if (aOrigin) vObject.setOrigin(aOrigin);

        return vObject;
        
    } // getNew

    reBuild(aObject, aTarget){
        
        if (aObject) {
        
            if (aObject.state) aTarget.setState(aObject.state);
            if (aObject.timestamp) aTarget.setTimestamp(aObject.timestamp);
            if (aObject.origin) aTarget.setOrigin(aObject.origin);
            
        } // if aObject does not empty

        return aTarget;

    } // reBuild
    
    getNewFromObject(aObject){return this.reBuild(aObject, new Ac4yStateSet());}

    serialized(){return JSON.stringify(this);}
    
    deserialized(aSerialized){return this.getNewFromObject(JSON.parse(aSerialized));}

    hibernate(){
    
        new LocalStorageHandler().put("Ac4yStateSet", new Base64Handler().encode(this.serialized()));
        
    }; // hibernate
    
    rehibernate(){

        this.reBuild(this.deserialized(new Base64Handler().decode(new LocalStorageHandler().get("Ac4yStateSet"))), this);
        
    }; // rehibernate

    getNewFromHibernation(){

        var vObject = new Ac4yStateSet();
        
        vObject.rehibernate();
        
        return vObject;
        
    }; // getNewFromHibernation
    
    setState(aState){this.state = aState;}
    getState(){return this.state;}
    hasState(){return this.state ? true : false;}
    
    setTimestamp(aTimestamp){this.timestamp = aTimestamp;}
    getTimestamp(){return this.timestamp;}
    hasTimestamp(){return this.timestamp ? true : false;}
        
    setOrigin(aOrigin){this.origin = aOrigin;}
    getOrigin(){return this.origin;}
    hasOrigin(){return this.origin ? true : false;}
    
    getShortInformationObject(){
        
        return {
            "stĂˇtusz" : this.getState()
            ,"idĹ‘pont" : new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getTimestamp()))
        };
        
    } // getShortInformationObject
    
} // Ac4yStateSet
class Ac4yStateMachineConstant {
    
    constructor() {

        this.BORN = "born";
        this.DEATH = "death";

    } // constructor
    
} // Ac4yStateMachineConstant
        
class Ac4yLifecycleConstant {
    
    constructor() {

        this.PAUSE = "pause";
        this.LIVE = "live";
        this.STOP = "stop";
        this.ERROR = "error";

    } // constructor
    
} // Ac4yLifecycleConstant
class Ac4yFlowConstant {
    
    constructor() {

        this.TIMEOUT =  "timeout";

    } // constructor
    
} // Ac4yFlowConstant
class Ac4yLifecycleStateMachine extends Ac4yStateMachine {
    
    constructor(aObject) {

        super(aObject);
        
    } // constructor
    
    setPauseState(){this.setState(new Ac4yLifecycleConstant().PAUSE);}
    setStopState(){this.setState(new Ac4yLifecycleConstant().STOP);}
    setLiveState(){this.setState(new Ac4yLifecycleConstant().LIVE);}
    setErrorState(){this.setState(new Ac4yLifecycleConstant().ERROR);}
    
    underPauseState(){return this.getState()===new Ac4yLifecycleConstant().PAUSE;}
    underStopState(){return this.getState()===new Ac4yLifecycleConstant().STOP;}
    underLiveState(){return this.getState()===new Ac4yLifecycleConstant().LIVE;}
    underErrorState(){return this.getState()===new Ac4yLifecycleConstant().ERROR;}
    
    hasReachedThePauseState(){return this.hasReachedThisState(new Ac4yLifecycleConstant().PAUSE);}
    hasReachedTheStopState(){return this.hasReachedThisState(new Ac4yLifecycleConstant().STOP);}
    hasReachedTheLiveState(){return this.hasReachedThisState(new Ac4yLifecycleConstant().LIVE);}
    hasReachedTheErrorState(){return this.hasReachedThisState(new Ac4yLifecycleConstant().ERROR);}
    
} // Ac4yLifecycleStateMachine
class Ac4yFlowStateMachine extends Ac4yLifecycleStateMachine {
    
    constructor(aObject) {

        super(aObject);
        
    } // constructor
    
    setTimeoutState(){this.setState(new Ac4yFlowConstant().TIMEOUT);}
    
    underTimeoutState(){return this.getState()===new Ac4yFlowConstant().TIMEOUT;}
    
    hasReachedTheTimeoutState(){return this.hasReachedThisState(new Ac4yFlowConstant().TIMEOUT);}
    
} // Ac4yFlowStateMachine
        
class Ac4yLifecycleAlgebra extends Ac4y {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yLifecycleAlgebra();

    } // createSelf

    setName(aName) {
        this.name = aName;
    }
    getName() {
        return this.name;
    }
    hasName() {
        return this.name != undefined;
    }

    setStateMachine(aStateMachine) {
        this.stateMachine = aStateMachine;
    }
    getStateMachine() {
        return this.stateMachine;
    }
    createStateMachine() {
        this.stateMachine = new Ac4yLifecycleStateMachine();
    }
    hasStateMachine() {
        return this.stateMachine != undefined;
    }

    setStartTime(aStartTime) {
        this.startTime = aStartTime;
    }
    getStartTime() {
        return this.startTime;
    }
    hasStartTime() {
        return this.startTime != undefined;
    }

    setStopTime(aStopTime) {
        this.stopTime = aStopTime;
    }
    getStopTime() {
        return this.stopTime;
    }
    hasStopTime() {
        return this.stopTime != undefined;
    }

    setLiveIndicator(aLiveIndicator) {
        this.liveIndicator = aLiveIndicator;
    }
    getLiveIndicator() {
        return this.liveIndicator;
    }
    createLiveIndicator() {
        this.liveIndicator = new Ac4yBulb();
    }
    hasLiveIndicator() {
        return this.liveIndicator != undefined;
    }

    setOnCreate(aOnCreate) {
        this.onCreate = aOnCreate;
    }
    getOnCreate() {
        return this.onCreate;
    }
    hasOnCreate() {
        return this.onCreate != undefined;
    }
    _fireOnCreate() {
        this.onCreate();
    };
    _tryFireOnCreate() {
        if (this.onCreate) this._fireOnCreate();
    };

    setOnBorn(aOnBorn) {
        this.onBorn = aOnBorn;
    }
    getOnBorn() {
        return this.onBorn;
    }
    hasOnBorn() {
        return this.onBorn != undefined;
    }
    _fireOnBorn() {
        this.onBorn();
    };
    _tryFireOnBorn() {
        if (this.onBorn) this._fireOnBorn();
    };

    setOnDeath(aOnDeath) {
        this.onDeath = aOnDeath;
    }
    getOnDeath() {
        return this.onDeath;
    }
    hasOnDeath() {
        return this.onDeath != undefined;
    }
    _fireOnDeath() {
        this.onDeath();
    };
    _tryFireOnDeath() {
        if (this.onDeath) this._fireOnDeath();
    };

    setOnStart(aOnStart) {
        this.onStart = aOnStart;
    }
    getOnStart() {
        return this.onStart;
    }
    hasOnStart() {
        return this.onStart != undefined;
    }
    _fireOnStart() {
        this.onStart();
    };
    _tryFireOnStart() {
        if (this.onStart) this._fireOnStart();
    };

    setOnStop(aOnStop) {
        this.onStop = aOnStop;
    }
    getOnStop() {
        return this.onStop;
    }
    hasOnStop() {
        return this.onStop != undefined;
    }
    _fireOnStop() {
        this.onStop();
    };
    _tryFireOnStop() {
        if (this.onStop) this._fireOnStop();
    };

    setOnPause(aOnPause) {
        this.onPause = aOnPause;
    }
    getOnPause() {
        return this.onPause;
    }
    hasOnPause() {
        return this.onPause != undefined;
    }
    _fireOnPause() {
        this.onPause();
    };
    _tryFireOnPause() {
        if (this.onPause) this._fireOnPause();
    };

    setOnContinue(aOnContinue) {
        this.onContinue = aOnContinue;
    }
    getOnContinue() {
        return this.onContinue;
    }
    hasOnContinue() {
        return this.onContinue != undefined;
    }
    _fireOnContinue() {
        this.onContinue();
    };
    _tryFireOnContinue() {
        if (this.onContinue) this._fireOnContinue();
    };

    setOnError(aOnError) {
        this.onError = aOnError;
    }
    getOnError() {
        return this.onError;
    }
    hasOnError() {
        return this.onError != undefined;
    }
    _fireOnError() {
        this.onError();
    };
    _tryFireOnError() {
        if (this.onError) this._fireOnError();
    };


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.name != undefined) aTarget.setName(aObject.name);
            if (aObject.stateMachine != undefined) aTarget.setStateMachine(new Ac4yLifecycleStateMachine(aObject.stateMachine));
            if (aObject.startTime != undefined) aTarget.setStartTime(aObject.startTime);
            if (aObject.stopTime != undefined) aTarget.setStopTime(aObject.stopTime);
            if (aObject.liveIndicator != undefined) aTarget.setLiveIndicator(new Ac4yBulb(aObject.liveIndicator));
            if (aObject.onCreate != undefined) aTarget.setOnCreate(aObject.onCreate);
            if (aObject.onBorn != undefined) aTarget.setOnBorn(aObject.onBorn);
            if (aObject.onDeath != undefined) aTarget.setOnDeath(aObject.onDeath);
            if (aObject.onStart != undefined) aTarget.setOnStart(aObject.onStart);
            if (aObject.onStop != undefined) aTarget.setOnStop(aObject.onStop);
            if (aObject.onPause != undefined) aTarget.setOnPause(aObject.onPause);
            if (aObject.onContinue != undefined) aTarget.setOnContinue(aObject.onContinue);
            if (aObject.onError != undefined) aTarget.setOnError(aObject.onError);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yLifecycleAlgebra
class Ac4yLifecycle extends Ac4yLifecycleAlgebra {
    
    constructor(aObject) {

        super(aObject);

        if (!this.hasLiveIndicator()) this.createLiveIndicator();
        
        if (!this.hasStateMachine()) this.createStateMachine();

        this._tryFireOnCreate();
        
        this._tryFireOnBorn();

    } // constructor
   
   createSelf(object){return new Ac4yLifecycle(object)} 
    start(){

        //console.log("Ac4yLifecycle.start");
        
        this._setStartTimeFromSystemTime();
        
        this.getStateMachine().setLiveState();

        this.getLiveIndicator().switchOn();

        this._tryFireOnStart();
    
    
    }; // start
    
    stop(){
        
        //console.log("Ac4yLifecycle.stop");

        this._setStopTimeFromSystemTime();
        
        this.getStateMachine().setStopState();
        
        this.getLiveIndicator().switchOff();
        
        this._tryFireOnStop();
        
        this._destroy();
    
    }; // stop
    
    pause(){        
        
        //console.log("Ac4yLifecycle.pause");
        
        this.getStateMachine().setPauseState();
        
        this._tryFireOnPause();
        
    }; // pause
    
    continue(){
        
        //console.log("Ac4yLifecycle.continue");
        
        this.getStateMachine().setLiveState();
        
        this._tryFireOnContinue();

    }; // continue
    
    error(){
        
        //console.log("Ac4yLifecycle.error");
        
        this.getStateMachine().setErrorState();
        
        this._tryFireOnError();

    }; // error
    
    _destroy(){
        
        this.getStateMachine().death();
        
        this._tryFireOnDeath();
    }
    
    _setStartTimeFromSystemTime(){this.setStartTime(new Ac4yDateTimeHandler().getSystemTime());};
    
    _setStopTimeFromSystemTime(){this.setStopTime(new Ac4yDateTimeHandler().getSystemTime());};
    
    getRunTime(){return this.getEndTime()-this.getStartTime();};
    
    isLive(){return this.getLiveIndicator().on();}
    
    getThreadID(){return this.getAc4yIdentification().getGUID();};
    
    getInformationObject(){
        
        return {
            "nĂ©v": this.getName()
            ,"elindult": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStartTime()))
            ,"leĂˇllt": (this.hasStopTime() ? new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStopTime())) : "mĂ©g fut")
            ,"futĂˇsidĹ‘ (emp)": (this.hasStopTime() ? this.getStopTime()-this.getStartTime() : "mĂ©g fut")
            ,"dolgozik": this.isLive() 
        };
        
    } // getInformationObject
   
} // Ac4yLifecycle
class Ac4yFlowAlgebra extends Ac4yLifecycle {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yFlowAlgebra();

    } // createSelf

    setStateMachine(aStateMachine) {
        this.stateMachine = aStateMachine;
    }
    getStateMachine() {
        return this.stateMachine;
    }
    createStateMachine() {
        this.stateMachine = new Ac4yFlowStateMachine();
    }
    hasStateMachine() {
        return this.stateMachine != undefined;
    }

    setDuration(aDuration) {
        this.duration = aDuration;
    }
    getDuration() {
        return this.duration;
    }
    hasDuration() {
        return this.duration != undefined;
    }

    setDurationInSecond(aDurationInSecond) {
        this.durationInSecond = aDurationInSecond;
    }
    getDurationInSecond() {
        return this.durationInSecond;
    }
    hasDurationInSecond() {
        return this.durationInSecond != undefined;
    }

    setDurationInMinute(aDurationInMinute) {
        this.durationInMinute = aDurationInMinute;
    }
    getDurationInMinute() {
        return this.durationInMinute;
    }
    hasDurationInMinute() {
        return this.durationInMinute != undefined;
    }

    setTimer(aTimer) {
        this.timer = aTimer;
    }
    getTimer() {
        return this.timer;
    }
    createTimer() {
        this.timer = new Ac4yTimer();
    }
    hasTimer() {
        return this.timer != undefined;
    }

    setOnTimeout(aOnTimeout) {
        this.onTimeout = aOnTimeout;
    }
    getOnTimeout() {
        return this.onTimeout;
    }
    hasOnTimeout() {
        return this.onTimeout != undefined;
    }
    _fireOnTimeout() {
        this.onTimeout();
    };
    _tryFireOnTimeout() {
        if (this.onTimeout) this._fireOnTimeout();
    };


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.stateMachine != undefined) aTarget.setStateMachine(new Ac4yFlowStateMachine(aObject.stateMachine));
            if (aObject.duration != undefined) aTarget.setDuration(aObject.duration);
            if (aObject.durationInSecond != undefined) aTarget.setDurationInSecond(aObject.durationInSecond);
            if (aObject.durationInMinute != undefined) aTarget.setDurationInMinute(aObject.durationInMinute);
            if (aObject.timer != undefined) aTarget.setTimer(new Ac4yTimer(aObject.timer));
            if (aObject.onTimeout != undefined) aTarget.setOnTimeout(aObject.onTimeout);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yFlowAlgebra
class Ac4yFlow extends Ac4yFlowAlgebra {
    
    constructor(aObject){

        //if (!this.hasStateMachine()) this.createStateMachine();

        super(aObject);
 
        if (this.hasDurationInSecond()) this.setDuration(new Ac4yDateTimeHandler().getSecondInMillisecond(this.getDurationInSecond()));
        
        if (this.hasDurationInMinute()) this.setDuration(new Ac4yDateTimeHandler().getMinuteInMillisecond(this.getDurationInMinute()));
 
        if (!this.hasDuration()) 
            this.setDuration(3000);

        this.setTimer(
            new Ac4yTimer({ 
                    name: "timeout timer"
                    ,duration: this.getDuration()
                    ,onTime: ( () => {this.timeout();})
            })
        );

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yFlow");

    } // constructor    

    createSelf() {return new Ac4yFlow();}
    
    start(){
    
        //console.log("Ac4yFlow.start");
    
        this.getTimer().start();

        super.start();
        
    } // start

    stop(){
    
        //console.log("Ac4yFlow.stop");
        
        this.getTimer().stop();
        
        super.stop();
        
    } // stop

    timeout(){
    
        //console.log("Ac4yFlow.timeout");
        
        this.getStateMachine().setTimeoutState();

        this.stop();
        
    } // timeout
    
} // Ac4yFlow
 
class Ac4yTimerAlgebra extends Ac4yLifecycle {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yTimerAlgebra();

    } // createSelf

    setDuration(aDuration) {
        this.duration = aDuration;
    }
    getDuration() {
        return this.duration;
    }
    hasDuration() {
        return this.duration != undefined;
    }

    setDurationInSecond(aDurationInSecond) {
        this.durationInSecond = aDurationInSecond;
    }
    getDurationInSecond() {
        return this.durationInSecond;
    }
    hasDurationInSecond() {
        return this.durationInSecond != undefined;
    }

    setDurationInMinute(aDurationInMinute) {
        this.durationInMinute = aDurationInMinute;
    }
    getDurationInMinute() {
        return this.durationInMinute;
    }
    hasDurationInMinute() {
        return this.durationInMinute != undefined;
    }

    setEndTime(aEndTime) {
        this.endTime = aEndTime;
    }
    getEndTime() {
        return this.endTime;
    }
    hasEndTime() {
        return this.endTime != undefined;
    }

    setTimer(aTimer) {
        this.timer = aTimer;
    }
    getTimer() {
        return this.timer;
    }
    hasTimer() {
        return this.timer != undefined;
    }

    setOnTime(aOnTime) {
        this.onTime = aOnTime;
    }
    getOnTime() {
        return this.onTime;
    }
    hasOnTime() {
        return this.onTime != undefined;
    }
    _fireOnTime() {
        this.onTime();
    };
    _tryFireOnTime() {
        if (this.onTime) this._fireOnTime();
    };


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.duration != undefined) aTarget.setDuration(aObject.duration);
            if (aObject.durationInSecond != undefined) aTarget.setDurationInSecond(aObject.durationInSecond);
            if (aObject.durationInMinute != undefined) aTarget.setDurationInMinute(aObject.durationInMinute);
            if (aObject.endTime != undefined) aTarget.setEndTime(aObject.endTime);
            if (aObject.timer != undefined) aTarget.setTimer(aObject.timer);
            if (aObject.onTime != undefined) aTarget.setOnTime(aObject.onTime);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yTimerAlgebra
        
class Ac4yTimer extends Ac4yTimerAlgebra {
     
    constructor(aObject){

        super(aObject);
 
        if (this.hasDurationInSecond()) this.setDuration(new Ac4yDateTimeHandler().getSecondInMillisecond(this.getDurationInSecond()));
        
        if (this.hasDurationInMinute()) this.setDuration(new Ac4yDateTimeHandler().getMinuteInMillisecond(this.getDurationInMinute()));
        
    } // constructor
    
    
    createSelf() {return new Ac4yTimer();}
    
    getNewTimer(){
        
        var vThis4RemoteCall=this;
        
        return setTimeout(function(){ 
                    vThis4RemoteCall.time();
                    }, this.getDuration()
                );
        
    }; // getNewTimer

    getRemainingTime(){
        
        if (this.isLive())
            return this.getEndTime()-new Ac4yDateTimeHandler().getSystemTime();
        else
            return 0;
    
    }; // getRemainingTime
    
    getEstimatedRunTime(){
        
        if (this.isLive())
            return this.getEndTime()-this.getStartTime();
        else
            return 0;
        
    }; // getEstimatedRunTime
    
    start(){

        super.start();

        this.setTimer(this.getNewTimer());
        
        this.setEndTime(this.getStartTime()+this.getDuration());
        
    }; // start
    
    stop(){
        
        super.stop();

        clearTimeout(this.getTimer());
        
    }; // stop
    
    time(){
        
        this.getLiveIndicator().switchOff();
        
        this._setStopTimeFromSystemTime();

        this._tryFireOnTime();
        
//        this.stop();
        
    }; // time
    
    getInformationObject(){
        
        return {
            "nĂ©v": this.getName()
            ,"ĂĽtemezett idĹ‘": this.getDuration()
            ,"ĂĽtemezett idĹ‘ (mp)": new Ac4yDateTimeHandler().getMillisecondInSecond(this.getDuration())
            ,"elindult": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStartTime()))
            ,"befezĂ©s": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getEndTime()))
            ,"leĂˇllt": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStopTime()))
            ,"hĂˇtralĂ©vĹ‘ idĹ‘": this.getRemainingTime()
            ,"hĂˇtralĂ©vĹ‘ idĹ‘ (mp)": new Ac4yDateTimeHandler().getMillisecondInSecond(this.getRemainingTime())
            ,"dolgozik": this.isLive()
        };
        
    } // getInformationObject
    
    getShortInformationObject(){
        
        return {
            "idĹ‘zĂ­tĹ‘ neve" : this.getName()
            ,"hĂˇtralĂ©vĹ‘ idĹ‘ (mp)" : 
               this.isLive() ? new Ac4yDateTimeHandler().getMillisecondInSecond(
                                        this.getRemainingTime()
                                ) : "nem ĂĽzemel"
        };
        
    } // getShortInformationObject
    
} // Ac4yTimer
class Ac4yTimerConstant {
    
    constructor() {

        this.ONCREATE = "oncreate";
        this.ONSTART = "onstart";
        this.ONSTOP = "onstop";
        this.ONPAUSE = "onpause";
        this.ONCONTINUE = "oncontinue";
        this.ONTIMEISOVER = "ontimeisover";

    } // constructor
    
} // Ac4yStateMachineConstant
        
class Ac4ySchedulerAlgebra extends Ac4yLifecycle {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4ySchedulerAlgebra();

    } // createSelf

    setFrequency(aFrequency) {
        this.frequency = aFrequency;
    }
    getFrequency() {
        return this.frequency;
    }
    hasFrequency() {
        return this.frequency != undefined;
    }

    setFrequencyInSecond(aFrequencyInSecond) {
        this.frequencyInSecond = aFrequencyInSecond;
    }
    getFrequencyInSecond() {
        return this.frequencyInSecond;
    }
    hasFrequencyInSecond() {
        return this.frequencyInSecond != undefined;
    }

    setFrequencyInMinute(aFrequencyInMinute) {
        this.frequencyInMinute = aFrequencyInMinute;
    }
    getFrequencyInMinute() {
        return this.frequencyInMinute;
    }
    hasFrequencyInMinute() {
        return this.frequencyInMinute != undefined;
    }

    setScheduler(aScheduler) {
        this.scheduler = aScheduler;
    }
    getScheduler() {
        return this.scheduler;
    }
    hasScheduler() {
        return this.scheduler != undefined;
    }

    setRunCounter(aRunCounter) {
        this.runCounter = aRunCounter;
    }
    getRunCounter() {
        return this.runCounter;
    }
    hasRunCounter() {
        return this.runCounter != undefined;
    }

    setOnTime(aOnTime) {
        this.onTime = aOnTime;
    }
    getOnTime() {
        return this.onTime;
    }
    hasOnTime() {
        return this.onTime != undefined;
    }
    _fireOnTime() {
        this.onTime();
    };
    _tryFireOnTime() {
        if (this.onTime) this._fireOnTime();
    };


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.frequency != undefined) aTarget.setFrequency(aObject.frequency);
            if (aObject.frequencyInSecond != undefined) aTarget.setFrequencyInSecond(aObject.frequencyInSecond);
            if (aObject.frequencyInMinute != undefined) aTarget.setFrequencyInMinute(aObject.frequencyInMinute);
            if (aObject.scheduler != undefined) aTarget.setScheduler(aObject.scheduler);
            if (aObject.runCounter != undefined) aTarget.setRunCounter(aObject.runCounter);
            if (aObject.onTime != undefined) aTarget.setOnTime(aObject.onTime);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4ySchedulerAlgebra
        
class Ac4yScheduler extends Ac4ySchedulerAlgebra {
    
    constructor(aObject){

        super(aObject);

        if (this.hasFrequencyInSecond()) this.setFrequency(new Ac4yDateTimeHandler().getSecondInMillisecond(this.getFrequencyInSecond()));
        
        if (this.hasFrequencyInMinute()) this.setFrequency(new Ac4yDateTimeHandler().getMinuteInMillisecond(this.getFrequencyInMinute()));
        
        this._resetRunCounter();

    } // constructor
    
    _getNewScheduler(){return setInterval( () => {this.time();}, this.getFrequency());};
    
    _resetRunCounter(){this.runCounter=0;}
    _increaseRunCounter(){this.runCounter+=1;};
    
    start(){

        super.start();

        this.setScheduler(this._getNewScheduler());

    }; // start
    
    stop(){
        
        super.stop();
        
        clearInterval(this.getScheduler()); 
        
    }; // stop
    
    time(){
        
        this._increaseRunCounter();
        this._tryFireOnTime();

    }; // time
    
    getInformationObject(){
        
        return {
            "nĂ©v": this.getName()
            ,"elindult": new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStartTime()))
            ,"leĂˇllt": (this.hasStopTime() ? new Ac4yDateTimeHandler().getDateTimeExternalFormat(new Date(this.getStopTime())) : "mĂ©g fut")
            ,"futĂˇsidĹ‘ (emp)": (this.hasStopTime() ? this.getStopTime()-this.getStartTime() : "mĂ©g fut")
            ,"dolgozik": this.isLive() 
            ,"ĂĽtemezett idĹ‘": this.getFrequency()
            ,"ĂĽtemezett idĹ‘ (mp)": new Ac4yDateTimeHandler().getMillisecondInSecond(this.getFrequency())
            ,"futĂˇsok szĂˇma": this.getRunCounter()
        };
         
    } // getInformationObject
    
} // Ac4yScheduler
class Ac4ySchedulerConstant {
    
    constructor() {

        this.ONCREATE = "oncreate";
        this.ONSTART = "onstart";
        this.ONSTOP = "onstop";
        this.ONTIME = "ontime";

    } // constructor
    
} // Ac4ySchedulerConstant




class Ac4yStatelessServiceAlgebra extends Ac4y {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yStatelessServiceAlgebra();

    } // createSelf

    setOnStart(aOnStart) {
        this.onStart = aOnStart;
    }
    getOnStart() {
        return this.onStart;
    }
    hasOnStart() {
        return this.onStart != undefined;
    }
    _fireOnStart() {
        this.onStart();
    };
    _tryFireOnStart() {
        if (this.onStart) this._fireOnStart();
    };

    setOnRequest(aOnRequest) {
        this.onRequest = aOnRequest;
    }
    getOnRequest() {
        return this.onRequest;
    }
    hasOnRequest() {
        return this.onRequest != undefined;
    }
    _fireOnRequest() {
        this.onRequest();
    };
    _tryFireOnRequest() {
        if (this.onRequest) this._fireOnRequest();
    };

    setOnCommit(aOnCommit) {
        this.onCommit = aOnCommit;
    }
    getOnCommit() {
        return this.onCommit;
    }
    hasOnCommit() {
        return this.onCommit != undefined;
    }
    _fireOnCommit() {
        this.onCommit();
    };
    _tryFireOnCommit() {
        if (this.onCommit) this._fireOnCommit();
    };

    setOnRollback(aOnRollback) {
        this.onRollback = aOnRollback;
    }
    getOnRollback() {
        return this.onRollback;
    }
    hasOnRollback() {
        return this.onRollback != undefined;
    }
    _fireOnRollback() {
        this.onRollback();
    };
    _tryFireOnRollback() {
        if (this.onRollback) this._fireOnRollback();
    };


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.onStart != undefined) aTarget.setOnStart(aObject.onStart);
            if (aObject.onRequest != undefined) aTarget.setOnRequest(aObject.onRequest);
            if (aObject.onCommit != undefined) aTarget.setOnCommit(aObject.onCommit);
            if (aObject.onRollback != undefined) aTarget.setOnRollback(aObject.onRollback);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yStatelessServiceAlgebra
class Ac4yStatelessService extends Ac4yStatelessServiceAlgebra {

    constructor(aObject) {

        super(aObject);

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yStatelessService");

    } // constructor

    createSelf(object) {return new Ac4yStatelessService(object);}

    start(){

        this._tryFireOnStart();
        
    } // start

    rollback(){

        this._tryFireOnRollback();
        
    } // rollback

    commit(){

        this._tryFireOnCommit();
        
    } // commit
    
}; // Ac4yService
class Ac4yProcessResultAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yProcessResultAlgebra();

    } // createSelf

    setRequestID(aRequestID) {
        this.requestID = aRequestID;
    }
    getRequestID() {
        return this.requestID;
    }
    hasRequestID() {
        return this.requestID != undefined;
    }

    setCode(aCode) {
        this.code = aCode;
    }
    getCode() {
        return this.code;
    }
    hasCode() {
        return this.code != undefined;
    }

    setMessage(aMessage) {
        this.message = aMessage;
    }
    getMessage() {
        return this.message;
    }
    hasMessage() {
        return this.message != undefined;
    }

    setDescription(aDescription) {
        this.description = aDescription;
    }
    getDescription() {
        return this.description;
    }
    hasDescription() {
        return this.description != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.requestID != undefined) aTarget.setRequestID(aObject.requestID);
            if (aObject.code != undefined) aTarget.setCode(aObject.code);
            if (aObject.message != undefined) aTarget.setMessage(aObject.message);
            if (aObject.description != undefined) aTarget.setDescription(aObject.description);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yProcessResultAlgebra
class Ac4yProcessResult extends Ac4yProcessResultAlgebra {}
class Ac4yServiceResponseAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yServiceResponseAlgebra();

    } // createSelf

    setResult(aResult) {
        this.result = aResult;
    }
    getResult() {
        return this.result;
    }
    createResult() {
        this.result = new Ac4yProcessResult();
    }
    hasResult() {
        return this.result != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.result != undefined) aTarget.setResult(new Ac4yProcessResult(aObject.result));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yServiceResponseAlgebra
class Ac4yServiceResponse extends Ac4yServiceResponseAlgebra {

    constructor(aObject) {

        super(aObject);
/*
        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yServiceResponse");
*/
        if (!this.hasResult()) this.createResult();
        
    } // constructor

    createSelf(object) {return new Ac4yServiceResponse(object);}
    
    getErrorProcessResult(aErrorDescription){
        
        return new Ac4yProcessResult({
                        code: -1
                        ,message: "error"
                        ,description: aErrorDescription
                    });
        
    } // getErrorProcessResult

    getErrorServiceResponse(aErrorDescription){
        
        return new Ac4yServiceResponse({
                        processResult: this.getErrorProcessResult(aErrorDescription)
                    });
        
    } // getErrorServiceResponse

    getTimeoutServiceResponse(){return this.getErrorServiceResponse("timeout");}
    
    getSuccessProcessResult(){
        
        return new Ac4yProcessResult({
                        code: 1
                        ,message: "success"
                    });
        
    } // getSuccessProcessResult

    getSuccessServiceResponse(){
        
        return new Ac4yServiceResponse({
                        processResult: this.getSuccessProcessResult()
                    });
        
    } // getSuccessServiceResponse

    getNothingHappenedProcessResult(aNarrativa){
        
        return new Ac4yProcessResult({
                        code: 0
                        ,message: "nothing happened"
                        ,description: aNarrativa
                    });
        
    } // getNothingHappenedProcessResult

    getNothingHappenedServiceResponse(aNarrativa){
        
        return new Ac4yServiceResponse({
                        processResult: this.getNothingHappenedProcessResult(aNarrativa)
                    });
        
    } // getNothingHappenedServiceResponse
    
} // Ac4yServiceResponse
class Ac4yServiceRequestAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yServiceRequestAlgebra();

    } // createSelf


    rebuild(aObject, aTarget) {

        if (aObject) {


        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yServiceRequestAlgebra
class Ac4yServiceRequest extends Ac4yServiceRequestAlgebra {};
class Ac4yServiceAlgebra extends Ac4yFlow {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yServiceAlgebra();

    } // createSelf

    setStateMachine(aStateMachine) {
        this.stateMachine = aStateMachine;
    }
    getStateMachine() {
        return this.stateMachine;
    }
    createStateMachine() {
        this.stateMachine = new Ac4yServiceStateMachine();
    }
    hasStateMachine() {
        return this.stateMachine != undefined;
    }

    setDataSafe(aDataSafe) {
        this.dataSafe = aDataSafe;
    }
    getDataSafe() {
        return this.dataSafe;
    }
    hasDataSafe() {
        return this.dataSafe != undefined;
    }

    setOnCommit(aOnCommit) {
        this.onCommit = aOnCommit;
    }
    getOnCommit() {
        return this.onCommit;
    }
    hasOnCommit() {
        return this.onCommit != undefined;
    }
    _fireOnCommit() {
        this.onCommit();
    };
    _tryFireOnCommit() {
        if (this.onCommit) this._fireOnCommit();
    };

    setOnRollback(aOnRollback) {
        this.onRollback = aOnRollback;
    }
    getOnRollback() {
        return this.onRollback;
    }
    hasOnRollback() {
        return this.onRollback != undefined;
    }
    _fireOnRollback() {
        this.onRollback();
    };
    _tryFireOnRollback() {
        if (this.onRollback) this._fireOnRollback();
    };

    setOnSuccess(aOnSuccess) {
        this.onSuccess = aOnSuccess;
    }
    getOnSuccess() {
        return this.onSuccess;
    }
    hasOnSuccess() {
        return this.onSuccess != undefined;
    }
    _fireOnSuccess() {
        this.onSuccess();
    };
    _tryFireOnSuccess() {
        if (this.onSuccess) this._fireOnSuccess();
    };

    setOnFail(aOnFail) {
        this.onFail = aOnFail;
    }
    getOnFail() {
        return this.onFail;
    }
    hasOnFail() {
        return this.onFail != undefined;
    }
    _fireOnFail() {
        this.onFail();
    };
    _tryFireOnFail() {
        if (this.onFail) this._fireOnFail();
    };

    setOnNothingHappened(aOnNothingHappened) {
        this.onNothingHappened = aOnNothingHappened;
    }
    getOnNothingHappened() {
        return this.onNothingHappened;
    }
    hasOnNothingHappened() {
        return this.onNothingHappened != undefined;
    }
    _fireOnNothingHappened() {
        this.onNothingHappened();
    };
    _tryFireOnNothingHappened() {
        if (this.onNothingHappened) this._fireOnNothingHappened();
    };

    setOnDone(aOnDone) {
        this.onDone = aOnDone;
    }
    getOnDone() {
        return this.onDone;
    }
    hasOnDone() {
        return this.onDone != undefined;
    }
    _fireOnDone() {
        this.onDone();
    };
    _tryFireOnDone() {
        if (this.onDone) this._fireOnDone();
    };

    setRequest(aRequest) {
        this.request = aRequest;
    }
    getRequest() {
        return this.request;
    }
    createRequest() {
        this.request = new Ac4yServiceRequest();
    }
    hasRequest() {
        return this.request != undefined;
    }

    setResponse(aResponse) {
        this.response = aResponse;
    }
    getResponse() {
        return this.response;
    }
    createResponse() {
        this.response = new Ac4yServiceResponse();
    }
    hasResponse() {
        return this.response != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.stateMachine != undefined) aTarget.setStateMachine(new Ac4yServiceStateMachine(aObject.stateMachine));
            if (aObject.dataSafe != undefined) aTarget.setDataSafe(aObject.dataSafe);
            if (aObject.onCommit != undefined) aTarget.setOnCommit(aObject.onCommit);
            if (aObject.onRollback != undefined) aTarget.setOnRollback(aObject.onRollback);
            if (aObject.onSuccess != undefined) aTarget.setOnSuccess(aObject.onSuccess);
            if (aObject.onFail != undefined) aTarget.setOnFail(aObject.onFail);
            if (aObject.onNothingHappened != undefined) aTarget.setOnNothingHappened(aObject.onNothingHappened);
            if (aObject.onDone != undefined) aTarget.setOnDone(aObject.onDone);
            if (aObject.request != undefined) aTarget.setRequest(new Ac4yServiceRequest(aObject.request));
            if (aObject.response != undefined) aTarget.setResponse(new Ac4yServiceResponse(aObject.response));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yServiceAlgebra
class Ac4yServiceConstant {
    
    constructor() {

        this.REQUEST = "request";
        this.RESPONSE = "response";
        this.COMMIT = "commit";
        this.ROLLBACK = "rollback";
        this.SUCCESS = "success";
        this.FAIL = "fail";
        this.DONE = "done";
        this.NOTHINGHAPPENED = "nothing happened";

    } // constructor
    
} // Ac4yServiceConstant
class Ac4yService extends Ac4yServiceAlgebra {

    constructor(aObject) {

        super(aObject);

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yService");

    } // constructor

    createSelf(object) {return new Ac4yService(object);}

    lightweight(){
        
        //var lightweight = this.getNewFromObject(this);
        var lightweight = this.createSelf(this);
        
        lightweight.getAc4yIdentification().setTemplate(undefined);
        lightweight.setTimer(undefined);
        lightweight.setLiveIndicator(undefined);
        lightweight.setStateMachine(undefined);
        lightweight.setDuration(undefined);
        
        return lightweight;
        
    } // lightweight
    
    getErrorProcessResult(description){return new Ac4yServiceResponse().getErrorProcessResult(description)};

    getErrorServiceResponse(aErrorDescription){
        
        return new Ac4yServiceResponse({
                        result: this.getErrorProcessResult(aErrorDescription)
                    });
        
    } // getErrorServiceResponse

    getTimeoutServiceResponse(){return this.getErrorServiceResponse("timeout");}
    
    getSuccessProcessResult(){return new Ac4yServiceResponse().getSuccessProcessResult()};

    getSuccessServiceResponse(){
        
        return new Ac4yServiceResponse({
                        result: this.getSuccessProcessResult()
                    });
        
    } // getSuccessServiceResponse

    getNothingHappenedProcessResult(narrative){return new Ac4yServiceResponse().getNothingHappenedProcessResult(narrative)}

    getNothingHappenedServiceResponse(narrative){
        
        return new Ac4yServiceResponse({
                        result: this.getNothingHappenedProcessResult(narrative)
                    });
        
    } // getNothingHappenedServiceResponse

    done(){

        //console.log("Ac4yService.done");
        
        this.getStateMachine().setDoneState();
        
        this._tryFireOnDone();
        
        switch (this.getResponse().getProcessResult().getResultCode()) {
            
            case 1: this.success(); break;
            case 0: this.notingHappened(); break;
            case -1: this.fail(); break;
            default: this.fail(); 
                
        } // switch
        
    } // done

    rollback(){

        //console.log("Ac4yService.rollback");
        
        this.getStateMachine().setRollbackState();
        
        this._tryFireOnRollback();
        
    } // rollback

    commit(){

        //console.log("Ac4yService.commit");
        
        this.getStateMachine().setCommitState();
        
        this._tryFireOnCommit();
        
    } // commit
    
    success(){

        //console.log("Ac4yService.success");
        
        this.getStateMachine().setSuccessState();
        
        this._tryFireOnSuccess();

        this.commit();
        
        this.stop();
        
    } // success
    
    fail(){

        //console.log("Ac4yService.fail");
        
        this.getStateMachine().setFailState();

        this._tryFireOnFail();

        this.rollback();
        
        this.stop();

    } // fail
    
    nothingHappened(){

        //console.log("Ac4yService.nothingHappened");
        
        this.getStateMachine().setNothingHappenedState();

        this._tryFireOnNothingHappened();

        this.rollback();
        
        this.stop();

    } // nothingHappened
    
    timeout(){
    
        //console.log("Ac4yService.timeout");
        
        this.getStateMachine().setTimeoutState();

        this._tryFireOnTimeout();

        //this.rollback();
        
        this.stop();
        
    } // timeout
        
    getResult(){return new Ac4yServiceResponse();}

}; // Ac4yService
class Ac4yServiceStateMachine extends Ac4yFlowStateMachine {
    
    constructor(aObject) {

        super(aObject);
        
    } // constructor
    
    setRequestState(){this.setState(new Ac4yServiceConstant().REQUEST);}
    setResponseState(){this.setState(new Ac4yServiceConstant().RESPONSE);}
    setCommitState(){this.setState(new Ac4yServiceConstant().COMMIT);}
    setRollbackState(){this.setState(new Ac4yServiceConstant().ROLLBACK);}
    setSuccessState(){this.setState(new Ac4yServiceConstant().SUCCESS);}
    setFailState(){this.setState(new Ac4yServiceConstant().FAIL);}
    setDoneState(){this.setState(new Ac4yServiceConstant().DONE);}
    setNothingHappenedState(){this.setState(new Ac4yServiceConstant().NOTHINGHAPPENED);}
    
    underRequestState(){return this.getState()===new Ac4yServiceConstant().REQUEST;}
    underResponseState(){return this.getState()===new Ac4yServiceConstant().RESPONSE;}
    underCommitState(){return this.getState()===new Ac4yServiceConstant().COMMIT;}
    underRollbackState(){return this.getState()===new Ac4yServiceConstant().ROLLBACK;}
    underSuccessState(){return this.getState()===new Ac4yServiceConstant().SUCCESS;}
    underFailState(){return this.getState()===new Ac4yServiceConstant().FAIL;}
    underDoneState(){return this.getState()===new Ac4yServiceConstant().DONE;}
    underNothingHappenedState(){return this.getState()===new Ac4yServiceConstant().NOTHINGHAPPENED;}
    
    hasReachedTheRequestState(){return this.hasReachedThisState(new Ac4yServiceConstant().REQUEST);}
    hasReachedTheResponseState(){return this.hasReachedThisState(new Ac4yServiceConstant().RESPONSE);}
    hasReachedTheCommitState(){return this.hasReachedThisState(new Ac4yServiceConstant().COMMIT);}
    hasReachedTheRollbackState(){return this.hasReachedThisState(new Ac4yServiceConstant().ROLLBACK);}
    hasReachedTheSuccessState(){return this.hasReachedThisState(new Ac4yServiceConstant().SUCCESS);}
    hasReachedTheFailState(){return this.hasReachedThisState(new Ac4yServiceConstant().FAIL);}
    hasReachedTheDoneState(){return this.hasReachedThisState(new Ac4yServiceConstant().DONE);}    
    hasReachedTheNothingHappenedState(){return this.hasReachedThisState(new Ac4yServiceConstant().NOTHINGHAPPENED);}
    
} // Ac4yServiceStateMachine

class Ac4yServiceManagerAlgebra extends Ac4yEcosystemMember {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yServiceManagerAlgebra();

    } // createSelf

    setWaiting4Response(aWaiting4Response) {
        this.waiting4Response = aWaiting4Response;
    }
    getWaiting4Response() {
        return this.waiting4Response;
    }
    createWaiting4Response() {
        this.waiting4Response = new Ac4yListNode();
    }
    hasWaiting4Response() {
        return this.waiting4Response != undefined;
    }

    setWaiting4Processing(aWaiting4Processing) {
        this.waiting4Processing = aWaiting4Processing;
    }
    getWaiting4Processing() {
        return this.waiting4Processing;
    }
    createWaiting4Processing() {
        this.waiting4Processing = new Ac4yListNode();
    }
    hasWaiting4Processing() {
        return this.waiting4Processing != undefined;
    }

    setCompleted(aCompleted) {
        this.completed = aCompleted;
    }
    getCompleted() {
        return this.completed;
    }
    createCompleted() {
        this.completed = new Ac4yListNode();
    }
    hasCompleted() {
        return this.completed != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.waiting4Response != undefined) aTarget.setWaiting4Response(new Ac4yListNode(aObject.waiting4Response));
            if (aObject.waiting4Processing != undefined) aTarget.setWaiting4Processing(new Ac4yListNode(aObject.waiting4Processing));
            if (aObject.completed != undefined) aTarget.setCompleted(new Ac4yListNode(aObject.completed));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yServiceManagerAlgebra
class Ac4yServiceManager extends Ac4yServiceManagerAlgebra {

    constructor(aObject) {

        super(aObject);
        
        this.getAc4yIdentification().setHumanID("service manager");
        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yServiceManager");
        
        if (!this.hasWaiting4Response()) this.createWaiting4Response();
        if (!this.hasWaiting4Processing()) this.createWaiting4Processing();
        if (!this.hasCompleted()) this.createCompleted();

    } // constructor 
    
    add(aService){this.getWaiting4Response().addElement(aService);};
    
    stillWaiting(aThreadID){return this.getWaiting4Response().doesExistByGUID(aThreadID);};
    
    get(aThreadID){return this.getWaiting4Response().getByGUID(aThreadID);}
    
    setResponse(aThreadID, aResponse){this.get(aThreadID).setResponse(aResponse);};
    
    trySetResponse(aThreadID, aResponse){
        
        if (this.stillWaiting(aThreadID))
            this.setResponse(aThreadID, aResponse);
        
    }; // trySetResponse
    
    add2Waiting4Response(aService){
        
        this.getWaiting4Response().addElement(aService);
        
    } // add2Waiting4Response
    
    add2Completed(aService){
        
        this.getCompleted().addElement(aService);
        
    } // add2Completed
    
    getFromWaiting4Response(aThreadID){
        
        return this.getWaiting4Response().getByGUID(aThreadID);
        
    } // deleteFromWaiting4Response
    
    deleteFromWaiting4Response(aService){
        
        this.getWaiting4Response().deleteByGUID(aService.getThreadID());
        
    } // deleteFromWaiting4Response
    
    done(aThreadID, aResponse){
/*        
        console.log("DONE");
        console.log("begin");
        console.log(aResponse);
  */  
        this.trySetResponse(aThreadID, aResponse);

        var vService = this.getFromWaiting4Response(aThreadID);
        
        if (!vService)
            throw("internal error (the stored service lost)");
/*        
        console.log("actual response");
        console.log(vService.response);
  */      
        vService.done();
        
        this.add2Completed(vService);
        this.deleteFromWaiting4Response(vService);
        
        //console.log("end");

    } // done
    
    doneByTimeout(aService){

        if (!aService)
            throw("invalid service");
        
        this.done(aService.getThreadID(), aService.getTimeoutServiceResponse());
        
    } // doneByTimeout
    
    getSuccessServiceResponse(){return new Ac4yService().getSuccessServiceResponse();}
    getErrorServiceResponse(aErrorDescription){return new Ac4yService().getErrorServiceResponse(aErrorDescription);}
    getTimeoutServiceResponse(){return new Ac4yService().getTimeoutServiceResponse();}
    getNothingHappenedServiceResponse(aNarrativa){return new Ac4yService().getNothingHappenedServiceResponse(aNarrativa);}
    
    sendMessage(aAddressee, aMessage, aSender){

        var vAc4yCMDMessage = 
            new Ac4yCMDMessage({
                request: 
                    new Ac4yCMDMessageRequest({
                        sender: aSender
                        ,addressee: aAddressee
                        ,subject: " simple message"
                        ,body: aMessage
                    })
            });

//        console.log(vAc4yCMDMessage);
//        console.log(new Ac4yJSONHandler().serialized(vAc4yCMDMessage));

        this.add(vAc4yCMDMessage);

        this.getWormhole().messenger().sendMessage(new Ac4yJSONHandler().serialized(vAc4yCMDMessage.lightweight()));

        vAc4yCMDMessage.start();
        
        //console.log(vAc4yCMDMessage);

    } // sendMessage
    
    remoteCall(aService, aProvider, aRequester){
        
        this.getWormhole().log().tryFootstep();
        
        var vAc4yCMDServiceRequest =
            new Ac4yCMDServiceRequest({
                request: 
                    new Ac4yCMDServiceRequestRequest({
                        provider : aProvider
                        ,service : aService.getCommandName() + " service remote calling"
                        ,requester : aRequester
                        ,request : aService.lightweight()
                    }) 
                ,durationInSecond: 1
           });
           
        var vAc4yCMDMessage = 
            new Ac4yCMDMessage({
                request: 
                    new Ac4yCMDMessageRequest({
                        sender: aRequester
                        ,addressee: aProvider
                        ,subject: aService.getCommandName() + " service remote calling envelope"
                        ,body: vAc4yCMDServiceRequest.lightweight()
                    })
                ,durationInSecond: 1
            });

        if (!aService.hasDuration())
            aService.setDuration(1000);
        
        if (!aService.hasOnTimeout())
            aService.setOnTimeout( () => {this.doneByTimeout(aService);});

        this.add2Waiting4Response(aService);
        this.add2Waiting4Response(vAc4yCMDMessage);
        //this.add2Waiting4Response(vAc4yCMDServiceRequest);

//        console.log("Ac4yServiceManager.remoteCall", new Ac4yJSONHandler().serialized(vAc4yCMDMessage));

        this.getWormhole().messenger().sendMessage(new Ac4yJSONHandler().serialized(vAc4yCMDMessage.lightweight()));

        aService.start();

    } // remoteCall
    
    remoteResponse(aServiceRequest, aResponse, aEcosystem){

        var vAc4yCMDServiceResponse =
            new Ac4yCMDServiceResponse({
                request: 
                    new Ac4yCMDServiceResponseRequest({
                        requestID: aServiceRequest.request.request.ac4yIdentification.GUID
                        ,response: aResponse
                    })
            });
        
        var vAc4yCMDMessage = 
            new Ac4yCMDMessage({
                request: 
                    new Ac4yCMDMessageRequest({
                        sender: aServiceRequest.getRequest().getProvider()
                        ,addressee: aServiceRequest.getRequest().getRequester()
                        ,subject: "response 22 " + aServiceRequest.getRequest().getRequest().commandName + " remote calling"
                        ,body: vAc4yCMDServiceResponse.lightweight()
                                 
                    })
                });

        aEcosystem.service().add(vAc4yCMDMessage);
        aEcosystem.service().add(vAc4yCMDServiceResponse);
        
        aEcosystem.messenger().sendMessage(new Ac4yJSONHandler().serialized(vAc4yCMDMessage.lightweight()));

    } // remoteResponse

} // Ac4yServiceManager






class Ac4yCommandAlgebra extends Ac4yService {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf(object) {
        return new Ac4yCommandAlgebra(object);

    } // createSelf

    setCommandName(aCommandName) {
        this.commandName = aCommandName;
    }
    getCommandName() {
        return this.commandName;
    }
    hasCommandName() {
        return this.commandName != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.commandName != undefined) aTarget.setCommandName(aObject.commandName);

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yCommandAlgebra
class Ac4yCommand extends Ac4yCommandAlgebra {

    constructor(aObject) {

            super(aObject);

        if (!this.getAc4yIdentification().hasTemplate()) this.getAc4yIdentification().createTemplate();
        
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yCommand");
         
    } // constructor

    createSelf() {return new Ac4yCommand();}
    
    getResult(){return null;}

} // Ac4yCommand
class Ac4yCommandRegistrationAlgebra {

    constructor(aObject) {

        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf() {
        return new Ac4yCommandRegistrationAlgebra();

    } // createSelf

    setInterpreter(aInterpreter) {
        this.interpreter = aInterpreter;
    }
    getInterpreter() {
        return this.interpreter;
    }
    createInterpreter() {
        this.interpreter = new Ac4yCommandInterpreter();
    }
    hasInterpreter() {
        return this.interpreter != undefined;
    }

    setCommandName(aCommandName) {
        this.commandName = aCommandName;
    }
    getCommandName() {
        return this.commandName;
    }
    hasCommandName() {
        return this.commandName != undefined;
    }

    setTemplate(aTemplate) {
        this.template = aTemplate;
    }
    getTemplate() {
        return this.template;
    }
    createTemplate() {
        this.template = new Object();
    }
    hasTemplate() {
        return this.template != undefined;
    }


    rebuild(aObject, aTarget) {

        if (aObject) {

            if (aObject.interpreter != undefined) aTarget.setInterpreter(new Ac4yCommandInterpreter(aObject.interpreter));
            if (aObject.commandName != undefined) aTarget.setCommandName(aObject.commandName);
            if (aObject.template != undefined) aTarget.setTemplate(new Object(aObject.template));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yCommandRegistrationAlgebra
class Ac4yCommandRegistration extends Ac4yCommandRegistrationAlgebra {
    
    getCommand(aObject){return new this.template(aObject);}
    
}; // Ac4yCommandRegistration
class Ac4yCommandManagerAlgebra extends Ac4yEcosystemMember {

    constructor(aObject) {

        super(aObject);
        if (aObject) this.rebuild(aObject, this);

    } // constructor


    createSelf(object) {
        return new Ac4yCommandManagerAlgebra(object);

    } // createSelf

    setCommandRegister(aCommandRegister) {
        this.commandRegister = aCommandRegister;
    }
    getCommandRegister() {
        return this.commandRegister;
    }
    createCommandRegister() {
        this.commandRegister = new Ac4yListNode();
    }
    hasCommandRegister() {
        return this.commandRegister != undefined;
    }


    rebuild(aObject, aTarget) {

        super.rebuild(aObject, aTarget);
        if (aObject) {

            if (aObject.commandRegister != undefined) aTarget.setCommandRegister(new Ac4yListNode(aObject.commandRegister));

        } // if aObject does not empty

        return aTarget;

    } // rebuild

} // Ac4yCommandManagerAlgebra
class Ac4yCommandManager extends Ac4yCommandManagerAlgebra {

    constructor(object) {

        super(object);
        
        this.getAc4yIdentification().setHumanID("command manager");
        this.getAc4yIdentification().createTemplate();
        this.getAc4yIdentification().getTemplate().setHumanID("Ac4yCommandManager");
        
        this.createCommandRegister();

    } // constructor 
    
    registrateCommand(aAc4yCommandRegistration) {this.getCommandRegister().addElement(aAc4yCommandRegistration);}
    
    registrateCommandFromInterpreter(aCommandInterpreter) {aCommandInterpreter.registrateCommand(this);}
    
    knownCommand(aCommandName){return this.hasByCommandName(aCommandName);}
    
    getIndexByCommandName(aCommandName){

        return this.getCommandRegister().get().findIndex(
                                function(aAc4yCommandRegistration){
                                    return aAc4yCommandRegistration.getCommand().getCommandName()===aCommandName;
                                }
                            );
        
    } // getIndexByCommand
    
    hasByCommandName(aCommandName){return this.getIndexByCommandName(aCommandName)!==-1;};
    
    getByCommandName(aCommandName){return this.getCommandRegister().getByIndex(this.getIndexByCommandName(aCommandName));}

    getRegistrationByCommandName(aCommandName){return this.getByCommandName(aCommandName);}
    
    getPrecompiledCommand(aCommand){
        
        return this.getRegistrationByCommandName(aCommand.commandName).getCommand(aCommand);
        
    } // getPrecompiledCommand
    
    getInterpreterByCommandName(aCommandName){return this.getByCommandName(aCommandName).getInterpreter();}
    
    isValidObjectInTheCommandString(aCommandString){return new Ac4yJSONHandler().isValid(aCommandString);}

    getCommandFromString(aCommandString){return new Ac4yCommand(new Ac4yJSONHandler().deserialized(aCommandString));}
    
    isValidCommand(aCommand){return new Ac4yCommand(aCommand).hasCommandName();}

    getPrecompiledCommandFromString(aCommandString){
        
        var vCommandName = this.getCommandNameFromString(aCommandString);
        var vCommand = new Ac4yJSONHandler().deserialized(aCommandString);
        
        return this.getRegistrationByCommandName(vCommandName).getCommand(vCommand);
        
    } // getPrecompiledCommandFromString    

    getCommandNameFromString(aCommandString){return this.getCommandFromString(aCommandString).getCommandName();}
    
/*  
 
 
    isValidCommandInTheString(aCommandString){
        
        if (this.isValidObjectInTheCommandString(aCommandString))
            return this.isValidCommand(this.getCommandFromString(aCommandString));
        else
            return false;
    
    } // isValidCommandInTheString
    
    tryGetResultFromString(aCommandString) {
         
        var vResponse = new Ac4yServiceResponse().getSuccessServiceResponse();

        try {
        
            if (!this.hasEcosystem())
                throw "has no ecosystem!";
            
            if (this.isValidObjectInTheCommandString(aCommandString))
                if (this.isValidCommandInTheString(aCommandString))
                    if (this.knownCommand(this.getCommandNameFromString(aCommandString))) {
                        
                        vResponse = this.getPrecompiledCommandFromString(
                                        aCommandString
                                    ).getResult(this.getEcosystem());
                    }
                    else
                        throw "unknown command ('"+aCommandString+"')";
                else
                    throw "no command was received ('"+aCommandString+"')";
            else
                throw "no JSON object was received ('"+aCommandString+"')";

        } catch(error) {
            var vResponse = new Ac4yServiceManager().getErrorServiceResponse(new String(error));
        }

        return vResponse;
        
    } // tryGetResultFromString
    
    tryGetResult(aCommand) {
        
        var vResponse = new Ac4yServiceManager().getSuccessServiceResponse();
        
        try {
        
            if (!this.hasEcosystem())
                throw "has no ecosystem!";
            
            if (this.isValidCommand(aCommand))
                if (this.knownCommand(aCommand.commandName)) {
                    
                    var vResponse = this.getPrecompiledCommand(
                                        aCommand
                                     ).getResult(this.getEcosystem());
                    
                }
                else
                    throw "unknown command ('"+aCommand.commandName+"')";
            else
                throw "no command was received ('"+aCommand+" "
                    +new Ac4yJSONHandler().serialized(aCommand)+"')";
                
        } catch(error) {

            var vResponse = new Ac4yServiceManager().getErrorServiceResponse(new String(error));
        }
        
        return vResponse;
        
    } // tryGetResult
    
*/    
    processText(commandInString){
        
        var response = new Ac4yServiceResponse().getSuccessServiceResponse();

        try {
        
            if (!this.hasEcosystem())
                throw "has no ecosystem!";
            
            if (!this.isValidObjectInTheCommandString(commandInString))
                throw "no JSON object was received ('"+commandInString+"')";
            
            response = this.processObject(this.getPrecompiledCommandFromString(commandInString));
            

        } catch(error) {
            var response = new Ac4yServiceManager().getErrorServiceResponse(new String(error));
        }

        return response;

    }; // processText
    
    processObject(command){
        
        var response = new Ac4yServiceManager().getSuccessServiceResponse();
        
        try {
        
            if (!this.hasEcosystem())
                throw "has no ecosystem!";
            
            if (!this.isValidCommand(command))
                throw  "no command was received ('"+command+" "+new Ac4yJSONHandler().serialized(command)+"')";
                
            if (!this.knownCommand(command.commandName))
                throw "unknown command ('"+command.commandName+"')";
            
            var response = this.getPrecompiledCommand(
                                        command
                            ).getResult(this.getEcosystem());
                
        } catch(error) {

            var response = new Ac4yServiceManager().getErrorServiceResponse(new String(error));
        }
        
        return response;
    
    }; // processObject
        
    send(command){
    
        console.log("send command",new Ac4yJSONHandler().serialized(command.lightweight()));
        
    } // send
    
}; // Ac4yCommandManager
class Ac4yCommandInterpreter {
    
    registrateCommand(aCommandManager){
        
        //aCommandManager.registrateCommand(new Ac4yCommandRegistration("a", this));
        
    }; // registrateCommand
    
} // Ac4yCommandInterpreter

        

