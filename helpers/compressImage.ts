import Compress from "browser-image-compression";
interface Options {
  /** @default Number.POSITIVE_INFINITY */
  maxSizeMB?: number;
  /** @default undefined */
  maxWidthOrHeight?: number;
  /** @default false */
  useWebWorker?: boolean;
  /** @default 10 */
  maxIteration?: number;
  /** Default to be the exif orientation from the image file */
  exifOrientation?: number;
  /** A function takes one progress argument (progress from 0 to 100) */
  onProgress?: (progress: number) => void;
  /** Default to be the original mime type from the image file */
  fileType?: string;
  /** @default 1.0 */
  initialQuality?: number;
}

// Compression config
export const options: Options = {
  // As the key specify the maximum size
  // Leave blank for infinity
  maxSizeMB: 1,
  // Use webWorker for faster compression with
  // the help of threads
  maxWidthOrHeight: 1000,
  useWebWorker: true,
}


export async function $compress(file:File,config?:Options){
  const result = await Compress(file, {...options,...config});
  return result
}