import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const valorInicial = {
    valorDisplay: '0',
    limparDisplay: false,
    operacao: null,
    valor: [0, 0],
    valorCorrente: 0
}

export default class Calculator extends Component {

    state = { ...valorInicial }

    constructor(props) {
        super(props)
        this.apagarMemoria = this.apagarMemoria.bind(this)
        this.mudarOperacao = this.mudarOperacao.bind(this)
        this.addnumero = this.addnumero.bind(this)
    }

    apagarMemoria() {
        this.setState({ ...valorInicial })
    }

    mudarOperacao(operacao) {
        if (this.state.valorCorrente === 0) {
            this.setState({ operacao, valorCorrente: 1, limparDisplay: true })
        } else {
            const equals = operacao === '='
            const currentOperation = this.state.operacao

            const valor = [...this.state.valor]
            try {
                valor[0] = eval(`${valor[0]} ${currentOperation} ${valor[1]}`)
            } catch(e) {
                valor[0] = this.state.valor[0]
            }

            valor[1] = 0

            this.setState({
                valorDisplay: valor[0],
                operacao: equals ? null : operacao,
                valorCorrente: equals ? 0 : 1,
                limparDisplay: !equals,
                valor
            })
        }
    }

    addnumero(n) {
        if (n === '.' && this.state.valorDisplay.includes('.')) {
            return
        }

        const limparDisplay = this.state.valorDisplay === '0'
            || this.state.limparDisplay
        const currentValue = limparDisplay ? '' : this.state.valorDisplay
        const valorDisplay = currentValue + n
        this.setState({ valorDisplay, limparDisplay: false })

        if (n !== '.') {
            const i = this.state.valorCorrente
            const newValue = parseFloat(valorDisplay)
            const valor = [...this.state.valor]
            valor[i] = newValue
            this.setState({ valor })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.valorDisplay} />
                <Button label="AC" click={this.apagarMemoria} triple />
                <Button label="/" click={this.mudarOperacao} operacao />
                <Button label="7" click={this.addnumero} />
                <Button label="8" click={this.addnumero} />
                <Button label="9" click={this.addnumero} />
                <Button label="*" click={this.mudarOperacao} operacao />
                <Button label="4" click={this.addnumero} />
                <Button label="5" click={this.addnumero} />
                <Button label="6" click={this.addnumero} />
                <Button label="-" click={this.mudarOperacao} operacao />
                <Button label="1" click={this.addnumero} />
                <Button label="2" click={this.addnumero} />
                <Button label="3" click={this.addnumero} />
                <Button label="+" click={this.mudarOperacao} operacao />
                <Button label="0" click={this.addnumero} double />
                <Button label="." click={this.addnumero} />
                <Button label="=" click={this.mudarOperacao} operacao />
            </div>
        )
    }
}