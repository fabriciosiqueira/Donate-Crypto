"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doLogin } from "@/service/Web3Service";

export default function Home() {
    const {push} = useRouter();
    const [message, setMessage] = useState(""); 

   

    function btnLoginClick(){
        setMessage("Conectando na carteira... aguarde...")
        doLogin()
        .then(account => push("/create"))
        .catch(err => {
            console.error(err)
            setMessage(err.message)
        })
    }

    return (
        <>
            <div className="container px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-6">
                    <img src="/donate.jpeg" className="d-block mx-lg-auto img-fluid" width="700" height="500"/>
                </div>
                <div className="col-6">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
                    <p className="lead">
                    Sua Plataforma descentralizada de doaçôes.
                    </p>
                    <p className="lead">
                    Autentique-se com sua carteira e crie sua campanha.
                    </p>
                    <p className="lead mb-3">
                    Para doaçôes, use o link da campanha já existente.
                    </p>
                    <div className="d-flex justify-content-start mt-5">
                    <button onClick={btnLoginClick} type="button" className="btn btn-primary btn-lg px-4 me-2 col-12">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" width="64" className="me-2" />
                        Conectar com a MetaMask
                    </button>
                    </div>
                    {message ?
                        <div className="alert alert-success p-3 col-12 mt-3" role="alert">
                            {message}
                        </div>
                        :
                        <></>
                    }
                </div>
                </div>
            </div>
        </>
    );
}
