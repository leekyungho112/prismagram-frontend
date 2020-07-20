import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret = useInput("");
    const email = useInput("");
    const [requestSecretMutation] = useMutation(LOG_IN, 
        { 
           
            variables: { email:email.value }});

    
    const [createAccountMutation] = useMutation(CREATE_ACCOUT, {
        variables:{
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    }); 
    
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
        variables:{
            email: email.value,
            secret: secret.value
        }
    });

    const [localLogInMutation] = useMutation(LOCAL_LOG_IN)

    const onSubmit = async e => {
        e.preventDefault();
            if(action === "logIn"){
                if(email.value !== ""){
                 try{
                     const {data:{ requestSecret} }= 
                     await requestSecretMutation();
                     if (!requestSecret) {
                        toast.error("계정이 없습니다. 회원가입 해주세요");
                        setTimeout(() => setAction("signUp"), 3000);
                     }else{
                         toast.success("비밀번호는 메일함을 확인해주세요");
                         setAction("confirm");    
                        }
                    } catch{
                        toast.error("로그인 할 수 없습니다.다시 확인해주세요");
                    }
                }else{
                    toast.error("이메일 형식을 사용해주세요");
                }
            } else if (action === "signUp") {
                if(email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== "")
                {
                    try{
                    const { data: {createAccount} } = await createAccountMutation();
                    if(!createAccount) {
                        toast.error("계정을 만들 수 없습니다.");
                       
                    } else{
                        toast.success("계정생성 완료! 로그인해주세요");
                        setTimeout(() => setAction("logIn"), 3000);
                    }
                    
                    }catch (e){
                        toast.error(e.message);
                    }
                    
                } else {
                    toast.error("모든 항목을 기입하세요");
                }
            }else if(action === "confirm"){
                if(secret.value !== ""){
                    try{
                        const {
                            data:{confirmSecret:token} }= await confirmSecretMutation();
                            if(token !== "" && token !== undefined){
                                localLogInMutation({variables:{token}});
                            } else {
                                throw Error();
                            }
                            
                        
                    }catch{
                        toast.error("일치 하지 않습니다.다시 확인해 주세요");
                    }
                }
            }
    };
  
    return( <
        AuthPresenter 
        setAction={setAction} 
        action={action}
        username={username}
        firstName={firstName}
        lastName={lastName}
        email={email}
        secret={secret}
        onSubmit={onSubmit}
        />
    );
};