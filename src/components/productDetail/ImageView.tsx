import { NavLink } from "react-router-dom";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type eachItemProps = {
  category: string;
  images: ReactImageGalleryItem[];
  name: string;
};

const ImageView = ({ category, images, name }: eachItemProps) => {
  const isMobile = useMediaQuery("(max-width:599px)");

  return (
    <div>
      {isMobile && <div className="product-view-name_mobile">{name}</div>}
      <ImageGallery
        items={images}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay={false}
        showNav={false}
      />
    </div>
  );
};

export default ImageView;
