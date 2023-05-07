interface IProps {
  data: IImage,
  classForImg: string
}

export interface IImage {
  src: string,
  sources: IImageSources[],
  alt: string
}

interface IImageSources {
  media: string,
  srcSet: string
}

const Picture = ({data, classForImg}: IProps) => {
  return (
    <>
      <picture>
        {
          data.sources?.map((el, i) =>  (
              <source media={el.media} srcSet={el.srcSet} key={i}/>
            )
          )
        }

        <img className={classForImg} src={data.src} alt={data.alt}/>
      </picture>
    </>
  )
}

export default Picture;