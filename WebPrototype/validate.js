var ValidationTypes = {Required: 1, Length: 2, Range: 3, Number: 4, Custom: 5, Conditional: 6, List: 7, InverseList: 8, Phone: 9, Same: 10, Email: 11, CustomMulti: 12};
function getValidationTypeName(t)
{
    if(t == ValidationTypes.Required)
        return "Required";
    if(t == ValidationTypes.Length)
        return "Length";
    if(t == ValidationTypes.Range)
        return "Range";
    if(t == ValidationTypes.Number)
        return "Number";
    if(t == ValidationTypes.Custom)
        return "Custom";
    if(t == ValidationTypes.Conditional)
        return "Conditional";
    if(t == ValidationTypes.List)
        return "List";
    if(t == ValidationTypes.InverseList)
        return "InverseList";
    if(t == ValidationTypes.Phone)
        return "Phone";
    if(t == ValidationTypes.Same)
        return "Same";
    if(t == ValidationTypes.Email)
        return "Email";
    if(t == ValidationTypes.CustomMulti)
        return "CustomMulti";
    return "";
}
function isValidValidationType(t)
{
    if(t == ValidationTypes.Required || t == ValidationTypes.Length || t == ValidationTypes.Range || t == ValidationTypes.Number || t == ValidationTypes.Custom || t == ValidationTypes.Conditional || t == ValidationTypes.List || t == ValidationTypes.InverseList || t == ValidationTypes.Phone || t == ValidationTypes.Same || t == ValidationTypes.Email || t == ValidationTypes.CustomMulti)
        return true;
    return false;
}
/*
 * The specified field is validated on completion (if it is empty or not).
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isrequired="<id>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function RequiredValidation(id, ename, failureaction, successaction)
{
    this.type = ValidationTypes.Required;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        if(val.length <= 0)
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on string length.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * minlen: the minimum length of this field (0 to ignore) (negative numbers become 0)
 * maxlen: the maximum length of this field (0 to ignore) (negative numbers become 0)
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * islength="<id>;;;<minlen>;;;<maxlen>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * MinLength: the minimum length allowed for the field this validation validates
 * MaxLength: the maximum length allowed for the field this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function LengthValidation(id, ename, minlen, maxlen, failureaction, successaction)
{
    this.type = ValidationTypes.Length;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.minlength = parseInt((minlen || 0)+"");
    this.maxlength = parseInt((maxlen || 0)+"");
    if(this.minlength < 0)
        this.minlength = 0;
    if(this.maxlength < 0)
        thsi.maxlength = 0;
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        if((this.minlength > 0 && val.length < this.minlength) || (this.maxlength > 0 && val.length > this.maxlength))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, MinLength: this.minlength, MaxLength: this.maxlength, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, MinLength: this.minlength, MaxLength: this.maxlength, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if the specified range contains the numerical value of the field.  Will fail if field is not numeric.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * min: the minimum value of this field (0 to ignore) (negative numbers become 0)
 * max: the maximum value of this field (0 to ignore) (negative numbers become 0)
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isrange="<id>;;;<min>;;;<max>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Min: the minimum value allowed for the field this validation validates
 * Max: the maximum value allowed for the field this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function RangeValidation(id, ename, min, max, failureaction, successaction)
{
    this.type = ValidationTypes.Range;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.min = parseInt((min || 0)+"");
    this.max = parseInt((max || 0)+"");
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var vals = Trim(getFieldValue(this.name+""));
        var self = this;
        if(!isNumber(vals))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Min: this.min, Max: this.max, Value: vals, Sender: self});
            return false;
        }
        var val = parseInt(vals);
        if(isNaN(val))
            val = 0;
        if((this.min > 0 && val < this.min) || (this.max > 0 && val > this.max))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Min: this.min, Max: this.max, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Min: this.min, Max: this.max, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if it is numerical or not.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isnumber="<id>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function NumberValidation(id, ename, failureaction, successaction)
{
    this.type = ValidationTypes.Number;
    this.id = (id || "")+"";
    this.name = ename;
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        if(!isNumber(val))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on the return value from the callback function.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * callback: the function to call for validating the field
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * iscustom="<id>;;;<callback>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function CustomValidation(id, ename, callback, failureaction, successaction)
{
    this.type = ValidationTypes.Custom;
    this.id = (id || "")+"";
    this.name = ename;
    this.callback = new EventHandler(callback || null);
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        var result = this.callback.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        if(!result)
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        return true;
    }
}
/*
 * The othervalidation object is used to validate, but only if the callback function returns true.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * callback: the function to call for determining whether or not to validate
 * othervalidation: the validation object to use to validate if the callback function returns true (conditional validation object not allowed)
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isconditional="<id>;;;<type of othervalidation>;;;<callback>;;;<failureaction>;;;<successaction>;;;<attribute syntax for othervalidation>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Other: a reference to the validation object used in the conditional validation
 * Sender: a reference to the validation object calling the callback method
 */
