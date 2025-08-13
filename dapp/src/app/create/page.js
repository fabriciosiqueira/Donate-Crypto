"use client"

import { addCampaign, getLastCampaignId } from "@/service/Web3Service";
import { useState } from "react";

export default function Create() {

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({imageUrl:"donate.jpeg"});
    
    function onInputChange(evt){
        setCampaign(prevState => ({...prevState, [evt.target.id]: evt.target.value}))
    }

    function btnSaveClick(){
        
        setMessage("Salvando a campanha... agaurde...") 
        addCampaign(campaign)
            .then(tx => getLastCampaignId())
            .then((id=> setMessage(`Campanha foi salva com o ID ${id}. Em alguns minutos ela estará pronta pra receber doações, use esse link para divulgá-la: http://localhost:3000/donate/${id}`)))
            .catch(err => {
                console.error(err)
                setMessage(err.message)
            })
    }

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <p>
                    Preencha os campos para incluir sua campanha na plataforma
                </p>
                <p>
                    Ao término do cadastro, você receberá o link para divulgá-la e receber as doações.
                </p>
                <hr className="mb-4"/>
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-6">
                    <img src="/donate.jpeg" className="d-block mx-lg-auto img-fluid" width="700" height="500"/>
                </div>
                <div className="col-6">
                    <div className="form-floating mb-3 ">
                        <input type="text" id="title" className="form-control" value={campaign.title || ""} onChange={onInputChange} />
                        <label htmlFor="title">Titulo</label>
                    </div>
                    <div className="form-floating mb-3 ">
                        <textarea id="description" className="form-control" value={campaign.description || ""} onChange={onInputChange} />
                        <label htmlFor="description">Descrição</label>
                    </div>
                   {/*  <div className="form-floating mb-3 " hidden>
                        <input type="text" id="imageUrl" className="form-control" defaultValue="donate.jpeg" />
                        <label htmlFor="imageUrl">URL da Imagem</label>
                    </div> */}
                    <div className="form-floating mb-3 ">
                        <input type="text" id="videoUrl" className="form-control" value={campaign.videoUrl || ""} onChange={onInputChange}/>
                        <label htmlFor="videoUrl">URL do Video</label>
                    </div>
                    <div className="d-flex justify-content-start mt-5">
                        <button onClick={btnSaveClick} type="button" className="btn btn-primary btn-lg  p-3 col-12">
                            Salvar
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
