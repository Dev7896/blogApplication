import ImageKit from 'imagekit-javascript'

export const imageKit = new ImageKit({
    publicKey  : import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY ,
    urlEndpoint : import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT ,
    authenticationEndpoint: "http://localhost:3000/api/imagekit/auth",
})

