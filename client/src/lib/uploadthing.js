import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

const URL = "https://deploy-uva8.onrender.com";

export const { useUploadThing, getRouteConfig, uploadFiles } = generateReactHelpers({ url: URL});
export const UploadButton = generateUploadButton({ url: URL });
export const UploadDropzone = generateUploadDropzone({ url: URL });
