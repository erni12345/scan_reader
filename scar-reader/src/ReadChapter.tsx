import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



interface ImageListProps {
  images: string[];
}
interface ChapterDetailsProps {
  chapterId?: string;
}
const ImageList: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          style={{ display: 'block', marginBottom: '20px', maxWidth: '100%' }}
        />
      ))}
    </div>
  );
};


const ReadChapter: React.FC<ChapterDetailsProps> = ({ chapterId }) => {
  const [mangaPages, setMangaPages] = useState<string[] | null>(null);
  const {id} = useParams();
  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
            const baseUrl = 'https://api.mangadex.org';
            let host, chapterHash, data, dataSaver;
            const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/at-home/server/${id}`,
                });
            console.log(resp);
            host = resp.data.baseUrl;
            chapterHash = resp.data.chapter.hash;
            data = resp.data.chapter.data;
            dataSaver = resp.data.chapter.dataSaver;

            let images : string[] = [];
            for (const page of dataSaver) {
                const url = `${host}/data-saver/${chapterHash}/${page}`;
                images.push(url)
            }
            setMangaPages(images);

      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    fetchMangaDetails();
  }, [chapterId]);

  if (!mangaPages) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Manga Chapters</h2>
      <ImageList images = {mangaPages} />;
    </div>
  );
};

export default ReadChapter;