function ConditionalValidation(id, callback, othervalidation, failureaction, successaction)
{
    if(!othervalidation || typeof othervalidation == "undefined" || !othervalidation.type || typeof othervalidation.type == "undefined" || !isValidValidationType(othervalidation.type) || othervalidation.type == ValidationTypes.Conditional || !othervalidation.validate || typeof othervalidation.validate != "function")
        return;
    this.type = ValidationTypes.Conditional;
    this.id = (id || "")+"";
    this.callback = new EventHandler(callback || null);
    this.other = othervalidation;
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var self = this;
        var result = this.callback.fireEvent({Type: this.type, Id: this.id, Other: this.other, Sender: self});
        if(!result)
        {
            this.succact.fireEvent({Type: this.type, Id: this.id, Other: this.other, Sender: self});
            return true;
        }
        var result2 = this.other.validate();
        if(!result2)
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Other: this.other, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Other: this.other, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if its value is contained in the list (true) or not (false).
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * vals: the array of values that are allowed
 * ignorecase: true to ignore case when checking, false to perform case-sensitive check
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * islist="<id>;;;<items of vals, seperated by commas (no spaces)>;;;<ignorecase>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Values: the allowed values for the element this validation validates
 * IgnoreCase: the boolean value determining if case is to be ignored when validating
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function ListValidation(id, ename, vals, ignorecase, failureaction, successaction)
{
    this.type = ValidationTypes.List;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.vals = vals;
    this.icase = !(!ignorecase);
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        var fnd = false;
        for(var i = 0; i < this.vals.length; i++)
        {
            if(val == (vals[i]+"") || (this.icase && val.toLowerCase() == (vals[i]+"").toLowerCase()))
                fnd = true;
        }
        if(!fnd)
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Values: this.vals, IgnoreCase: this.icase, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Values: this.vals, IgnoreCase: this.icase, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if its value is contained in the list (false) or not (true).
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * vals: the array of values that are not allowed
 * ignorecase: true to ignore case when checking, false to perform case-sensitive check
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isinverselist="<id>;;;<items of vals, seperated by commas (no spaces)>;;;<ignorecase>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Values: the disallowed values for the element this validation validates
 * IgnoreCase: the boolean value determining if case is to be ignored when validating
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function InverseListValidation(id, ename, vals, ignorecase, failureaction, successaction)
{
    this.type = ValidationTypes.InverseList;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.vals = vals;
    this.icase = !(!ignorecase);
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        for(var i = 0; i < this.vals.length; i++)
        {
            if(val == (vals[i]+"") || (this.icase && val.toLowerCase() == (vals[i]+"").toLowerCase()))
            {
                this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Values: this.vals, IgnoreCase: this.icase, Value: val, Sender: self});
                return false;
            }
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Values: this.vals, IgnoreCase: this.icase, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if its value is a valid phone number or not.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isphone="<id>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function PhoneValidation(id, ename, failureaction, successaction)
{
    this.type = ValidationTypes.Phone;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var re = /^\(?[2-9]\d{2}[\)\.-]?\s?\d{3}[\s\.-]?\d{4}$/;
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        if(!re.test(val))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified fields are validated based on if their values are the same
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename1: the name of the first element this validation checks
 * ename2: the name of the second element this validation checks
 * ignorecase: true to ignore case when checking, false to perform case-sensitive check
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * issame="<id>;;;<ename2>;;;<ignorecase>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name1: the name of the first element this validation validates
 * Name2: the name of the second element this validation validates
 * IgnoreCase: the boolean value determining if case is to be ignored when validating
 * Value1: the value of the first field
 * Value2: the value of the second field
 * Sender: a reference to the validation object calling the callback method
 */
function SameValidation(id, ename1, ename2, ignorecase, failureaction, successaction)
{
    this.type = ValidationTypes.Same;
    this.id = (id || "")+"";
    this.name1 = ename1+"";
    this.name2 = ename2+"";
    this.icase = !(!ignorecase);
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var val1 = Trim(getFieldValue(this.name1+""));
        var val2 = Trim(getFieldValue(this.name2+""));
        var self = this;
        if(!(val1 == val2 || (this.icase && val1.toLowerCase() == val2.toLowerCase())))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name1: this.name1, Name2: this.name2, IgnoreCase: this.icase, Value1: val1, Value2: val2, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name1: this.name1, Name2: this.name2, IgnoreCase: this.icase, Value1: val1, Value2: val2, Sender: self});
        return true;
    }
}
/*
 * The specified field is validated based on if its value is a valid e-mail address or not.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * ename: the name of the element this validation checks
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * isemail="<id>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Name: the name of the element this validation validates
 * Value: the value of the field
 * Sender: a reference to the validation object calling the callback method
 */
