import React, {ReactElement, useState, useRef} from "react";
import type {Ref} from "react";
import styled from "styled-components";
import {AiOutlineClose, AiFillFileExclamation} from "react-icons/ai"




import { useEffectOnMount } from "../../hooks";
import {PageLayout} from "../../styles";
import { baseURL } from "../../constants";
import { Select, Loader } from "../../components";
import {IOption} from "../../components/Select";



const UploadContainer = styled(PageLayout)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const UploadForm = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: ${(props: any) => props.theme.secondary};
`

const FormTop = styled.div`
    width: 100%;
    border-bottom: 1px solid ${(props: any) => props.theme.background};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
`

const IconButton = styled.span`
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
        font-size: 1.5rem;
    }

    &:hover {
        background-color: rgba(0,0,0,.05);
    }
`;


const FormBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    & span {
        font-family: Space Grotesk Semibold !important;
    }
`;

const FileBox = styled.div`
    width: 100%;
    padding: 20px;
    min-height: 200px;
    border-radius: 8px;
    border: 1px dashed ${(props: any) => props.theme.background};
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.8s ease-in-out;

    & p {
        font-family: Space Grotesk Bold !important;
        font-size: 1.5rem;
        margin-bottom: 5px;
        color: ${(props: any) => props.theme.background};
        transition: all 0.8s ease-in-out;
    }

    & span {
        color: ${(props: any) => props.theme.textLight};
    }

    & svg {
        font-size: 5rem;
        color: ${(props: any) => props.theme.background};
        transition: all 0.8s ease-in-out;
    }

    &:hover {
        border-color: ${(props: any) => props.theme.primary};

        & svg {
            color: ${(props: any) => props.theme.primary}
        }

        & p {
            color: ${(props: any) => props.theme.primary}
        }
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    width: 100%;
    border: 1px solid ${(props: any) => props.theme.textLight};
    display: flex;
    margin-top: 10px;
    background-color: ${(props: any) => props.theme.backgroundLight};
    border-radius: 4px;
    padding: 4px;
`;

const Button = styled.button`
    color: ${(props: any) => props.theme.text};
    padding: 8px 16px;
    cursor: ${(props: any) => props.disabled ? 'not-allowed' : 'pointer'};
    border: 1px solid ${(props: any) => props.theme.text};
    border-radius: 4px;
    background-color: ${(props: any) => props.disabled ? props.theme.background : props.theme.backgroundLight};
    font-family: Space Grotesk Bold !important;


    &:hover:not(:disabled) {
        border: 1px solid ${(props: any) => props.theme.primary};
        color: ${(props: any) => props.theme.primary};
    }
`

const Input = styled.input`
    flex: 1;
    background-color: transparent;
    border: none;
    focus: none;
    outline: none;
    line-height: 2;
    padding:4px;
    color: ${(props: any) => props.theme.text};
    font-family: Space Grotesk Semibold !important;
    letter-spacing: 0.6px;
    display: ${(props: any) => props.show ? 'block' : 'none'}
`;





const options: IOption[] = [
    {
        value: "first",
        title: "First"
    },
    {
        value: "second",
        title: "Second"
    },
    {
        value: "third",
        title: "Third"
    },
    {
        value: "fourth",
        title: "Fourth"
    },
    {
        value: "fifth",
        title: "Fifth"
    },
]




const Upload: React.FC<{}> = ({}): ReactElement => {
    // const percentage: {status: number} = {
    //     status: 50
    // }
    // const p: any= new Proxy(percentage, {
    //     set(target, key, value) {
    //         if(key === "status" && key > "100"){
    //             throw new Error("Value must be larger 100");
    //             return;
    //         }
    //         console.log({target, key, value});
    //         return value;
    //     }
    // })
    const [url, setUrl] = useState<string>("");
    const [file, setFile] = useState<null | File>(null);
    const inputRef: Ref<null | HTMLElement> = useRef(null);
    const modalReady: Ref<boolean> = useRef<boolean>(false);


    useEffectOnMount(() => {
        console.log("Upload component is mounted");
        return () => console.log("Upload component is unmounted");
    }, [])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value, name} = e.target;
        name === "url" ? setUrl(_ => value) : setFile(_ => {
           let f = e.target?.files as FileList;
           console.log(f);
           if(f === null) return null;
           else return f[0];
        });
    }

    const triggerFileHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        if(e.target !== e.currentTarget) return;
        console.log(inputRef.current);
        if(inputRef.current === null) return;
        inputRef.current.click();
    }

    const uploadFileHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        try{
            if(file === null) return;
            else {
                //file isn't null so we read it to an array buffer
                const reader = new FileReader();
                reader.onload = async e => {
                    if(e.target === null) return;
                    let result: ArrayBuffer | null | string = e.target.result;
                    console.log(result);
                    if(result === null) return;
                    let res = await fetch(`${baseURL}/upload`, {
                        method: 'POST',
                        body: new Uint8Array(result as ArrayBufferLike),
                        headers: {
                            "Content-Type": "multipart/formdata",
                            "File-Size": (result as ArrayBuffer).byteLength + "",
                            "File-Type": file.type,
                            "File-Name": file.name
                        }
                    })
                    res = await res.json();
                    console.log(res);
                }
                reader.readAsArrayBuffer(file);
            }
        }catch(err: any){
            console.log(err.message);
        }
    }


    return (
        <UploadContainer>
            <UploadForm>
                <FormTop>
                    <h2>Upload File</h2>
                    <IconButton>
                        <AiOutlineClose />
                    </IconButton>
                </FormTop>
                <FormBody>
                    <FileBox onClick={triggerFileHandler}>
                        <AiFillFileExclamation />
                        {file === null ? <>
                            <p>Select a file to upload</p>
                            <span>or drag and drop it here</span>
                        </> : 
                        <>
                        <span style={{textAlign:'center', marginBottom: 10}}>{file.name}</span>
                        <Button onClick={uploadFileHandler}>{modalReady.current ? 'Preview' : 'Upload'}</Button>
                        </>
                        }
                    </FileBox>
                    <Input ref={inputRef} onChange={changeHandler} type="file" name="file"  />
                    <FormContainer>
                        <span>Or upload from a URL</span>
                        <InputContainer>
                            <Input autoComplete="off" show value={url} onChange={changeHandler} type="text" name="url" placeholder="Add file URL" />
                            <Button disabled={url.trim() === "" ? true : false}>Upload</Button>
                        </InputContainer>
                    </FormContainer>
                    <Loader />
                    <Select multiple options={options} />
                </FormBody>
            </UploadForm>
        </UploadContainer>
    )
}




export default Upload;