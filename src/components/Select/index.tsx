import React, {ReactElement, useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {FiArrowDown, FiArrowUp} from "react-icons/fi";



import { useEffectOnMount } from "../../hooks";




const SelectContainer = styled.div`
    width: 100%;
    border: 1px solid ${(props: any) => props.theme.background};
    position: relative;
    box-sizing: border-box;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
`;



const Bar = styled.hr`
    background-color: ${(props: any) => props.theme.background};
    border: none;
    // height: 100px;
    width: 1px;
`;

const Options = styled.ul`
    position: absolute;
    box-shadow: 0px -2px 6px 0px rgba(0,0,0,.2);
    top: 105%;
    background-color: ${(props: any) => props.theme.secondary};
    left: 0;
    right: 0;
    margin:0;
    padding: 0;
    list-style-type: none;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;

    & li {
        width: 100%;
        line-height: 2.2;
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: rgba(190, 193, 194, .3);
        }
    }

    & li:nth-child(even){
        background-color: rgba(38, 110, 250, .2)
    }
`;


const ComponentContainer = styled.div`
    width: 100%;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    padding: 0px 8px;
    min-height: 50px;
`;


const OptionContainer = styled.div`
    width: 80%;
    padding: 4px;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
`;


const Chosen = styled.div`
    display: inline-block;
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid ${(props: any) => props.theme.background};
    background-color: rgba(38, 110, 250, .2);
    cursor: pointer;
    vertical-align: middle;
    margin: 5px;
    transition: background-color .8s ease-out;

    &:hover {
        background-color: rgba(255, 99, 71, .2);
        
        & > span {
            color: red;
        }
    }

    & > span {
        font-size: 1.2rem;
        margin-left: 10px;
    }
`;


const Close = styled.span`
    font-size: 1.5rem;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.8s ease-out;

    &:hover {
        color: red;
    }
`


const Icon = styled.div`
    padding: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    // transition: opacity 0.5s ease-out;
    animation: icon 0.8s -2s ease-out;


    @keyframes icon {
        from {
            x: -100%;
        },
        to {
            x: 0%;
        }
    }


    &:hover {
        opacity: 1;

    }
`


export type IOption = {
    value: string;
    title: string;
}


interface ISelect {
    options: Array<IOption>,
    multiple?: boolean
}


const Select: React.FC<ISelect> = ({options, multiple}): ReactElement => {
    const [chosen, setChosen] = useState<Array<string>>([]);
    const [show, setShow] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffectOnMount(() => {
        console.log("Select component is mounted");
        return () => console.log("Select component is unmounted");
    }, [])
    useEffect(() => {
        console.log(containerRef);
        if(!containerRef.current) return;
        containerRef.current.addEventListener("click", (e: any) => {
            if(e.keyCode )
            switch(e.keyCode){
                case "Tab": {
                    setShow((old: any) => true);
                    break;
                }
                default:
                    break;
            }
        })
    }, [])


    // const changeSelectHandler: Function = (e: any): void => {
        
    // }




    return (
        <SelectContainer onClick={(e: any) => setShow(old => !old)} ref={containerRef} id="select">
            <ComponentContainer>
                <OptionContainer>
                    {
                        chosen.map((c, i) => (
                            <Chosen key={i} onClick={(e: any) => e.stopPropagation()}>
                                {c}  <span onClick={(e: any) => {
                                    e.stopPropagation();
                                    setChosen((old: any) => {
                                        const copy = [...old];
                                        let index = copy.findIndex((o: string) => o === c);
                                        copy.splice(index, 1);
                                        console.log(copy);
                                        return copy;
                                    })
                                }}>&times;</span>
                            </Chosen>
                        ))
                    }
                </OptionContainer>
                {chosen.length > 0 && (<Close onClick={(e: any) => {
                    e.stopPropagation();
                    setChosen((old: any) => {
                        return [];
                    })
                    setShow((old: any) => false);
                }}>
                    &times;
                </Close>)}
                <Bar />
                <Icon>
                    {show ? <FiArrowUp /> : <FiArrowDown />}
                </Icon>
            </ComponentContainer>
            {show && (<Options>
                {
                    options.map(({value, title}, i) => (
                        <li key={i} value={value} onClick={(e: any) => {
                            console.log(e.target.value, chosen)
                            setChosen((old: any) => {
                                if(multiple){
                                    if(old.includes(title)) return old;
                                    let copy = [...old];
                                    copy.push(title);
                                    return copy;
                                }else {
                                    old[0] = title;
                                    return old;
                                }
                            })
                        }}>{title}</li>
                    ))
                }
            </Options>)}
        </SelectContainer>
    )
}




export default Select