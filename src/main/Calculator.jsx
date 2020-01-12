import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    display: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    addDigit(n) {
        if (n === '.' && this.state.display.includes('.')) {
            return
        }
        const clearDisplay = this.state.display === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.display
        const displayValue = currentValue + n
        this.setState({ display: displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        }
        else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            switch(currentOperation){
                case'+' : values[0]= `${values[0]+values[1]}`
                break;
                case'-' : values[0]= `${values[0]-values[1]}`
                break;
                case'X' : values[0]= `${values[0]*values[1]}`
                break;
                case'/' : values[0]= `${values[0]/values[1]}`
                break;
                case'%' : values[0]= `${values[0]*0.01+values[0]}`
                break;
            }
values[1] = 0
   this.setState({
       display:values[0],
       operation: equals ? null : operation,
       current: equals ? 0 : 1,
       clearDisplay: !equals,
       values
   })
            
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display valor={this.state.display} />
                <Button value="%" operation click={this.setOperation} />
                <Button value="CE" double click={this.clearMemory} />
                <Button value="/" operation click={this.setOperation} />
                <Button value="7" click={this.addDigit} />
                <Button value="8" click={this.addDigit} />
                <Button value="9" click={this.addDigit} />
                <Button value="X" operation click={this.setOperation} />
                <Button value="4" click={this.addDigit} />
                <Button value="5" click={this.addDigit} />
                <Button value="6" click={this.addDigit} />
                <Button value="-" operation click={this.setOperation} />
                <Button value="1" click={this.addDigit} />
                <Button value="2" click={this.addDigit} />
                <Button value="3" click={this.addDigit} />
                <Button value="+" operation click={e => this.setOperation(e)} />
                <Button value="0" click={this.addDigit} />
                <Button value="." click={this.addDigit} />
                <Button value="=" operation click={e => this.setOperation(e)} />
            </div>
        )
    }
}