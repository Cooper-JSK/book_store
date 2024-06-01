import { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    const data = { title, author, publishYear }
    setloading(true);

    try {
      const save = await axios.post('http://localhost:5555/books', data)
      setloading(false);
      navigate('/')

    } catch (error) {
      setloading(false);
      console.log(error);
      alert('There was an error saving the book. Please try again.');

    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Title</lable>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Author</lable>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Publish Year</lable>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 rounded-full' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBooks