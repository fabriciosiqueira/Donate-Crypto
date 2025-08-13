
export default function Create() {
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
                <img src="https://luzernecountybar.com/site/wp-content/uploads/2024/03/s268819900234155836_p257_i1_w1200.jpeg" className="d-block mx-lg-auto img-fluid" width="700" height="500"/>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3 ">
                    <input type="text" id="title" className="form-control" />
                    <label htmlFor="title">Titulo</label>
                </div>
                <div className="form-floating mb-3 ">
                    <textarea id="description" className="form-control" />
                    <label htmlFor="description">Descrição</label>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="text" id="imageUrl" className="form-control" />
                    <label htmlFor="imageUrl">URL da Imagem</label>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="text" id="videoUrl" className="form-control" />
                    <label htmlFor="videoUrl">URL do Video</label>
                </div>
                <div className="d-flex justify-content-start mt-5">
                    <button type="button" className="btn btn-primary btn-lg  p-3 col-12">
                        Salvar
                    </button>
                </div>
                <div className="alert alert-success p-3 col-12 mt-3" role="alert">
                    Campanha cadastrada com sucesso
                </div>
            </div>
            </div>
        </div>
    </>
  );
}
