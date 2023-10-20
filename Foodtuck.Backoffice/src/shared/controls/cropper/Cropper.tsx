import { Box } from "@mui/material";
import CropperJs from "cropperjs";
import { useEffect, useRef, useState } from "react";
import { IPicture } from "../../interfaces/picture";
import FileUploader from "../file-uploader/FileUploader";
import { mapSrcToPicture } from "../../helpers/map-src-to-picture";

interface ICropperProps { 
  settings: ICropSettings[];
  onCropsChanged: (data: IPicture) => void;
  data?: IPicture | null;
  dataAsString?: string;
  isFilePickerHidden?: boolean;
}

interface ICropSettings {
  media: string;
  width?: number;
  height?: number;
}

function Cropper({ data, settings, onCropsChanged, isFilePickerHidden }: ICropperProps) {
  const [currentImg, setCurrentImg] = useState<IPicture>(data!);
  const [crops, setCrops] = useState<[string, string, string]>(['', '', '']);
  const isFirstLoad = useRef<boolean>(true);
  const cropRefs = useRef<CropperJs[]>();

  useEffect(() => {
    if (!isFirstLoad.current) {
      onCropsChanged(currentImg);
    } else {
      isFirstLoad.current = false;
    }
  }, [currentImg])

  function onImgUploaded(url: string) {
    setCurrentImg(mapSrcToPicture(url, settings.length));
  }

  function setCropRef(imgRef: any, i: number) {
    if (!cropRefs.current) {
      cropRefs.current = [] as any;
    }
    const cropperOptions: CropperJs.Options<HTMLImageElement> = {aspectRatio: settings[i].width! / settings[i].height!};
    if (data?.src === currentImg?.src) cropperOptions.data = {
      x: +data!.sources[i]?.srcSet.match(/l\=[^\&]+/)![0].replace('l=', ''),
      y: +data!.sources[i]?.srcSet.match(/t\=[^\&]+/)![0].replace('t=', ''),
      width: +data!.sources[i]?.srcSet.match(/cw\=[^\&]+/)![0].replace('cw=', ''),
      height: +data!.sources[i]?.srcSet.match(/ch\=[^\&]+/)![0].replace('ch=', ''),
    };
    cropRefs.current![i] = new CropperJs(imgRef, cropperOptions);
    imgRef.addEventListener('crop', ({detail: data} : any) => {
      const croppedImagesPaths = currentImg.sources.map((source, idx) => {
        return i !== idx ? source : {
          media: settings[i].media,
          srcSet: currentImg.src+`?l=${Math.floor(data.x)}&t=${Math.floor(data.y)}&cw=${Math.floor(data.width)}&ch=${Math.floor(data.height)}&rw=${Math.floor(settings[i].width!)}&rh=${Math.floor(settings[i].height!)}`,
        }
      })

      setCurrentImg({...currentImg, sources: croppedImagesPaths})
    })
  }

  return (
    <div>
      {!isFilePickerHidden && (
        <Box sx={{mb: 1}}>
          <FileUploader uploadUrl="/api/media/upload" onFileUploaded={(file, url) => onImgUploaded(url!)} />
        </Box>
      )}

      {currentImg && (
        <>
          {crops.map((el, i) => (
            <Box key={`${currentImg}${i}`} sx={{mb: 1}}>
              <div>
                <img src={currentImg.src} ref={r => r && setCropRef(r, i)} />
              </div>
            </Box>
          ))}
        </>
      )}
    </div>
  )
}

export default Cropper;