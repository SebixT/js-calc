class Calculator {
    constructor(currentNumEl, prevNumEl) {
        this.currentNumEl = currentNumEl;
        this.prevNumEl    = prevNumEl;
        this.clearAll();
    }
    delete() {

    }
    clearAll() {
        this.prevNum    = '';
        this.currentNum = '';
        this.result     = 0;
        this.operation  = undefined;
        this.clrScreen();
    }
    appendData(sign) {
        if(this.currentNum === '') {
            this.currentNum = sign;
            this.prevNum    = '';
            // this.currentNumEl.innerText = this.currentNumEl.innerText.toString() + sign.toString();
        }else {
            this.prevNum    = this.currentNum;
            this.currentNum = sign;
        }
        this.currentNumEl.innerText = this.currentNumEl.innerText.toString() + sign.toString();

    }
    setAction(action) {
        console.log(this.currentNum);
        console.log(this.prevNum);
        console.log(this.operation);
        console.log(action);
        if(action == '=') {
            if(this.operation == undefined) return;
            this.compute(this.operation);
        }else {
            if((this.prevNum == '')&&(this.currentNum == '')) {
                this.operation = undefined;
                return;
            }else if((this.prevNum == '')&&(this.currentNum != '')) {
                this.operation  = action;
                this.prevNum    = this.currentNum;
                this.currentNum = '';
                return;
            }else {
                this.compute(this.operation);
            }
        }
    }
    setData(number) {
        this.currentNum = this.currentNum.toString() + number.toString();
    }
    compute(action) {
        switch (action) {
            case '+':
                break;
            case '-':
                break;
            case '*':
                break;
            case '/':
                break;
            default:
                break;
        }
    }
    clrScreen() {
        this.currentNumEl.innerText = '';
        this.prevNumEl.innerText    = '';
    }
}
const del          = document.querySelector('[data-del]');
const point        = document.querySelector('[data-point]');
const equal        = document.querySelector('[data-eq]');
const allClr       = document.querySelector('[data-ac]');
const action       = document.querySelectorAll('[data-action]');
const numbers      = document.querySelectorAll('[data-number]');
const prevNumEl    = document.querySelector('[data-prev]');
const currentNumEl = document.querySelector('[data-current');

const calculator = new Calculator(currentNumEl, prevNumEl);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.setData(button.textContent);
    })
})
action.forEach(singleAction => {
    singleAction.addEventListener('click', () => {
        calculator.setAction(singleAction.textContent);
    })
})
del.addEventListener('click', () => {
    
})
equal.addEventListener('click', () => {
    
})
allClr.addEventListener('click', () => {
    calculator.clearAll();
})