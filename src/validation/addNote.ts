import validator from 'validator';

interface Data{
    title: string;
    text: string;
    titleColor: string;
    titleBg: string;
    textColor: string;
    textBg: string;
    border: string;
    borderSize: number | string;
    font: string;
    textSize: number | string;
    titleSize: number | string;
    titleTransform: string;
    textTransform: string;
    alignDesc: string;
    status: boolean;
}
const validateAddNote = (data:Data) => {
    const errors = [];

    // Convert empty fields to an empty string so we can use validator functions
    data.title = data.title ? data.title : "";
    data.text = data.text ? data.text : "";
    data.titleColor = data.titleColor ? data.titleColor : "";
    data.titleBg = data.titleBg ? data.titleBg : "";
    data.textColor = data.textColor ? data.textColor : "";
    data.textBg = data.textBg ? data.textBg : "";
    data.border = data.border ? data.border : "";
    data.borderSize = data.borderSize ? data.borderSize : "";
    data.font = data.font ? data.font : "";
    data.textSize = data.textSize ? data.textSize : "";
    data.titleSize = data.titleSize ? data.titleSize : "";
    data.textTransform = data.textTransform ? data.textTransform : "";
    data.titleTransform = data.titleTransform ? data.titleTransform : "";
    data.alignDesc = data.alignDesc ? data.alignDesc : "";

    // Title checks
    if (validator.isEmpty(data.title)) {
        errors.push("Title is required");
    }
    // Text checks
    if (validator.isEmpty(data.text)) {
        errors.push("Text is required");
    }
    // titleColor checks
    if (validator.isEmpty(data.titleColor)) {
        errors.push("Title color is required");
    }else if(!validator.isHexColor(data.titleColor)){
        errors.push("Incorrect value of title color");
    }
    // textColor checks
    if (validator.isEmpty(data.textColor)) {
        errors.push("Text color is required");
    }else if(!validator.isHexColor(data.textColor)){
        errors.push("Incorrect value of text color");
    }
    // textBg checks
    if (validator.isEmpty(data.textBg)) {
        errors.push("Text bg color is required");
    }else if(!validator.isHexColor(data.textBg)){
        errors.push("Incorrect value of text bg color");
    }
    // titleBg checks
    if (validator.isEmpty(data.titleBg)) {
        errors.push("Title bg color is required");
    }else if(!validator.isHexColor(data.titleBg)){
        errors.push("Incorrect value of title bg color");
    }
    // border checks
    if (validator.isEmpty(data.border)) {
        errors.push("Border color is required");
    }else if(!validator.isHexColor(data.border)){
        errors.push("Incorrect value of border color");
    }
    // border size checks **convert to string to be sure**
    if (validator.isEmpty(data.borderSize + "")) {
        errors.push("Border size is required");
    }else if(!validator.isInt(data.borderSize + "",{ min: 0, max: 15 })){
        errors.push("Incorrect value of border size");
    }
    // font checks
    if (validator.isEmpty(data.font)) {
        errors.push("Font is required");
    }
    // text size checks **convert to string to be sure**
    if (validator.isEmpty(data.textSize + "")) {
        errors.push("Text size is required");
    }else if(!validator.isFloat(data.textSize + "",{ min: 0.1, max: 10 })){
        errors.push("Incorrect value of text size");
    }
    // title size checks **convert to string to be sure**
    if (validator.isEmpty(data.titleSize + "")) {
        errors.push("Title size is required");
    }else if(!validator.isFloat(data.titleSize + "",{ min: 0.1, max: 10 })){
        errors.push("Incorrect value of title size");
    }
    // textTransform checks
    if (validator.isEmpty(data.textTransform)) {
        errors.push("Text transform is required");
    }
    // titleTransform checks
    if (validator.isEmpty(data.titleTransform)) {
        errors.push("Title transform is required");
    }
    // alignDesc checks
    if (validator.isEmpty(data.alignDesc)) {
        errors.push("Align text is required");
    }

    return {
        errors,
        isValid: errors
    };
};
module.exports = validateAddNote;