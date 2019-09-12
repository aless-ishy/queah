import React from "react";
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

class PieceButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {isPuttingPiece : this.props.isPuttingPiece};
    }

    render() {
        return(
        <div>
            <MyButton onClick={e =>{ this.setState({isPuttingPiece: !this.state.isPuttingPiece});}}>{this.state.isPuttingPiece ? "Cancelar" : "Colocar Peça"}</MyButton>
        </div>
        );
    }

}

export default PieceButton;