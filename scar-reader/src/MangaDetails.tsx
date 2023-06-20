
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MangaChapterList, {MangaChapter} from './MangaChapterList';

interface MangaInterface {
  id: string;
  title: any;
  description: string;
  image_link: string;
}


interface MangaDetailsProps {
  mangaId?: string;
}


function mapResponseToInterface(response: any): MangaChapter {
  const mangachapter: MangaChapter = {
    id: response.id,
    title: (response.attributes.title.en ? response.attributes.title.en : ""),
    volume:response.attributes.volume,
    number : response.attributes.chapter
  };

  return mangachapter;
}

const MangaDetails: React.FC<MangaDetailsProps> = ({ mangaId }) => {
  const [mangaChapters, setMangaChapters] = useState<MangaChapter[] | null>(null);
  const {id} = useParams();
  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const languages = ['en'];
        const response = await axios.get(`https://api.mangadex.org/manga/${id}/feed?order[volume]=desc&order[chapter]=desc`, {params : {translatedLanguage: languages}});
        const mangaChaptersRes = response.data.data;
        const chapterList: MangaChapter[] = response.data.data.map((mangaData: any) =>
            mapResponseToInterface(mangaData)
        );
        setMangaChapters(chapterList);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    fetchMangaDetails();
  }, [mangaId]);

  if (!mangaChapters) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Manga Chapters</h2>
      <MangaChapterList chapters={mangaChapters} />
    </div>
  );
};

export default MangaDetails;