function EmailValidation(id, ename, failureaction, successaction)
{
    this.type = ValidationTypes.Email;
    this.id = (id || "")+"";
    this.name = ename+"";
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        var val = Trim(getFieldValue(this.name+""));
        var self = this;
        if(!re.test(val))
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Name: this.name, Value: val, Sender: self});
        return true;
    }
}
/*
 * The specified fields are validated based on the return value from the callback function.
 * id: the id of this validation (used to identify it in your code) (optional, null if not included)
 * enames: an array containing the names of the elements this validation checks
 * callback: the function to call for validating the fields
 * failureaction: the action to perform on validation failure
 * successaction: the action to perform on validation success
 *
 * Attribute syntax (replace <...> with value for ...) (null if not included, or left out if nothing included after) (only include one per validation (so if it is a set of radio buttons, only put it once)):
 * iscustommulti="<id>;;;<items of enames (not counting the one this attribute is in), seperated by commas (no spaces)>;;;<callback>;;;<failureaction>;;;<successaction>"
 *
 * Callback (including failureaction and successaction) parameter array contains (case-sensitive):
 * Type: the type of the validation
 * Id: the id given to this validation
 * Names: the names of the elements this validation validates
 * Values: the values of the fields
 * Sender: a reference to the validation object calling the callback method
 */
