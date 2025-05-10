import{ useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseUrl";
import { toast } from "react-toastify";
import logger from './../../../../../src/utils/logger';

const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    //^ convert to base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //^^request to upload a file
    const uploadSingleImage = (base64) => {
        setLoading(true);
        axios
            .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
            .then((res) => {
                const imageUrl = res.data;
                setUrl(imageUrl);
                logger.info("Imagem enviada com sucesso");
                toast.success("Imagem enviada com sucesso");
                setImage(imageUrl);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                logger.error(error);
                setLoading(false);
            });
    };

    const uploadImage = async (event) => {
        const files = event.target.files;

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    }

    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-2'>
                Upload da Imagem
            </label>

            <label
                htmlFor={name}
                className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full shadow-sm hover:bg-indigo-600 cursor-pointer"
            >
                Selecionar Imagem
            </label>

            <input
                type="file"
                name={name}
                id={name}
                onChange={uploadImage}
                className="hidden"
            />

            {loading && (
                <div className='mt-2 text-sm text-blue-600'>Carregando Imagem...</div>
            )}

            {url && (
                <div className='mt-4 text-sm text-green-600 w-50'>
                    <p>Imagem Carregada com sucesso!</p>
                    <img src={url} alt="uploaded" className="mt-2 w-48 rounded-md shadow" />
                </div>
            )}
        </div>

    )

}
export default UploadImage