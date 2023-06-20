
import React from 'react';
import { Link } from 'react-router-dom';

export interface MangaChapter {
  id: string;
  volume: number;
  number: number;
  title: any;
}

interface MangaChapterListProps {
  chapters: MangaChapter[];
}

const MangaChapterList: React.FC<MangaChapterListProps> = ({ chapters }) => {
  return (
    <div className="manga-chapter-list">
      {chapters.map((chapter) => (
        <Link to={`/read/${chapter.id}`} key={chapter.id}>
          <button className="chapter-button">
            Volume {chapter.volume} - Chapter {chapter.number}: {chapter.title ? chapter.title : ""}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default MangaChapterList;