function CustomMultiValidation(id, enames, callback, failureaction, successaction)
{
    this.type = ValidationTypes.CustomMulti;
    this.id = (id || "")+"";
    this.names = enames;
    this.callback = new EventHandler(callback || null);
    this.failact = new EventHandler(failureaction || null);
    this.succact = new EventHandler(successaction || null);
    this.validate = function()
    {
        var vals = new Array();
        for(var i = 0; i < this.names.length; i++)
        {
            vals[i] = Trim(getFieldValue(this.names[i]+""));
        }
        var self = this;
        var result = this.callback.fireEvent({Type: this.type, Id: this.id, Names: this.names, Values: vals, Sender: self});
        if(!result)
        {
            this.failact.fireEvent({Type: this.type, Id: this.id, Names: this.names, Values: vals, Sender: self});
            return false;
        }
        this.succact.fireEvent({Type: this.type, Id: this.id, Names: this.names, Values: vals, Sender: self});
        return true;
    }
}
function ValidationManager()
{
    this.validations = new Array();
    this.addValidation = function(val)
    {
        if(!val || typeof val == "undefined" || !val.type || typeof val.type == "undefined" || !isValidValidationType(val.type) || !val.validate || typeof val.validate != "function")
            return false;
        this.validations[this.validations.length] = val;
        return true;
    }
    this.interpretForm = function(frm)
    {
        if(!frm || typeof frm == "undefined")
            return false;
        for(var i = 0; i < frm.elements.length; i++)
        {
            var isreqatt = getAttribute(frm.elements[i], "isrequired");
            var islenatt = getAttribute(frm.elements[i], "islength");
            var isranatt = getAttribute(frm.elements[i], "isrange");
            var isnumatt = getAttribute(frm.elements[i], "isnumber");
            var iscusatt = getAttribute(frm.elements[i], "iscustom");
            var isconatt = getAttribute(frm.elements[i], "isconditional");
            var islstatt = getAttribute(frm.elements[i], "islist");
            var isilsatt = getAttribute(frm.elements[i], "isinverselist");
            var isphnatt = getAttribute(frm.elements[i], "isphone");
            var issamatt = getAttribute(frm.elements[i], "issame");
            var isemlatt = getAttribute(frm.elements[i], "isemail");
            var iscusmatt = getAttribute(frm.elements[i], "iscustommulti");
            if(!(!isreqatt || typeof isreqatt == "undefined" || isreqatt.length <= 0))
            {
                var pts = (isreqatt+"").split(";;;");
                this.addValidation(new RequiredValidation(pts[0], frm.elements[i].name+"", eval(pts[1]), eval(pts[2])));
            }
            if(!(!islenatt || typeof islenatt == "undefined" || islenatt.length <= 0))
            {
                var pts = (islenatt+"").split(";;;");
                this.addValidation(new LengthValidation(pts[0], frm.elements[i].name+"", pts[1], pts[2], eval(pts[3]), eval(pts[4])));
            }
            if(!(!isranatt || typeof isranatt == "undefined" || isranatt.length <= 0))
            {
                var pts = (isranatt+"").split(";;;");
                this.addValidation(new RangeValidation(pts[0], frm.elements[i].name+"", pts[1], pts[2], eval(pts[3]), eval(pts[4])));
            }
            if(!(!isnumatt || typeof isnumatt == "undefined" || isnumatt.length <= 0))
            {
                var pts = (isnumatt+"").split(";;;");
                this.addValidation(new NumberValidation(pts[0], frm.elements[i].name+"", eval(pts[1]), eval(pts[2])));
            }
            if(!(!iscusatt || typeof iscusatt == "undefined" || iscusatt.length <= 0))
            {
                var pts = (iscusatt+"").split(";;;");
                this.addValidation(new CustomValidation(pts[0], frm.elements[i].name+"", eval(pts[1]), eval(pts[2]), eval(pts[3])));
            }
            if(!(!isconatt || typeof isconatt == "undefined" || isconatt.length <= 0))
            {
                var pts = (isconatt+"").split(";;;");
                var t = pts[1].toLowerCase();
                var o = null;
                if(t == "required")
                    o = new RequiredValidation(pts[5], frm.elements[i].name+"", eval(pts[6]), eval(pts[7]));
                else if(t == "length")
                    o = new LengthValidation(pts[5], frm.elements[i].name+"", pts[6], pts[7], eval(pts[8]), eval(pts[9]));
                else if(t == "range")
                    o = new RangeValidation(pts[5], frm.elements[i].name+"", pts[6], pts[7], eval(pts[8]), eval(pts[9]));
                else if(t == "number")
                    o = new NumberValidation(pts[5], frm.elements[i].name+"", eval(pts[6]), eval(pts[7]));
                else if(t == "custom")
                    o = new CustomValidation(pts[5], frm.elements[i].name+"", eval(pts[6]), eval(pts[7]), eval(pts[8]));
                else if(t == "list")
                    o = new ListValidation(pts[5], frm.elements[i].name+"", pts[6].split(","), eval(pts[7]), eval(pts[8]), eval(pts[9]));
                else if(t == "inverselist")
                    o = new InverseListValidation(pts[5], frm.elements[i].name+"", pts[6].split(","), eval(pts[7]), eval(pts[8]), eval(pts[9]));
                else if(t == "phone")
                    o = new PhoneValidation(pts[5], frm.elements[i].name+"", eval(pts[6]), eval(pts[7]));
                else if(t == "same")
                    o = new SameValidation(pts[5], frm.elements[i].name+"", pts[6], eval(pts[7]), eval(pts[8]), eval(pts[9]));
                else if(t == "email")
                    o = new EmailValidation(pts[5], frm.elements[i].name+"", eval(pts[6]), eval(pts[7]));
                if(!(!o || typeof o == "undefined" || o == null))
                    this.addValidation(new ConditionalValidation(pts[0], eval(pts[2]), o, eval(pts[3]), eval(pts[4])));
            }
            if(!(!islstatt || typeof islstatt == "undefined" || islstatt.length <= 0))
            {
                var pts = (islstatt+"").split(";;;");
                this.addValidation(new ListValidation(pts[0], frm.elements[i].name+"", pts[1].split(","), eval(pts[2]), eval(pts[3]), eval(pts[4])));
            }
            if(!(!isilsatt || typeof isilsatt == "undefined" || isilsatt.length <= 0))
            {
                var pts = (isilsatt+"").split(";;;");
                this.addValidation(new InverseListValidation(pts[0], frm.elements[i].name+"", pts[1].split(","), eval(pts[2]), eval(pts[3]), eval(pts[4])));
            }
            if(!(!isphnatt || typeof isphnatt == "undefined" || isphnatt.length <= 0))
            {
                var pts = (isphnatt+"").split(";;;");
                this.addValidation(new PhoneValidation(pts[0], frm.elements[i].name+"", eval(pts[1]), eval(pts[2])));
            }
            if(!(!issamatt || typeof issamatt == "undefined" || issamatt.length <= 0))
            {
                var pts = (issamatt+"").split(";;;");
                this.addValidation(new SameValidation(pts[0], frm.elements[i].name+"", pts[1], eval(pts[2]), eval(pts[3]), eval(pts[4])));
            }
            if(!(!isemlatt || typeof isemlatt == "undefined" || isemlatt.length <= 0))
            {
                var pts = (isemlatt+"").split(";;;");
                this.addValidation(new EmailValidation(pts[0], frm.elements[i].name+"", eval(pts[1]), eval(pts[2])));
            }
            if(!(!iscusmatt || typeof iscusmatt == "undefined" || iscusmatt.length <= 0))
            {
                var pts = (iscusmatt+"").split(";;;");
                this.addValidation(new CustomMultiValidation(pts[0], (frm.elements[i].name+","+pts[1]).split(","), eval(pts[2]), eval(pts[3]), eval(pts[4])));
            }
        }
        return true;
    }
    this.failFastValidate = function(failureaction, successaction)
    {
        var evt = new EventHandler(failureaction || null);
        var evt2 = new EventHandler(successaction || null);
        for(var i = 0; i < this.validations.length; i++)
        {
            var result = this.validations[i].validate();
            if(!result)
            {
                var self = this;
                evt.fireEvent({Item: this.validations[i], Sender: self});
                return false;
            }
        }
        evt2.fireEvent({Sender: self});
        return true;
    }
    this.fullValidate = function(failureaction, successaction)
    {
        var evt = new EventHandler(failureaction || null);
        var evt2 = new EventHandler(successaction || null);
        var fails = new Array();
        for(var i = 0; i < this.validations.length; i++)
        {
            var result = this.validations[i].validate();
            if(!result)
            {
                fails[fails.length] = this.validations[i];
            }
        }
        if(fails.length > 0)
        {
            var self = this;
            evt.fireEvent({Items: fails, Sender: self});
            return false;
        }
        evt2.fireEvent({Sender: self});
        return true;
    }
}

