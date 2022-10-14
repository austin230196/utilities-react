import React from 'react';
import styled from 'styled-components';
import {MdClear} from 'react-icons/md';




export const InputContainer = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    border: 1px solid ${(props: any) => props.theme.background};

    & label {
        color: rgba(22, 64, 147, .5);
        margin-right: 10px;
    }

    & input {
        flex: 1;
        line-height: 2;
        padding: 4px;
        outline: none;
        border: none;
        background: transparent;
        color: ${(props: any) => props.theme.primaryDark};
        // font-family: Space Grotesk Bold !important;
    }
`;



const Choices = styled.div`
    display:flex;
    width: min(40%, 200px);
    align-items: center;
    overflow-x: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Choice = styled.span`
    padding: 5px 10px;
    display: flex;
    align-items: center;
    color: ${(props: any) => props.theme.primaryDark};
    background-color: rgba(22, 64, 147, .2);
    border-radius: 4px;
    font-family: Space Grotesk Bold !important;
    margin-inline: 5px;
    white-space: nowrap;

    & svg {
        color: ${(props: any) => props.theme.primaryDark};
        margin-left: 10px;
        cursor: pointer;
        transition: color 0.5s ease-out;

        &:hover {
            color: red;
        }
    }
`


type InputProps = {
    label: string
    multiple?: boolean
    value: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
}



const Input: React.FC<InputProps> = ({label, value, setValue, multiple=false}): React.ReactElement => {
    const [state, setState] = React.useState<string>('');

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setState((old: string) => e.target.value);
    }

    function clearChoiceHandler(e: React.MouseEvent<HTMLOrSVGElement>, i: number): void {
        setValue(old => {
            let copy = [...old]
            copy.splice(i, 1);
            return copy;
        })
    }

    function addChoiceHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
        console.log(state, e.key);
        if(e.key !== 'Enter') return;
        e.preventDefault();
        if(state.trim() === '') return;
        else {
            setValue((old: string[]) => {
                if(multiple){
                    let copy: string[] = [...old];
                    (copy.length === 1 && copy[0].trim() === '') ? copy[0] = state : copy.push(state);
                    return copy;
                }else {
                    return [state];
                }
            })
            setState(_ => '');
        }
    }
    console.log(value);

    return (
        <InputContainer>
            <label>{label}</label>
            {(value.length > 0 && value[0].trim() !== '') &&
            (<Choices>
                {
                    value.map((v, i) => (<Choice key={i}>{v} <MdClear onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => clearChoiceHandler(e, i)} /></Choice>))
                }
            </Choices>)}
            <input type='text' onKeyDown={addChoiceHandler} value={state} onChange={changeHandler} />
        </InputContainer>
    )
}


export default Input;