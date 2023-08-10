class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.allclear1();
    }

    delete1() {
        this.currentoperand = this.currentoperand.toString().slice(0,-1)
    }

    equals1() {
        let compute
        const prev = parseFloat(this.previousoperand)
        const curr = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                compute = prev + curr
                break
            case '-':
                compute = prev - curr
                break
            case '*':
                compute = prev * curr
                break
            case '÷':
                compute = prev / curr
                break
            case '%':
                compute = prev % curr
                break
            default:
                return
        }
        this.currentoperand = compute
        this.operation = undefined
        this.previousoperand = ''
    }

    allclear1() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }

    appendnum1(number) {
        if (number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()

    }

    appendopr(operation) {
        if (this.currentoperand === '') return
        if (this.previousoperand !== '') {
            this.equals1()
        }

        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    updatedisplay() {
        this.current.innerText = this.currentoperand;
        if(this.operation != null){
            this.previous.innerText = `${this.previousoperand}${this.operation}${this.currentoperand}`
        }
        else{
            this.previous.innerText=  ` ${this.previousoperand}`;
        }           
    }

}

const numbers = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-opr]');
const equalsto = document.querySelector('[data-equals]');
const deletes = document.querySelector('[data-del]');
const allclear = document.querySelector('[data-ac]');
const previous = document.querySelector('[data-preoprtxt]');
const current = document.querySelector('[data-curroprtxt]');

const calculator = new Calculator(previous, current)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnum1(button.innerText)
        calculator.updatedisplay()
    })
})

allclear.addEventListener('click', () => {
    calculator.allclear1();
    calculator.updatedisplay();
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendopr(button.innerText)
        calculator.updatedisplay()
    })
})

equalsto.addEventListener('click', button => {
    calculator.equals1()
    calculator.updatedisplay()
})

deletes.addEventListener('click',()=>{
    calculator.delete1()
    calculator.updatedisplay()
})
