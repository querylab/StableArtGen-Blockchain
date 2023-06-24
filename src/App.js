import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';

// Components
import Spinner from 'react-bootstrap/Spinner';
import Navigation from './components/Navigation';

// ABIs
import NFT from './abis/stableartgen.json'

// Config
import config from './config.json';

const REACT_APP_HUGGING_FACE_API_KEY="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"
const REACT_APP_NFT_STORAGE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJCODBhNjBjYUUxM2NjQkZkRUIzNjc0RURjNGRmMzBFYWVlNDVhZjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NzQ3MTYxMDYwMywibmFtZSI6Ik5GVCBBSSBHZW5lcmF0b3IgUHJvamVjdCJ9.cmEoHhL5mkjM3s6nFKJ2NGYn3OTpl0uu2VsnOXHn6RM"



function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [url, setURL] = useState(null)

  const [message, setMessage] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()

    const nft = new ethers.Contract(config[network.chainId].stableartgen.address, NFT, provider)
    setNFT(nft)
  }



  



  const submitHandler = async (e) => {
    e.preventDefault()

    if (name === "" || description === "") {
      window.alert("Please provide a name and description")
      return
    }

    setIsWaiting(true)

    // Call AI API to generate a image based on description
    const imageData = await createImage()

    // Upload image to IPFS (NFT.Storage)
    const url = await uploadImage(imageData)

    // Mint NFT
    await mintImage(url)

    setIsWaiting(false)
    setMessage("")
  }
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  query({"inputs": "Astronaut riding a horse"}).then((response) => {
    // Use image
  });




  const createImage = async () => {
    setMessage("Generating Image...")

    // You can replace this with different model API's
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`

    // Send the request
    const response = await axios({
      url: URL,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        inputs: description, options: { wait_for_model: true },
      }),
      responseType: 'arraybuffer',
    })

    const type = response.headers['content-type']
    const data = response.data

    const base64data = Buffer.from(data).toString('base64')
    const img = `data:${type};base64,` + base64data // <-- This is so we can render it on the page
    setImage(img)

    return data
  }

  const uploadImage = async (imageData) => {
    setMessage("Uploading Image...")

    // Create instance to NFT.Storage
    const nftstorage = new NFTStorage({ token: REACT_APP_NFT_STORAGE_API_KEY })

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
    })

    // Save the URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    setURL(url)

    return url
  }

  const mintImage = async (tokenURI) => {
    setMessage("Waiting for Mint...")

    const signer = await provider.getSigner()
    const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") })
    await transaction.wait()
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (


    
<div >
  <Navigation account={account} setAccount={setAccount} />


  <div  style={{fontFamily: "Ubuntu", fontWeight: 'bold', textAlign: "left", marginLeft: "auto", marginRight: "auto", width: "80%", color: "white",marginTop: "50px"}}>
  <h1 style={{ textAlign: "left", marginLeft: "-140px" }}>StableArtGen, The Powerful AI NFTGenerator.</h1>
  <p style={{ textAlign: "left", marginLeft: "-1160px" }}>Bring your artistic ideas to life with the help of StableArtGen, an artificial intelligence-based NFT generator.</p>
  <p style={{ textAlign: "left", marginLeft: "-1120px" }}>StableArtGen Blockchain is an application that uses Stable Diffusion AI technology to generate prompt user images.</p>
  <p style={{ textAlign: "left", marginLeft: "-1290px" }}> Users enter a prompt or directive and StableArtGen creates an image based on that prompt.</p>
  <p style={{ textAlign: "left", marginLeft: "-1030px" }}>In addition to Stable Diffusion AI, the application uses IPFS (InterPlanetary File System) technology to store the generated images.</p>
 <p style={{ textAlign: "left", marginLeft: "-1260px" }}>IPFS is a decentralized peer-to-peer file system that allows for efficient data storage and retrieval.</p>
  <p style={{ textAlign: "left", marginLeft: "-860px" }}>By using IPFS, images generated by Stable Art Generator are stored in a decentralized manner, which offers increased censorship resistance and availability.</p>
  <p style={{ textAlign: "left", marginLeft: "-860px" }}>For image storage, Stable Art Generator employs NFT.Storage, a service that enables the storage of non-fungible tokens (NFTs) on the Ethereum blockchain.</p>
  <p style={{ textAlign: "left", marginLeft: "-790px" }}>Through NFT.Storage, the generated images become unique digital assets, benefiting from the immutability and ownership features provided by blockchain technology.</p>
  <p style={{ textAlign: "left", marginLeft: "-1430px" }}>Operates on the Polygon Mumbai Test Network Cost per NFT is 1 Matic.</p>


</div>




  <div className='form' >
    <form onSubmit={submitHandler} >
      <input type="text" placeholder="Create a name..." onChange={(e) => { setName(e.target.value) }} style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#333',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ef9a9a, #fff)',
            marginBottom: '20px'
          }}/>
      <input type="text" placeholder="Create a description..." onChange={(e) => setDescription(e.target.value)} style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#333',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ef9a9a, #fff)',
            marginBottom: '20px'
          
          }}/>
          


          <button type="submit" style={{
border: '7px solid #202020',
borderRadius: '20px',
color: '#333',
fontWeight: 'bold',
background: 'linear-gradient(to right, #202020, #202020)',
marginBottom: '20px',
marginLeft: '85px',
fontSize: '25px'
}}>
{isWaiting ? (
<Spinner animation="border" role="status">
<span className="visually-hidden">Loading...</span>
</Spinner>
) : (
<>




<img class="transparent-image" src="https://i.imgur.com/CO7Lsxy.png" alt="mint" />


</>
)}
</button>



    </form>

    <div className="image" style={{
            border: '7px solid #fff',
            borderRadius: '20px',
            color: '#fff',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ef9a9a, #fff)',
            marginBottom: '20px'
          }}>
      {!isWaiting && image ? (
        // eslint-disable-next-line
        <img src={image} alt="AI generated image" />
      ) : isWaiting ? (
        <div className="image__placeholder">
          <Spinner animation="border" />
          <p>{message}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  </div>

  {!isWaiting && url && (
    <p>
      View&nbsp;<a href={url} target="_blank" rel="noreferrer">Metadata</a>
    </p>
  )}

  <footer style={{ textAlign: "center", marginTop: "50px" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">
        <img src="https://i.imgur.com/iywAlED.png" width={30} alt="GitHub" />
      </a>
    
      <p style={{ color: "white" ,fontWeight: "bold", marginTop: "10px" }}>
        Made with <span role="img" aria-label="love">❤️</span> by querylab
      </p>
    </div>
  </footer>
</div>
  );
}

export default App;
