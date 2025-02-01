export default function ImageGrid({ images }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img 
            src={image.urls.small} 
            alt={image.alt_description || "Image"} 
            className="w-full h-full object-cover" 
          />
        </div>
      ))}
    </div>
  );
}
