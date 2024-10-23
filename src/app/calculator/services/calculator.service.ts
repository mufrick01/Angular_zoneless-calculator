import { Injectable, signal } from '@angular/core';


const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operator = ['+', '-', 'x', '÷'];
const specialsOperators = ['%', '+/-', '=', '.', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');


  public constructNumber(value: string): void {
    // TODO: validar inputs45


    const validKeys = [...numbers, ...specialsOperators, ...operator];
    if (!validKeys.includes(value)) {
      console.log('invalid input', value);
      return;
    }


    if (operator.includes(value)) {
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (value === '=') {
      // TODO: calcular resultados
      this.calculateResult();
      return;

    }


    // resetear calculadora
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {


      if (this.resultText() === '0') { return }
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
      if(this.resultText().includes('-') && this.resultText().length===2){
        this.resultText.set('0');
        return;
      }

      this.resultText.update(textValue => textValue.slice(0, -1));
      return;
    }

    // cambiar signo

    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(textValue => textValue.slice(1));
        return;
      }

      this.resultText.update(textValue => '-' + textValue);
      return;
    }
     // validar punto decimal

     if (value === '.') {
      if(this.resultText().includes('.')){return}
      if (this.resultText() === '0' || this.resultText() == '') {
        this.resultText.set('0.');
        return
      }
      this.resultText.update(textValue => textValue + '.');
      return;
    }


    // validar cantidad de caracteres en numero en caso de ser negativo
    if (this.resultText().includes('-') && this.resultText().length - 1 >= 9) {
      console.log('Max length reached ');
      return;
    }

    // validar cantidad de caracteres en numero en caso de ser positivo
    if (!this.resultText().includes('-') && this.resultText().length >= 9) {
      console.log('Max length reached ');
      return;
    }


    // manejo de 0 inicial
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }


    // construir numero cuando hay un 0
    if (this.resultText() === '0') {
      this.resultText.set(value);
      return;
    }
    // construir numero cuando hay un -0
    if (this.resultText() === '-0') {
      this.resultText.set(`-${value}`);
      return;
    }









    this.resultText.update(textValue => textValue + value);






  }



  public calculateResult(){
    const subResultNumber = parseFloat(this.subResultText());
    const ResultNumber = parseFloat(this.resultText());

    let result = 0;

    switch(this.lastOperator()){
      case '+':
        result = subResultNumber + ResultNumber;
        break;
      case '-':
        result = subResultNumber - ResultNumber;
        break;
      case '÷':
        result = subResultNumber / ResultNumber;
        break;
      case 'x':
        result = subResultNumber * ResultNumber;
        break;
    }



    this.subResultText.set('0')
    this.lastOperator.set('+')
    let valueToScreen = result.toString();
    if(valueToScreen.length>=9){
      valueToScreen = valueToScreen.slice(0,9);
    }
    this.resultText.set(valueToScreen);
  }
}
