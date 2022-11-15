import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, 
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
    type: "service_account",
    project_id: "ecommerce-webapp-2d799",
    private_key_id: "e5c3b689f56e084673af8b0ad1528b68a9ee140d",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChjuyNHbmhCEHm\np+FfXYwZq6Xixvvfi9tRnqaER3rV6sqlfFAwGZxrF4qxA7xN+JvY/Tes/4dbOlp6\nn14BFrsqxbBWLScs29TW/BPUHdiGNrcquSwWLAhduoR+j1zyk89513sF3MZw8LjM\nSPoFkpro8JuuAUG0i/Gm8AowolOw1KjHZJzzo60kSDe9ULT/epBTB7imXnaFYg/x\nPckTUWr22VKTdqgrnSE3/j28fX5uHAoJHTXgPVwIAe9V+you8JK+liRVzc8Z5Pne\nleQUF/IjTV+XBTYQsCRMNAP0VsYbXQBu//FgpqrUmkWt+I6nBR1/Qi1h1tx7ZY51\nruZTDYstAgMBAAECggEABq1F+HUMiWuycYpppYvTsPHnmq43lZ8Nktt4LUpY+MNJ\n2boABGTikoh4CmXJn/1Qz5BzfxpWaT5Jo/y3IVtjo9pktcMK9e8l5janySHso2ta\neZEKkeYC+ICvXh2lrT7Pmcz+gBkGOH+yW3r+nkFXVp4vCOtzYDdSZuBPw3/J7qpi\ndTnDex9vXyQdgA07waUg4E2p8xvLHQyOcEyTzOhDBFL6/j8RUQGvqFNwXLjTspuz\n8cnjpez6rhAZsYrl2OWyMmkRWGJzgmWjbyrETtdyjp0avdoeGM2a8ijGPkncJQk7\nj6TyJcCaRsE2LGg9O57Eez+jlDdmfq4UcxS8PjSvAQKBgQDVKsyil1dN71oi+qmf\nB4KpfykaK7fOmZBItDEucu5vPpfdm1swLJ3i8KZjuMseqpr2HxLUPEg3/D2ymdU0\nWKEQ9kY8+bgcmnt5skOhPNElnh1mXFQSroyKQmvlOtOCiSzsmZxzUY4u2DkqFrHW\ndqu0RbZCnpntKDzgGzv+Baq6rQKBgQDCBWRyUE11maOuwq2H98pLis3RfiAK2S75\nNFolYRn50j+JXQvF3wzKfnAHvt7OBjIObtpfY7iXrxDd03xD1VBlXrYZmaJ9oTAl\nB5UWUCPWTAlUZTDV+zDPgo3P5C1y1unXiwzW+yD899f4UyM3C1iA5lwnpTsSYhXo\nOtzUpfSigQKBgDp0xjFAN1zT6m/1NVa7BIXerTLUEk/BpOOLJoGKWwB+tb67v8Hy\nOknlnHt0TZ9XQa+EzfENpvBTZ8f2j5UPSPwRzSkjge22H248CHfK6b/bIEzVvOhy\nnW+8z0HJY/9EBuHLLjAhiVAnU2XLW3FokaWaCGU0gRmcEzWRwl3ix/LxAoGAaYtL\naBAdAwMwEopeod9+0XdRnUuyHJSmw/PhsgHPgqIH5C6Uj/BVYfZD9UK0q3idVFKj\nQk7aBNG8KB+6sp/g2zQZdXWo+hRsP0iPppKz3AiC7sEZPt4lYEzR3ixvONCGZrWC\np5P3DwW4G6MGPhRS8dPef8aXitmGt00GAjvBB4ECgYBLoq+QakaWhW7Oj2clKxuS\n98h7C3MhowVCI2BxBSm4PSdPBDS74qh5AHe6K/vaBQcmkFrfE/Etb73NnQEs0ect\nVgrj4IlnM9YYvEttdcidvvcTRVzgHvrUU9oJnNjmBIdVs27TETPimzGeh2KuBcW0\nK26GzRBIPJ3+mZ4NBWrHzw==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-9ap8v@ecommerce-webapp-2d799.iam.gserviceaccount.com",
    client_id: "109373056042982307585",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9ap8v%40ecommerce-webapp-2d799.iam.gserviceaccount.com"
  }

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'user')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let user = []
    snapshot.docs.forEach(doc => {
      user.push({ ...doc.data(), id: doc.id })
    })
    console.log(user)
  })
  .catch(err => {
    console.log(err.message)
  })