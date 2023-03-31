import { Box } from "@mui/material";
import CropperJs from "cropperjs";
import { useRef, useState } from "react";
import { IPicture } from "../../interfaces/picture";
import FileUploader from "../file-uploader/FileUploader";

interface ICropperProps { 
  settings: ICropSettings[];
  onCropsChanged: (data: IPicture) => void;
  data: IPicture | null;
}

interface ICropSettings {
  media: string;
  width?: number;
  height?: number;
}

function Cropper({ data, settings, onCropsChanged }: ICropperProps) {
  const [currentImg, setCurrentImg] = useState<string>(data?.src!);
  const [crops, setCrops] = useState<[string, string, string]>(['', '', '']);
  const cropRefs = useRef<CropperJs[]>();

  function onImgUploaded(file: File, url?: string) {
    setCurrentImg(url!);
  }

  function setCropRef(imgRef: any, i: number) {
    if (!cropRefs.current) {
      cropRefs.current = [] as any;
    }
    const cropperOptions: CropperJs.Options<HTMLImageElement> = {aspectRatio: settings[i].width! / settings[i].height!};
    if (data?.src === currentImg) cropperOptions.data = {
      x: +data!.sources[i].srcSet.match(/l\=[^\&]+/)![0].replace('l=', ''),
      y: +data!.sources[i].srcSet.match(/t\=[^\&]+/)![0].replace('t=', ''),
      width: +data!.sources[i].srcSet.match(/cw\=[^\&]+/)![0].replace('cw=', ''),
      height: +data!.sources[i].srcSet.match(/ch\=[^\&]+/)![0].replace('ch=', ''),
    };
    cropRefs.current![i] = new CropperJs(imgRef, cropperOptions);
    imgRef.addEventListener('crop', () => {
      const croppedImagesPaths = cropRefs.current!.map((ref, i) => {
        const data = ref.getData();
        return {
          media: settings[i].media,
          srcSet: currentImg+`?l=${Math.floor(data.x)}&t=${Math.floor(data.y)}&cw=${Math.floor(data.width)}&ch=${Math.floor(data.height)}&rw=${Math.floor(settings[i].width!)}&rh=${Math.floor(settings[i].height!)}`,
        }
      })
      onCropsChanged({
        sources: croppedImagesPaths,
        src: currentImg!
      });
    })
  }

  return (
    <>
      <Box sx={{mb: 1}}>
        <FileUploader uploadUrl="/api/media/upload" onFileUploaded={onImgUploaded} />
      </Box>

      {currentImg && (
        <>
          {crops.map((el, i) => (
            <Box key={`${currentImg}${i}`} sx={{mb: 1}}>
              <div>
                <img src={currentImg} ref={r => r && setCropRef(r, i)} />
              </div>
            </Box>
          ))}
        </>
      )}
    </>
  )
}

export default Cropper;