/**
 * *UTILS CORE
 * @author Francisco Parrinha
 */



/**
 * Checks whether an object is either null or undefined
 * @param value value to check if is null
 * @returns is undefined or null, or not
 */
const isNull = (value : object) => {
    return value === undefined || value === null;
}

/**
 * Checks whether a string is null or empty
 * @param string the string to evaluate
 * @returns true if null or empty, false if not
 */
const isStringEmpty = (string : string) => {
    return string === null || string === "";
}


  
export { isNull, isStringEmpty };