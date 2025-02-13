'use client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

const Search = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        inputRef.current &&
        event.target instanceof Node &&
        !inputRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form action={'/search'} className='flex items-center gap-3'>
      <div
        className={`relative flex items-center transition-all duration-300 ${
          open ? 'max-w-[300px]' : 'max-w-0'
        } sm:max-w-none overflow-hidden`}
      >
        <Input
          type='text'
          placeholder='Search articles...'
          name='q'
          className='w-60  focus-visible:ring-0'
        />
      </div>
      <Button onClick={() => setOpen(!open)} type='submit'>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
