import { v4 as generateID } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const uploadMedicineImage = async (
  file: File,
  comment?: string
): Promise<any> => {
  const imageID = generateID();
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `files/medicine-images/${imageID}-${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file, {
      customMetadata: { comment: "" },
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
