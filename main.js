class Calculator {
    constructor(currentNumEl, prevNumEl) {
        this.currentNumEl = currentNumEl;
        this.prevNumEl    = prevNumEl;
        this.clearAll();
    }
    clearAll() {
        this.prevNum       = '';
        this.currentNum    = '';
        this.result        = 0;
        this.operation     = undefined;
        this.clrScreen();
    }
    delete() {
        this.currentNumEl.innerText = this.currentNumEl.innerText.slice(0, -1);
        if((this.prevNum)&&(this.currentNum)) {
            this.currentNum = this.currentNumEl.innerText;
        }
        if((this.prevNum)&&(!this.currentNum)) {
            this.prevNum = this.currentNumEl.innerText;
        }
    }
    computeEq() {
        if((this.operation)&&(this.prevNum)&&(this.currentNum))
        this.compute(this.operation, this.prevNum, this.currentNum);
    }
    setOperation(action) {
        if(    (this.prevNum == '') 
            && (this.currentNum == '') 
        ) {
            return;
        }
        if(    (this.prevNum != '')
            && (this.operation == undefined)
        ) {
            this.prevNumEl.innerText = this.prevNumEl.innerText  + this.currentNumEl.innerText + action;
            this.currentNumEl.innerText = '';
            this.operation = action.toString();
            return;
        }
        if(    (this.prevNum != '')
            && (this.operation != undefined)
            && (this.currentNum == '')
        ) {
            this.operation = action.toString();
            this.prevNumEl.innerText = this.prevNumEl.innerText + action;
            
            return;
        }
        if(    (this.prevNum != '')
            && (this.operation != undefined)
            && (this.currentNum != '')
        ) {
            this.compute(this.operation, this.prevNum, this.currentNum);
            this.operation = action;
            this.prevNumEl.innerText = this.prevNumEl.innerText + action;
        }
    }
    setNumber(number) {
        if(    (this.prevNum == '') 
            && (this.currentNum == '') 
            ) {
                this.prevNum = number.toString();
                this.currentNumEl.innerText = this.prevNum;
                return;
            }
        if(    (this.prevNum != '')
            && (this.operation == undefined)
            ) {
                this.prevNum = this.prevNum.toString() + number.toString();
                this.currentNumEl.innerText = this.prevNum;
                return;
            }
        if(    (this.prevNum != '') 
            && (this.operation != undefined)
            ) {
                this.currentNum             = this.currentNum .toString() + number.toString();
                this.prevNumEl.innerText    = this.prevNum + this.operation;
                this.currentNumEl.innerText = this.currentNum;
                return;
            }
    }
    compute(action, prev, current) {
        let prevInt    = parseFloat(prev);
        let currentInt = parseFloat(current);
        let operation  = action;
        let result     = 0;
        switch (action) {
            case '+':
                this.result = currentInt + prevInt;
                break;
            case '-':
                this.result = prevInt - currentInt;
                break;
            case '*':
                this.result = currentInt * prevInt;
                break;
            case '/':
                this.result = prevInt / currentInt;
                break;
            default:
                break;
        }
        this.prevNumEl.innerText    = this.result;
        this.currentNumEl.innerText = '';
        this.currentNum = '';
        this.operation  = undefined;
        this.prevNum    = this.result;
        this.result     = 0;

    }
    clrScreen() {
        this.currentNumEl.innerText = '';
        this.prevNumEl.innerText    = '';
    }
}

const eq           = document.querySelector('[data-eq]');
const del          = document.querySelector('[data-del]');
const point        = document.querySelector('[data-point]');
const allClr       = document.querySelector('[data-ac]');
const action       = document.querySelectorAll('[data-action]');
const numbers      = document.querySelectorAll('[data-number]');
const prevNumEl    = document.querySelector('[data-prev]');
const currentNumEl = document.querySelector('[data-current');

const calculator = new Calculator(currentNumEl, prevNumEl);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.setNumber(button.textContent);
    })
})
action.forEach(singleAction => {
    singleAction.addEventListener('click', () => {
        calculator.setOperation(singleAction.textContent);
    })
})
eq.addEventListener('click', () => {
    calculator.computeEq();
})
del.addEventListener('click', () => {
    calculator.delete();
})
allClr.addEventListener('click', () => {
    calculator.clearAll();
})