function EventHandler(action)
{
    this.action = action || null;
    this.fireEvent = function(params)
    {
        if(!(!this.action || typeof this.action != "function"))
        {
            var result = this.action(params);
            return !(!result);
        }
        return true;
    }
}
function getFieldValue(fieldName)
{
    var fields = document.getElementsByName(fieldName+"");
    if(fields.length <= 0)
        return "";
    var field0 = fields[0];
    if(typeof field0.selectedIndex != "undefined" && typeof field0.options != "undefined")
    {
        return field0.options[field0.selectedIndex].value+"";
    }
    else if(typeof field0.type != "undefined" && (field0.type+"") == "checkbox" || (field0.type+"") == "radio")
    {
        for(var i = 0; i < fields.length; i++)
        {
            if(fields[i].checked)
                return fields[i].value+"";
        }
        return "";
    }
    else if(typeof field0.value != "undefined" && (typeof field0.type == "undefined" || ((field0.type+"") != "button" && (field0.type+"") != "submit" && (field0.type+"") != "reset" && (field0.type+"") != "image" && (field0.type+"") != "file" && (field0.type+"") != "checkbox" && (field0.type+"") != "radio")))
    {
        return field0.value;
    }
    return "";
}
function isNumber(val)
{
    var rxp = /\D/g;
    var res = (val+"").match(rxp);
    if(!res || typeof res == "undefined" || res.length <= 0)
        return true;
    return false;
}
function getAttribute(ele, att)
{
    att = att+"";
    if(!ele || typeof ele == "undefined")
        return false;
    var try1 = eval("ele."+att);
    if(!(!try1 || typeof try1 == "undefined" || (try1+"").length <= 0))
        return try1;
    if(!ele.attributes || typeof ele.attributes == "undefined")
        return false;
    for(var i = 0; i < ele.attributes.length; i++)
    {
        if((ele.attributes[i].name+"") == att)
            return ele.attributes[i].value+"";
    }
    return false;
}
function Trim(s)
{
    while ((s.substring(0, 1) == ' ') || (s.substring(0, 1) == '\n') || (s.substring(0, 1) == '\r'))
    {
        s = s.substring(1, s.length);
    }
    while ((s.substring(s.length - 1, s.length) == ' ') || (s.substring(s.length - 1, s.length) == '\n') || (s.substring(s.length - 1, s.length) == '\r'))
    {
        s = s.substring(0, s.length - 1);
    }
    return s;
}