import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
const uploadAvatar = async (file: File) => {
    const storage = getStorage();
    const time = new Date().getTime();
    const storageRef = ref(storage, `avatars/${time}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        break;
                }
                return "Hello";
            },
            (error) => {
                reject(
                    `Unexpected error while 'uploadAvatar'.${error.message}`,
                );
                throw new Error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
                return "Success";
            },
        );
    });
};

export default uploadAvatar;
