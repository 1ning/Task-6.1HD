import { initializeApp } from "firebase/app";
import { getFirestore,doc,getDoc,setDoc,collection,query,getDocs,writeBatch} from "firebase/firestore";
import { getStorage, ref, } from "firebase/storage";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,sendPasswordResetEmail, ProviderId} from "firebase/auth";
import { usePopper } from 'react-popper';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCjeqZsGQZKapslSFA4rHEgid_Si9YS3GY",
    authDomain: "sit314final.firebaseapp.com",
    databaseURL: "https://sit314final-default-rtdb.firebaseio.com",
    projectId: "sit314final",
    storageBucket: "sit314final.appspot.com",
    messagingSenderId: "721413771606",
    appId: "1:721413771606:web:2909d18a0eb972545dc6f7",
    measurementId: "G-6FHFEW2KBR"
  };

// Initialize Firebase
const firebasepp = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db =getFirestore();
export const db2 = getDatabase();
export const storage=getStorage(firebasepp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters(
    {
        prompt:"select_account"
    }
)
export const SignInwithGooglePopup=()=>signInWithPopup(auth,provider);
//Get all questions in the database
export const fetchQuestionsAndDocuments= async()=>
{
    const collectionRef = collection(db,'questions')
    const q= query(collectionRef)
    const querySnapshot= await getDocs(q);
    var questionMap1=new Array;
    await querySnapshot.docs.forEach((doc)=>
    {   
       var  eachone = ({ id: doc.id, ...doc.data() })
        questionMap1.push(eachone)
        return  questionMap1;
       }, [])
    return questionMap1
}
//Get all articles in the database
export const fetchArticlesAndDocuments= async()=>
{
    var i=0;
    const collectionRef = collection(db,'articles')
    const q= query(collectionRef)
    const querySnapshot= await getDocs(q);
    var articleMap1=new Array;
    await querySnapshot.docs.forEach((doc)=>
    {   
       var  eachone = ({ id: doc.id, ...doc.data() })
       articleMap1.push(eachone)
        return  articleMap1;
       }, [])
    return articleMap1
}
//Get all videos in the database
export const fetchVideosAndDocuments= async()=>
{
    var i=0;
    const collectionRef = collection(db,'video')
    const q= query(collectionRef)
    const querySnapshot= await getDocs(q);
    var articleMap1=new Array;
    await querySnapshot.docs.forEach((doc)=>
    {   
       var  eachone = ({ id: doc.id, ...doc.data() })
       articleMap1.push(eachone)
        return  articleMap1;
       }, [])
    return articleMap1
}

//Create a user to firebase
export const createUserDocFromAuth=async(userAuth,additionalInformation={})=>{
    if(!userAuth.email)return;
    const userDocRef= doc(db,'users',userAuth.uid);
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists())
    {
        const {displayName, email}=userAuth;
        const createdAt=new Date();
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInformation
        })
        console.log( displayName+" "+email)
    }
    catch(error){
        console.log('error in creating',error.message)
    } 
}
    return userDocRef;
}
//Writing data to the database
export const addCollectionAndDocument=async (collectionKey,objectsToAdd)=>{
  const collectionRef= collection(db, collectionKey)
  const batch= writeBatch(db)
    const docRef =doc(collectionRef, objectsToAdd.title);
      batch.set(docRef,objectsToAdd)
  await batch.commit();
  console.log("upload successfully")
}
//Mailbox registration
export const createAuthUserWitEmailandnameandpassword=async(email,password)=>{
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}
//Mailbox Login
export const signinWithEmailAndPassword=async(email,password)=>{
    if(!email||!password) return;
    return await signInWithEmailAndPassword(auth,email,password)
}
//Retrieve password via email
export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };