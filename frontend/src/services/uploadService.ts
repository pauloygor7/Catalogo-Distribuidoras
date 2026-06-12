import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from './firebase'

interface UploadProgress {
  progress: number
  url?: string
}

export async function uploadProductImage(
  file: File,
  productId: string,
  onProgress?: (progress: number) => void,
): Promise<string> {
  const extension = file.name.split('.').pop()
  const filename = `products/${productId}-${Date.now()}.${extension}`
  const storageRef = ref(firebaseStorage, filename)

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        onProgress?.(progress)
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      },
    )
  })
}