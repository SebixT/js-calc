class Calculator {
    constructor(currentNumEl, prevNumEl) {
        this.currentNumEl = currentNumEl;
        this.prevNumEl    = prevNumEl;
        this.clearAll();
    }
    delete() {
        this.currentNumEl.innerText = this.currentNumEl.innerText.slice(0, -1);
        this.currentNum = this.currentNumEl.innerText;
    }
    clearAll() {
        this.prevNum    = '';
        this.currentNum = '';
        this.result     = 0;
        this.operation  = undefined;
        this.clrScreen();
    }
    appendData(sign) {
        this.currentNumEl.innerText = this.currentNumEl.innerText.toString() + sign.toString();
    }
    setAction(action) {
        if(action == '=') {
            if(this.operation == undefined) return;
            this.compute(this.operation, this.prevNum, this.currentNum);
        }else {
            if((this.prevNum == '')&&(this.currentNum == '')) {
                this.operation = undefined;
                return;
            }else if((this.prevNum == '')&&(this.currentNum != '')) {
                this.operation  = action;
                this.prevNum    = this.currentNum;
                this.prevNumEl.innerText = this.currentNumEl.innerText;
                this.currentNumEl.innerText = '';
                this.currentNum = '';
                return;
            }else {
                this.prevNumEl.innerText = this.currentNumEl.innerText;
                this.currentNumEl.innerText = '';
                this.compute(this.operation, this.prevNum , this.currentNum);
            }
        }
    }
    setData(number) {
        this.currentNum = this.currentNum.toString() + number.toString();
    }
    compute(action, prev, current) {
        let prevInt      = parseFloat(prev);
        let currentInt   = parseFloat(current);
        let operationFin = action;
        let result       = 0;
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
        this.prevNumEl.innerText = this.result;
        this.currentNumEl.innerText = '';
        this.currentNum = this.result;
        this.prevNum = '';
    }
    clrScreen() {
        this.currentNumEl.innerText = '';
        this.prevNumEl.innerText    = '';
    }
}
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
        calculator.appendData(button.textContent);
        calculator.setData(button.textContent);
    })
})
action.forEach(singleAction => {
    singleAction.addEventListener('click', () => {
        if(! (singleAction.textContent == '=')) calculator.appendData(singleAction.textContent);
        calculator.setAction(singleAction.textContent);
    })
})
del.addEventListener('click', () => {
    calculator.delete();
})
allClr.addEventListener('click', () => {
    calculator.clearAll();
})